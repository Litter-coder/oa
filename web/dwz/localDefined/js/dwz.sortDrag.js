(function($) {
	$.fn.sortDrag = function(options) {
		return this.each(function() {
			var op = $.extend({}, _op, options);
			var $sortBox = $(this);
			if ($sortBox.attr('selector'))
				op.selector = $sortBox.attr('selector');
			$sortBox.find(op.items).each(function(i) {
				var $item = $(this), $selector = $item;
				if (op.selector) {
					$selector = $item.find(op.selector).css({
						cursor : op.cursor
					});
				}
				$selector.mousedown(function(event) {
					if (-[ 1, ] && event.button != 0) {
						return;
					}
					if (!-[ 1, ] && event.button != 1) {
						return;
					}
					var $target = $(event.target);
					
					if ($target.data("events")) {
						return;
					}
					
					if($target.is("input") || $target.is(".noSortDrag")){
						return;
					}
					sortDrag.start($sortBox, $item, event, op);
					event.preventDefault();
				});
			});
		});
	}
})(jQuery);