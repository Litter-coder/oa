(function($) {
	$.fn.extend({
		pulldownRefresh : function(options) {
			var op = $.extend(true, {}, {
				condition_px : 50,
				pull_tip : {
					tip_start : "下拉刷新",
					tip_wait : "释放刷新",
					tip_stop : "正在刷新",
					css : {
						"background-color" : "#F3F3F3",
						"text-align" : "center",
						"display" : "none",
						"color" : "#5B99EE"
					}
				},
				callback : null
			}, options);
			this.each(function() {
				if (!$(this).is("div")) {
					console.log("object is not div");
					return false;
				}

				$(this).bind("mousedown", function(e) {
					mouseDown(e, this)
				}).bind("contextmenu", function() {
					return false;
				});
				$(this).bind("mousemove", function(e) {
					mouseMove(e, this)
				});
				$(this).bind("mouseup", function(e) {
					mouseUp(e, this)
				});
			});

			function initTip(obj) {
				var $pullTip = $('<div id="pullTip" style="display:none;"><span></span></div>');
				$.each(op.pull_tip.css, function(key) {
					$pullTip.css(key, op.pull_tip.css[key]);
				});
				$(obj).prepend($pullTip);
			}

			function clearTip(obj) {
				$("#pullTip", $(obj)).remove();
			}

			function mouseDown(e, obj) {
				// 判断点击有效性
				if (-[ 1, ] && e.button != 0) {
					return;
				}
				if (!-[ 1, ] && e.button != 1) {
					return;
				}
				
				var $clickObj = $(e.target);
				if ($clickObj.is("img")) {
					return;
				}
				
				if ($clickObj[0] !== $(obj)[0] && $clickObj.data("events")) {
					return;
				}

				
				$(obj).css("cursor", "pointer");
				if ($("#pullTip", $(obj)).length == 0) {
					initTip(obj);
					op.mouseY = e.clientY;
					op.isDown = true;
				}
			}
			function mouseMove(e, obj) {
				if (op.isDown) {
					var y = e.clientY;
					if (y >= op.mouseY) {
						var addY = parseInt(y) - parseInt(op.mouseY);
						var $pullTip = $("#pullTip", $(obj));
						if (addY < op.condition_px) {
							if ($pullTip.is(":hidden")) {
								$(obj).scrollTop(0);
								$pullTip.show();
							}
							$pullTip.find("span:eq(0)").text(op.pull_tip.tip_start);
							$pullTip.css("padding-top", addY);
						} else {
							$pullTip.find("span:eq(0)").text(op.pull_tip.tip_wait);
							// 可以再下拉10px ,为了好看
							if ((addY - 10) <= op.condition_px) {
								$pullTip.css("padding-bottom", addY - op.condition_px + "px");
							}
						}
					}
				}
			}

			function mouseUp(e, obj) {
				if (op.isDown) {
					op.isDown = false;
					$(obj).css("cursor", "default");
					var $pullTip = $("#pullTip", $(obj));

					var y = e.clientY;
					var addY = parseInt(y) - parseInt(op.mouseY);
					if (addY < op.condition_px) {
						clearTip(obj);
					} else {
						$pullTip.css("padding-bottom", "0px");
						$pullTip.find("span:eq(0)").text(op.pull_tip.tip_stop);

						if ($.isFunction(op.callback)) {
							op.callback();
						}
					}
				}
			}
		}

	})
})(jQuery);