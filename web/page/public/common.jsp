<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%> 
<c:set var="oa" value="${pageContext.request.contextPath}" />
<sec:authentication property="principal.username" var="loginName"/> 
<c:set var="loginUsername" value="${userName}"/>

<script type="text/javascript">
	var oa = "${oa}";
	var loginUsername = "${loginUsername}";
</script>

