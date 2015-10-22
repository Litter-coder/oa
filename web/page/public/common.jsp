<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<c:set var="oa" value="${pageContext.request.contextPath}" />
<c:set var="loginUsername" value="${loginUsername}" scope="page"/>
<c:set var="userInfoName" value="${loginUserInfo.name}" scope="page"/>
<c:set var="userInfoSex" value="${loginUserInfo.sex}" scope="page"/>
<c:set var="userInfoImg" value="${loginUserInfo.image}" scope="page"/>

<script type="text/javascript">
	var webName = "${oa}";
	
	var loginUserInfo = {
		loginUsername : "${loginUsername}",
		name : "${userInfoName}",
		sex : parseInt("${userInfoSex}"),
		image : "${userInfoImg}" || (parseInt("${userInfoSex}") == 0 ? webName + "/images/index/woman-img.png" : webName + "/images/index/man-img.png")
	}
</script>

