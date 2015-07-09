package com.hongan.oa.datasource;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;

public class PasswordDESedeUtil {
	private static final String Algorithm = "DESede"; // 定义加密算法,可用
														// DES,DESede,Blowfish
	private static final byte[] keyBytes = "abcdefghijklmnopqrstuvwx".getBytes(); // 24字节的密钥

	/**
	 * keybyte为加密密钥，长度为24字节 src为被加密的数据缓冲区（源）
	 * 
	 * @param keybyte
	 * @param src
	 * @return
	 */
	public static byte[] encryptMode(byte[] src) {
		try {
			// 生成密钥
			SecretKey deskey = new SecretKeySpec(keyBytes, Algorithm);
			// 加密
			Cipher c1 = Cipher.getInstance(Algorithm);
			c1.init(Cipher.ENCRYPT_MODE, deskey);
			return c1.doFinal(src);// 在单一方面的加密或解密
		} catch (java.security.NoSuchAlgorithmException e1) {
			e1.printStackTrace();
		} catch (javax.crypto.NoSuchPaddingException e2) {
			e2.printStackTrace();
		} catch (java.lang.Exception e3) {
			e3.printStackTrace();
		}
		return null;
	}

	/**
	 * keybyte为加密密钥，长度为24字节 src为加密后的缓冲区
	 * 
	 * @param src
	 * @return
	 */
	public static byte[] decryptMode(byte[] src) {
		try {
			// 生成密钥
			SecretKey deskey = new SecretKeySpec(keyBytes, Algorithm);
			// 解密
			Cipher c1 = Cipher.getInstance(Algorithm);
			c1.init(Cipher.DECRYPT_MODE, deskey);
			return c1.doFinal(src);
		} catch (java.security.NoSuchAlgorithmException e1) {
			// TODO: handle exception
			e1.printStackTrace();
		} catch (javax.crypto.NoSuchPaddingException e2) {
			e2.printStackTrace();
		} catch (java.lang.Exception e3) {
			e3.printStackTrace();
		}
		return null;
	}

	// 转换成十六进制字符串
	public static String byte2Hex(byte[] b) {
		String hs = "";
		String stmp = "";
		for (int n = 0; n < b.length; n++) {
			stmp = (java.lang.Integer.toHexString(b[n] & 0XFF));
			if (stmp.length() == 1) {
				hs = hs + "0" + stmp;
			} else {
				hs = hs + stmp;
			}
			if (n < b.length - 1)
				hs = hs + "";
		}
		return hs.toUpperCase();
	}

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		// 添加新安全算法,如果用JCE就要把它添加进去
		// Security.addProvider(new com.sun.crypto.provider.SunJCE());
		String szSrc = "";
		String deSrc = "";
		boolean flag = false;// 为false表示16进制,true为Base64
		
		if(args.length<2){
			szSrc = args[0];
			if (szSrc != null && !"".equals(szSrc)) {
				System.out.println("加密前的字符串:" + szSrc);
				byte[] encoded = encryptMode(szSrc.getBytes());
				String string = Hex.encodeHexString(encoded).toUpperCase();
				System.out.println("加密后的字符串(16进制):" + string);
				String base64String = Base64.encodeBase64String(encoded);
				System.out.println("加密后的字符串(Base64):" + base64String);
			}
		}else if(args.length>=2){
			deSrc = args[0];
			flag = args[1].equals("true");
			if (deSrc != null && !"".equals(deSrc)) {
				System.out.println("解密前的字符串"+ (flag?"(Base64)":"(16进制)")+":" + deSrc);
				if (flag) {// Base64
					byte[] bs = Base64.decodeBase64(deSrc);
					byte[] srcBytes = decryptMode(bs);
					System.out.println("解密后的字符串(Base64):" + (new String(srcBytes)));
				} else {
					byte[] decodeHex = Hex.decodeHex(deSrc.toCharArray());
					byte[] srcBytes = decryptMode(decodeHex);
					System.out.println("解密后的字符串(16进制):" + (new String(srcBytes)));
				}
			}
		}
	}
}
