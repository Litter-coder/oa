package com.hongan.oa.security;

import java.util.Collection;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import com.hongan.oa.utils.ReadProperties;

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

	private static String VALIDATE_CODE_TIMEOUT = "validate_code_timeout";

	private Object randomToken;// 随机token值

	private Object validateCodeParameter;// 请求中传递的验证码

	private long validateCodeParameterTime;// 请求中传递验证码的时间

	private Object validateCodeSession; // session中的验证码

	private long validateCodeSessionTime;// session中验证码的生成时间

	private static long validateCodeTimeout = 0;// 验证码失效时间,默认值0时永不失效

	/**
	 * 初始化验证码失效时间
	 */
	static {
		String proValue = ReadProperties.readProValue(VALIDATE_CODE_TIMEOUT);
		if (proValue != null && !"".equals(proValue.trim())) {
			validateCodeTimeout = Long.parseLong(proValue);
		}
	}

	public long getValidateCodeTimeout() {
		return validateCodeTimeout;
	}

	public Object getValidateCodeSession() {
		return validateCodeSession;
	}

	public long getValidateCodeSessionTime() {
		return validateCodeSessionTime;
	}

	public long getValidateCodeParameterTime() {
		return validateCodeParameterTime;
	}

	public Object getValidateCodeParameter() {
		return validateCodeParameter;
	}

	public Object getRandomToken() {
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

	public RandomTokenValidateCodeUsernamePasswordAuthenticationToken(Object principal, Object credentials, Object randomToken, //
			Object validateCodeParameter, long validateCodeParameterTime, //
			Object validateCodeSession, long validateCodeSessionTime) {
		super(principal, credentials);
		this.randomToken = randomToken;
		this.validateCodeParameter = validateCodeParameter;
		this.validateCodeParameterTime = validateCodeParameterTime;
		this.validateCodeSession = validateCodeSession;
		this.validateCodeSessionTime = validateCodeSessionTime;
	}

}
