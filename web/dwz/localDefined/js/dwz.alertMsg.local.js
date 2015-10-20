$.setRegional("alertMsg", {
	title : {
		error : "错误提示",
		info : "消息提示",
		warn : "警告提示",
		correct : "成功提示",
		confirm : "确认提示",
		chooseOne : "选择提示"
	},
	butMsg : {
		ok : "OK",
		yes : "Yes",
		no : "No",
		cancel : "Cancel",
		chooseOne : {
			close : true,
			one : "One",
			two : "Two"
		}
	}
});
var alertMsg = $.extend(true, alertMsg, {
	_types : $.extend(true, alertMsg._types, {
		chooseOne : "chooseOne"
	}),
	_open : function(type, msg, buttons, tool) {
		$(this._boxId).remove();
		var butsHtml = "";
		if (buttons) {
			for (var i = 0; i < buttons.length; i++) {
				var sRel = buttons[i].call ? "callback" : "";
				butsHtml += DWZ.frag["alertButFrag"].replace("#butMsg#", buttons[i].name).replace("#callback#", sRel);
			}
		}
		var toolHtml = "";
		if (tool) {
			if (tool.close) {
				toolHtml += DWZ.frag["alertCloseFrag"];
			}
		}
		var boxHtml = DWZ.frag["alertBoxFrag"].replace("#type#", type).replace("#title#", this._getTitle(type)).replace("#message#", msg).replace("#butFragment#", butsHtml);
		$(boxHtml).appendTo("body").css({
			top : -$(this._boxId).height() + "px"
		}).animate({
			top : "0px"
		}, 500);

		$(this._boxId).find("." + type).prepend(toolHtml);

		if (this._closeTimer) {
			clearTimeout(this._closeTimer);
			this._closeTimer = null;
		}
		if (this._types.info == type || this._types.correct == type) {
			this._closeTimer = setTimeout(function() {
				alertMsg.close()
			}, 3500);
		} else {
			$(this._bgId).show();
		}

		var jButs = $(this._boxId).find("a.button");
		var jCallButs = jButs.filter("[rel=callback]");
		var jDoc = $(document);

		for (var i = 0; i < buttons.length; i++) {
			if (buttons[i].call)
				jCallButs.eq(i).click(buttons[i].call);
			if (buttons[i].keyCode == DWZ.keyCode.ENTER) {
				jDoc.bind("keydown", {
					target : jButs.eq(i)
				}, this._keydownOk);
			}
			if (buttons[i].keyCode == DWZ.keyCode.ESC) {
				jDoc.bind("keydown", {
					target : jButs.eq(i)
				}, this._keydownEsc);
			}
		}

		var jTool = $(this._boxId).find(".alertTool a.close");
		var jCallTool = jTool.filter("[rel=callback]");
		if (tool) {
			if (tool.close) {
				if (tool.keyCode == DWZ.keyCode.ESC) {
					jDoc.bind("keydown", {
						target : jTool
					}, this._keydownEsc);
				}
			}
		}
	},
	chooseOne : function(msg, options) {
		var op = {
			one : $.regional.alertMsg.butMsg.chooseOne.one,
			oneCall : null,
			two : $.regional.alertMsg.butMsg.chooseOne.two,
			towCall : null,
			close : $.regional.alertMsg.butMsg.chooseOne.close,
		};
		$.extend(op, options);
		var buttons = [ {
			name : op.one,
			call : op.oneCall,
			keyCode : null
		}, {
			name : op.two,
			call : op.towCall,
			keyCode : null
		} ];

		var tool = {
			close : op.close,
			keyCode : DWZ.keyCode.ESC
		};
		this._open(this._types.chooseOne, msg, buttons, tool);
	}
});