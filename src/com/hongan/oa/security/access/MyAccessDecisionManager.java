package com.hongan.oa.security.access;

import java.util.Collection;
import java.util.Iterator;

import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

/**
 * 自定义验证权限时使用
 * 
 * @author Administrator
 *
 */
public class MyAccessDecisionManager implements AccessDecisionManager {

	// 检查用户是否够权限访问资源
	// 参数authentication是从spring的全局缓存SecurityContextHolder中拿到的，里面是用户的权限信息
	// 参数object是url
	// 参数configAttributes所需的权限
	@Override
	public void decide(Authentication authentication, Object object, Collection<ConfigAttribute> configAttributes) throws AccessDeniedException, InsufficientAuthenticationException {
		if (configAttributes == null) {
			throw new AccessDeniedException("no right");
		}

		Iterator<ConfigAttribute> ite = configAttributes.iterator();
		while (ite.hasNext()) {
			ConfigAttribute ca = ite.next();
			String needRole = ((SecurityConfig) ca).getAttribute();
			for (GrantedAuthority ga : authentication.getAuthorities()) {
				if (needRole.equals(ga.getAuthority())) {

					return;
				}
			}
		}

		// 注意：执行这里，后台是会抛异常的，但是界面会跳转到所配的access-denied-page页面
		throw new AccessDeniedException("no right");
	}

	@Override
	public boolean supports(ConfigAttribute attribute) {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean supports(Class<?> clazz) {
		// TODO Auto-generated method stub
		return true;
	}

}
