package com.hongan.oa.service.inf;

import java.util.List;

import com.hongan.oa.bean.system.SysUser;
import com.hongan.oa.bean.system.SysUserAttempts;
import com.hongan.oa.bean.system.SysUserRole;

public interface ISysUserService {

	void resetFailAttempts(String username);

	void updateFailAttempts(SysUserAttempts userAttempts);

	SysUserAttempts getSysUserAttempts(String username);

	SysUser getSysUserByUsername(String username);

	void saveFailAttempts(SysUserAttempts userAttempts);

	void updateSysUser(SysUser user);

	List<SysUserRole> getSysUserRolesByUserId(Long userId);

}
