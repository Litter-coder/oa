<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<script type="text/javascript">
	var $p = $("ul.infoNav");
	$("#themeList", $p).theme({
		themeBase : "${oa}/dwz/themes"
	});
	$(document).click(function(e) {
		var target = e.target;
		var $navContent = $(".nav-content", $p)
		if ($(target).closest("div.nav-item").length <= 0 && $(target).closest("div.nav-content").length <= 0) {
			$(".nav-item.selected", $p).removeClass("selected");
			$navContent.hide();
		}
	});
	
	$(document).mouseover(function(e) {
		var target = e.target;
		var $avtar_content = $("div.avtar-content", $p);
		if ($(target).closest("div.nav-item").length <= 0 && $(target).closest("div.avtar-content").length <= 0) {
			$avtar_content.prev().removeClass("selected");
			$avtar_content.hide();
		}
	});

	$(".nav-item", $p).each(function() {
		if ($(this).hasClass("hover")) {
			$(this).hover(function() {
				$(".nav-item.selected", $p).removeClass("selected");
				$(".nav-content", $p).hide();
				
				$(this).addClass("selected");
				$(this).next().show();
			},function(){});
		}else{
			$(this).click(function() {
				$(".nav-item.selected", $p).removeClass("selected");
				$(".nav-content", $p).hide();
				$(this).addClass("selected");
				$(this).next().show();
			});
		}
	});

	var user_sex = "${user.sex}";
	if (user_sex == "0") {
		$(".avtar-man", $p).addClass("avtar-woman");
		$(".avtar-man", $p).removeClass("avtar-man");
	}
</script>
<ul class="infoNav">
	<li class="navin">
		<!-- 个人信息 -->
		<div class="nav-item hover" align="center">
			<div class="avtar-man"></div>
		</div>
		<div class="nav-content avtar-content">
			<div class="avtar-top">
				<div class="avtar-img">
					<img src="${oa}/dwz_local/images/woman-img.png">
				</div>
				<div class="avtar-info">
					<h6 class="avtar-info-name">
						<span>${user.name}</span>
						<div class="avtar-info-online">
							<img src="${oa}/dwz_local/images/status-online.png">
							<div class="avtar-info-tip">
								<a href="javascript:;" status = "1">
									<img src="">
									<span>在线</span>
								</a>
								<a href="javascript:;" status = "2">
									<img src="">
									<span>忙碌</span>
								</a>
								<a href="javascript:;" status = "3">
									<img src="">
									<span>离线</span>
								</a>
							</div>
						</div>
					</h6>
					<p>
						
					</p>
				</div>
			</div>
			<div class="avtar-foot">
				<a href="${oa}/manage" target="navTab" rel="${oa}/manage" id="person_center">个人中心</a>
				<a href="${oa}/logout">注销</a>
			</div>
		</div>
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