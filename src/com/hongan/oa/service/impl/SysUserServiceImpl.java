package com.hongan.oa.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hongan.oa.bean.system.SysUser;
import com.hongan.oa.bean.system.SysUserAttempts;
import com.hongan.oa.bean.system.SysUserRole;
import com.hongan.oa.bean.system.User;
import com.hongan.oa.mapper.system.RoleMapper;
import com.hongan.oa.mapper.system.SysUserMapper;
import com.hongan.oa.service.inf.ISysUserService;

@Service("sysUserServiceImpl")
public class SysUserServiceImpl implements ISysUserService {

	@Autowired
	private SysUserMapper sysUserMapper;

	@Autowired
	private RoleMapper roleMapper;

	@Override
	public void resetFailAttempts(String username) {
		sysUserMapper.resetFailAttempts(username);
	}

	@Override
	public void updateFailAttempts(SysUserAttempts userAttempts) {
		sysUserMapper.updateFailAttempts(userAttempts);

	}

	@Override
	public SysUserAttempts getSysUserAttempts(String username) {
		// TODO Auto-generated method stub
		return sysUserMapper.getFailAttemptsByUsername(username);
	}

	@Override
	public SysUser getSysUserByUsername(String username) {
		// TODO Auto-generated method stub
		return sysUserMapper.getSysUserByUsername(username);
	}

	@Override
	public void saveFailAttempts(SysUserAttempts userAttempts) {
		sysUserMapper.saveFailAttempts(userAttempts);
	}

	@Override
	public void updateSysUser(SysUser user) {
		sysUserMapper.updateSysUser(user);
	}

	@Override
	public List<SysUserRole> getSysUserRolesByUserId(Long userId) {
		return roleMapper.getSysUserRolesByUserId(userId);
	}

	@Override
	public void updateSysUserLoginStatus(int loginStatus, Long userId) {
		sysUserMapper.updateSysUserLoginStatus(loginStatus, userId);
	}

	@Override
	public User getUserById(Long id) {
		return sysUserMapper.getUserById(id);
	}

}
