package com.hongan.oa.security.authentication;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.hongan.oa.bean.ConstBean;
import com.hongan.oa.bean.system.SysUser;
import com.hongan.oa.bean.system.SysUserAttempts;
import com.hongan.oa.service.inf.ISysUserService;
import com.hongan.oa.utils.ReadProperties;

/**
 * 登录验证的方式提供类
 * 
 * 验证用户名，密码（包括随机token的散列验证）
 * 
 * @author dinghuan
 *
 */
public class LoginAuthenticationProvider extends DaoAuthenticationProvider {

	private static Logger logger = LoggerFactory.getLogger(LoginAuthenticationProvider.class);

	@Autowired
	private ISysUserService sysUserService;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {

		try {
			// 添加对验证码验证
			checkValidateCode(authentication);

			Authentication auth = super.authenticate(authentication);

			// if reach here, means login success, else exception will be thrown
			// reset the user_attempts
			SysUser user = sysUserService.getSysUserByUsername(authentication.getName());
			if (!user.isAccountNonLocked()) {
				user.setAccountNonLocked(true);
				sysUserService.updateSysUser(user);
			}
			sysUserService.resetFailAttempts(authentication.getName());
			if (user.getLoginStatus() != ConstBean.LOGIN_STATUS_WEB_ONLINE) {
				sysUserService.updateSysUserLoginStatus(ConstBean.LOGIN_STATUS_WEB_ONLINE, user.getUserId());
			}
			return auth;
		} catch (BadCredentialsException e) {// 用户名密码错误异常
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
						e = new BadCredentialsException(messages.getMessage("LoginAuthenticationProvider.badCredentials", new Object[] { errorCount - userAttempts.getAttempts() }));

					} else if (warn <= 0) {
						e = new BadCredentialsException(messages.getMessage("LoginAuthenticationProvider.badCredentialsLocked", new Object[] { errorCount }));
					}

					if (userAttempts.getAttempts() >= errorCount) {
						user.setAccountNonLocked(false);// 锁定用户
						sysUserService.updateSysUser(user);
						logger.info("用户{}登录错误次数达到限制{}，被锁定", new Object[] { user.getUsername(), userAttempts.getAttempts() });

					}
				}
			}
			throw e;
		} catch (LockedException e) {// 用户锁定异常
			throw e;
		} catch (ValidateCodeErrorException e) {// 验证码异常
			throw e;
		} catch (CredentialsExpiredException e) {// randomToken凭证异常
			throw e;
		} catch (DisabledException e) {// 用户失效异常
			throw e;
		}
	}

	@Override
	protected Authentication createSuccessAuthentication(Object principal, Authentication authentication, UserDetails user) {
		UserDetailsServiceImpl service = (UserDetailsServiceImpl) this.getUserDetailsService();
		List<GrantedAuthority> authorities = service.getAuthorities(((SysUser) user).getUserId());
		((SysUser) user).setAuthorities(authorities);
		if (!this.isForcePrincipalAsString()) {
			((SysUser) principal).setPassword(null);
		}
		RandomTokenValidateCodeUsernamePasswordAuthenticationToken result = new RandomTokenValidateCodeUsernamePasswordAuthenticationToken(principal, authentication, user.getAuthorities());
		return result;
	}

	/**
	 * 
	 * 验证 验证码
	 * 
	 * @param request
	 */
	protected void checkValidateCode(Authentication authentication) throws ValidateCodeErrorException {
		// session中存储的验证码
		ValidateCode codeSession = ((RandomTokenValidateCodeUsernamePasswordAuthenticationToken) authentication).getValidateCodeSession();
		if (codeSession == null) {
			throw new ValidateCodeErrorException(messages.getMessage("LoginAuthenticationProvider.validateCodeExpired"));
		}
		String validateCodeSession = (String) codeSession.getValidateCode();
		long validateCodeTimeSession = codeSession.getValidateCodeTime();

		// request请求的验证码
		ValidateCode codeParameter = ((RandomTokenValidateCodeUsernamePasswordAuthenticationToken) authentication).getValidateCodeParameter();
		String validateCodeParameter = (String) codeParameter.getValidateCode();
		long validateCodeParameterTime = codeParameter.getValidateCodeTime();

		long timeout = ValidateCode.getValidateCodeTimeout();

		if (StringUtils.isEmpty(validateCodeParameter) || StringUtils.isEmpty(validateCodeSession) || !validateCodeSession.equalsIgnoreCase(validateCodeParameter)) {
			throw new ValidateCodeErrorException(messages.getMessage("LoginAuthenticationProvider.validateCodeError"));
		} else if (validateCodeSession.equalsIgnoreCase(validateCodeParameter)) {
			if (timeout != 0) {// 为0时无失效时间
				if ((validateCodeTimeSession + timeout) < validateCodeParameterTime) {
					throw new ValidateCodeErrorException(messages.getMessage("LoginAuthenticationProvider.validateCodeExpired"));
				}
			}
		}
	}

	/**
	 * 加入随机token散列方式
	 */
	@Override
	protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
		Md5PasswordEncoder md5 = new Md5PasswordEncoder();
		RandomToken randomToken = ((RandomTokenValidateCodeUsernamePasswordAuthenticationToken) authentication).getRandomToken();
		String token = randomToken.getToken();
		long tokenTime = randomToken.getTokenTime();
		long tokenTimeout = RandomToken.getTokenTimeout();

		// 抛出用户凭证过期的异常
		if (token == null || (tokenTimeout != 0 && (tokenTime + tokenTimeout) < new Date().getTime() / 1000)) {
			logger.info("random token is timeout !");
			throw new CredentialsExpiredException(messages.getMessage(//
					"AbstractUserDetailsAuthenticationProvider.credentialsExpired", "Credentials expired"),//
					isIncludeDetailsObject() ? userDetails : null);
		}
		// 与login页面同样的散列方式
		String psd = md5.encodePassword(token + userDetails.getPassword(), null);
		Object salt = null;
		if (this.getSaltSource() != null) {
			salt = this.getSaltSource().getSalt(userDetails);
		}
		psd = this.getPasswordEncoder().encodePassword(psd, salt);
		((SysUser) userDetails).setPassword(psd);

		super.additionalAuthenticationChecks(userDetails, authentication);
	}
}
