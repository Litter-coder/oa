(function($) {
	$.fn.navMenu = function() {
		return this.each(function() {
			var $box = $(this);
			$box.find("li>a").click(function() {
				var $a = $(this);
				// 加入参数传递 --by dinghuan
				var data = "{";
				$("input:hidden", $a).each(function() {
					var $input = $(this);
					var name = $input.attr("name");
					var value = $input.val();
					data += name + ":" + value + ",";
				});
				if (data != "{") {
					data = data.substr(0, data.length - 1);
				}
				data += "}";

				var $accordion = $(".accordion", $("#sidebar"));
				$accordion.trigger(DWZ.eventType.ajaxLoadingMask);

				var $ajaxProgress = $accordion.find('> .progressBar');
				// 判断遮罩位置，重建
				var pro_outerWid = $ajaxProgress.outerWidth();
				var acc_width = $accordion.width();
				if (pro_outerWid >= acc_width) {
					$ajaxProgress.addClass("progressBar-reb");
				}

				$.post($a.attr("href"), eval("(" + data + ")"), function(html) {
					var json = DWZ.jsonEval(html);
					DWZ.ajaxDone(json);
					if (!$.isEmptyObject(json)) {
						return;
					}
					if ($.fn.jBarDisplay) {
						$.fn.jBarDisplay();
					}
					$("#sidebar").find(".accordion").remove().end().append(html).initUI();
					$box.find("li").removeClass("selected");
					$a.parent().addClass("selected");

					if ($.fn.hoverSidebar) {
						$("#sidebar").hoverSidebar();
					}
				}).error(function(xhr, ajaxOptions, thrownError) {
					DWZ.ajaxError(xhr, ajaxOptions, thrownError);
				});
				return false;
			});
		});
	}

	$.fn.switchEnv = function() {
		var op = {
			cities$ : ">ul>li",
			boxTitle$ : ">a>span"
		};
		return this.each(function() {
			var $this = $(this);
			$this.click(function() {
				if ($this.hasClass("selected")) {
					_hide($this);
				} else {
					_show($this);
				}
				return false;
			});

			$this.find(op.cities$).click(function() {
				var $li = $(this);

				$.post($li.find(">a").attr("href"), {}, function(html) {
					var json = DWZ.jsonEval(html);
					DWZ.ajaxDone(json);
					if (!$.isEmptyObject(json)) {
						return;
					}
					_hide($this);
					$this.find(op.boxTitle$).html($li.find(">a").html());
					$("#sidebar").find(".accordion").remove().end().append(html).initUI();
				}).error(function(xhr, ajaxOptions, thrownError) {
					DWZ.ajaxError(xhr, ajaxOptions, thrownError);
				});
				return false;
			});
		});
	}
})(jQuery);