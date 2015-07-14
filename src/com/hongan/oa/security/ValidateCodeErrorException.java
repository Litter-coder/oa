package com.hongan.oa.security;

import org.springframework.security.core.AuthenticationException;

/**
 * 验证码异常类
 * 
 * @author dinghuan
 *
 */
public class ValidateCodeErrorException extends AuthenticationException {

	private static final long serialVersionUID = -3774704600648833658L;

	public ValidateCodeErrorException(String msg) {
		super(msg);
		// TODO Auto-generated constructor stub
	}

	public ValidateCodeErrorException(String msg, Object extraInformation) {
		super(msg, extraInformation);
		// TODO Auto-generated constructor stub
	}

	public ValidateCodeErrorException(String msg, Throwable t) {
		super(msg, t);
		// TODO Auto-generated constructor stub
	}

}
