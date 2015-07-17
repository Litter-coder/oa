package com.hongan.oa.security.authentication;

import java.util.Collection;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

/**
 * 
 * 所有的登录验证应该都在provide中实现，为了程序设计的思想，将验证码的验证放入provide中进行验证<br/>
 * 带入验证码验证；<br/>
 * 加入随机散列号，传递参数至provide中，用于userDetailService查询出的密码进行拼接散列 <br/>
 * 
 * @author dinghuan
 *
 */
public class RandomTokenValidateCodeUsernamePasswordAuthenticationToken extends UsernamePasswordAuthenticationToken {

	private static final long serialVersionUID = 486433105864372684L;

	private RandomToken randomToken;// 随机token对象

	private ValidateCode validateCodeParameter; // 验证码对象(请求)

	private ValidateCode validateCodeSession; // 验证码对象(session)

	public ValidateCode getValidateCodeParameter() {
		return validateCodeParameter;
	}

	public ValidateCode getValidateCodeSession() {
		return validateCodeSession;
	}

	public RandomToken getRandomToken() {
		return randomToken;
	}

	public RandomTokenValidateCodeUsernamePasswordAuthenticationToken(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities) {
		super(principal, credentials, authorities);
		// TODO Auto-generated constructor stub
	}

	public RandomTokenValidateCodeUsernamePasswordAuthenticationToken(Object principal, Object credentials) {
		super(principal, credentials);
		// TODO Auto-generated constructor stub
	}

	public RandomTokenValidateCodeUsernamePasswordAuthenticationToken(Object principal, Object credentials, RandomToken randomToken, ValidateCode validateCodeParameter,
			ValidateCode validateCodeSession) {
		super(principal, credentials);
		this.randomToken = randomToken;
		this.validateCodeParameter = validateCodeParameter;
		this.validateCodeSession = validateCodeSession;
	}

}
