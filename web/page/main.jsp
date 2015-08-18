<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>OA系统</title>

<link href="${oa}/dwz/themes/default/style.css" rel="stylesheet" type="text/css" media="screen"/>
<link href="${oa}/dwz/themes/css/core.css" rel="stylesheet" type="text/css" media="screen"/>
<link href="${oa}/dwz/themes/css/print.css" rel="stylesheet" type="text/css" media="print"/>
<link href="${oa}/dwz/uploadify/css/uploadify.css" rel="stylesheet" type="text/css" media="screen"/>

<%-- <link href="${oa}/dwz_local/css/core.css" rel="stylesheet" type="text/css" media="screen"/> --%>
<!--[if IE]>
<link href="dwz/themes/css/ieHack.css" rel="stylesheet" type="text/css" media="screen"/>
<![endif]-->
<style type="text/css">
	#header{height:50px}
	#leftside, #container, #splitBar, #splitBarProxy{top:51px}
	
	#header #headMenu{position: absolute;top: 0px;right: 10px;height: 50px;}
</style>

<!--[if lte IE 9]>
<script src="dwz/js/speedup.js" type="text/javascript"></script>
<![endif]-->
<script src="${oa}/dwz/js/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="${oa}/dwz/js/jquery.cookie.js" type="text/javascript"></script>
<script src="${oa}/dwz/js/jquery.validate.js" type="text/javascript"></script>
<script src="${oa}/dwz/js/jquery.bgiframe.js" type="text/javascript"></script>
<script src="${oa}/dwz/xheditor/xheditor-1.2.1.min.js" type="text/javascript"></script>
<script src="${oa}/dwz/xheditor/xheditor_lang/zh-cn.js" type="text/javascript"></script>
<script src="${oa}/dwz/uploadify/scripts/jquery.uploadify.min.js" type="text/javascript"></script>

<script src="${oa}/dwz/bin/dwz.min.js" type="text/javascript"></script>
<script src="${oa}/dwz/js/dwz.regional.zh.js" type="text/javascript"></script>
<script src="${oa}/dwz_local/js/dwz.core.local.js" type="text/javascript"></script>
<script src="${oa}/dwz_local/js/dwz.navtab.local.js" type="text/javascript"></script>

<script src="${oa}/dwz_local/js/dwz.barDrag.local.js" type="text/javascript"></script>
<script src="${oa}/dwz_local/js/dwz.switchEnv.local.js" type="text/javascript"></script>
<script src="${oa}/dwz_local/js/dwz.ui.local.js" type="text/javascript"></script>

<script type="text/javascript">
$(function(){
	DWZ.init("${oa}/dwz.frag.xml", {
// 		loginUrl:"login_dialog.html", loginTitle:"登录",	// 弹出登录对话框
		loginUrl:"${oa}/login.jsp",	// 跳到登录页面
		statusCode:{ok:200, error:300, timeout:301}, //【可选】
		keys: {statusCode:"statusCode", message:"message"}, //【可选】
		pageInfo:{pageNum:"pageNum", numPerPage:"numPerPage", orderField:"orderField", orderDirection:"orderDirection"}, //【可选】
// 		ui:{hideMode:'offsets'},
		debug:false,	// 调试模式 【true|false】
		callback:function(){
			initEnv();
			$("#navMenu").find("li.selected>a").trigger("click");
			$("#headMenu").loadUrl("${oa}/index/commonMenu.do");
		}
	});
	
	
});
</script>
</head>

<body scroll="no">
	<div id="layout">
		<div id="header">
			<div class="headerNav">
				<a class="logo" href="javascript:void(0);">标志</a>
			</div>
			<div id="navMenu">
				<ul>
					<c:forEach items="${topMenus}" var="menu" varStatus="index">
						<li <c:if test="${index.index == 0}">class="selected"</c:if>>
							<a href="${oa}/index/menu.do"> 
								<span>${menu.title}</span> 
								<input type="hidden" name="menuPid" value="${menu.menuId}" />
							</a>
						</li>
					</c:forEach>
				</ul>
			</div>
			<div id="headMenu">
			</div>
		</div>
		<div id="leftside">
			<div id="sidebar_s">
				<div class="collapse">
					<div class="toggleCollapse"><div></div></div>
				</div>
			</div>
			<div id="sidebar">
				<div class="toggleCollapse"><h2>主菜单</h2><div>收缩</div></div>
				<div class="accordion" fillSpace="sidebar">
				</div>
			</div>
		</div>
		<div id="container">
			<div id="navTab" class="tabsPage">
				<div class="tabsPageHeader">
					<div class="tabsPageHeaderContent"><!-- 显示左右控制时添加 class="tabsPageHeaderMargin" -->
						<ul class="navTab-tab">
							<li tabid="main" class="main"><a href="javascript:;"><span><span class="home_icon">我的主页</span></span></a></li>
						</ul>
					</div>
					<div class="tabsLeft">left</div><!-- 禁用只需要添加一个样式 class="tabsLeft tabsLeftDisabled" -->
					<div class="tabsRight">right</div><!-- 禁用只需要添加一个样式 class="tabsRight tabsRightDisabled" -->
					<div class="tabsMore">more</div>
				</div>
				<ul class="tabsMoreList">
					<li><a href="javascript:;">我的主页</a></li>
				</ul>
				<div class="navTab-panel tabsPageContent layoutBox">
					<div class="page unitBox">
						<div class="accountInfo">
							<div class="alertInfo">
								<h2><a href="doc/dwz-user-guide.pdf" target="_blank">DWZ框架使用手册(PDF)</a></h2>
								<a href="doc/dwz-user-guide.swf" target="_blank">DWZ框架演示视频</a>
							</div>
							<div class="right">
								<p><a href="doc/dwz-user-guide.zip" target="_blank" style="line-height:19px">DWZ框架使用手册(CHM)</a></p>
								<p><a href="doc/dwz-ajax-develop.swf" target="_blank" style="line-height:19px">DWZ框架Ajax开发视频教材</a></p>
							</div>
						</div>
						<div class="pageFormContent" layoutH="80">
							<iframe width="100%" height="430" class="share_self"  frameborder="0" scrolling="no" src=""></iframe>
						</div>
					</div>
					
				</div>
			</div>
		</div>

	</div>

	<div id="footer">Copyright &copy; 2015 - 2016 <a href="javasrcipt:;">广州OA网络科技有限公司</a></div>

</body>
</html>