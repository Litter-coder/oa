package com.hongan.oa.security.access;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.util.UrlMatcher;

import com.hongan.oa.bean.system.Menu;
import com.hongan.oa.bean.system.RoleMenu;
import com.hongan.oa.service.inf.IMenuService;

/**
 * 权限资源加载和提供，用于验证权限角色
 * 
 * @author dinghuan
 *
 */
public class MyInvocationSecurityMetadataSource implements FilterInvocationSecurityMetadataSource {
	public static Logger logger = LoggerFactory.getLogger(MyInvocationSecurityMetadataSource.class);

	private static Map<String, Collection<ConfigAttribute>> resourceMap = null;

	private UrlMatcher urlMatcher;

	@Autowired
	private IMenuService menuService;

	public MyInvocationSecurityMetadataSource() {
		super();
	}

	public void setUrlMatcher(UrlMatcher urlMatcher) {
		this.urlMatcher = urlMatcher;
	}

	/**
	 * 加载所有的权限资源,只记录非顶级菜单
	 */
	public void loadMenuSource() {
		if (resourceMap == null) {
			resourceMap = new ConcurrentHashMap<String, Collection<ConfigAttribute>>();
		}

		List<Menu> menuList = menuService.getMenuList();
		if (menuList != null && !menuList.isEmpty()) {
			for (Menu menu : menuList) {
				if (menu.getMenuUrl() != null && !"".equals(menu.getMenuUrl())) {
					List<RoleMenu> roleMenuList = menuService.getRoleMenuByMenuId(menu.getMenuId());
					List<ConfigAttribute> configList = new ArrayList<ConfigAttribute>();

					if (roleMenuList != null && !roleMenuList.isEmpty()) {
						for (RoleMenu roleMenu : roleMenuList) {
							SecurityConfig config = new SecurityConfig(roleMenu.getRoleId() + "");
							if (!configList.contains(config)) {
								configList.add(config);
							}
						}
					}
					resourceMap.put(menu.getMenuUrl(), configList);
				}
			}
		}
	}

	/**
	 * According to a URL, Find out permission configuration of this URL.
	 */
	@Override
	public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {
		// guess object is a URL.
		String url = ((FilterInvocation) object).getRequestUrl();
		System.out.println("url:" + url);
		url = url.split("\\?")[0];
		Iterator<String> ite = resourceMap.keySet().iterator();
		while (ite.hasNext()) {
			String resURL = ite.next();
			if (urlMatcher.pathMatchesUrl(url, resURL)) {
				Collection<ConfigAttribute> returnCollection = resourceMap.get(resURL);
				return returnCollection;
			}
		}
		return new ArrayList<ConfigAttribute>();
	}

	@Override
	public boolean supports(Class<?> clazz) {
		return true;

	}

	@Override
	public Collection<ConfigAttribute> getAllConfigAttributes() {
		Set<ConfigAttribute> allAttributes = new HashSet<ConfigAttribute>();
		for (Map.Entry<String, Collection<ConfigAttribute>> entry : resourceMap.entrySet()) {

			for (ConfigAttribute attrs : entry.getValue()) {
				allAttributes.add(attrs);
			}
		}
		return allAttributes;
	}
}
