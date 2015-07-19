<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<div style="font-size: 13px; text-aligh: center; padding-left: 10px; padding-top: 10px;">
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
		解决办法：<br /> &nbsp;&nbsp;1、联系系统管理员处理;<br /> &nbsp;&nbsp;2、<a href="javascript:history.go(-1);" onclick="clearSession()" style="cursor: pointer; font-size: 13px;" class="dbView">返回</a>;
	</div>
</div>

