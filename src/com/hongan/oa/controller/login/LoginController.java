package com.hongan.oa.controller.login;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.code.kaptcha.Producer;
import com.hongan.oa.bean.system.SysUser;
import com.hongan.oa.security.authentication.RandomToken;
import com.hongan.oa.security.authentication.RandomTokenValidateCodeUsernamePasswordAuthenticationFilter;
import com.hongan.oa.security.authentication.ValidateCode;
import com.hongan.oa.utils.StringUtil;

/**
 * 登录功能控制器
 * 
 * @author dinghuan
 *
 */
@Controller
@RequestMapping("/login")
public class LoginController {

	@Autowired
	private Producer captchaProducer;

	@Autowired
	private SessionRegistry sessionRegistry;

	/**
	 * 验证码获取
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("/kaptcha-image.do")
	public void getKaptchaImage(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession();
		response.setDateHeader("Expires", 0);
		response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");
		response.setHeader("Pragma", "no-cache");
		response.setContentType("image/jpeg");

		String capText = captchaProducer.createText();

		// 设置验证码对象到session中
		ValidateCode validateCode = new ValidateCode(capText, new Date().getTime() / 1000);
		session.setAttribute(RandomTokenValidateCodeUsernamePasswordAuthenticationFilter.SPRING_SECURITY_VALIDATE_CODE, validateCode);

		BufferedImage bi = captchaProducer.createImage(capText);
		ServletOutputStream out = response.getOutputStream();
		ImageIO.write(bi, "jpg", out);
		try {
			out.flush();
		} finally {
			out.close();
		}
	}

	/**
	 * 随机token获取
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/token.do")
	@ResponseBody
	public String getToken(HttpServletRequest request, HttpServletResponse response) throws Exception {
		getAllLoginUser();
		Md5PasswordEncoder md5 = new Md5PasswordEncoder();
		String token = md5.encodePassword(StringUtil.getRandomString(20), null);
		HttpSession session = request.getSession();
		// 设置随机token对象到session中
		RandomToken randomToken = new RandomToken(token, new Date().getTime() / 1000);
		session.setAttribute(RandomTokenValidateCodeUsernamePasswordAuthenticationFilter.SPRING_SECURITY_RANDOM_TOKEN, randomToken);
		return token;
	}

	/**
	 * session失效处理
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/sessionTimeout.do")
	public void sessionTimeout(HttpServletRequest request, HttpServletResponse response) throws IOException {
		// String requestUrl = request.getRequestURI();
		if (request.getHeader("x-requested-with") != null && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")) { // ajax超时处理
			response.setHeader("sessionstatus", "timeout");
			PrintWriter out = response.getWriter();
			out.print("{timeout:true}");
			out.flush();
			out.close();
		} else { // http 超时处理
			response.sendRedirect(request.getContextPath() + "/login.jsp");
		}

	}

	public void getAllLoginUser() {
		SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		List<Object> list = sessionRegistry.getAllPrincipals();
		for (int i = 0; i < list.size(); i++) {
			SysUser user = (SysUser) list.get(i);
			List<SessionInformation> sessions = sessionRegistry.getAllSessions(list.get(i), true);
			System.out.println("第" + (i + 1) + "个用户，用户名：" + user.getUsername() + "," + sessions.size() + "处登录");
			for (int j = 0; j < sessions.size(); j++) {
				SessionInformation information = sessions.get(j);
				System.out.println("最后访问时间：" + ft.format(information.getLastRequest()));
				System.out.println("限制登录：" + information.isExpired());
			}
		}
	}
}
