package com.hongan.oa.service.inf;

import com.hongan.oa.bean.system.SysUser;
import com.hongan.oa.bean.system.SysUserAttempts;

public interface ISysUserService {

	void resetFailAttempts(String username);

	void updateFailAttempts(SysUserAttempts userAttempts);

	SysUserAttempts getSysUserAttempts(String username);

	SysUser getSysUserByUsername(String username);

	void saveFailAttempts(SysUserAttempts userAttempts);

	void updateSysUser(SysUser user);

}
