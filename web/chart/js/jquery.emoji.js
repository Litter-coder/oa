/**
 * <pre>
 * 参数说明 
 * faceId : 【字符串】表情窗口div的ID
 * templateId : 【字符串】表情模版窗口div的ID
 * baseUrl: 【字符串】表情路径的基地址 
 * pace: 【数字】表情弹出层淡入淡出的速度 
 * editArea : 【jQuery对象】编辑区域
 * isTextOut : 【boolean】输出到编辑区域是否是文本
 * tip : 【字符串】输出的文本格式
 * target : 【jQuery对象】表情窗口输出的指向对象
 * dir: 【数组】保存表情包文件夹名字
 * text: 【二维数组】保存表情包title文字 
 * num: 【数组】保存表情包表情个数 
 * isExist: 【数组】保存模版表情是否加载过,对于加载过的模版表情包不重复请求。
 * </pre>
 */
var emoji = {
	defaults : {
		faceId : "faceId",
		templateId : 'rl_bq',
		baseUrl : '',
		pace : 200,
		editArea : null,
		isTextOut : true,
		tip : "[:#tip#:]",
		target : null
	},
	dir : [ 'mr', 'gnl', 'lxh', 'bzmh' ],
	text : [ /* 表情包title文字，自己补充 */
	[], [], [], [] ],
	num : [ 131, 46, 83, 70 ],
	isExist : [ 0, 0, 0, 0 ],
	bind : function(index, op) {
		var id = op.faceId;
		$("#" + id + " .rl_exp_main").eq(index).find('.rl_exp_item').each(function() {
			$(this).bind('click', function() {
				var str = $(this).find('img').attr('title') || $(this).find('img').attr("src").replace(op.baseUrl + emoji.dir[index] + '/', '').replace(".gif", '');
				str = op.tip.replace("#tip#", emoji.dir[index] + "/" + str);
				if (op.editArea.is("textarea")) {
					emoji.insertTextarea(op.editArea, str);
				} else {
					str = op.isTextOut ? $(str)[0] : $(this).find('img').clone()[0];
					emoji.insertDivtextarea(op.editArea[0], str);
					$("img", op.editArea).bind("click", function() {
						return false;
					})
				}
				$('#' + id).fadeOut(op.pace);
			});
		});
	},
	/* 加载表情包函数 */
	loadImg : function(index, op) {
		var id = op.faceId;
		if (!emoji.isExist[index]) {// 如果模版没有加载表情时
			var node = $("#" + op.templateId + " .rl_exp_main").eq(index);
			for (var j = 0; j < emoji.num[index]; j++) {
				var title = emoji.text[index][j] || "";
				var domStr = '<li class="rl_exp_item">' + '<img src="' + op.baseUrl + emoji.dir[index] + '/' + j + '.gif" unselectable="on" alt="' + title + '" title="' + title + '" />' + '</li>';
				$(domStr).appendTo(node);
			}
			emoji.isExist[index] = 1;
		}
		node.children().clone().appendTo($("#" + id + " .rl_exp_main").eq(index));
		emoji.bind(index, op);
	},
	/* 在textarea里光标后面插入文字 */
	insertTextarea : function(obj, str) {
		obj = obj[0];
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
	/* 在div contenteditable里光标后面插入文字或者图片 */
	insertDivtextarea : function(inputTarget, domNode) {
		if (domNode == null || inputTarget == null) {
			return;
		}
		inputTarget.focus();
		var sel = null;
		var rang = null;
		if (window.getSelection()) {
			sel = window.getSelection();
			rang = sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
			if (rang === null) {
				var tipMessage = "无法插入内容";
				alert(tipMessage)
				return;
			}
			rang.deleteContents();
			// 如果选择的对象是输入框时执行操作
			if (sel.focusNode === inputTarget.innerHTML || sel.focusNode.parentElement === inputTarget || sel.focusNode === inputTarget) {
				rang.insertNode(domNode);
			} else {
				var tipMessage = "无法插入内容，请检查焦点是否在输入框中";
				alert(tipMessage)
				return;
			}
			// 光标移动至末尾
			var tempRange = document.createRange();
			var chatmessage = inputTarget;
			var position = rang.endOffset;
			tempRange.selectNodeContents(chatmessage);
			tempRange.setStart(rang.endContainer, rang.endOffset);
			tempRange.setEnd(rang.endContainer, rang.endOffset);
			sel.removeAllRanges();
			sel.addRange(tempRange);
		} else {// ie9 以下版本
			textRange = document.selection.createRange();
			if (textRange === null) {
				var tipMessage = "无法插入内容";
				alert(tipMessage)
				return;
			}
			// 插入 dom节点
			textRange.collapse(false)
			textRange.pasteHTML(domNode.outerHTML);
			textRange.select();
		}
	},
	initTemplate : function(op) {
		var templeDiv = $('<div class="rl_exp" id="' + op.templateId + '" style="display:none;"></div>');
		var templeUl = $('<ul class="rl_exp_tab clearfix"></ul>')
		templeUl.append('<li><a href="javascript:void(0);" class="selected">默认</a></li>').append('<li><a href="javascript:void(0);">拜年</a></li>').append(
				'<li><a href="javascript:void(0);">浪小花</a></li>').append('<li><a href="javascript:void(0);">暴走漫画</a></li>').appendTo(templeDiv);
		var emjDiv = $('<div class="rl_exp_emjarea"></div>');
		for (var i = 0; i < emoji.dir.length; i++) {
			var ulStr = $('<ul class="rl_exp_main clearfix" style="display:none;"></ul>');
			i == 0 && ulStr.addClass("rl_selected");
			emjDiv.append(ulStr);
		}
		templeDiv.append(emjDiv).append('<a href="javascript:void(0);" class="close">×</a>').appendTo("body");

	},
	init : function(op) {
		op = $.extend(emoji.defaults, op);
		if (!$("#" + op.templateId)[0]) {
			emoji.initTemplate(op);
		}
		var id = op.faceId;
		if (id == op.templateId) {
			alert("该元素的id与模版id重复");
			return;
		} else if ($("#" + id)[0]) {
			alert("该元素的id已存在");
			return;
		}
		// 元素克隆复制
		var thisFace = $("#" + op.templateId).clone();
		thisFace.attr("id", id).appendTo(op.target);

		// 给元素下的标签添加事件
		$("#" + id + " > ul.rl_exp_tab > li").each(function(index) {
			$(this).bind('click', function(e) {
				var _this = $("a", $(this));

				if (_this.hasClass('selected') && _this.hasClass("loaded"))
					return;
				if (!_this.hasClass("loaded")) {
					emoji.loadImg(index, op);
					_this.addClass("loaded");
				}
				$("#" + id + " > ul.rl_exp_tab > li > a.selected").removeClass('selected');
				_this.addClass('selected');
				$('#' + id + ' .rl_selected').removeClass('rl_selected').hide();
				$('#' + id + ' .rl_exp_main').eq(index).addClass('rl_selected').show();

				e.stopPropagation();
			});
		});

		/* 绑定关闭按钮 */
		$('#' + id + ' a.close').bind('click', function() {
			$('#' + id).fadeOut(op.pace);
		});
		/* 绑定document点击事件，对target不在rl_bq弹出框上时执行rl_bq淡出，并阻止target在弹出按钮的响应。 */
		$(document).bind('click', function(e) {
			var target = $(e.target);
			if (target.closest("#" + id).length == 1)
				return;
			if (target.closest("#" + id).length == 0) {
				$('.rl_exp').fadeOut(op.pace);
			}
		});
	}
};

// 表情插件
(function($) {
	$.fn.emoji = function(options) {
		var op = $.extend(emoji.defaults, options);
		op.target = op.target || $(this).parent();
		emoji.init(op);
		var id = op.faceId;
		$(this).click(function() {
			if ($("#" + id).is(":visible")) {
				$('#' + id).fadeOut(op.pace);
			} else {
				if (!$("#" + id + "  > ul.rl_exp_tab > li > a.selected").hasClass("loaded")) {
					$("#" + id + "  > ul.rl_exp_tab > li > a.selected").parent("li:eq(0)").click();
				}
				var offset = $(this).position();
				var top = offset.top - $('#' + id).outerHeight() - 2;
				$('#' + id).css('top', top).fadeIn(op.pace);
				// $('#'+id).css('left',offset.left - $('#'+id).width()/3);
			}
		});
	};
	/**
	 * 用于部分浏览器在可编辑div使用focus时光标不在最后的方法
	 */
	$.fn.focusEnd = function() {
		var editor = $(this)[0];
		editor.focus();
		var sel, range;
		if (window.getSelection && document.createRange) {
			range = document.createRange();
			range.selectNodeContents(editor);
			range.collapse(false);
			sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
		} else if (document.body.createTextRange) {
			range = document.body.createTextRange();
			range.moveToElementText(editor);
			range.collapse(true);
			range.select();
		}
	}
})(jQuery);