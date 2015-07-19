package com.hongan.oa.controller.index;

import java.util.Collection;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.hongan.oa.bean.system.Menu;
import com.hongan.oa.bean.system.SysUser;
import com.hongan.oa.service.inf.IMenuService;

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

	/**
	 * 加载菜单
	 * 
	 * @param request
	 * @param response
	 * @param menuPid
	 *            为空时，表示加载一级横向菜单
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/loadMenu.do")
	public ModelAndView loadMenu(HttpServletRequest request, HttpServletResponse response, Long menuPid) throws Exception {
		ModelAndView modelAndView = new ModelAndView("/page/index/menu.jsp");
		SysUser sysUser = (SysUser) ((UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication()).getPrincipal();
		Collection<GrantedAuthority> authorities = sysUser.getAuthorities();// 获取角色ID
		List<Menu> menuList = menuService.loadMenu(authorities, menuPid);
		modelAndView.addObject("menuPid", menuPid);
		modelAndView.addObject("menus", menuList);
		return modelAndView;
	}
}
