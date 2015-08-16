<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<link href="${oa}/dwz_local/css/commonmenu.css" rel="stylesheet" type="text/css" media="screen"/>
<!-- 右上角组件菜单 -->
<script src="${oa}/dwz_local/js/index/commonMenu.js" type="text/javascript"></script>
<script type="text/javascript">
initCommonMenu({
	webName : "${oa}",
	avtar : {
		user_sex : "${user.sex}",
		user_img : "${user.image}"
	},
	callback : function(){
		$("#themeList").theme({
			themeBase : "${oa}/dwz/themes"
		});
		$("div.pane-today").loadUrl("${oa}/index/common_today.do");
	}
});

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
					<img src="${user.image}">
				</div>
				<div class="avtar-info">
					<h6 class="avtar-info-name">
						<span>${user.name}</span>
						<div class="avtar-info-online">
							<img src="${oa}/dwz_local/images/status-online.png" title="在线">
							<div class="avtar-info-tip">
								<a href="javascript:;" status = "1">
									<img src="${oa}/dwz_local/images/status-online.png">
									<span>在线</span>
								</a>
								<a href="javascript:;" status = "2">
									<img src="${oa}/dwz_local/images/status-busy.png">
									<span>忙碌</span>
								</a>
								<a href="javascript:;" status = "3">
									<img src="${oa}/dwz_local/images/status-offline.png">
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
				<a href="${oa}/logout" onclick="javascript:if(!confirm('确定退出登录吗？'))return false;">注销</a>
			</div>
		</div>
	</li>
	<li class="navin">
		<!-- 主题切换 -->
		<div class="nav-item" align="center">
			<div class="theme"></div>
		</div>
		<div class="nav-content theme-content" id="theme-content" style="display: none">
			<ul class="themeList" id="themeList">
				<li theme="default"><div class="selected">蓝色</div></li>
				<li theme="green"><div>绿色</div></li>
				<li theme="purple"><div>紫色</div></li>
				<li theme="silver"><div>银色</div></li>
				<li theme="azure"><div>天蓝</div></li>
			</ul>
		</div>
	</li>
	<li class="navin">
		<!-- 消息提示 -->
		<div class="nav-item" align="center">
			<div class="msg"></div>
		</div>
		<div class="nav-content msg-content" style="display: none">
			<ul class="nav-tabs">
				<li class="active">
					<a href="javascript:;">今日</a>
				</li>
				<li>
					<a href="javascript:;">消息</a>
				</li>
				<li>
					<a href="javascript:;">组织</a>
				</li>
			</ul>
			<div class="nav-tabs-content">
				<div class="tab-pane pane-today active"></div>
				<div class="tab-pane pane-message"></div>
				<div class="tab-pane pane-org"></div>
			</div>
		</div>
	</li>
</ul>