<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<link href="${oa}/dwz_local/css/commonmenu.css" rel="stylesheet" type="text/css" media="screen"/>
<link href="${oa}/dwz_local/css/weather.css" rel="stylesheet" type="text/css" media="screen"/>
<!-- 右上角组件菜单 -->
<script src="${oa}/dwz_local/js/index/commonMenu.js" type="text/javascript"></script>
<script src="${oa}/dwz_local/js/index/clock.json.js" type="text/javascript"></script>
<script src="${oa}/dwz_local/js/index/weather.js" type="text/javascript"></script>
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
		
		
	}
});


clockJson.clock({
	withDate: true, 
	withWeek: true ,
	timeStamp:"${timestamp}",
	utc:true,
	offset:"${offset}",
	callback : function (){
		var $mod_time_colon = $("span.mod-time-colon");
		var result = clockJson.result;
		$("#mod-time-hour").html(result.time.hours);
		$("#mod-time-minute").html(result.time.minutes);
		$("#mod-time-week").html(result.week.value);
		$("#mod-time-date").html(result.datetime.year + "年" + result.datetime.month + "月" + result.datetime.date + "日");
		if($mod_time_colon.hasClass("twinkle")){
			$mod_time_colon.removeClass("twinkle");
		}else{
			$mod_time_colon.addClass("twinkle");
		}
	}
})


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
	<li class="navin">
		<!-- 消息提示 -->
		<div class="nav-item" align="center">
			<div class="msg"></div>
		</div>
		<div class="nav-content msg-content">
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
				<div class="tab-pane pane-today">
					<div class="time-info" id="time-info">
						<div class="mod-time-info">
							<span class="mod-time" id="mod-time-hour">23</span>
							<span class="mod-time mod-time-colon">:</span>
							<span class="mod-time" id="mod-time-minute">12</span>
							<span class="mod-time-date" id="mod-time-week">星期三</span>
						</div>
						<div class="mod-time-info">
							<span class="mod-time-date" id="mod-time-date">2015年8月12日</span>
							<span class="mod-time-date">(农历六月廿九)</span>
						</div>
					</div>
					<div class="mod">
						<div class="mod-hd">
							<span class="mod-hd-title">天气</span>
							<div class="city"><img src="${oa}/dwz_local/images/manage-menu.png" width="24px" height="24px"/></div>
						</div>
						<div class="mod-bd" id="weather">
							<span id="city">广州</span>
							<div class="weather_info">
								<div class="temping">
									<img src="" />
									<img src="" />
									<div class="temperature">34℃~26℃</div>
								</div>
								<div class="temp">
									<span>阵雨转多云</span>
									<span>微风</span>
								</div>
							</div>
						</div>
					</div>
					<div class="mod">
						<div class="mod-hd">
							<span class="mod-hd-title">日程</span>
						</div>
						<div class="mod-bd">
							<div class="notip">今日暂无日程</div>
						</div>
					</div>
					<div class="mod">
						<div class="mod-hd">
							<span class="mod-hd-title">备忘</span>
						</div>
						<div class="mod-bd">
							<div class="notip">今日暂无备忘</div>
						</div>
					</div>
				</div>
				<div class="tab-pane pane-msg"></div>
				<div class="tab-pane pane-org"></div>
			</div>
		</div>
	</li>
</ul>