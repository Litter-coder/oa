<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<link href="${oa}/dwz_local/css/weather.css" rel="stylesheet" type="text/css" media="screen" />
<script src="${oa}/dwz_local/js/index/clock.json.js" type="text/javascript"></script>
<script src="${oa}/dwz_local/js/index/weather.js" type="text/javascript"></script>
<script src="${oa}/dwz_local/js/index/request.iframe.js" type="text/javascript"></script>
<!-- 组件菜单中的消息菜单 -->
<script type="text/javascript">
	clockJson.clock({
		withDate : true,
		withWeek : true,
		timeStamp : "${timestamp}",
		utc : true,
		offset : "${offset}",
		callback : function() {
			var $mod_time_colon = $("span.mod-time-colon");
			var result = clockJson.result;
			$("#mod-time-hour").html(result.time.hours);
			$("#mod-time-minute").html(result.time.minutes);
			$("#mod-time-week").html(result.week.value);
			$("#mod-time-date").html(result.datetime.year + "年" + result.datetime.month + "月" + result.datetime.date + "日");
			if ($mod_time_colon.hasClass("twinkle")) {
				$mod_time_colon.removeClass("twinkle");
			} else {
				$mod_time_colon.addClass("twinkle");
			}
		}
	});
	
	var $iframe_test = $('<iframe src="/oa/page/index/test.jsp" name="bbbb" style="display:none"></iframe>');
	$("#weather").append($iframe_test);
	var $iframe = $('<iframe src="about:blank" name="aaaa" style="display:none"></iframe>');
	var $form = $('<form action="http://ip.taobao.com/service/getIpInfo.php?ip=myip" target="bbbb"  id="form_1111" method="get"></form>');
	$iframe.append($form)
	$("#weather").append($iframe);
	$form.submit()

	$("#weather").reqIframe({
		url : "http://ip.taobao.com/service/getIpInfo.php",
		type : "GET",
		params : {
			ip : "myip"
		},
		localIframe : {
			src : "/oa/page/index/test.jsp",
			name : "aaaaa"
		},
		callback : function(response){
			alert(response);
		}
	});

	
	
// 	var url = "http://ip.taobao.com/service/getIpInfo.php?ip=myip";
// 	$.ajax({
// 		url : url,
// 		type : "GET",
// 		cache : false,
// 		async : false,
// 		dataType : "jsonp",
// 		jsonp:'callback', 
// 		jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
// 		success : function(data) {
// 			alert(data);
// 		},
// 		error : function(e){
// 			console.log(e)
// 		}
	
// 	});
//     $("#weather").weather("${oa}/index/weather.do", "POST", {
// 		areaid : "",
// 		ip : ""
// 	});
</script>
<div class="time-info" id="time-info">
	<div class="mod-time-info">
		<span class="mod-time" id="mod-time-hour">23</span> 
		<span class="mod-time mod-time-colon">:</span>
		<span class="mod-time" id="mod-time-minute">12</span> 
		<span class="mod-time-date"	id="mod-time-week">星期三</span>
	</div>
	<div class="mod-time-info">
		<span class="mod-time-date" id="mod-time-date">2015年8月12日</span>
		<span class="mod-time-date">(农历六月廿九)</span>
	</div>
</div>
<div class="mod">
	<div class="mod-hd">
		<span class="mod-hd-title">天气</span>
		<div class="city">
			<img src="${oa}/dwz_local/images/manage-menu.png" width="24px" height="24px" />
		</div>
	</div>
	<div class="mod-bd" id="weather">
		<span id="city">广州</span>
		<div class="weather_info">
			<div class="temping">
				<img src="" /> <img src="" />
				<div class="temperature">34℃~26℃</div>
			</div>
			<div class="temp">
				<span>阵雨转多云</span> <span>微风</span>
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