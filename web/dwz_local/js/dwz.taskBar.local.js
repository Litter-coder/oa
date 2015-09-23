/**
 * @author Roger Wu
 * @version 1.0
 */
(function($) {

	$.fn.extend({
		jTask : function(options) {
			return this.each(function() {
				var $task = $(this);
				var id = $task.attr("id");
				$task.click(function(e) {
					if (id == "combinable_task") {
						var dialogCombinable = $("body").data("dialogCombinable");
						if ($task.hasClass("selected")) {
							$("a.minimize", $.pdialog._current).trigger("click");
						} else {
							if (dialogCombinable.is(":hidden")) {
								$.taskBar.restoreDialog(dialogCombinable);
							} else
								$(dialogCombinable).trigger("click");
						}
					} else {
						var dialog = $("body").data(id);
						if ($task.hasClass("selected")) {
							$("a.minimize", dialog).trigger("click");
						} else {
							if (dialog.is(":hidden")) {
								$.taskBar.restoreDialog(dialog);
							} else
								$(dialog).trigger("click");
						}
					}
					$.taskBar.scrollCurrent($(this));
					return false;
				});
				$("div.close", $task).click(function(e) {
					if (id == "combinable_task") {
						$task.trigger("click");
						$("a.close", $.pdialog._current).trigger("click");

					} else {
						$.pdialog.close(id)
					}
					return false;
				}).hoverClass("closeHover");

				$task.hoverClass("hover");
			});
		}
	});
	$.taskBar = $.extend(true, $.taskBar, {
		init : function(options) {
			var $this = this;
			$.extend(this._op, options);
			this._taskBar = $("#" + this._op.id);
			if (this._taskBar.size() == 0) {
				this._taskBar = $(DWZ.frag["taskbar"]).appendTo($("#layout"));

				this._taskBar.find(".taskbarLeft").hoverClass("taskbarLeftHover");
				this._taskBar.find(".taskbarRight").hoverClass("taskbarRightHover");
			}
			this._taskBox = this._taskBar.find(this._op.taskBox);
			this._taskList = this._taskBox.find(">ul");
			this._prevBut = this._taskBar.find(this._op.prevBut);
			this._nextBut = this._taskBar.find(this._op.nextBut);
			this._prevBut.click(function(e) {
				$this.scrollLeft()
			});
			this._nextBut.click(function(e) {
				$this.scrollRight()
			});

			this._contextmenu(this._taskBox); // taskBar右键菜单
		},
		/**
		 * 在任务栏上新加一个任务
		 * 
		 * @param {Object}
		 *            id
		 * @param {Object}
		 *            title
		 */
		addDialog : function(id, title) {
			this.show();
			var task = $("#" + id, this._taskList);
			if (!task[0]) {
				var taskFrag = '<li id="#taskid#"><div class="taskbutton"><span>#title#</span></div><div class="close">Close</div></li>';
				this._taskList.append(taskFrag.replace("#taskid#", id).replace("#title#", title));
				task = $("#" + id, this._taskList);
				task.jTask();
			} else {
				$(">div>span", task).text(title);
			}
			this._contextmenu(task);
			this.switchTask(id);
			this._scrollTask(task);
		},
		/**
		 * 关闭一个任务
		 * 
		 * @param {Object}
		 *            id
		 */
		closeDialog : function(obj) {
			var task = (typeof obj == 'string') ? $("#" + obj, this._taskList) : obj;
			task.remove();
			if (this._getTasks().size() == 0) {
				this.hide();
			}
			this._scrollCurrent();
		},
		/**
		 * 
		 * @param {Object}
		 *            id or dialog
		 */
		restoreDialog : function(obj) {
			var id;
			if (typeof obj != 'string' && obj.is(".dialogCombinable")) {
				id = "combinable_task";
				var task = $.taskBar.getTask(id);
				$(".resizable").css({
					top : $(window).height() - 60,
					left : $(task).position().left,
					height : $(task).outerHeight(),
					width : $(task).outerWidth()
				}).show().animate({
					top : $(obj).css("top"),
					left : $(obj).css("left"),
					width : $(obj).css("width"),
					height : $(obj).css("height")
				}, 250, function() {
					$(this).hide();
					$(obj).show();
				});
			} else {
				var dialog = (typeof obj == 'string') ? $("body").data(obj) : obj;
				var id = (typeof obj == 'string') ? obj : dialog.data("id");
				var task = $.taskBar.getTask(id);
				$(".resizable").css({
					top : $(window).height() - 60,
					left : $(task).position().left,
					height : $(task).outerHeight(),
					width : $(task).outerWidth()
				}).show().animate({
					top : $(dialog).css("top"),
					left : $(dialog).css("left"),
					width : $(dialog).css("width"),
					height : $(dialog).css("height")
				}, 250, function() {
					$(this).hide();
					$(dialog).show();
				});
			}
			$.taskBar.switchTask(id);
		},
		/**
		 * 把任务变成不是当前的
		 * 
		 * @param {Object}
		 *            id
		 */
		inactive : function(id) {
			$("#" + id, this._taskList).removeClass("selected");
		},
		/**
		 * 移出当前点击的任务
		 * 
		 * @param {Object}
		 *            task
		 */
		scrollCurrent : function(task) {
			this._scrollTask(task);
		},
		/**
		 * 切换任务
		 * 
		 * @param {Object}
		 *            id
		 */
		switchTask : function(id, title) {
			this._getCurrent().removeClass("selected");
			this.getTask(id).addClass("selected");
			if (title) {
				$(">div>span", this.getTask(id)).text(title);
			}
		},
		getTask : function(id) {
			return $("#" + id, this._taskList);
		},
		/**
		 * 显示任务栏
		 */
		show:function(){
			if (this._taskBar.is(":hidden")) {
				this._taskBar.css("top", $(window).height() - 34 + this._taskBar.outerHeight()).show();
				this._taskBar.animate({
					top: $(window).height() - this._taskBar.outerHeight() - $("#footer").height() - 2
				}, 500);
				$(window).resize();
			}
		},
		/**
		 * 隐藏任务栏
		 */
		hide:function(){
			this._taskBar.animate({
				top: $(window).height() - 29 + this._taskBar.outerHeight(true)
			}, 500,function(){
				$.taskBar._taskBar.hide();
				$(window).resize();
			});
		}
	});
})(jQuery);