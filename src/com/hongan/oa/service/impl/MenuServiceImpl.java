package com.hongan.oa.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hongan.oa.bean.system.Menu;
import com.hongan.oa.bean.system.RoleMenu;
import com.hongan.oa.mapper.system.MenuMapper;
import com.hongan.oa.service.inf.IMenuService;

@Service("menuServiceImpl")
public class MenuServiceImpl implements IMenuService {

	@Autowired
	private MenuMapper menuMapper;

	@Override
	public List<Menu> getMenuList() {
		// TODO Auto-generated method stub
		return menuMapper.getMenuList();
	}

	@Override
	public List<RoleMenu> getRoleMenuByMenuId(Long menuId) {
		// TODO Auto-generated method stub
		return menuMapper.getRoleMenuByMenuId(menuId);
	}

}
