<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ include file="/page/public/common.jsp" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>头部</title>
	
	<link href="${oa}/css/remake/style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="${oa}/js/jquery-1.7.2.js"></script>
	
<script type="text/javascript">
function clearSession(){
// 	$.ajax({
// 		url:"${svn}/FilingInfo/ClearSession.do",
// 		type: "post",
// 		dataType:"json",
// 		data:{"clearSession":true},
// 		success:function(msg){
// 		}
// 	});
	
}

</script>
</head>
<body>
	<div
		style="font-size: 13px; text-aligh: center; padding-left: 100px; padding-top: 100px;">
		<div>系统执行发生错误，信息描述如下：</div>
		<div>错误状态代码是：${pageContext.errorData.statusCode}</div>
		<div>错误发生页面是：${pageContext.errorData.requestURI}</div>
		<div>
<%-- 			错误信息： ${pageContext.exception.class } --%>
<%-- 			<c:if test="${pageContext.exception.class=='class org.springframework.web.multipart.MaxUploadSizeExceededException'}">文件大小超过限制</c:if> --%>
<%-- 			<c:if test="${pageContext.exception.class=='class java.lang.NumberFormatException'}">数据转换异常,请联系系统管理员</c:if> --%>
<%-- 			<c:if test="${pageContext.exception.class=='class java.lang.NullPointerException'}">空指针异常,请联系系统管理员</c:if> --%>
		</div>
		<div>
			解决办法：<br /> &nbsp;&nbsp;1、联系系统管理员处理;<br /> &nbsp;&nbsp;2、<a
				href="javascript:history.go(-1);" onclick="clearSession()"
				style="cursor: pointer; font-size: 13px;" class="dbView">返回</a>;
		</div>
	</div>
</body>
</html>

