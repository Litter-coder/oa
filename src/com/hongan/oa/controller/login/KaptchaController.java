package com.hongan.oa.controller.login;

import java.awt.image.BufferedImage;
import java.util.Calendar;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.Producer;

/**
 * 验证码生成控制器
 * 
 * @author dinghuan
 *
 */
@Controller
@RequestMapping("/kaptcha")
public class KaptchaController {
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
		session.setAttribute(Constants.KAPTCHA_SESSION_KEY, capText);
		session.setAttribute(Constants.KAPTCHA_SESSION_DATE, Calendar.getInstance().getTimeInMillis() / 1000);

		BufferedImage bi = captchaProducer.createImage(capText);
		ServletOutputStream out = response.getOutputStream();
		ImageIO.write(bi, "jpg", out);
		try {
			out.flush();
		} finally {
			out.close();
		}
	}
}
