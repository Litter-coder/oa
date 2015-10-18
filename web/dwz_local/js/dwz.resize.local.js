/**
 * @author Roger Wu
 * @version 1.0
 */
(function($) {
	$.fn.extend({
		jresize : function(options) {
			if (typeof options == 'string') {
				if (options == 'destroy')
					return this.each(function() {
						var dialog = $(this);
						var obj = dialog;
						if (eval($(dialog).data("combinable"))) {
							obj = $("body").data("dialogCombinable");
						}
						$("div[class^='resizable']", obj).each(function() {
							if (!$(this).hasClass("resizable_c_c")) {
								$(this).hide();
							}
						});
					});
			}
			return this.each(function() {
				var dialog = $(this);
				var obj = dialog;
				if (eval(dialog.data("combinable"))) {
					obj = $("body").data("dialogCombinable");
				}
				var resizable = $(".resizable");
				$("div[class^='resizable']", obj).each(function() {
					var bar = this;
					$(bar).mousedown(function(event) {
						$.pdialog.switchDialog(dialog);
						$.resizeTool.start(resizable, dialog, event, $(bar).attr("tar"));
						return false;
					}).show();
				});
			});
		}
	});
	$.resizeTool = $.extend($.resizeTool, {
		start : function(resizable, dialog, e, target) {
			$.pdialog.initResize(resizable, dialog, target);
			var op = $.extend($.pdialog._op);
			var iTaskbarH = 0;
			if ($("#taskbar").is(":visible")) {
				iTaskbarH = $("#taskbar").outerHeight();
			}
			var maxH = $(window).height() - $("#taskbar").outerHeight() - $("#footer").height() - 5;

			if (eval(dialog.data("combinable"))) {
				op.combinable = true;
				op = $.pdialog._reinitOptions(op);
				op.oItemsW = parseInt($(">.dialogCombinableItems", $("body").data("dialogCombinable")).width());
			}
			op.maxH = maxH;
			op.maxW = $(window).width();
			$.data(resizable[0], 'layer-drag', {
				options : $.extend(op, {
					target : target,
					dialog : dialog,
					stop : $.resizeTool.stop
				})
			});
			$.layerdrag.start(resizable[0], e, op);
		}
	});
	$.layerdrag = $.extend($.layerdrag, {
		drag : function(e) {
			if (!e)
				var e = window.event;
			var current = $.layerdrag.current;
			var data = $.data(current.el, 'layer-drag');
			var lmove = (e.pageX || e.screenX) - current.ox;
			var tmove = (e.pageY || e.clientY) - current.oy;
			if ((e.pageY || e.clientY) <= 0 || (e.pageY || e.clientY) >= ($(window).height() - $(".dialogHeader", $(data.options.dialog)).outerHeight()))
				return false;
			var target = data.options.target;
			var width = current.owidth;
			var height = current.oheight;
			if (target != "n" && target != "s" && target != "c") {
				width += (target.indexOf("w") >= 0) ? -lmove : lmove;
			}

			if (target == "c") {
				var itemsW = data.options.oItemsW;
				itemsW += lmove;
				if (itemsW >= data.options.minItemsW && itemsW <= data.options.maxItemsW) {
					$(current.el).attr("itemsW", itemsW);
					data.options.stop.apply(current.el, [ current.el ]);
				}
			}

			if (width >= data.options.minW) {
				if (target.indexOf("e") >= 0 && lmove > 0) {
					if (width > (data.options.maxW - current.oleft)) {
						width = data.options.maxW - current.oleft
					}
				}
				var cleft = current.oleft + lmove;
				if (target.indexOf("w") >= 0) {
					cleft = cleft < 0 ? 0 : cleft;
					current.el.style.left = cleft + 'px';
				}
				if (target != "n" && target != "s" && target != "c") {
					current.el.style.width = width - (cleft == 0 ? -(current.oleft + lmove) : 0) + 'px';
				}
			}
			if (target != "w" && target != "e" && target != "c") {
				height += (target.indexOf("n") >= 0) ? -tmove : tmove;
			}
			if (height >= data.options.minH) {
				if (target.indexOf("s") >= 0 && tmove > 0) {
					if (height > (data.options.maxH - current.otop)) {
						height = data.options.maxH - current.otop;
					}
				}
				var ctop = current.otop + tmove;
				if (target.indexOf("n") >= 0) {
					ctop = ctop < 0 ? 0 : ctop;
					current.el.style.top = ctop + 'px';
				}
				if (target != "w" && target != "e" && target != "c") {
					current.el.style.height = height - (ctop == 0 ? -(current.otop + tmove) : 0) + 'px';
				}
			}
			return $.layerdrag.preventEvent(e);
		}
	});
})(jQuery);