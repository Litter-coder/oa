package com.hongan.oa.security.authentication;

import com.hongan.oa.utils.ReadProperties;

/**
 * 验证码bean类
 * 
 * @author dinghuan
 *
 */
public class ValidateCode {

	private static final String VALIDATE_CODE_TIMEOUT = "validate_code_timeout";

	private Object validateCode;// 验证码字符串

	private long validateCodeTime; // 验证码时间

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

	public static long getValidateCodeTimeout() {
		return validateCodeTimeout;
	}

	public ValidateCode() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ValidateCode(Object validateCode, long validateCodeTime) {
		super();
		this.validateCode = validateCode;
		this.validateCodeTime = validateCodeTime;
	}

	public Object getValidateCode() {
		return validateCode;
	}

	public void setValidateCode(Object validateCode) {
		this.validateCode = validateCode;
	}

	public long getValidateCodeTime() {
		return validateCodeTime;
	}

	public void setValidateCodeTime(long validateCodeTime) {
		this.validateCodeTime = validateCodeTime;
	}

}
