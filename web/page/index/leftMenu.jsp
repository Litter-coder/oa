<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<!-- 左菜单页面  -->
<div class="accordion" fillSpace="sidebar">
	<c:forEach items="${subMenus}" var="secondMenu" varStatus="index">
		<!-- 二级菜单 -->
		<div class="accordionHeader">
			<h2>
				<span>Folder</span>${secondMenu.title}
			</h2>
		</div>
		<div class="accordionContent">
			<ul class="tree treeFolder">
				<c:forEach items="${secondMenu.subMenus}" var="thirdMenu">
					<!-- 三级菜单 -->
					<li><a>${thirdMenu.title}</a>
						<ul>
							<c:forEach items="${thirdMenu.subMenus}" var="fourthMenu">
								<li><a href="${oa}${fourthMenu.menuUrl}" target="navTab" rel="${oa}${fourthMenu.menuUrl}">${fourthMenu.title}</a></li>
							</c:forEach>
						</ul></li>
				</c:forEach>
			</ul>
		</div>
	</c:forEach>
</div>
