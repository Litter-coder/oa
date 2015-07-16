package com.hongan.oa.bean.system;

import org.apache.ibatis.type.Alias;

/**
 * 菜单
 * 
 * @author dinghuan
 *
 */
@Alias("menu")
public class Menu {
	private Long menuId;
	private String title;
	private String menuUrl;
	private int menuType;// 菜单类型：1--顶级菜单，无url；2--菜单列表功能链接；3--操作功能（增删改）
	private Long pId;
	private String icon;
	private boolean enabled;

	public Long getMenuId() {
		return menuId;
	}

	public void setMenuId(Long menuId) {
		this.menuId = menuId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMenuUrl() {
		return menuUrl;
	}

	public void setMenuUrl(String menuUrl) {
		this.menuUrl = menuUrl;
	}

	public int getMenuType() {
		return menuType;
	}

	public void setMenuType(int menuType) {
		this.menuType = menuType;
	}

	public Long getpId() {
		return pId;
	}

	public void setpId(Long pId) {
		this.pId = pId;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

}
