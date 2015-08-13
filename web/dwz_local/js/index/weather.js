(function($) {
	$.fn.weather.resultcode = {
		300101 : "用户请求过期",
		300102 : "用户日调用量超限",
		300103 : "服务每秒调用量超限",
		300104 : "服务日调用量超限",
		300201 : "url无法解析",
		300202 : "请求缺少apikey",
		300203 : "服务没有取到apikey或secretkey",
		300204 : "apikey不存在",
		300205 : "api不存在",
		300206 : "api已关闭服务",
		300301 : "内部错误",
		300302 : "系统繁忙稍候再试"
	}

	$.fn.weather.def_options = {
		url : "http://apis.baidu.com/showapi_open_bus/weather_showapi/areaid",
		type : "get",
		apikey : "66a2b6ae2f20a5c7eacae8f32ab6c1aa",
		areainfo : {
			area : "",
			areaid : "",
			needMoreDay : 0,
			needIndex : 0
		}
	}
	$.fn.weather = function(options) {
		var op = $.extend(true, def_options, options);
		var $this = $(this);
		
		return $this.each(function(){
//			$.ajax({
//				url : op.url,
//				type : op.type,
//				cache : false,
//				data : {
//					apikey : op.apikey,
//					area : op.areainfo.area,
//					areaid : op.areainfo.areaid,
//					needMoreDay : op.areainfo.needMoreDay,
//					needIndex : op.areainfo.needIndex
//				},
//				dataType : "json",
//				success : function(data){
//					alert(JSON.stringify(data))
//				}
//			});
		});
	}
})(jQuery);