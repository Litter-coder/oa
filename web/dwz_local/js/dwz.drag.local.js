/**
 * @author Roger Wu
 */
(function($) {
	$.rwdrag = $.extend(true, $.rwdrag, {
		drag : function(e) {
			if (!e)
				var e = window.event;
			var current = $.rwdrag.current;
			var data = $.data(current.el, 'pp-rwdrag');
			var left = (current.oleft + (e.pageX || e.clientX) - current.ox);
			var top = (current.otop + (e.pageY || e.clientY) - current.oy);
			if (top < 1)
				top = 0;
			if (data.options.move == 'horizontal') {
				if ((data.options.minW && left >= $(data.options.obj).cssv("left") + data.options.minW) && (data.options.maxW && left <= $(data.options.obj).cssv("left") + data.options.maxW))
					current.el.style.left = left + 'px';
				else if (data.options.scop) {
					if (data.options.relObj) {
						if ((left - parseInt(data.options.relObj.style.left)) > data.options.cellMinW) {
							current.el.style.left = left + 'px';
						}
					} else
						current.el.style.left = left + 'px';
				}
			} else if (data.options.move == 'vertical') {
				current.el.style.top = top + 'px';
			} else {
				var selector = data.options.selector ? $(data.options.selector, data.options.obj) : $(data.options.obj);
				if (left < 0)
					left = 0;
				if (top > data.options.maxTop)
					top = data.options.maxTop;
				if (left > data.options.maxLeft)
					left = data.options.maxLeft;
				if (left >= -selector.outerWidth() * 2 / 3 && top >= 0 && (left + selector.outerWidth() / 3 < $(window).width()) && (top + selector.outerHeight() < $(window).height())) {
					current.el.style.left = left + 'px';
					current.el.style.top = top + 'px';
				}
			}

			if (data.options.drag) {
				data.options.drag.apply(current.el, [ current.el, e ]);
			}

			return $.rwdrag.preventEvent(e);
		}
	});
})(jQuery);
