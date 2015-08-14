package com.hongan.oa.plugins.weather;

public class DefaultsConst {
	private static final String url_area = "http://apis.baidu.com/showapi_open_bus/weather_showapi/address";
	private static final String url_ip = "http://apis.baidu.com/showapi_open_bus/weather_showapi/ip2weather";
	private static final String type = "GET";
	private String apikey = "66a2b6ae2f20a5c7eacae8f32ab6c1aa";
	private String areaid = "101010100";
	private String ip;
	private int needMoreDay = 0;
	private int needIndex = 0;

	public DefaultsConst(DefaultsConst object) {

		if (object.getApikey() != null && !"".endsWith(object.getApikey())) {
			this.apikey = object.getApikey();
		}

		this.areaid = object.getAreaid();

		this.ip = object.getIp();

		if (object.getNeedMoreDay() != 0) {
			this.needMoreDay = object.getNeedMoreDay();
		}

		if (object.getNeedIndex() != 0) {
			this.needIndex = object.getNeedIndex();
		}
	}

	public DefaultsConst() {
		super();
	}

	public String getUrl_area() {
		return url_area;
	}

	public String getUrl_ip() {
		return url_ip;
	}

	public String getType() {
		return type;
	}

	public String getApikey() {
		return apikey;
	}

	public void setApikey(String apikey) {
		this.apikey = apikey;
	}

	public String getAreaid() {
		return areaid;
	}

	public void setAreaid(String areaid) {
		this.areaid = areaid;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public int getNeedMoreDay() {
		return needMoreDay;
	}

	public void setNeedMoreDay(int needMoreDay) {
		this.needMoreDay = needMoreDay;
	}

	public int getNeedIndex() {
		return needIndex;
	}

	public void setNeedIndex(int needIndex) {
		this.needIndex = needIndex;
	}

}
