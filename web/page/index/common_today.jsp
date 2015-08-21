<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<script src="${oa}/dwz_local/js/index/clock.json.js" type="text/javascript"></script>
<script src="${oa}/dwz_local/js/index/plugin.js" type="text/javascript"></script>
<script src="${oa}/js/plugin/calendarCN.js" type="text/javascript"></script>
<!-- 组件菜单中的消息菜单 -->
<script type="text/javascript">
$(function(){
	clockJson.clock({
		withDate : true,
		withWeek : true,
		timeStamp : "${timestamp}",
		utc : true,
		offset : "${offset}",
		callback : function(result) {
			var $mod_time_colon = $("span.mod-time-colon");
			$("#mod-time-hour").text(result.time.hours);
			$("#mod-time-minute").text(result.time.minutes);
			$("#mod-time-week").text(result.week.value);
			$("#mod-time-date").text(result.datetime.year + "年" + result.datetime.month + "月" + result.datetime.date + "日");
			if ($mod_time_colon.hasClass("twinkle")) {
				$mod_time_colon.removeClass("twinkle");
			} else {
				$mod_time_colon.addClass("twinkle");
			}
			
			var dateCn = calendarCN.solar2lunar(result.datetime.year, result.datetime.month, result.datetime.date);
			$("#mod-time-datecn").text("农历" + dateCn.IMonthCn + dateCn.IDayCn);
		}
	});
	
	var weatherCity = ConvertWeatherCity("广东_广州_广州");
	if($.isFunction($.cookie) && $.cookie("weatherCity")) {
		weatherCity = $.cookie("weatherCity");
	}
	InitProvince(weatherCity);
	getWeather();
	
	$(".mod-hd .city").click(function() {
		if ($(this).parent().next().find("div.weather_areas").is(":hidden")) {
			$(this).parent().next().find("span:eq(0)").hide();
			$(this).parent().next().find("div.weather_info").hide();
			if($.isFunction($.cookie) && $.cookie("weatherCity")) {
				weatherCity = $.cookie("weatherCity");
			}
			InitProvince(weatherCity);
			$(this).parent().next().find("div.weather_areas").show();
		}
	});
	
	$(".btns .btn").each(function() {
		$(this).click(function() {
			$(this).parents("div.weather_areas").hide();
			$(this).parents("div.weather_areas").siblings().show();
			if ($(this).hasClass("btn_submit")) {// 调用weather
				getWeather();
			}
		});
	});
});
function getWeather(){
	var country = $("#w_county").val();
	if($.isFunction($.cookie)) {
		$.cookie("weatherCity", country);
	}
	$("#weather #city").text($("#w_county").find("option:selected").text());
	$.getJSON("${oa}/index/weather.do", {areaid : "101" + country}, function(data) {
		var databody = data.showapi_res_body;
		var imgUrl = "${oa}/dwz_local/images/weather/icon/";
		$("#weather .weather_info").html("");
		var $temping = $('<div class="temping"></div>');
		var $day_pic = $('<img src="' + imgUrl + databody.f1.day_weather_pic + '"/>');
		var $night_pic = $('<img src="' + imgUrl + databody.f1.night_weather_pic + '"/>');
		var $temperature = $('<div class="temperature">' + databody.f1.day_air_temperature + "℃~" + databody.f1.night_air_temperature  + '℃</div>');
		$temping.append($day_pic).append($night_pic).append($temperature);
		var $temp = $('<div class="temp"></div>');
		var weather_info = databody.f1.day_weather; 
		if(databody.f1.day_weather != databody.f1.night_weather){
			weather_info += "转" + databody.f1.night_weather;
		}
		var $temp_info = $('<span>' + weather_info + '</span><span>' + databody.f1.day_wind_power + '</span>');
		$temp.append($temp_info);
		$("#weather .weather_info").children().remove();
		$("#weather .weather_info").append($temping).append($temp);
	})
	
}
</script>
<div class="time-info" id="time-info">
	<div class="mod-time-info">
		<span class="mod-time" id="mod-time-hour"></span> 
		<span class="mod-time mod-time-colon">:</span>
		<span class="mod-time" id="mod-time-minute"></span> 
		<span class="mod-time-date"	id="mod-time-week"></span>
	</div>
	<div class="mod-time-info">
		<span class="mod-time-date" id="mod-time-date"></span>
		<span class="mod-time-date" id="mod-time-datecn"></span>
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
		<span id="city"></span>
		<div class="weather_info">
		</div>
		<div class="weather_areas">
			<div>
				<select id="w_province" onclick="InitCity(this.value)">
				</select>
				<select id="w_city" onclick="InitCounty(this.value)">
				</select>
				<select id="w_county">
				</select>
			</div>
			<div class="btns">
				<button class="btn btn_submit">确定</button>
				<button class="btn">取消</button>
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