package com.hongan.oa.mapper.system;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.hongan.oa.bean.system.Menu;
import com.hongan.oa.bean.system.RoleMenu;

public interface MenuMapper {

	List<Menu> getMenuList();

	List<RoleMenu> getRoleMenuByMenuId(@Param(value = "menuId") Long menuId);

}
