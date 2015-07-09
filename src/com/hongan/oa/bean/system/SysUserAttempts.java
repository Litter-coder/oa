package com.hongan.oa.bean.system;

import java.util.Date;

import org.apache.ibatis.type.Alias;

/**
 * 用户登录错误记录
 * 
 * @author dinghuan
 *
 */
@Alias("sysUserAttempts")
public class SysUserAttempts {
	private String username;
	private int attempts; // 错误次数
	private Date lastErrorTime;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getAttempts() {
		return attempts;
	}

	public void setAttempts(int attempts) {
		this.attempts = attempts;
	}

	public Date getLastErrorTime() {
		return lastErrorTime;
	}

	public void setLastErrorTime(Date lastErrorTime) {
		this.lastErrorTime = lastErrorTime;
	}

}
