package com.hongan.oa.datasource;

import org.apache.commons.codec.binary.Hex;
import org.apache.commons.dbcp.BasicDataSource;

public class MyDataSource extends BasicDataSource {

	@Override
	public void setPassword(String password) {
		try {
			byte[] decodeHex = Hex.decodeHex(password.toCharArray());
			
			byte[] resultBytes = PasswordDESedeUtil.decryptMode(decodeHex);
			this.password = new String(resultBytes);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
