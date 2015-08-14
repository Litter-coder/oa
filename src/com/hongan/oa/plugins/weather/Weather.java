package com.hongan.oa.plugins.weather;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.apache.commons.lang3.StringUtils;

public class Weather {

	public static String getWeather(DefaultsConst options) {
		BufferedReader reader = null;
		StringBuffer sbf = new StringBuffer();
		String result = null;
		try {
			String urlStr = initUrl(options);
			if (urlStr == null)
				return result;
			URL url = new URL(urlStr);

			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod(options.getType().toUpperCase());
			// 填入apikey到HTTP header
			connection.setRequestProperty("apikey", options.getApikey());
			connection.connect();
			InputStream is = connection.getInputStream();
			reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
			String strRead = null;
			while ((strRead = reader.readLine()) != null) {
				strRead = strRead.replaceAll("http://appimg.showapi.com", "");
				sbf.append(strRead);
				sbf.append("\r\n");
			}
			reader.close();
			result = sbf.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	private static String initUrl(DefaultsConst options) {
		String urlStr = null;
		// 优先ip
		if (options.getIp() == null && options.getIp().length() == 0) { // areaip访问
			urlStr = options.getUrl_area();
			if (StringUtils.isNoneBlank(options.getAreaid())) {// 只要有一个就行
				urlStr += ("?areaid=" + options.getAreaid());
			} else {
				return null;
			}
		} else {// ip访问
			urlStr = options.getUrl_ip();
			urlStr += ("?ip=" + options.getIp());
		}
		urlStr += ("&needMoreDay=" + options.getNeedMoreDay() + "&needIndex=" + options.getNeedIndex());
		return urlStr;
	}

	public static void main(String[] args) {
	}

}