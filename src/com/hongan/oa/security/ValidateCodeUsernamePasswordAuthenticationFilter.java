package com.hongan.oa.security;

import java.io.IOException;
import java.util.Calendar;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.google.code.kaptcha.Constants;
import com.hongan.oa.controller.login.KaptchaController;
import com.hongan.oa.utils.ReadProperties;

/**
 * 验证码与用户名密码验证
 * 
 * @author dinghuan
 *
 */
public class ValidateCodeUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
		// 添加对验证码验证
		checkValidateCode(request);

		return super.attemptAuthentication(request, response);

	}

	/**
	 * 
	 * 验证 验证码
	 * 
	 * @param request
	 */

	protected void checkValidateCode(HttpServletRequest request) {

		String sessionValidateCode = (String) request.getSession().getAttribute(Constants.KAPTCHA_SESSION_KEY);
		long create_time = (long) request.getSession().getAttribute(Constants.KAPTCHA_SESSION_DATE);

		String validateCodeParameter = request.getParameter("validateCode");

		if (StringUtils.isEmpty(validateCodeParameter) || StringUtils.isEmpty(sessionValidateCode) || !sessionValidateCode.equalsIgnoreCase(validateCodeParameter)) {
			throw new AuthenticationServiceException("验证码不正确!");
		} else if (sessionValidateCode.equalsIgnoreCase(validateCodeParameter)) {
			long now = Calendar.getInstance().getTimeInMillis() / 1000;
			long timeout = Long.parseLong(ReadProperties.readProValue(KaptchaController.KAPTCHA_CODE_TIMEOUT));
			if ((create_time + timeout) < now) {
				throw new AuthenticationServiceException("验证码已超时!");
			}
		}

	}

	/**
	 * 
	 * 重写父类的方法，在验证用户完成调用的方法
	 */

	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, Authentication arg2) throws IOException, ServletException {

		String username = obtainUsername(request);

		request.getSession().setAttribute("userName", username);

		super.successfulAuthentication(request, response, arg2);

	}
}
