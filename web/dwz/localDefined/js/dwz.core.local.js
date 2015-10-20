DWZ = $.extend(DWZ, {
	eventType : {
		pageClear : "pageClear", // 用于重新ajaxLoad、关闭nabTab,
									// 关闭dialog时，去除xheditor等需要特殊处理的资源
		resizeGrid : "resizeGrid", // 用于窗口或dialog大小调整
		ajaxLoadingMask : "loadingmask" // 用于navTab遮罩
	},
	cookie : function(name, data) {// 用于cookie中存储和获取json
		if ($.isFunction($.cookie)) {
			if (!data) {
				var result = $.cookie(name);

				if (result && JSON.parse(result)) {
					return JSON.parse(result);
				}
				return result;
			} else {
				if ($.type(data) == "object") {
					$.cookie(name, JSON.stringify(data));
				} else {
					$.cookie(name, data);
				}
			}
		}
		return null;
	}
});

(function($) {
	$.fn.extend({
		/**
		 * @param {Object}
		 *            op: {type:GET/POST, url:ajax请求地址, data:ajax请求参数列表,
		 *            callback:回调函数 }
		 */
		ajaxUrl : function(op) {
			var $this = $(this);

			$this.trigger(DWZ.eventType.pageClear);
			// 加入自定义遮罩
			if (op.loadingmask) {
				$this.trigger(DWZ.eventType.ajaxLoadingMask);
			}

			$.ajax({
				type : op.type || 'POST',
				url : op.url,
				data : op.data,
				cache : false,
				success : function(response) {
					var json = DWZ.jsonEval(response);

					if (json[DWZ.keys.statusCode] == DWZ.statusCode.timeout) {
						if ($.pdialog)
							$.pdialog.checkTimeout();
						if (navTab)
							navTab.checkTimeout();

						alertMsg.error(json[DWZ.keys.message] || DWZ.msg("sessionTimout"), {
							okCall : function() {
								DWZ.loadLogin();
							}
						});
					} else if (json[DWZ.keys.statusCode] == DWZ.statusCode.error) {
						if (json[DWZ.keys.message])
							alertMsg.error(json[DWZ.keys.message]);
					} else {
						$this.html(response).initUI();
						if ($.isFunction(op.callback))
							op.callback(response);
					}

				},
				error : DWZ.ajaxError,
				statusCode : {
					503 : function(xhr, ajaxOptions, thrownError) {
						alert(DWZ.msg("statusCode_503") || thrownError);
					}
				}
			});
		},
		positionBy : function(obj) {
			if ($.type(obj) == 'string') {
				obj = $(obj);
			}

			var thisLeft = this.offset().left;
			var thisTop = this.offset().top;
			var thisParent = this.parent();

			var objLeft = obj.offset().left;
			var objTop = obj.offset().top;

			return {
				left : thisLeft - objLeft,
				top : thisTop - objTop
			};
		}
	});
})(jQuery)