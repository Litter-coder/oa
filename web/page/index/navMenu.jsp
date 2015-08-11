<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<!-- 顶部菜单 -->
<script type="text/javascript">
	if ($.fn.switchEnv) $("#switchEnvBox").switchEnv();	
	if ($.fn.navMenu) $("#navMenu").navMenu();
	$("#navMenu").find("li.selected>a").trigger("click");
</script>
<ul>
	<c:forEach items="${menus}" var="menu" varStatus="index">
		<li <c:if test="${index.index == 0}">class="selected"</c:if>>
			<a href="${oa}/index/menu.do"> 
				<span>${menu.title}</span> 
				<input type="hidden" name="menuPid" value="${menu.menuId}" />
			</a>
		</li>
	</c:forEach>
</ul>
