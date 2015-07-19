package com.hongan.oa.service.inf;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;

import com.hongan.oa.bean.system.Menu;
import com.hongan.oa.bean.system.RoleMenu;

public interface IMenuService {

	List<Menu> getMenuList();

	List<RoleMenu> getRoleMenuByMenuId(Long menuId);

	List<Menu> loadMenu(Collection<GrantedAuthority> authorities, Long menuPid);

}
