package com.hongan.oa.security;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import com.hongan.oa.bean.system.SysUser;
import com.hongan.oa.bean.system.SysUserAttempts;
import com.hongan.oa.service.inf.ISysUserService;
import com.hongan.oa.utils.ReadProperties;

/**
 * 登录验证的方式提供类
 * 
 * @author dinghuan
 *
 */
public class LimitLoginAuthenticationProvider extends DaoAuthenticationProvider {

	private static Logger logger = LoggerFactory.getLogger(LimitLoginAuthenticationProvider.class);

	@Autowired
	private ISysUserService sysUserService;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {

		try {

			Authentication auth = super.authenticate(authentication);

			// if reach here, means login success, else exception will be thrown
			// reset the user_attempts
			SysUser user = sysUserService.getSysUserByUsername(authentication.getName());
			if (!user.isAccountNonLocked()) {
				user.setAccountNonLocked(true);
				sysUserService.updateSysUser(user);
			}
			sysUserService.resetFailAttempts(authentication.getName());

			return auth;

		} catch (DisabledException e) {
			throw e;
		} catch (BadCredentialsException e) {
			SysUser user = sysUserService.getSysUserByUsername(authentication.getName());
			// 用户名密码错误异常时操作锁定记录
			if (user != null) {
				SysUserAttempts userAttempts = sysUserService.getSysUserAttempts(authentication.getName());
				if (userAttempts == null) {
					userAttempts = new SysUserAttempts();
					userAttempts.setUsername(authentication.getName());
					userAttempts.setAttempts(1);
					userAttempts.setLastErrorTime(new Date());
					sysUserService.saveFailAttempts(userAttempts);
				} else {
					int errorCount = Integer.parseInt(ReadProperties.readProValue("login_error_count"));
					userAttempts.setAttempts(userAttempts.getAttempts() + 1);
					userAttempts.setLastErrorTime(new Date());
					sysUserService.updateFailAttempts(userAttempts);

					logger.info("用户{}登录错误次数:{}", new Object[] { user.getUsername(), userAttempts.getAttempts() });
					int warn = errorCount - userAttempts.getAttempts();
					if (warn <= 3 && warn > 0) {
						e = new BadCredentialsException(messages.getMessage("LimitLoginAuthenticationProvider.badCredentials", new Object[] { errorCount - userAttempts.getAttempts() }));

					} else if (warn <= 0) {
						e = new BadCredentialsException(messages.getMessage("LimitLoginAuthenticationProvider.badCredentialsLocked", new Object[] { errorCount }));
					}

					if (userAttempts.getAttempts() >= errorCount) {
						user.setAccountNonLocked(false);// 锁定用户
						sysUserService.updateSysUser(user);
						logger.info("用户{}登录错误次数达到限制{}，被锁定", new Object[] { user.getUsername(), userAttempts.getAttempts() });

					}
				}
			}
			throw e;
		} catch (LockedException e) {
			throw e;
		}

	}
}
