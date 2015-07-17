package com.hongan.oa.security.access.voter;

import java.util.Collection;

import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

/**
 * 角色投票
 * 
 * @author dinghuan
 *
 */
public class RoleVoter implements AccessDecisionVoter {

	@Override
	public boolean supports(ConfigAttribute attribute) {
		return attribute != null && attribute instanceof SecurityConfig;
	}

	@Override
	public boolean supports(Class<?> clazz) {
		return true;
	}

	@Override
	public int vote(Authentication authentication, Object object, Collection<ConfigAttribute> attributes) {
		int result = AccessDecisionVoter.ACCESS_DENIED;
		Collection<GrantedAuthority> authorities = authentication.getAuthorities();

		for (ConfigAttribute attribute : attributes) {
			if (this.supports(attribute)) {
				if (authorities != null) {
					for (GrantedAuthority authority : authorities) {
						if (attribute.getAttribute().equals(authority.getAuthority())) {
							return ACCESS_GRANTED;
						}
					}
				}
			}
		}

		return result;
	}

}
