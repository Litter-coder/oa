<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>退出系统</title>
</head>
<body style="text-align: center;">
	<div style="margin: 100px auto; width: 200px; heigth: 120px; text-align: center;">
		<h1 style="font-size: 110%">已退出系统</h1>
		<span id=jump>5</span><font style="font-size: 100%">秒钟后</font><a href="${ctx}" style="font-size: 100%">返回登录页面</a>
	</div>
</body>
</html>
<script>
	function countDown(secs) {
		jump.innerText = secs;
		if (--secs > 0)
			setTimeout("countDown(" + secs + " )", 1000);
	}
	countDown(3);
</script>
