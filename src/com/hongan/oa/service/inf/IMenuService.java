package com.hongan.oa.service.inf;

import java.util.List;

import com.hongan.oa.bean.system.Menu;
import com.hongan.oa.bean.system.RoleMenu;

public interface IMenuService {

	List<Menu> getMenuList();

	List<RoleMenu> getRoleMenuByMenuId(Long menuId);

}
