<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<c:set var="oa" value="${pageContext.request.contextPath}" />
<c:set var="loginUsername" value="${loginUser.username}" />
<c:set var="userInfoName" value="${loginUser.userInfo.name}" />
<c:set var="userInfoSex" value="${loginUser.userInfo.sex}" />
<c:set var="userInfoImg" value="${loginUser.userInfo.image}" />

<script type="text/javascript">
	var oa = "${oa}";

	var userInfo = {
		loginUsername : "${loginUsername}",
		name : "${userInfoName}",
		sex : parseInt("${userInfoSex}"),
		image : "${userInfoImg}" || (parseInt("${userInfoSex}") == 0 ? oa + "/images/index/woman-img.png" : oa + "/images/index/man-img.png")
	}
</script>

