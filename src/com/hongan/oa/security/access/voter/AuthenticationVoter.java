package com.hongan.oa.security.access.voter;

import java.util.Collection;

import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.core.Authentication;

import com.hongan.oa.security.authentication.RandomTokenValidateCodeUsernamePasswordAuthenticationToken;

/**
 * 已登录投票
 * 
 * @author dinghuan
 *
 */
public class AuthenticationVoter implements AccessDecisionVoter {

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

	@Override
	public int vote(Authentication authentication, Object object, Collection<ConfigAttribute> attributes) {
		if (authentication != null && authentication instanceof RandomTokenValidateCodeUsernamePasswordAuthenticationToken && authentication.isAuthenticated()) {
			return AccessDecisionVoter.ACCESS_GRANTED;
		}
		return AccessDecisionVoter.ACCESS_DENIED;
	}

}
