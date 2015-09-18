/**
 * @author Roger Wu reference:dwz.drag.js, dwz.dialogDrag.js, dwz.resize.js,
 *         dwz.taskBar.js
 */
(function($) {
	$.pdialog = $.extend(true, $.pdialog, {
		_currentItem : null,
		_op : {
			combinable : false
		},
		getAllCombDialog : function() {
			var dialogCombinable = $("body").data("dialogCombinable");
			if (dialogCombinable) {
				return $(".dialog", $(".dialogCombinableContent", dialogCombinable));
			}
			return null;
		},
		reload : function(url, options) {
			var op = $.extend({
				data : {},
				dialogId : "",
				callback : null
			}, options);
			var dialog = (op.dialogId && $("body").data(op.dialogId)) || this._current;
			if (dialog) {
				var jDContent = dialog.find(".dialogContent");
				jDContent.ajaxUrl({
					type : "POST",
					url : url,
					data : op.data,
					callback : function(response) {
						jDContent.find("[layoutH]").layoutH(jDContent);
						$(".pageContent", dialog).width($(dialog).width() - 14);
						$(":button.close", dialog).click(function() {
							$.pdialog.close(dialog);
							return false;
						});
						if ($.isFunction(op.callback))
							op.callback(response);
					}
				});
			}
		},
		// 打开一个层
		open : function(url, dlgid, title, options) {
			var op = $.extend({}, $.pdialog._op, options);
			op = $.pdialog._reinitOptions(op);

			var dialog = $("body").data(dlgid);
			var dialogCombinable = $("body").data("dialogCombinable");
			var item;

			if (!dialog && dialogCombinable) {// 如果不存在
				item = dialogCombinable.data(dlgid);
				if (item) {
					dialog = item.data(dlgid);
				}
			}

			// 重复打开一个层
			if (dialog) {
				if (eval(dialog.data("combinable"))) {
					if (dialogCombinable.is(":hidden")) {
						dialogCombinable.show();
					}
					$.pdialog._reLocationItem(item);
					item.trigger("click");
				} else {
					if (dialog.is(":hidden")) {
						dialog.show();
					}
				}
				if (op.fresh || url != $(dialog).data("url")) {
					dialog.data("url", url);
					dialog.find(".dialogHeader").find("h1").html(title);
					this.switchDialog(dialog);
					var jDContent = dialog.find(".dialogContent");
					jDContent.loadUrl(url, {}, function() {
						jDContent.find("[layoutH]").layoutH(jDContent);
						$(".pageContent", dialog).width($(dialog).width() - 14);
						$("button.close").click(function() {
							$.pdialog.close(dialog);
							return false;
						});
					});
				}

			} else { // 打开一个全新的层
				// 合并
				if (op.combinable) {
					if (!dialogCombinable) {
						$("body").append(DWZ.frag["dialogCombinableFrag"]);
						dialogCombinable = $(">.dialogCombinable", "body");

						$.pdialog._initDialogComb(dialogCombinable, op);

						$(dialogCombinable).click(function() {
							var id = $.pdialog._currentItem.attr("id");
							$.pdialog.switchDialog($.pdialog._currentItem.data(id));
						});
					}
					$("body").data("dialogCombinable", dialogCombinable);

					if (dialogCombinable.is(":hidden")) {
						dialogCombinable.show();
					}

					if ($.pdialog._currentItem) {
						$.pdialog._currentItem.removeClass("selected");
					}

					var itemStr = '<li class="selected" id="' + dlgid
							+ '"><div class="dialogCombinableItem"><p><img src="../images/index/woman-menu.png" />#title#</p><a class="closeItem" href="javascript:;" /></div></li>';
					dialogCombinable.find("ul").append(itemStr.replace("#title#", title));

					item = $("#" + dlgid, dialogCombinable);
					var dialogComContent = $(">.dialogCombinableContent", dialogCombinable);
					dialogComContent.append(DWZ.frag["dialogFrag"]);
					dialog = $(">.dialog:last-child", dialogComContent);
					item.data(dlgid, dialog);
					dialogCombinable.data(dlgid, item);

					$.pdialog._reLocationItem(item);

					item.hoverClass().click(function(event) {
						if ($(event.target).is("a")) {
							return false;
						}
						if ($(this).hasClass("selected")) {
							return false;
						}
						$.pdialog._currentItem.removeClass("selected");

						$(this).addClass("selected")
						var id = $(this).attr("id");
						$.pdialog.switchDialog($(this).data(id));
						$.pdialog._currentItem = $(this);
						return false;
					});
					$("a", item).click(function(event) {
						var targetItem = $(this).parents("li:eq(0)");
						var id = targetItem.attr("id");

						$.pdialog.close(targetItem.data(id));

						return false;
					});

					$.pdialog._currentItem = item;
				} else {
					$("body").append(DWZ.frag["dialogFrag"]);
					dialog = $(">.dialog:last-child", "body");

					$("body").data(dlgid, dialog);
				}
				dialog.data("id", dlgid);
				dialog.data("url", url);

				dialog.data("combinable", op.combinable);

				if (op.close)
					dialog.data("close", op.close);
				if (op.param)
					dialog.data("param", op.param);
				($.fn.bgiframe && dialog.bgiframe());

				dialog.find(".dialogHeader").find("h1").html(title);
				$(dialog).css("zIndex", ($.pdialog._zIndex += 2));

				if (op.combinable) {
					$(dialogCombinable).css("zIndex", $(dialog).css("zIndex"));
				}

				$.pdialog._init(dialog, op);
				if (!op.combinable) {
					$(dialog).click(function() {
						$.pdialog.switchDialog(dialog);
					});
				}

				if (op.resizable)
					dialog.jresize();

				if (op.drawable) {
					if (op.combinable) {
						dialogCombinable.dialogDrag();
					} else {
						dialog.dialogDrag();
					}
				}
				$("a.close", dialog).click(function(event) {
					if (eval(dialog.data("combinable"))) {
						if ($.pdialog.getAllCombDialog().length == 1) {
							$.pdialog.close(dialog);
							return false;
						}
						alertMsg.confirm("关闭此窗口所有会话还是仅关闭当前会话", {
							okName : "关闭所有",
							okCall : function() {
								var dialogCombinable = $("body").data("dialogCombinable");
								$.pdialog.getAllCombDialog().each(function() {
									$.pdialog.close($(this));
								});
							},
							cancelName : "关闭当前",
							cancelCall : function() {
								$.pdialog.close(dialog);
							}
						})
					} else {
						$.pdialog.close(dialog);
					}
					return false;
				});
				if (op.maxable) {
					$("a.maximize", dialog).show().click(function(event) {
						$.pdialog.switchDialog(dialog);
						$.pdialog.maxsize(dialog);
						dialog.jresize("destroy").dialogDrag("destroy");
						return false;
					});
				} else {
					$("a.maximize", dialog).hide();
				}
				$("a.restore", dialog).click(function(event) {
					$.pdialog.restore(dialog);
					if (!eval(dialog.data("combinable"))) {
						dialog.jresize().dialogDrag();
					}
					return false;
				});
				if (op.minable) {
					$("a.minimize", dialog).show().click(function(event) {
						$.pdialog.minimize(dialog);
						return false;
					});
				} else {
					$("a.minimize", dialog).hide();
				}
				$("div.dialogHeader a", dialog).mousedown(function() {
					return false;
				});
				$("div.dialogHeader", dialog).dblclick(function() {
					if ($("a.restore", dialog).is(":hidden"))
						$("a.maximize", dialog).trigger("click");
					else
						$("a.restore", dialog).trigger("click");
				});
				if (op.max) {
					// $.pdialog.switchDialog(dialog);
					$.pdialog.maxsize(dialog);
					dialog.jresize("destroy").dialogDrag("destroy");
				}

				$.pdialog._current = dialog;

				if (op.combinable && dialogCombinable.data("original")) {
					$("a.maximize", dialog).hide();
					$("a.restore", dialog).show();
				}

				// load data
				var jDContent = $(".dialogContent", dialog);
				jDContent.loadUrl(url, {}, function() {
					jDContent.find("[layoutH]").layoutH(jDContent);
					$(".pageContent", dialog).width($(dialog).width() - 14);
					$("button.close").click(function() {
						$.pdialog.close(dialog);
						return false;
					});
				});
			}
			if (op.mask) {
				$(dialog).css("zIndex", 1000);
				$("a.minimize", dialog).hide();
				$(dialog).data("mask", true);
				$("#dialogBackground").show();
			} else {
				// add a task to task bar
				if (op.minable) {
					if (op.combinable) {
						$.taskBar.addDialog("combinable_task", title);
					} else {
						$.taskBar.addDialog(dlgid, title);
					}
				}
			}
		},
		// 重置组合窗口的默认值，使得传递过来的参数无法影响代码执行
		_reinitOptions : function(op) {
			if (op.combinable) {
				op = $.extend(true, op, {
					height:500, 
					width:650, 
					minH : 250,
					minW : 450,
					itemsW : 198,
					resizable : false,
					mask : false
				})
			}
			return op;
		},
		_reLocationItem : function(item) {
			var dialogCombinable = $("body").data("dialogCombinable");
			var titlesVH = $(".dialogCombinableItems", dialogCombinable).height();// 可见高
			var itemB; // item底部距父级元素的距离
			var top = item.positionBy($(".dialogCombinableItems", dialogCombinable)).top;
			if (top < 0) {
				itemB = top;
			} else {
				itemB = top + item.outerHeight();
			}

			var scrollTop = $(".dialogCombinableItems", dialogCombinable).scrollTop();
			if (itemB < 0) {
				$(".dialogCombinableItems", dialogCombinable).scrollTop(itemB);
			} else if (itemB >= titlesVH) {
				$(".dialogCombinableItems", dialogCombinable).scrollTop(scrollTop + itemB - titlesVH);
			}
		},
		/**
		 * 切换当前层
		 * 
		 * @param {Object}
		 *            dialog
		 */
		switchDialog : function(dialog) {
			if ($.pdialog._current == dialog) {
				return;
			}
			var index = $(dialog).css("zIndex");
			if ($.pdialog._current) {
				/**
				 * 合并窗口内的切换时，zIndex值可相互切换，但合并窗口和外部层切换时，只切换合并窗口的zIndex,而不改变里面的dialog的zIndex
				 */
				if ((eval($($.pdialog._current).data("combinable")) && !eval(dialog.data("combinable"))) //
						|| (eval($(dialog).data("combinable")) && !eval($.pdialog._current.data("combinable")))) {
					var comIndex = $("body").data("dialogCombinable").css("zIndex");
					$("body").data("dialogCombinable").css("zIndex", index);
					if (eval($(dialog).data("combinable"))) {
						$($.pdialog._current).css("zIndex", comIndex);
					} else {
						$(dialog).css("zIndex", comIndex);
					}
				} else {
					var cindex = $($.pdialog._current).css("zIndex");
					$($.pdialog._current).css("zIndex", index);
					$(dialog).css("zIndex", cindex);
				}
				$.pdialog._current = dialog;
			}
			if (!eval(dialog.data("combinable"))) {
				$.taskBar.switchTask(dialog.data("id"));
			} else {
				$.taskBar.switchTask("combinable_task", $("div.dialogHeader h1", dialog).text());
			}
		},
		/**
		 * 给当前层附上阴隐层
		 * 
		 * @param {Object}
		 *            dialog
		 */
		attachShadow : function(dialog) {
			var shadow = $("div.shadow");
			if (shadow.is(":hidden"))
				shadow.show();
			shadow.css({
				top : parseInt($(dialog)[0].style.top) - 2,
				left : parseInt($(dialog)[0].style.left) - 4,
				height : parseInt($(dialog).height()) + 8,
				width : parseInt($(dialog).width()) + 8,
				zIndex : parseInt($(dialog).css("zIndex")) - 1
			});
			$(".shadow_c", shadow).children().andSelf().each(function() {
				$(this).css("height", $(dialog).outerHeight() - 4);
			});
		},
		_init : function(dialog, options) {
			var op = $.extend({}, this._op, options);

			if (!op.combinable) {
				var height = op.height > op.minH ? op.height : op.minH;
				var width = op.width > op.minW ? op.width : op.minW;
				if (isNaN(dialog.height()) || dialog.height() < height) {
					$(dialog).height(height + "px");
					$(".dialogContent", dialog).height(height - $(".dialogHeader", dialog).outerHeight() - $(".dialogFooter", dialog).outerHeight() - 6);
				}
				if (isNaN(dialog.css("width")) || dialog.width() < width) {
					$(dialog).width(width + "px");
				}

				var iTop = ($(window).height() - dialog.height()) / 2;
				dialog.css({
					left : ($(window).width() - dialog.width()) / 2,
					top : iTop > 0 ? iTop : 0
				});
			} else {
				var dialogCombinable = $("body").data("dialogCombinable");
				var height = parseInt(dialogCombinable.height());
				var width = parseInt(dialogCombinable.width());
				var combTitleWidth = parseInt($("div.dialogCombinableItems", dialogCombinable).outerWidth());
				$(dialog).height(height + "px");
				$(".dialogContent", dialog).height(height - $(".dialogHeader", dialog).outerHeight() - $(".dialogFooter", dialog).outerHeight() - 6);
				$(dialog).width(width - combTitleWidth + "px");
				dialog.css({
					left : 0,
					top : 0
				});
			}
		},
		/**
		 * 初始化合并窗口
		 */
		_initDialogComb : function(dialogComb, options) {
			var op = $.extend({}, this._op, options);

			var height = op.height > op.minH ? op.height : op.minH;
			var width = op.width > op.minW ? op.width : op.minW;
			dialogComb.height(height + "px");
			dialogComb.width(width + "px");
			var itemsW = op.itemsW;
			
			$(">.dialogCombinableItems", dialogComb).width(itemsW + "px");
			$(">.dialogCombinableItems", dialogComb).height(dialogComb.height() - 2 + "px");
			itemsW = $(">.dialogCombinableItems", dialogComb).outerWidth();
			$(">.dialogCombinableContent", dialogComb).width(dialogComb.width() - itemsW + "px");
			$(">.dialogCombinableContent", dialogComb).height(dialogComb.height() + "px");
			var iTop = ($(window).height() - dialogComb.height()) / 2;
			var iLeft = ($(window).width() - dialogComb.width()) / 2;
			dialogComb.css({
				left : iLeft,
				top : iTop,
				zIndex : $.pdialog._zIndex
			});
		},
		/**
		 * 初始化半透明层
		 * 
		 * @param {Object}
		 *            resizable
		 * @param {Object}
		 *            dialog
		 * @param {Object}
		 *            target
		 */
		initResize : function(resizable, dialog, target) {
			$("body").css("cursor", target + "-resize");
			resizable.css({
				top : $(dialog).css("top"),
				left : $(dialog).css("left"),
				height : $(dialog).css("height"),
				width : $(dialog).css("width")
			});
			resizable.show();
		},
		/**
		 * 改变阴隐层
		 * 
		 * @param {Object}
		 *            target
		 * @param {Object}
		 *            options
		 */
		repaint : function(target, options) {
			var shadow = $("div.shadow");
			if (target != "w" && target != "e") {
				shadow.css("height", shadow.outerHeight() + options.tmove);
				$(".shadow_c", shadow).children().andSelf().each(function() {
					$(this).css("height", $(this).outerHeight() + options.tmove);
				});
			}
			if (target == "n" || target == "nw" || target == "ne") {
				shadow.css("top", options.otop - 2);
			}
			if (options.owidth && (target != "n" || target != "s")) {
				shadow.css("width", options.owidth + 8);
			}
			if (target.indexOf("w") >= 0) {
				shadow.css("left", options.oleft - 4);
			}
		},
		/**
		 * 改变左右拖动层的高度
		 * 
		 * @param {Object}
		 *            target
		 * @param {Object}
		 *            tmove
		 * @param {Object}
		 *            dialog
		 */
		resizeTool : function(target, tmove, dialog) {
			$("div[class^='resizable']", dialog).filter(function() {
				return $(this).attr("tar") == 'w' || $(this).attr("tar") == 'e';
			}).each(function() {
				$(this).css("height", $(this).outerHeight() + tmove);
			});
		},
		/**
		 * 改变原始层的大小
		 * 
		 * @param {Object}
		 *            obj
		 * @param {Object}
		 *            dialog
		 * @param {Object}
		 *            target
		 */
		resizeDialog : function(obj, dialog, target) {
			var oleft = parseInt(obj.style.left);
			var otop = parseInt(obj.style.top);
			var height = parseInt(obj.style.height);
			var width = parseInt(obj.style.width);
			if (target == "n" || target == "nw") {
				tmove = parseInt($(dialog).css("top")) - otop;
			} else {
				tmove = height - parseInt($(dialog).css("height"));
			}
			$(dialog).css({
				left : oleft,
				width : width,
				top : otop,
				height : height
			});
			$(".dialogContent", dialog).css("width", (width - 12) + "px");
			$(".pageContent", dialog).css("width", (width - 14) + "px");
			if (target != "w" && target != "e") {
				var content = $(".dialogContent", dialog);
				content.css({
					height : height - $(".dialogHeader", dialog).outerHeight() - $(".dialogFooter", dialog).outerHeight() - 6
				});
				content.find("[layoutH]").layoutH(content);
				$.pdialog.resizeTool(target, tmove, dialog);
			}
			// $.pdialog.repaint(target, {
			// oleft : oleft,
			// otop : otop,
			// tmove : tmove,
			// owidth : width
			// });

			$(window).trigger(DWZ.eventType.resizeGrid);
		},
		close : function(dialog, closeAll) {
			closeAll = closeAll || false;
			var dialogCombinable = $("body").data("dialogCombinable");
			if (typeof dialog == 'string') {
				dialog = $("body").data(dialog);
				if (!dialog) {
					if (!dialog && dialogCombinable) {// 如果不存在
						var item = dialogCombinable.data(dlgid);
						if (item) {
							dialog = item.data(dlgid);
						}
					}
				}
			}
			var close = dialog.data("close");
			var go = true;
			if (close && $.isFunction(close)) {
				var param = dialog.data("param");
				if (param && param != "") {
					param = DWZ.jsonEval(param);
					go = close(param);
				} else {
					go = close();
				}
				if (!go)
					return;
			}

			$(dialog).hide();
			if ($(dialog).data("mask")) {
				$("#dialogBackground").hide();
			} else {
				if ($(dialog).data("id")) {
					if (!eval($(dialog).data("combinable"))) {
						$.taskBar.closeDialog($(dialog).data("id"));

					}
				}
			}
			if (eval($(dialog).data("combinable"))) {
				var item = dialogCombinable.data($(dialog).data("id"));
				var showItem = item.next()[0] || item.prev()[0];

				dialogCombinable.removeData($(dialog).data("id"));
				item.trigger(DWZ.eventType.pageClear).remove();
				$(dialog).trigger(DWZ.eventType.pageClear).remove();
				if (showItem) {
					($.pdialog._current == dialog) && $(showItem).trigger("click");
				} else {
					$("body").removeData("dialogCombinable");
					$.taskBar.closeDialog("combinable_task");
					dialogCombinable.trigger(DWZ.eventType.pageClear).remove();
				}
			} else {
				$("body").removeData($(dialog).data("id"));
				$(dialog).trigger(DWZ.eventType.pageClear).remove();
			}

		},
		closeCurrent : function() {
			this.close($.pdialog._current);
		},
		checkTimeout : function() {
			var $conetnt = $(".dialogContent", $.pdialog._current);
			var json = DWZ.jsonEval($conetnt.html());
			if (json && json[DWZ.keys.statusCode] == DWZ.statusCode.timeout)
				this.closeCurrent();
		},
		maxsize : function(dialog) {
			var iContentW = $(window).width();
			var iContentH = $(window).height() - 34;
			if (eval(dialog.data("combinable"))) {
				var dialogCombinable = $("body").data("dialogCombinable");
				dialogCombinable.data("original", {
					top : $(dialogCombinable).css("top"),
					left : $(dialogCombinable).css("left"),
					width : $(dialogCombinable).css("width"),
					height : $(dialogCombinable).css("height")
				});

				$(dialogCombinable).css({
					top : "0px",
					left : "0px",
					width : iContentW + "px",
					height : iContentH + "px"
				});
				var itemsW = $(">.dialogCombinableItems", dialogCombinable).outerWidth();
				$(">.dialogCombinableItems", dialogCombinable).height(dialogCombinable.height() - 2 + "px");
				$(">.dialogCombinableContent", dialogCombinable).width(iContentW - itemsW + "px");
				$(">.dialogCombinableContent", dialogCombinable).height(iContentH + "px");

				$.pdialog.getAllCombDialog().each(function() {
					var _dialog = $(this);
					$("a.maximize", _dialog).hide();
					$("a.restore", _dialog).show();
					$(_dialog).css({
						top : "0px",
						left : "0px",
						width : iContentW - itemsW + "px",
						height : iContentH + "px"
					});
					$.pdialog._resizeContent(_dialog, iContentW - itemsW, iContentH);
				});
			} else {
				$(dialog).data("original", {
					top : $(dialog).css("top"),
					left : $(dialog).css("left"),
					width : $(dialog).css("width"),
					height : $(dialog).css("height")
				});
				$("a.maximize", dialog).hide();
				$("a.restore", dialog).show();

				$(dialog).css({
					top : "0px",
					left : "0px",
					width : iContentW + "px",
					height : iContentH + "px"
				});
				$.pdialog._resizeContent(dialog, iContentW, iContentH);
			}
		},
		restore : function(dialog) {
			if (eval(dialog.data("combinable"))) {
				var dialogCombinable = $("body").data("dialogCombinable");
				var original = $(dialogCombinable).data("original");
				var dwidth = parseInt(original.width);
				var dheight = parseInt(original.height);
				$(dialogCombinable).css({
					top : original.top,
					left : original.left,
					width : dwidth,
					height : dheight
				});
				dialogCombinable.removeData("original");

				$(">.dialogCombinableItems", dialogCombinable).height(dheight - 2 + "px");
				$(">.dialogCombinableContent", dialogCombinable).width(dwidth - 200 + "px");
				$(">.dialogCombinableContent", dialogCombinable).height(dheight + "px");

				$.pdialog.getAllCombDialog().each(function() {
					var _dialog = $(this);
					$("a.maximize", _dialog).show();
					$("a.restore", _dialog).hide();
					$(_dialog).css({
						top : "0px",
						left : "0px",
						width : dwidth - 200 + "px",
						height : dheight + "px"
					});
					$.pdialog._resizeContent(_dialog, dwidth - 200, dheight);
				});

			} else {
				var original = $(dialog).data("original");
				var dwidth = parseInt(original.width);
				var dheight = parseInt(original.height);
				$(dialog).css({
					top : original.top,
					left : original.left,
					width : dwidth,
					height : dheight
				});
				$.pdialog._resizeContent(dialog, dwidth, dheight);
				$("a.maximize", dialog).show();
				$("a.restore", dialog).hide();
			}
		},
		minimize : function(dialog) {
			if (eval(dialog.data("combinable"))) {
				var dialogCombinable = $("body").data("dialogCombinable");
				dialogCombinable.hide();
				var task = $.taskBar.getTask("combinable_task");
				$(".resizable").css({
					top : $(dialogCombinable).css("top"),
					left : $(dialogCombinable).css("left"),
					height : $(dialogCombinable).css("height"),
					width : $(dialogCombinable).css("width")
				}).show().animate({
					top : $(window).height() - 60,
					left : task.position().left,
					width : task.outerWidth(),
					height : task.outerHeight()
				}, 250, function() {
					$(this).hide();
					$.taskBar.inactive("combinable_task");
				});

			} else {
				$(dialog).hide();
				$("div.shadow").hide();
				var task = $.taskBar.getTask($(dialog).data("id"));
				$(".resizable").css({
					top : $(dialog).css("top"),
					left : $(dialog).css("left"),
					height : $(dialog).css("height"),
					width : $(dialog).css("width")
				}).show().animate({
					top : $(window).height() - 60,
					left : task.position().left,
					width : task.outerWidth(),
					height : task.outerHeight()
				}, 250, function() {
					$(this).hide();
					$.taskBar.inactive($(dialog).data("id"));
				});
			}
		},
		_resizeContent : function(dialog, width, height) {
			var content = $(".dialogContent", dialog);
			content.css({
				width : (width - 12) + "px",
				height : height - $(".dialogHeader", dialog).outerHeight() - $(".dialogFooter", dialog).outerHeight() - 6
			});
			content.find("[layoutH]").layoutH(content);
			$(".pageContent", dialog).css("width", (width - 14) + "px");

			$(window).trigger(DWZ.eventType.resizeGrid);
		}
	});
})(jQuery);