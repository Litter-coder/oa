package com.hongan.oa.controller.personal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller("/personal")
public class PersonalController {

	@RequestMapping("/schedule.do")
	public ModelAndView schedule(HttpServletRequest request, HttpServletResponse response) throws Exception {
		return new ModelAndView("personal/schedule");
	}
}
