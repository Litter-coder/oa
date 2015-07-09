package com.hongan.oa.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ReadProperties {
	private static Properties pro = new Properties();
	private static InputStream is = null;
	static {
		is = ReadProperties.class.getClassLoader().getResourceAsStream("data.properties");
		try {
			pro.load(is);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (is != null) {
					is.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	public static String readProValue(String properties) {
		return pro.getProperty(properties);
	}
}
