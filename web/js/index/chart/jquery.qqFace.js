// QQ表情插件
(function($) {
	$.replace_em = function(options) {
		var defaults = {
			id : 'facebox',
			path : 'face/',
			assign : 'content',
			tip : 'emoji_',
			callback : null
		};
		var option = $.extend(defaults, options);
		var assign = (typeof option.assign == 'string') ? $('#' + option.assign) : option.assign;
		var path = option.path;
		var str = assign.val();
		str = str.replace(/\</g, '&lt;');
		str = str.replace(/\>/g, '&gt;');
		str = str.replace(/\n/g, '<br/>');
		str = str.replace(/\[emoji_([0-9]*)\]/g, '<img src="' + path + '$1.gif" border="0" />');
		return str;
	};
	$.fn.qqFace = function(options) {
		var defaults = {
			id : 'facebox',
			path : 'face/',
			assign : 'content',
			tip : 'emoji_',
			callback : null
		};
		var option = $.extend(defaults, options);
		var assign = (typeof option.assign == 'string') ? $('#' + option.assign) : option.assign;
		;
		var id = option.id;
		var path = option.path;
		var tip = option.tip;
		var callback = option.callback;

		if (assign.length <= 0) {
			alert('缺少表情赋值对象。');
			return false;
		}

		$(this).click(function(e) {
			var strFace, labFace;
			if ($('#' + id).length <= 0) {
				strFace = '<div id="' + id + '" style="position:absolute;display:none;z-index:1000;" class="qqFace">' + '<table border="0" cellspacing="0" cellpadding="0"><tr>';
				for (var i = 1; i <= 75; i++) {
					labFace = '[' + tip + i + ']';
					strFace += '<td><img class="emo" src="' + path + i + '.gif" labFace="' + labFace + '" /></td>';
					if (i % 15 == 0)
						strFace += '</tr><tr>';
				}
				strFace += '</tr></table></div>';
			} else {
				$('#' + id).hide();
				$('#' + id).remove();
			}
			$(this).parent().append(strFace);
			$("img.emo", $(this).parent()).click(function() {
				var labFace = $(this).attr("labFace");
				assign.setCaret();
				assign.insertAtCaret(labFace);
				if ($.isFunction(callback)) {
					callback(assign);
				}
			});
			var offset = $(this).position();
			var top = offset.top - $('#' + id).outerHeight() - 2;
			$('#' + id).css('top', top);
			// $('#'+id).css('left',offset.left - $('#'+id).width()/3);
			$('#' + id).show();
			e.stopPropagation();
		});

		$(document).click(function() {
			$('#' + id).hide();
			$('#' + id).remove();
		});
	};
})(jQuery);

jQuery.extend({
	unselectContents : function() {
		if (window.getSelection)
			window.getSelection().removeAllRanges();
		else if (document.selection)
			document.selection.empty();
	}
});
jQuery.fn.extend({
	selectContents : function() {
		$(this).each(
				function(i) {
					var node = this;
					var selection, range, doc, win;
					if ((doc = node.ownerDocument) && (win = doc.defaultView) && typeof win.getSelection != 'undefined' && typeof doc.createRange != 'undefined' && (selection = window.getSelection())
							&& typeof selection.removeAllRanges != 'undefined') {
						range = doc.createRange();
						range.selectNode(node);
						if (i == 0) {
							selection.removeAllRanges();
						}
						selection.addRange(range);
					} else if (document.body && typeof document.body.createTextRange != 'undefined' && (range = document.body.createTextRange())) {
						range.moveToElementText(node);
						range.select();
					}
				});
	},

	setCaret : function() {
		if (!$.browser.msie)
			return;
		var initSetCaret = function() {
			var textObj = $(this).get(0);
			textObj.caretPos = document.selection.createRange().duplicate();
		};
		$(this).click(initSetCaret).select(initSetCaret).keyup(initSetCaret);
	},

	insertAtCaret : function(textFeildValue) {
		var textObj = $(this).get(0);
		if (document.all && textObj.createTextRange && textObj.caretPos) {
			var caretPos = textObj.caretPos;
			caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == '' ? textFeildValue + '' : textFeildValue;
		} else if (textObj.setSelectionRange) {
			var rangeStart = textObj.selectionStart;
			var rangeEnd = textObj.selectionEnd;
			var tempStr1 = textObj.value.substring(0, rangeStart);
			var tempStr2 = textObj.value.substring(rangeEnd);
			textObj.value = tempStr1 + textFeildValue + tempStr2;
			var len = textFeildValue.length;
			textObj.setSelectionRange(rangeStart + len, rangeStart + len);
		} else {
			textObj.value += textFeildValue;
		}
	}
});