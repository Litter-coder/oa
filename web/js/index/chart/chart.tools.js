;
(function($) {
	$.fn.extend({
		initChartTools : function(op) {
			return this.each(function() {
				chartTools.init(op, this);
			});
		}
	});

})(jQuery);
/**
 * 聊天工具栏
 */
var chartTools = {
	options : {
		editArea : null,// 编辑区域，显示区域
		path : "",
		font : true,
		emoji : true,
		history : true
	},
	// 初始化工具栏事件标签
	_initUI : function(op, obj) {
		var $p = $(obj);
		$p.append('<ul></ul>');
		var ul = $("ul", $p);
		if (op.font) {
			ul.append('<li><a href="javascript:void(0)" class="im_msg_tools" id="fontTools" title="字体选择工具栏"><img src="' + op.path + 'font.png"></a></li>');
			$("#fontTools", $p).click(function() {
				if ($p.prev().is(":hidden")) {
					$p.prev().show();
				} else {
					$p.prev().hide();
				}
			});
		}
		if (op.emoji) {
			ul.append('<li><a href="javascript:void(0)" class="im_msg_tools" id="emojiChoose" title="选择表情"><img src="' + op.path + 'face.png"></a></li>');

			var options = {
				faceId : "faceId",
				baseUrl : op.path + 'face/',
				isTextOut : false,
				editArea : op.editArea
			}

			$("#emojiChoose", $p).emoji(options);

			$(document).click(function() {
				if ($("#emojiChoose", $p).hasClass("focus")) {
					$("#emojiChoose", $p).removeClass("focus");
				}
			});
		}
		if (op.history) {
			ul.append('<li><a href="javascript:void(0)" class="im_msg_tools" id="msgHistory" title="显示消息记录"><img src="' + op.path + 'history.png"><span>消息记录</span></a></li>');
		}

		$(">ul>li>a", $p).click(function(e) {
			if ($(this).hasClass("focus")) {
				$(this).removeClass("focus");
			} else {
				if ($("ul a.focus", $p)[0]) {
					$("ul a.focus", $p).click();
				}
				$(this).addClass("focus");
			}
			e.stopPropagation();
		});
	},
	init : function(op, obj) {
		var _op = $.extend(true, chartTools.options, op);
		this._initUI(_op, obj);
		chartFont.init(_op, obj);
	}
}

var chartEmoji = {
	init : function(op, obj) {

	}
};

var chartFont = {
	data : {
		fontFamily : [ '微软雅黑', '黑体', '幼圆', '华文行楷', '华文楷体', '华文彩云', '华文隶书', '宋体', 'Fixedsys' ],
		fontSize : [ '14px', '16px', '18px', '20px', '24px', '28px', '36px', '42px', '52px' ],
		fontColor : [ '#000000', '#FFFFFF', '#008000', '#800000', '#808000', '#000080', '#800080', '#808080', '#FFFF00', '#00FF00', '#00FFFF', '#FF00FF', '#FF0000', '#0000FF', '#008080' ],

	},
	_initUI : function(obj) {
		$(obj).before('<div class="fontTools chartFont" style="display: none;"></div>');
		return $(obj).prev();
	},
	init : function(op, _box) {
		var $p = $(_box);
		var target = this._initUI(_box);
		this._initFontFamily(op.editArea, target);
		this._initFontSize(op.editArea, target);
		this._initFontColor(op.editArea, target);

	},
	_initFontFamily : function(editArea, target) {
		var $fontFamily = $('<div><span>字体</span><select></select></div>');
		var select = $("select", $fontFamily);
		target.append($fontFamily);
		if (!editArea[0]) {
			console.debug("editArea not exist");
		} else {
			select.bind("change", function() {
				editArea.css({
					"font-family" : $(this).val()
				});
			});
		}
		$.each(chartFont.data.fontFamily, function(index, value) {
			var $option = $("<option value=" + value + ">" + value + "</option>");
			select.append($option);
			index == 0 && select.val(value) && select.trigger("change");
		});
	},
	_initFontSize : function(editArea, target) {
		var $fontSize = $('<div><span>大小</span><select></select></div>');
		var select = $("select", $fontSize);
		target.append($fontSize);

		if (!editArea[0]) {
			console.debug("editArea not exist");
		} else {
			select.bind("change", function() {
				editArea.css("font-size", $(this).val());
			});
		}
		$.each(chartFont.data.fontSize, function(index, value) {
			var $option = $("<option value=" + value + ">" + value + "</option>");
			select.append($option);
			index == 0 && select.val(value) && select.trigger("change");
		});
	},
	_initFontColor : function(editArea, target) {
		var $fontColor = $('<div><span>颜色</span><select></select></div>');
		var select = $("select", $fontColor);
		target.append($fontColor);

		select.css("width", "55px");
		if (!editArea[0]) {
			console.debug("editArea not exist");
		} else {
			select.bind("change", function() {
				$(this).css("background-color", $(this).val());
				editArea.css("color", $(this).val());
			});
		}
		$.each(chartFont.data.fontColor, function(index, value) {
			var $option = $("<option value='" + value + "' style='background-color:" + value + "'></option>");
			select.append($option);
			index == 0 && select.val(value) && select.trigger("change");
		});
	}
}