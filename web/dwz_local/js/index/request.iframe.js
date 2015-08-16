(function($) {
	$.fn.reqIframe = function(options) {
		var op = $.extend(true, {}, $.fn.reqIframe.defaults, options);
		if ([ "get", "post" ].indexOf(op.type.toLowerCase()) == -1) {
			return {
				resultCode : 1,
				errorMsg : "type param error!"
			};
		}
		var $this = $(this);
		$this.each(function() {
			var $localIframe = $('<iframe src="' + op.localIframe.src + '" name="' + op.localIframe.name + '" style="display:none"></iframe>')
			$(this).append($localIframe);
			
			var $iframe = _iframeInit(op);
			$(this).append($iframe);
			alert($iframe.html())
			if ($.isFunction(op.callback)) {
				_iframeResponse($iframe[0], op.callback);
			}

		});
	}

	$.fn.reqIframe.defaults = {
		url : "http://ip.taobao.com/service/getIpInfo.php",
		type : "GET",
		params : {
			ip : "myip"
		},
		localIframe : {
			src : "",
			name : ""
		},
		callback : null
	}

	// 创建iframe
	function _iframeInit(options) {
		var _time = new Date().getTime();
		var $iframe = $('<iframe src="about:blank" name="iframe_' + _time + '" style="display:none"></iframe>');

		var $form = $('<form action="' + options.url + '" id="form_' + _time + '" target="' + options.localIframe.name + '" method="' + options.type + '"></form>');
		alert(options.localIframe.name)
		for ( var key in options.params) {
			var $input = $('<input type="hidden" name="' + key + '" value="' + options.params[key] + '" />');
			$form.append($input);
		}
		$iframe.append($form);

		return $iframe;
	}

	function _iframeResponse(iframe, callback) {
		var $iframe = $(iframe);
		$iframe.bind("load", function(event) {
			$iframe.unbind("load");

			var doc = iframe.contentDocument || iframe.document;
			if (doc.readyState && doc.readyState != 'complete')
				return;
			if (doc.body && doc.body.innerHTML == "false")
				return;
			var response;
			if (doc.XMLDocument) {
				response = doc.XMLDocument;
			} else if (doc.body) {
				try {
					response = $iframe.contents().find("body").text();
					response = jQuery.parseJSON(response);
				} catch (e) {
					response = doc.body.innerHTML;
				}
			} else {
				response = doc;
			}
			callback(response);
		});
	}

})(jQuery);