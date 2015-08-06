<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<script type="text/javascript">
	$("#themeList").theme({
		themeBase : "${oa}/dwz/themes"
	});
	$(document).click(function(e) {
		var target = e.target;
		var $navContent = $(".nav-content")
		console.log(target)
		if(!$(target).is("div.nav-item") && $(target).parents("div.nav-item").length <= 0 && $(target).parents("div.nav-content").length <= 0){
			$(".nav-item.selected").removeClass("selected");
			$navContent.hide();
		}
	});
	$(".nav-item").each(function(){
		$(this).click(function() {
			$(".nav-item.selected").removeClass("selected");
			$(".nav-content").hide();
			$(this).addClass("selected");
			$(this).next().show();
		});
	});
	
</script>

<ul class="infoNav">
	<li class="navin">
		<!-- 个人信息 -->
		<div class="nav-item" align="center">
			<div class="avtar-man"></div>
		</div>
		<div class="nav-content avtar-content"></div>
	</li>
	<li class="navin">
		<!-- 消息提示 -->
		<div class="nav-item" align="center">
			<div class="msg"></div>
		</div>
		<div class="nav-content msg-content"></div>
	</li>
	<li class="navin">
		<!-- 系统管理 -->
		<div class="nav-item" align="center">
			<div class="manage"></div>
		</div>
		<div class="nav-content manage-content"></div>
	</li>
	<li class="navin">
		<!-- 主题切换 -->
		<div class="nav-item" align="center">
			<div class="theme"></div>
		</div>
		<div class="nav-content theme-content" id="theme-content">
			<ul class="themeList" id="themeList">
				<li theme="default"><div class="selected">蓝色</div></li>
				<li theme="green"><div>绿色</div></li>
				<li theme="purple"><div>紫色</div></li>
				<li theme="silver"><div>银色</div></li>
				<li theme="azure"><div>天蓝</div></li>
			</ul>
		</div>
	</li>
</ul>