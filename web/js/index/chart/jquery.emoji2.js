/*
 * 参数说明 // baseUrl: 【字符串】表情路径的基地址 pace: 【数字】表情弹出层淡入淡出的速度 dir: 【数组】保存表情包文件夹名字
 * text: 【二维数组】保存表情包title文字 num: 【数组】保存表情包表情个数 isExist: *
 * 【数组】保存表情是否加载过,对于加载过的表情包不重复请求。
 */
var emoji = {
	defaults : {
		templateId : 'rl_bq',
		baseUrl : '',
		pace : 200,
		dir : [ 'mr', 'gnl', 'lxh', 'bzmh' ],
		editArea : null,
		textOut : true
	},
	text : [ /* 表情包title文字，自己补充 */
	[], [], [], [] ],
	num : [ 131, 46, 83, 70 ],
	isExist : [ 0, 0, 0, 0 ],
	bind : function(i, op) {
		var id = op.faceId;
		$("#" + id + " .rl_exp_main").eq(i).find('.rl_exp_item').each(function() {
			$(this).bind('click', function() {
				emoji.insertText(op.editArea, '[' + $(this).find('img').attr('title') + ']');
				$('#' + id).fadeOut(op.pace);
			});
		});
	},
	/* 加载表情包函数 */
	loadImg : function(i, op) {
		var id = op.faceId;
		if (!emoji.isExist[i]) {// 如果模版没有加载表情时
			var node = $("#" + emoji.defaults.templateId + " .rl_exp_main").eq(i);
			for (var j = 0; j < emoji.num[i]; j++) {
				var domStr = '<li class="rl_exp_item">' + '<img src="' + op.baseUrl + op.dir[i] + '/' + j + '.gif" alt="' + emoji.text[i][j] + '" title="' + emoji.text[i][j] + '" />' + '</li>';
				$(domStr).appendTo(node);
			}
			emoji.isExist[i] = 1;
		}
		node.children().clone().appendTo($("#" + id + " .rl_exp_main").eq(i));
		emoji.bind(i, op);
	},
	/* 在textarea里光标后面插入文字 */
	insertText : function(obj, str) {
		obj.focus();
		if (document.selection) {
			var sel = document.selection.createRange();
			sel.text = str;
		} else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
			var startPos = obj.selectionStart, endPos = obj.selectionEnd, cursorPos = startPos, tmpStr = obj.value;
			obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
			cursorPos += str.length;
			obj.selectionStart = obj.selectionEnd = cursorPos;
		} else {
			obj.value += str;
		}
	},
	initTemplate : function() {
		var templeDiv = $('<div class="rl_exp" id="' + emoji.defaults.templateId + '" style="display:none;"></div>');
		var templeUl = $('<ul class="rl_exp_tab clearfix"></ul>')
		templeUl.append('<li><a href="javascript:void(0);" class="selected">默认</a></li>').append('<li><a href="javascript:void(0);">拜年</a></li>').append(
				'<li><a href="javascript:void(0);">浪小花</a></li>').append('<li><a href="javascript:void(0);">暴走漫画</a></li>').appendTo(templeDiv);
		for (var i = 0; i < 3; i++) {
			var ulStr = $('<ul class="rl_exp_main clearfix" style="display:none;"></ul>');
			i == 0 && ulStr.addClass("rl_selected");
			templeDiv.append(ulStr);
		}
		templeDiv.append('<a href="javascript:void(0);" class="close">×</a>').appendTo("body");

	},
	init : function(options) {
		if (!$("#" + emoji.defaults.templateId)[0]) {
			emoji.initTemplate();
		}

		var op = $.extend(emoji.defaults, options);
		var id = op.faceId;
		if (id == emoji.defaults.templateId) {
			alert("该元素的id与模版id重复");
			return;
		} else if ($("#" + id)[0]) {
			alert("该元素的id已存在");
			return;
		}
		// 元素克隆复制
		var thisFace = $("#" + emoji.defaults.templateId).clone();
		thisFace.attr("id", id).appendTo(op.target.parent());

		// 给元素下的标签添加事件
		$("#" + id + " > ul.rl_exp_tab > li > a").each(function(i) {
			$(this).bind('click', function(e) {
				if ($(this).hasClass('selected') && $(this).hasClass("loaded"))
					return;
				if (!$(this).hasClass("loaded")) {
					emoji.loadImg(i, op);
					$(this).addClass("loaded");
				}
				$("#" + id + " > ul.rl_exp_tab > li > a.selected").removeClass('selected');
				$(this).addClass('selected');
				$('#' + id + ' .rl_selected').removeClass('rl_selected').hide();
				$('#' + id + ' .rl_exp_main').eq(i).addClass('rl_selected').show();

				e.stopPropagation();
			});
		});

		/* 绑定关闭按钮 */
		$('#' + id + ' a.close').bind('click', function() {
			$('#' + id).fadeOut(op.pace);
		});
		/* 绑定document点击事件，对target不在rl_bq弹出框上时执行rl_bq淡出，并阻止target在弹出按钮的响应。 */
		$(document).bind('click', function(e) {
			$('.rl_exp').fadeOut(op.pace);
		});
	}
};

// 表情插件
(function($) {
	$.fn.emoji = function(options) {
		var defaults = {
			faceId : "faceId",
			baseUrl : '',
			pace : 200,
			dir : [ 'mr', 'gnl', 'lxh', 'bzmh' ],
			editArea : null,
			textOut : true,
			target : $(this)
		}
		var op = $.extend(defaults, options);
		emoji.init(op);
		var id = op.faceId;
		$(this).click(function() {
			if (!$("#" + id + "  > ul.rl_exp_tab > li > a.selected").hasClass("loaded")) {
				$("#" + id + "  > ul.rl_exp_tab > li > a.selected").click();
			}
			var offset = $(this).position();
			var top = offset.top - $('#' + id).outerHeight() - 2;
			$('#' + id).css('top', top).fadeIn(op.pace);
			// $('#'+id).css('left',offset.left - $('#'+id).width()/3);
		});
	};
})(jQuery);