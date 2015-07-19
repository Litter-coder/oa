package com.hongan.oa.bean.system;

import java.util.List;

import org.apache.ibatis.type.Alias;

/**
 * 菜单对象<br/>
 * 
 * 重写hashcode和equals方法，当menuId相等时，为同一对象
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

	private List<Menu> subMenus;

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

	public List<Menu> getSubMenus() {
		return subMenus;
	}

	public void setSubMenus(List<Menu> subMenus) {
		this.subMenus = subMenus;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((menuId == null) ? 0 : menuId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Menu other = (Menu) obj;
		if (menuId == null) {
			if (other.menuId != null)
				return false;
		} else if (!menuId.equals(other.menuId))
			return false;
		return true;
	}

}
