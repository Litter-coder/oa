package com.hongan.oa.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import com.hongan.oa.bean.system.Menu;
import com.hongan.oa.bean.system.RoleMenu;
import com.hongan.oa.mapper.system.MenuMapper;
import com.hongan.oa.mapper.system.RoleMapper;
import com.hongan.oa.service.inf.IMenuService;

@Service("menuServiceImpl")
public class MenuServiceImpl implements IMenuService {

	@Autowired
	private MenuMapper menuMapper;

	@Autowired
	private RoleMapper roleMapper;

	@Override
	public List<Menu> getMenuList() {
		// TODO Auto-generated method stub
		return menuMapper.getMenuList();
	}

	@Override
	public List<RoleMenu> getRoleMenuByMenuId(Long menuId) {
		// TODO Auto-generated method stub
		return roleMapper.getRoleMenuByMenuId(menuId);
	}

	@Override
	public List<Menu> loadMenu(Collection<GrantedAuthority> authorities, Long menuPid) {
		List<Long> roleIds = toRoleIds(authorities);
		List<Menu> menus = menuMapper.getMenuByRoleIdsMenuPid(roleIds, menuPid);
		if (menuPid != null) {// 加载子级菜单
			getSubMenusByRoleIdsMenuPid(menus, roleIds);
		}
		return menus;

	}

	/**
	 * 加载主页左边的列表页面
	 * 
	 * @param pubMenus
	 * @param roleIds
	 */
	private void getSubMenusByRoleIdsMenuPid(List<Menu> pubMenus, List<Long> roleIds) {
		if (!pubMenus.isEmpty()) {
			for (Menu menu : pubMenus) {
				List<Menu> subMenus = menuMapper.getMenuByRoleIdsMenuPid(roleIds, menu.getMenuId());
				getSubMenusByRoleIdsMenuPid(subMenus, roleIds);
				menu.setSubMenus(subMenus);
			}
		}
	}

	private List<Long> toRoleIds(Collection<GrantedAuthority> authorities) {
		List<Long> roleIds = new ArrayList<Long>();
		for (GrantedAuthority authority : authorities) {
			roleIds.add(Long.valueOf(authority.getAuthority()));
		}
		return roleIds;
	}

}
