<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<script src="${oa}/dwz_local/js/index/clock.json.js" type="text/javascript"></script>
<script src="${oa}/dwz_local/js/index/plugin.js" type="text/javascript"></script>
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
	
	function getWeather(){
		var country = $("#w_county").val();
		if($.isFunction($.cookie)) {
			$.cookie("weatherCity", country);
		}
		$("#weather #city").text($("#w_county").find("option:selected").text());
		$.getJSON("${oa}/index/weather.do", {areaid : "101" + country}, function(data) {
			var databody = data.showapi_res_body;
			var imgUrl = "${oa}/dwz_local/images/weather/icon/";
			var $temping = $("#weather .weather_info .temping");
			var $temp = $("#weather .weather_info .temp");
			$("#temping_day", $temping)[0].src = imgUrl + databody.f1.day_weather_pic;
			$("#temping_night", $temping)[0].src = imgUrl + databody.f1.night_weather_pic;
			$(".temperature", $temping).html(databody.f1.day_air_temperature + "℃~" + databody.f1.night_air_temperature + "℃");
			var weather_info = databody.f1.day_weather; 
			if(databody.f1.day_weather != databody.f1.night_weather){
				weather_info += "转" + databody.f1.night_weather;
			}
			$temp.html("<span>" + weather_info + "</span><span>" + databody.f1.day_wind_power + "</span>");
		})
		
	}
	
	
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
		<span id="city"></span>
		<div class="weather_info">
			<div class="temping">
				<img src="" id="temping_day"/> <img src="" id="temping_night"/>
				<div class="temperature"></div>
			</div>
			<div class="temp">
				<span></span><span></span>
			</div>
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