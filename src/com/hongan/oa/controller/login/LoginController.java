package com.hongan.oa.controller.login;

import java.awt.image.BufferedImage;
import java.util.Calendar;
import java.util.Date;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.code.kaptcha.Producer;
import com.hongan.oa.security.RandomTokenValidateCodeUsernamePasswordAuthenticationFilter;
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
	public static final String KAPTCHA_CODE_TIMEOUT = "kaptcha_code_timeout";

	@Autowired
	private Producer captchaProducer;

	@RequestMapping("/kaptcha-image.do")
	public void getKaptchaImage(HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession();
		response.setDateHeader("Expires", 0);
		response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
		response.addHeader("Cache-Control", "post-check=0, pre-check=0");
		response.setHeader("Pragma", "no-cache");
		response.setContentType("image/jpeg");

		String capText = captchaProducer.createText();
		session.setAttribute(RandomTokenValidateCodeUsernamePasswordAuthenticationFilter.SPRING_SECURITY_VALIDATE_CODE_SESSION, capText);
		session.setAttribute(RandomTokenValidateCodeUsernamePasswordAuthenticationFilter.SPRING_SECURITY_VALIDATE_CODE_SESSION_TIME, Calendar.getInstance().getTimeInMillis() / 1000);

		BufferedImage bi = captchaProducer.createImage(capText);
		ServletOutputStream out = response.getOutputStream();
		ImageIO.write(bi, "jpg", out);
		try {
			out.flush();
		} finally {
			out.close();
		}
	}

	@RequestMapping("/token.do")
	@ResponseBody
	public String getToken(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Md5PasswordEncoder md5 = new Md5PasswordEncoder();
		final String token = md5.encodePassword(StringUtil.getRandomString(20), null);
		final HttpSession session = request.getSession();
		if (session != null) {
			session.setAttribute(RandomTokenValidateCodeUsernamePasswordAuthenticationFilter.SPRING_SECURITY_RANDOM_TOKEN, token);
		}
		new Thread(new Runnable() {
			@Override
			public void run() {
				long now = new Date().getTime() / 1000;
				// 设置token有效期为1分钟
				while (true) {
					if((now + 60) < new Date().getTime() / 1000){
						if (session != null) {
							session.removeAttribute(RandomTokenValidateCodeUsernamePasswordAuthenticationFilter.SPRING_SECURITY_RANDOM_TOKEN);
						}
						break;
					}
					try {
						Thread.sleep(1000);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}

			}
		}).start();
		return token;
	}
}
