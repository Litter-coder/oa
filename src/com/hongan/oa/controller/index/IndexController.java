package com.hongan.oa.controller.index;

import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hongan.oa.bean.system.Menu;
import com.hongan.oa.bean.system.SysUser;
import com.hongan.oa.bean.system.UserInfo;
import com.hongan.oa.plugins.weather.DefaultsConst;
import com.hongan.oa.plugins.weather.Weather;
import com.hongan.oa.security.authentication.UserDetailsServiceImpl;
import com.hongan.oa.service.inf.IMenuService;
import com.hongan.oa.service.inf.ISysUserService;

/**
 * 主页功能
 * 
 * @author Administrator
 *
 */
@Controller
@RequestMapping("/index")
public class IndexController {

	@Autowired
	private IMenuService menuService;

	@Autowired
	private ISysUserService sysUserService;

	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;

	private String prexPage = "index/";

	/**
	 * 跳转至主页
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/main.do")
	public ModelAndView main(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
		ModelAndView modelAndView = new ModelAndView("main");
		// 注意后面修改权限后需要重复验证
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		SysUser sysUser = sysUserService.getSysUserByUsername(username);
		UserInfo userInfo = sysUserService.getUserInfoById(sysUser.getUserId());
		
		model.addAttribute("userInfo", userInfo);
		List<Menu> menuList = menuService.loadMenu(authentication.getAuthorities(), null);
		modelAndView.addObject("topMenus", menuList);
		return modelAndView;
	}

	/**
	 * 加载左列菜单
	 * 
	 * @param request
	 * @param response
	 * @param menuPid
	 *            为空时，表示加载一级横向菜单
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/menu.do")
	public ModelAndView loadMenu(HttpServletRequest request, HttpServletResponse response, Long menuPid) throws Exception {
		ModelAndView modelAndView = new ModelAndView(prexPage + "leftMenu");
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		List<Menu> menuList = menuService.loadMenu(authentication.getAuthorities(), menuPid);
		modelAndView.addObject("subMenus", menuList);
		return modelAndView;
	}

	@RequestMapping("/commonMenu.do")
	public ModelAndView loadCommonMenu(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView modelAndView = new ModelAndView(prexPage + "commonMenu");
		return modelAndView;
	}

	@RequestMapping("/common_today.do")
	public ModelAndView common_today(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView modelAndView = new ModelAndView(prexPage + "common_today");

		Date time = new Date();
		TimeZone tz = TimeZone.getDefault();
		int offset = tz.getOffset(time.getTime());

		modelAndView.addObject("timestamp", time.getTime());
		modelAndView.addObject("offset", offset);
		return modelAndView;
	}

	@RequestMapping("/weather.do")
	@ResponseBody
	public Object commonTodayWeather(HttpServletRequest request, HttpServletResponse response, DefaultsConst options) throws Exception {
		return Weather.getWeather(options);
	}

	@RequestMapping("/common_msg.do")
	public ModelAndView common_msg(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ModelAndView modelAndView = new ModelAndView(prexPage + "common_msg");
		return modelAndView;
	}
}
