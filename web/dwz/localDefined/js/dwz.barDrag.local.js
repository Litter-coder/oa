(function($){
	// 触发事件显示左列
	$.fn.jBarDisplay = function(options){
		var op = $.extend({
			container : "#container",
			collapse : ".collapse",
			toggleBut : ".toggleCollapse div",
			sideBar : "#sidebar",
			sideBar2 : "#sidebar_s",
			splitBar : "#splitBar",
			splitBar2 : "#splitBarProxy"
		}, options);
		
		var jbar = $("#leftside");
		var sbar = $(op.sideBar2, jbar);
		var bar = $(op.sideBar, jbar);
		if(bar.css("display") == "none"){
			$(op.collapse, sbar).trigger("click");
		}
	};
})(jQuery);