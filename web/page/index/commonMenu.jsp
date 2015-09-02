<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<link href="${oa}/css/index/commonmenu.css" rel="stylesheet" type="text/css" media="screen"/>
<!-- 右上角组件菜单 -->
<script src="${oa}/js/index/commonMenu.js" type="text/javascript"></script>
<script src="${oa}/js/plugin/jquery.pulldownRefresh.js" type="text/javascript"></script>
<script type="text/javascript">
// 消息div id与url对应的JSON
var nav_tabs_content = {
	"pane-today" : 	"${oa}/index/common_today.do",
	"pane-message" : "",
	"pane-org" : ""
}
$(function(){
	initCommonMenu({
		webName : "${oa}",
		avtar : {
			user_sex : '<c:out value="${user.sex}"/>',
			user_img : '<c:out value="${user.image}"/>'
		},
		callback : function(){
			$("#themeList").theme({
				themeBase : "${oa}/dwz/themes"
			});
			
			$.each(nav_tabs_content, function(key){
				if(nav_tabs_content[key]){
					$("#" + key).loadUrl(nav_tabs_content[key]);
				}
			});
			
			$(".nav-tabs-content .tab-pane").pulldownRefresh({
				callback : function(){
					var activeUrl = nav_tabs_content[$(".nav-tabs-content .active").attr("id")];
					$(".nav-tabs-content .active").children().remove();
					$(".nav-tabs-content .active").loadUrl(activeUrl);
				}
			});
		}
	});
});
</script>
<ul class="infoNav">
	<li class="navin">
		<!-- 个人信息 -->
		<div class="nav-item hover" align="center">
			<div class="avtar-menu">
				<img src="${oa}/images/index/man-menu.png">
			</div>
		</div>
		<div class="nav-content avtar-content" style="display: none">
			<div class="avtar-top">
				<div class="avtar-img">
					<img src='<c:out value="${user.image}" escapeXml="true"/>'>
				</div>
				<div class="avtar-info">
					<h6 class="avtar-info-name">
						<span><c:out value="${user.name}" escapeXml="true"/></span>
						<div class="avtar-info-online">
							<img src="${oa}/images/index/status-online.png" title="在线">
							<div class="avtar-info-tip">
								<a href="javascript:;" status = "1">
									<img src="${oa}/images/index/status-online.png">
									<span>在线</span>
								</a>
								<a href="javascript:;" status = "2">
									<img src="${oa}/images/index/status-busy.png">
									<span>忙碌</span>
								</a>
								<a href="javascript:;" status = "3">
									<img src="${oa}/images/index/status-offline.png">
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
			<div class="theme">
				<img src="${oa }/images/index/theme-menu.png">
			</div>
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
			<div class="msg">
				<img src="${oa}/images/index/msg-menu.png">
			</div>
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
				<div class="tab-pane active" id="pane-today"></div>
				<div class="tab-pane" id="pane-message">
					<div class="btn-group">
						<button class="btn btn-mini"><span>事务提醒</span></button>
						<button class="btn btn-mini seleted"><span>聊天</span></button>
					</div>
					<div class="message-im">
						<div class="message-im-info">
							<ul class="message-im-list">
								<li>
									<a height="400" width="600" title="张三" target="dialog" combinable="true" rel="im_msg_01" href="${oa}/page/index/common_im_msg.jsp">
										<div class="message-im-item">
											<img src="${oa}//images/index/man-menu.png">
											<div class="im-info">
												<span class="im-title">张三</span>
												<span class="im-time">3分钟前</span>
												<p class="im-content">aaaaaaaa</p>
											</div>
										</div>
									</a>
								</li>
								<li>
									<a height="500" width="650" title="李四" target="dialog" combinable="true" rel="im_msg_02" href="${oa}/page/index/common_im_msg.jsp">
										<div class="message-im-item">
											<img src="${oa}//images/index/man-menu.png">
											<div class="im-info">
												<span class="im-title">李四</span>
												<span class="im-time">3分钟前</span>
												<p class="im-content">aaaaaaaa</p>
											</div>
										</div>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="tab-pane" id="pane-org"></div>
			</div>
		</div>
	</li>
</ul>