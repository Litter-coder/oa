package com.hongan.oa.bean.system;

import java.util.Date;

import org.apache.ibatis.type.Alias;

/**
 * 
 * 角色
 * 
 * @author dinghuan
 *
 */
@Alias("role")
public class Role {
	private Long roleId;
	private String roleName;
	private String creator;
	private Date updateTime;
	private String description;

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
