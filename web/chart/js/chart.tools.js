;
(function($) {
	$.fn.extend({
		initChartTools : function(op) {
			op = $.extend({
				editArea : null,
				imgPath : null,
				font : true,
				emoji : true,
				history : true
			}, op);
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
		imgPath : "", // 图片基路径
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
			ul.append('<li><a href="javascript:void(0)" class="im_msg_tools" id="fontTools" title="字体选择工具栏"><img src="' + op.imgPath + 'font.png"></a></li>');
			$("#fontTools", $p).click(function() {
				if ($p.prev().is(":hidden")) {
					$p.prev().show();
				} else {
					$p.prev().hide();
				}
			});
		}
		if (op.emoji) {
			ul.append('<li><a href="javascript:void(0)" class="im_msg_tools" id="emojiChoose" title="选择表情"><img src="' + op.imgPath + 'face.png"></a></li>');
		}
		if (op.history) {
			ul.append('<li><a href="javascript:void(0)" class="im_msg_tools" id="msgHistory" title="显示消息记录"><img src="' + op.imgPath + 'history.png"><span>消息记录</span></a></li>');
		}

	},
	init : function(op, obj) {
		var _op = $.extend(true, chartTools.options, op);
		this._initUI(_op, obj);
		_op.font && chartFont.init(_op, obj);
		_op.emoji && chartEmoji.init(_op, obj);
		_op.history && chartHistory.init(obj);

		$(">ul>li>a", $(obj)).click(function(e) {
			if ($(this).hasClass("focus")) {
				$(this).removeClass("focus");
			} else {
				if ($("ul a.focus", $(obj))[0]) {
					$("ul a.focus", $(obj)).click();
				}
				$(this).addClass("focus");
			}
			e.stopPropagation();
		});
	}
}

/**
 * 历史记录工具加载
 */
var chartHistory = {
	init : function(obj) {
		$("#msgHistory", $(obj)).click(function() {
			var dialog = $(obj).parents(".dialog:eq(0)");
			var historyDiv = $(".historyRecord", dialog);
			historyDiv = historyDiv[0] || '<div class="im_msg_history historyRecord"><div class="im_history_box" layoutH=22></div></div>';
			historyDiv = $(historyDiv);
			var hisWidth = parseInt(historyDiv.css("width")) + 2;
			var iContentW = $(window).width();

			var isMax = false;
			if ($("a.maximize", dialog).is(":hidden") && $("a.restore", dialog).is(":visible")) {
				isMax = true;
			}
			// 获取调整聊天框的width height top left参数的方法
			var getParams = function(dlgObj, type) {
				var params = {};
				if (type == 0) {// 移除
					params = {
						width : isMax ? parseInt($(dlgObj).css("width")) : (parseInt($(dlgObj).css("width")) - hisWidth),
						itemsW : $(">.dialogCombinableItems", $(dlgObj))[0] && $(">.dialogCombinableItems", $(dlgObj)).width(),
						height : parseInt($(dlgObj).css("height")),
						top : parseInt($(dlgObj).css("top")),
						left : parseInt($(dlgObj).css("left"))
					}
				} else {
					params = {
						width : parseInt($(dlgObj).css("width")) + hisWidth,
						itemsW : $(">.dialogCombinableItems", $(dlgObj))[0] && $(">.dialogCombinableItems", $(dlgObj)).width(),
						height : parseInt($(dlgObj).css("height")),
						top : parseInt($(dlgObj).css("top")),
						left : parseInt($(dlgObj).css("left"))
					}

					if ((params.width + params.left) > iContentW) {// 显示历史记录后的展示宽度超过浏览器宽度
						params.left = iContentW - params.width;
						if (params.left < 0) {// 
							params.left = 0;
							params.width = iContentW;
						}
					}
				}
				return params;
			}

			if ($(".historyRecord", dialog)[0]) {// 移除
				if (eval(dialog.data("combinable"))) {
					var dialogComb = $("body").data("dialogCombinable");
					var params = getParams(dialogComb, 0);
					$.pdialog._resizeDialogCombinable(dialogComb, params);
				} else {
					var params = getParams(dialog, 0);
					$.pdialog._resizeDialog(dialog, params);
				}
				historyDiv.remove();
			} else {// 显示历史记录
				var box = $(".imContent", dialog);
				$(box).prepend(historyDiv);
				if (isMax) {// 当显示历史时处于最大化状态时，还原的时候可能会出现问题，则应该先最小化显示历史后再最大化
					$("a.restore", dialog).click();
				}
				if (eval(dialog.data("combinable"))) {
					var dialogComb = $("body").data("dialogCombinable");
					var params = getParams(dialogComb, 1);
					$.pdialog._resizeDialogCombinable(dialogComb, params);
				} else {
					var params = getParams(dialog, 1);
					$.pdialog._resizeDialog(dialog, params);
				}
				if (isMax) {
					$("a.maximize", dialog).click();
				}
			}

		});

	}
};

/**
 * 聊天表情工具加载
 */
var chartEmoji = {
	init : function(op, obj) {
		var options = {
			faceId : "faceId",
			templateId : 'rl_bq',
			baseUrl : op.imgPath + 'face/',
			isTextOut : false,
			editArea : op.editArea,
			pace : 200,
			editArea : null,
			tip : "[:#tip#:]",
			target : null
		};
		var emojiChoose = $("#emojiChoose", $(obj));
		options.target = emojiChoose.parent();
		emojiChoose.emoji(options);

		$(document).click(function() {
			if (emojiChoose.hasClass("focus")) {
				emojiChoose.removeClass("focus");
			}
		});
	}
};

/**
 * 聊天字体工具加载
 */
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