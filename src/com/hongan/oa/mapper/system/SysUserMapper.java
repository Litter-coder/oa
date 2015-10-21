package com.hongan.oa.mapper.system;

import org.apache.ibatis.annotations.Param;

import com.hongan.oa.bean.system.SysUser;
import com.hongan.oa.bean.system.SysUserAttempts;
import com.hongan.oa.bean.system.UserInfo;

public interface SysUserMapper {

	SysUser getSysUserByUsername(@Param(value = "username") String username);

	void resetFailAttempts(@Param(value = "username") String username);

	void saveFailAttempts(@Param(value = "userAttempts") SysUserAttempts userAttempts);

	void updateSysUser(@Param(value = "user") SysUser user);

	void updateSysUserLoginStatus(@Param(value = "loginStatus") int loginStatus, @Param(value = "userId") Long userId);

	SysUserAttempts getFailAttemptsByUsername(@Param(value = "username") String username);

	void updateFailAttempts(@Param(value = "userAttempts") SysUserAttempts userAttempts);

	UserInfo getUserInfoById(@Param(value = "id") Long id);

}
