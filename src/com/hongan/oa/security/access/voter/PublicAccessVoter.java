package com.hongan.oa.security.access.voter;

import java.util.Collection;
import java.util.List;

import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.util.UrlMatcher;

public class PublicAccessVoter implements AccessDecisionVoter {

	private List<String> publicAccessUrls;

	private UrlMatcher urlMatcher;

	public void setPublicAccessUrls(List<String> publicAccessUrls) {
		this.publicAccessUrls = publicAccessUrls;
	}

	public PublicAccessVoter() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PublicAccessVoter(List<String> publicAccessUrls, UrlMatcher urlMatcher) {
		super();
		this.publicAccessUrls = publicAccessUrls;
		this.urlMatcher = urlMatcher;
	}

	@Override
	public boolean supports(ConfigAttribute attribute) {
		return true;
	}

	@Override
	public boolean supports(Class<?> clazz) {
		return true;
	}

	@Override
	public int vote(Authentication authentication, Object object, Collection<ConfigAttribute> attributes) {
		String reqUrl = ((FilterInvocation) object).getRequestUrl();
		if (publicAccessUrls != null) {
			for (String url : publicAccessUrls) {
				if (urlMatcher.pathMatchesUrl(url, reqUrl)) {
					return ACCESS_GRANTED;
				}
			}
		}
		return ACCESS_DENIED;

	}
}
