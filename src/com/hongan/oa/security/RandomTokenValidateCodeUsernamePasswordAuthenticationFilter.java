package com.hongan.oa.security;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.util.TextEscapeUtils;

/**
 * 验证码与用户名密码验证
 * 
 * @author dinghuan
 *
 */
public class RandomTokenValidateCodeUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	public static final String SPRING_SECURITY_RANDOM_TOKEN = "randomToken";

	public static final String SPRING_SECURITY_FORM_VALIDATECODE_KEY = "j_validateCode";

	public static final String SPRING_SECURITY_VALIDATE_CODE = "validateCode";

	private static final String validateCodeParameter = SPRING_SECURITY_FORM_VALIDATECODE_KEY;

	private static final String validateCodeSession = SPRING_SECURITY_VALIDATE_CODE;

	private SessionAuthenticationStrategy sessionStrategy;

	public SessionAuthenticationStrategy getSessionStrategy() {
		return sessionStrategy;
	}

	public void setSessionStrategy(SessionAuthenticationStrategy sessionStrategy) {
		this.sessionStrategy = sessionStrategy;
	}

	/**
	 * 重写方法不更改逻辑，只改变参数传递
	 */
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

		if (!request.getMethod().equals("POST")) {
			throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
		}

		String username = obtainUsername(request);
		String password = obtainPassword(request);
		String validateCode = obtainValidateCode(request);
		long nowTime = new Date().getTime() / 1000;

		// session 中存储的数据
		RandomToken randomToken = null;
		ValidateCode codeSession = null;

		if (username == null) {
			username = "";
		}

		if (password == null) {
			password = "";
		}

		username = username.trim();

		// Place the last username attempted into HttpSession for views
		HttpSession session = request.getSession(false);

		if (session != null || getAllowSessionCreation()) {
			HttpSession httpSession = request.getSession();
			httpSession.setAttribute(SPRING_SECURITY_LAST_USERNAME_KEY, TextEscapeUtils.escapeEntities(username));
			randomToken = (RandomToken) httpSession.getAttribute(SPRING_SECURITY_RANDOM_TOKEN);
			codeSession = (ValidateCode) httpSession.getAttribute(validateCodeSession);
			// 使用一次后移除对象
			httpSession.removeAttribute(SPRING_SECURITY_RANDOM_TOKEN);
			httpSession.removeAttribute(validateCodeSession);
		}
		ValidateCode codeParameter = new ValidateCode(validateCode, nowTime);

		UsernamePasswordAuthenticationToken authRequest = new RandomTokenValidateCodeUsernamePasswordAuthenticationToken(username, password, randomToken, codeParameter, codeSession);

		// Allow subclasses to set the "details" property
		setDetails(request, authRequest);

		return this.getAuthenticationManager().authenticate(authRequest);

	}

	protected String obtainValidateCode(HttpServletRequest request) {
		return request.getParameter(validateCodeParameter);
	}

	/**
	 * 
	 * 重写父类的方法，在验证用户完成调用的方法
	 */
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, Authentication arg2) throws IOException, ServletException {

		String username = obtainUsername(request);

		request.getSession().setAttribute("userName", username);

		super.successfulAuthentication(request, response, arg2);

	}
}
