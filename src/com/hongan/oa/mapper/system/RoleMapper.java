package com.hongan.oa.mapper.system;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.hongan.oa.bean.system.RoleMenu;
import com.hongan.oa.bean.system.SysUserRole;

public interface RoleMapper {

	List<RoleMenu> getRoleMenuByMenuId(@Param(value = "menuId") Long menuId);

	List<SysUserRole> getSysUserRolesByUserId(@Param(value = "userId") Long userId);
}
