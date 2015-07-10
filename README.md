# oa
oa项目开发  
springmvc+spring security+mybatis OA项目开发  

---
__v1.0.0.1__  

	1. 更改kaptcha版本为2.3.2的非官方版本，请自行maven导入本地maven库中
		>mvn install:install-file -DgroupId=com.google.code.kaptcha -DartifactId=kaptcha 		-Dversion=2.3.2 -Dfile=%userpath%\kaptcha-2.3.2.jar -Dpackaging=jar -DgeneratePom=true
	2. 验证码加入时间失效配置
	
	
__v1.0.0.0__  

	1. springmvc+mybatis整合配置，datasource配置，spring security验证配置  
	2. 登录模块加入spring security验证  
	3. UI框架选择DWZ-UI框架  

