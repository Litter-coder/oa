<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<c:choose>
	<c:when test="${empty menuPid}">
		<ul>
			<c:forEach items="${menus}" var="menu" varStatus="index">
				<li <c:if test="${index.index == 0}">class="selected"</c:if>><a href="index/loadMenu.do?menuPid=${menu.menuId}"   target="sidebar"><span>${menu.title}</span></a></li>
			</c:forEach>
		</ul>
	</c:when>
	<c:otherwise>
		<c:forEach items="${menus}" var="secondMenu" varStatus="index">
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
							<c:if test="${thirdMenu.subMenus != null and fn:length(thirdMenu.subMenus) != 0}">
								<ul>
									<c:forEach items="${thirdMenu.subMenus}" var="fourthMenu">
										<li><a href="${fourthMenu.menuUrl}" target="navTab" rel="${fourthMenu.menuUrl}">${fourthMenu.title}</a></li>
									</c:forEach>
								</ul>
							</c:if>
						</li>
					</c:forEach>
				</ul>
			</div>
		</c:forEach>
	</c:otherwise>
</c:choose>
