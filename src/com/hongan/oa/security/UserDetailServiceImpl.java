package com.hongan.oa.security;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.hongan.oa.bean.system.SysUser;
import com.hongan.oa.bean.system.SysUserAttempts;
import com.hongan.oa.service.inf.ISysUserService;
import com.hongan.oa.utils.ReadProperties;

/**
 * 注入spring security 中的provide，用于查询数据库用户数据，进行密码验证
 * 
 * @author dinghuan
 *
 */
public class UserDetailServiceImpl implements UserDetailsService {

	@Autowired
	private ISysUserService sysUserService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException, DataAccessException {
		try {
			// 查询用户
			SysUser user = sysUserService.getSysUserByUsername(username);
			SysUser returnUser = null;
			if (user == null) {
				throw new UsernameNotFoundException("用户名或密码错误");
			} else {
				if (!user.isAccountNonLocked()) {// 如果用户被锁，检查锁定时间
					int lockedMinute = Integer.parseInt(ReadProperties.readProValue("login_locked_minute"));
					SysUserAttempts userAttempts = sysUserService.getSysUserAttempts(username);
					if (userAttempts != null) {
						Calendar errorCalendar = Calendar.getInstance();
						errorCalendar.setTime(userAttempts.getLastErrorTime());
						errorCalendar.add(Calendar.MINUTE, lockedMinute);

						Calendar nowCalendar = Calendar.getInstance();
						if (!errorCalendar.after(nowCalendar)) {// 表示自动解锁，只改该用户的值，不更新数据库，因为接下来还需验证密码是否正确
							user.setAccountNonLocked(true);
						}
					}
				}
				returnUser = user;
			}
			return returnUser;

		} catch (DataAccessException repositoryProblem) {
			repositoryProblem.printStackTrace();
			throw new AuthenticationServiceException("数据连接失败,服务器忙,请稍后再试");
		}
	}

	// 加载用户对应的权限

	public List<GrantedAuthority> getAuthorities(Long userId) {

		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

		authorities.add(new GrantedAuthorityImpl("ROLE_ANONYMOUS")); // 赋予一个临时权限

		return authorities;

	}
}
