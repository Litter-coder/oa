package com.hongan.oa.security.authentication;

import java.io.Serializable;

import com.hongan.oa.utils.ReadProperties;

/**
 * 随机token，用于前台后台密码的校验
 * 
 * @author Administrator
 *
 */
public class RandomToken implements Serializable {

	private static final long serialVersionUID = -5945605076516156140L;

	private static final String RANDOM_TOKEN_TIMEOUT = "random_token_timeout";

	private String token;// 随机token值

	private long tokenTime;// 随机token值时间

	private static long tokenTimeout = 0;// 失效时间,值为0时，表示不失效

	/**
	 * 初始化随机token失效时间
	 */
	static {
		String proValue = ReadProperties.readProValue(RANDOM_TOKEN_TIMEOUT);
		if (proValue != null && !"".equals(proValue.trim())) {
			tokenTimeout = Long.parseLong(proValue);
		}
	}

	public RandomToken() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RandomToken(String token, long tokenTime) {
		super();
		this.token = token;
		this.tokenTime = tokenTime;
	}

	public String getToken() {
		return token;
	}

	public long getTokenTime() {
		return tokenTime;
	}

	public static long getTokenTimeout() {
		return tokenTimeout;
	}

}
