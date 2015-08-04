package com.hongan.oa.bean;

import java.util.HashMap;
import java.util.Map;

/**
 * 用于请求执行结果返回的对象类
 * 
 * @author dinghuan
 *
 */
public class ExecuteResult {

	public Map<String, Object> jsonReturn(int statusCode) {
		Map<String, Object> jsonObj = new HashMap<String, Object>();
		if (statusCode == 200) {
			jsonObj.put("statusCode", "200");
			jsonObj.put("message", "操作成功");
		} else if (statusCode == 300) {
			jsonObj.put("statusCode", "300");
			jsonObj.put("message", "操作失败，请重试");
		} else if (statusCode == 301) {
			jsonObj.put("statusCode", "301");
			jsonObj.put("message", "登录已失效，请重新登录");
		}
		jsonObj.put("closeCurrent", true);
		return jsonObj;
	}

	public Map<String, Object> jsonReturn(int statusCode, boolean closeCurrent) {
		Map<String, Object> jsonObj = new HashMap<String, Object>();
		if (statusCode == 200) {
			jsonObj.put("statusCode", "200");
			jsonObj.put("message", "操作成功");
		} else if (statusCode == 300) {
			jsonObj.put("statusCode", "300");
			jsonObj.put("message", "操作失败，请重试");
		} else if (statusCode == 301) {
			jsonObj.put("statusCode", "301");
			jsonObj.put("message", "登录已失效，请重新登录");
		}
		jsonObj.put("closeCurrent", closeCurrent);
		return jsonObj;
	}

	public Map<String, Object> jsonReturn(int statusCode, String msg) {
		Map<String, Object> jsonObj = new HashMap<String, Object>();
		if (statusCode == 200) {
			jsonObj.put("statusCode", "200");
			jsonObj.put("message", "操作成功 " + msg);
		} else if (statusCode == 300) {
			jsonObj.put("statusCode", "300");
			jsonObj.put("message", "操作失败:" + msg);
		} else if (statusCode == 301) {
			jsonObj.put("statusCode", "301");
			jsonObj.put("message", "登录已失效，请重新登录");
		}
		jsonObj.put("closeCurrent", true);
		return jsonObj;
	}

	public Map<String, Object> jsonReturn(int statusCode, String msg, boolean closeCurrent) {
		Map<String, Object> jsonObj = new HashMap<String, Object>();
		if (statusCode == 200) {
			jsonObj.put("statusCode", "200");
			jsonObj.put("message", "操作成功 " + msg);
		} else if (statusCode == 300) {
			jsonObj.put("statusCode", "300");
			jsonObj.put("message", "操作失败:" + msg);
		} else if (statusCode == 301) {
			jsonObj.put("statusCode", "301");
			jsonObj.put("message", "登录已失效，请重新登录");
		}
		jsonObj.put("closeCurrent", closeCurrent);
		return jsonObj;
	}

}
