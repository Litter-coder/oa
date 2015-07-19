package com.hongan.oa.mapper.system;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.hongan.oa.bean.system.Menu;

public interface MenuMapper {

	List<Menu> getMenuList();

	List<Menu> getMenuByRoleIdMenuPid(@Param(value = "roleId") Long roleId, @Param(value = "menuPid") Long menuPid);

	List<Menu> getMenuByRoleIdsMenuPid(@Param(value = "roleIds") List<Long> roleIds, @Param(value = "menuPid") Long menuPid);

}
