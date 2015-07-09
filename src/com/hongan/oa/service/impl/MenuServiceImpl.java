package com.hongan.oa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hongan.oa.mapper.system.MenuMapper;
import com.hongan.oa.service.inf.IMenuService;

@Service("menuServiceImpl")
public class MenuServiceImpl implements IMenuService {

	@Autowired
	private MenuMapper menuMapper;

}
