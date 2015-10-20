<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>会话失效</title>
</head>
<script>
	alert('会话过期，请重新登录');
	top.location.href= "${oa}/login.jsp";
</script>
</html>
