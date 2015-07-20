<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%> 
<c:set var="oa" value="${pageContext.request.contextPath}" />
<c:set var="loginUserName" value="${session.SPRING_SECURITY_CONTEXT.authentication.principal.username}" />

<script type="text/javascript">
	var oa = "${oa}";
	var loginUserName = "${loginUserName}";
</script>

