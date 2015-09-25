var chartFont = {
	options : {
		target : null,
		fontFamily : [ '宋体', '黑体', '幼圆', '华文行楷', '华文楷体', '华文彩云', '华文隶书', '微软雅黑', 'Fixedsys' ],
		fontSize : [ '12px', '14px', '16px', '18px', '20px', '24px', '28px', '36px', '42px', '52px' ],
		fontColor : [ '#000000', '#FFFFFF', '#008000', '#800000', '#808000', '#000080', '#800080', '#808080', '#FFFF00', '#00FF00', '#00FFFF', '#FF00FF', '#FF0000', '#0000FF', '#008080' ],
	},
	init : function(op) {
		var _op = $.extend(true, chartFont.options, op);
		this._initFontFamily(_op);
		this._initFontSize(_op);
		this._initFontColor(_op);

	},
	_initFontFamily : function(op) {
		var $fontFamily = $(".chartFont #fontFamily");
		if (!$fontFamily[0] || !$fontFamily.is("select"))
			return false;
		var $target = $(op.target);
		if (!$target[0]) {
			console.debug("target not exist");
		} else {
			$fontFamily.bind("change", function() {
				$target.css({
					"font-family" : $(this).val()
				});
			});
		}
		$.each(op.fontFamily, function(index, value) {
			var $option = $("<option value=" + value + ">" + value + "</option>");
			$fontFamily.append($option);
			index == 0 && $fontFamily.val(value) && $fontFamily.trigger("change");

		});
	},
	_initFontSize : function(op) {
		var $fontSize = $(".chartFont #fontSize");
		if (!$fontSize[0] || !$fontSize.is("select"))
			return false;
		var $target = $(op.target);
		if (!$target[0]) {
			console.debug("target not exist");
		} else {
			$fontSize.bind("change", function() {
				$target.css("font-size", $(this).val());
			});
		}
		$.each(op.fontSize, function(index, value) {
			var $option = $("<option value=" + value + ">" + value + "</option>");
			$fontSize.append($option);
			index == 0 && $fontSize.val(value) && $fontSize.trigger("change");
		});
	},
	_initFontColor : function(op) {
		var $fontColor = $(".chartFont #fontColor");
		if (!$fontColor[0] || !$fontColor.is("select"))
			return false;
		$fontColor.css("width", "55px");
		var $target = $(op.target);
		if (!$target[0]) {
			console.debug("target not exist");
		} else {
			$fontColor.bind("change", function() {
				$(this).css("background-color", $(this).val());
				$target.css("color", $(this).val());
			});
		}
		$.each(op.fontColor, function(index, value) {
			var $option = $("<option value='" + value + "' style='background-color:" + value + "'></option>");
			$fontColor.append($option);
			index == 0 && $fontColor.val(value) && $fontColor.trigger("change");
			$option.hover(function() {
				$(this).css('background-color', value);
			})
		});
	}

}