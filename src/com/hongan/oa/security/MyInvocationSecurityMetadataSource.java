package com.hongan.oa.security;

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
import org.springframework.security.web.util.AntUrlPathMatcher;
import org.springframework.security.web.util.UrlMatcher;

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

	private UrlMatcher urlMatcher = new AntUrlPathMatcher();
	
	@Autowired
	private IMenuService menuService;

	public void loadMenuSource() {
		if(resourceMap == null){
			resourceMap = new ConcurrentHashMap<String, Collection<ConfigAttribute>>();
		}
		
		SecurityConfig config = new SecurityConfig("1");
		List<ConfigAttribute> configList = new ArrayList<ConfigAttribute>();
		configList.add(config);
		resourceMap.put("/test.do", configList);
		
	}

	// According to a URL, Find out permission configuration of this URL.

	public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {

		if (logger.isDebugEnabled()) {

			logger.debug("getAttributes(Object) - start"); //$NON-NLS-1$  

		}

		// guess object is a URL.

		String url = ((FilterInvocation) object).getRequestUrl();

		Iterator<String> ite = resourceMap.keySet().iterator();

		while (ite.hasNext()) {

			String resURL = ite.next();

			if (urlMatcher.pathMatchesUrl(url, resURL)) {

				Collection<ConfigAttribute> returnCollection = resourceMap.get(resURL);

				if (logger.isDebugEnabled()) {

					logger.debug("getAttributes(Object) - end"); //$NON-NLS-1$  

				}

				return returnCollection;

			}

		}

		if (logger.isDebugEnabled()) {

			logger.debug("getAttributes(Object) - end"); //$NON-NLS-1$  

		}

		return null;

	}

	public boolean supports(Class<?> clazz) {
		return true;

	}

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
