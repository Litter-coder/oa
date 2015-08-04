package com.hongan.oa.bean.system;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.type.Alias;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * 登录用户
 * 
 * @author dinghuan
 *
 */
@Alias("sysUser")
public class SysUser implements UserDetails {
	private static final long serialVersionUID = 3224738742051836675L;
	private Long userId;
	private String username;
	private String password;
	private Date entryTime; // 入职时间
	private boolean enabled;
	private boolean accountNonLocked;
	private boolean initialPsd;
	private int loginStatus;// 登录状态:0-web离开；1-web在线；2-web忙碌;3-手机在线

	private List<GrantedAuthority> authorities;
	private SysOrganization organization;

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Date getEntryTime() {
		return entryTime;
	}

	public void setEntryTime(Date entryTime) {
		this.entryTime = entryTime;
	}

	public SysOrganization getOrganization() {
		return organization;
	}

	public void setOrganization(SysOrganization organization) {
		this.organization = organization;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public void setAccountNonLocked(boolean accountNonLocked) {
		this.accountNonLocked = accountNonLocked;
	}

	public void setAuthorities(List<GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	public boolean isInitialPsd() {
		return initialPsd;
	}

	public void setInitialPsd(boolean initialPsd) {
		this.initialPsd = initialPsd;
	}

	public int getLoginStatus() {
		return loginStatus;
	}

	public void setLoginStatus(int loginStatus) {
		this.loginStatus = loginStatus;
	}

	@Override
	public Collection<GrantedAuthority> getAuthorities() {
		return this.authorities;
	}

	@Override
	public String getPassword() {
		return this.password;
	}

	@Override
	public String getUsername() {
		return this.username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return this.accountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return this.enabled;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((userId == null) ? 0 : userId.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
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
		SysUser other = (SysUser) obj;
		if (userId == null) {
			if (other.userId != null)
				return false;
		} else if (!userId.equals(other.userId))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

}
