/**
 * @author Roger Wu
 */
(function($) {
	$.fn.dialogDrag = function(options) {
		if (typeof options == 'string') {
			if (options == 'destroy')
				return this.each(function() {
					var dialog = this;
					$("div.dialogHeader", dialog).unbind("mousedown");
				});
		}
		return this.each(function() {
			var dialog = $(this);
			$("div.dialogHeader", dialog).mousedown(function(e) {
				$.pdialog.switchDialog(dialog);
				dialog.data("task", true);
				setTimeout(function() {
					if (dialog.data("task")) {
						if (eval(dialog.data("combinable"))) {
							var dialogCombinable = $("body").data("dialogCombinable");
							$.dialogDrag.start(dialogCombinable, e);
						} else {
							$.dialogDrag.start(dialog, e);
						}
					}
				}, 100);
			}).mouseup(function(e) {
				dialog.data("task", false);
			});
		});
	};
	$.dialogDrag = {
		currId : null,
		_init : function(obj) {
			this.currId = new Date().getTime();
		},
		start : function(obj, event) {
			this._init(obj);
			var sh = $(obj);
			var maxLeft = $(window).width() - $(sh).outerWidth();
			if ($("#taskbar").is(":visible")) {
				iTaskbarH = $("#taskbar").outerHeight();
			}
			var maxTop = $(window).height() - $(sh).outerHeight() - iTaskbarH - $("#footer").height() - 5;
			$(sh).jDrag({
				selector : ".dialogHeader",
				stop : this.stop,
				event : event,
				maxLeft : maxLeft,
				maxTop : maxTop
			});
			return false;
		},
		stop : function() {
			var sh = $(arguments[0]);
			$(sh).css({
				left : $(sh).css("left"),
				top : $(sh).css("top")
			});
		}
	}
})(jQuery);