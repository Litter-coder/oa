package com.hongan.oa.mapper.system;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.hongan.oa.bean.system.Menu;

public interface MenuMapper {

	List<Menu> getMenuList();

	List<Menu> getMenuByRoleIdMenuPid(@Param(value = "roleId") Long roleId, @Param(value = "menuPid") Long menuPid);

	/**
	 * 查询菜单
	 * 
	 * @param roleIds
	 *            size必须大于0
	 * @param menuPid
	 *            当值为null时，加载topMenu
	 * @return
	 */
	List<Menu> getMenuByRoleIdsMenuPid(@Param(value = "roleIds") List<Long> roleIds, @Param(value = "menuPid") Long menuPid);

}
