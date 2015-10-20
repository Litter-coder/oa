/**
 * Theme Plugins
 * 
 * @author ZhangHuihua@msn.com
 */
(function($) {
	$.fn.extend({
		theme : function(options) {
			var op = $.extend({
				themeBase : "themes",
				userCookie : null
			}, options);
			var _themeHref = op.themeBase + "/#theme#/style.css";
			return this.each(function() {
				var jThemeLi = $(this).find(">li[theme]");
				var setTheme = function(themeName) {
					$("head").find("link[href$='style.css']").attr("href", _themeHref.replace("#theme#", themeName));
					jThemeLi.find(">div").removeClass("selected");
					jThemeLi.filter("[theme=" + themeName + "]").find(">div").addClass("selected");

					if ($.isFunction($.cookie)) {
						if (op.userCookie) {
							var all = DWZ.cookie(op.userCookie);
							if (all) {
								all["dwz_theme"] = themeName;
							} else {
								all = {
									"dwz_theme" : themeName
								};
							}
							DWZ.cookie(op.userCookie, all);
						} else {
							$.cookie("dwz_theme", themeName);
						}
					}
				}

				jThemeLi.each(function(index) {
					var $this = $(this);
					var themeName = $this.attr("theme");
					$this.addClass(themeName).click(function() {
						setTheme(themeName);
					});
				});

				if ($.isFunction($.cookie)) {
					var themeName;
					if (op.userCookie) {
						if(DWZ.cookie(op.userCookie)){
							themeName = DWZ.cookie(op.userCookie)["dwz_theme"];
						}
					} else {
						themeName = $.cookie("dwz_theme");
					}
//					var themeName = $.cookie("dwz_theme");
					if (themeName) {
						setTheme(themeName);
					}
				}

			});
		}
	});
})(jQuery);
