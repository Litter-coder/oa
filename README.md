# oa
oa项目开发  
springmvc+spring security+mybatis OA项目开发  

---  
__v1.0.0.4__  

	1. spring security权限验证使用投票器设计，该功能其实没有必要(必要性可能待后期测试)，加上去学习一下   
	2. 整合dwzUI框架，主页搭建以及设计



__v1.0.0.3__   

	1. 优化token与验证码验证时的参数传递，改为对象的传递方式  
	2. session失效或者用户其他位置登录导致前一次登录失效时跳转至LoginController中的sessionTimeout.do请求，  
	尚未配置ajax的跳转  
	3. 加入获取所有登录用户的方法



__v1.0.0.2__  

	1. 重构登录验证的spring security扩展类，使其符合spring security的设计方式  
	2. 对登录密码校验问题使用随机token方式进行服务端后台校验，增强登录安全：  
			页面登录时，会先请求服务端生成一个随机的md5的token并存储在session中，且设置有效期为1分钟，  
		前台对输入密码进行md5，并将token与散列后的密码拼接，再进行md5散列后传入后台，后台再根据配置的加密盐再次md5一次；  
		后台对数据库查询出的用户密码（数据库存储的密码已md5）， 获取session中的token，以同样方式散列密码，最后与传入的  
		数据进行匹配比较。


__v1.0.0.1__  

	1. 更改kaptcha版本为2.3.2的非官方版本，请自行maven导入本地maven库中
		mvn install:install-file -DgroupId=com.google.code.kaptcha   
		-DartifactId=kaptcha  -Dversion=2.3.2 -Dfile=%userpath%\kaptcha-2.3.2.jar    
		-Dpackaging=jar -DgeneratePom=true
	2. 验证码加入时间失效配置
	
	
__v1.0.0.0__  

	1. springmvc+mybatis整合配置，datasource配置，spring security验证配置  
	2. 登录模块加入spring security验证  
	3. UI框架选择DWZ-UI框架  

