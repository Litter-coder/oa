/*
	var msgJson = {
		fromUid : "", // 表示发送
		fromImg : "", 
		toUid : "",
		sendTime : "",// 消息时间
		content : [ // 消息内容
			{
				nodeType : 1, // 3 ,表示节点类型 1是元素节点，3是文本节点
				tagName : "", // 元素节点的元素名称
				attribute : { // 元素节点属性
					src : ""
				},
				text : "" // 元素节点的文本内容，或者是文本节点的文本
			}, {}, {} ]
	}
 */
var chartMsg = {
	getEditareaMsgArray : function(editArea) {
		var content = [];
		editArea.contents().each(function() {
			var _content = {}
			if ($(this)[0].nodeType == 1) {
				var tagName = $(this)[0].tagName;
				_content.nodeType = 1;
				_content.tagName = tagName;
				_content.attribute = {};

				if ($(this).attr("src")) {
					_content.attribute.src = $(this).attr("src");
				}

			} else if ($(this)[0].nodeType == 3) {
				_content.nodeType = 3;
			}
			var text = $(this).text();
			text = text.replace(/\</g, '&lt;');
			text = text.replace(/\>/g, '&gt;');
			_content.text = text;
			content.push(_content);
		});
		// 去除前后换行
		editArea.html("");
		editArea.focus();
		return content;
	},
	encrypt : function(str, pwd) {
		if (pwd == null || pwd.length <= 0) {
			alert("Please enter a password with which to encrypt the message.");
			return null;
		}
		var prand = "";
		for (var i = 0; i < pwd.length; i++) {
			prand += pwd.charCodeAt(i).toString();
		}
		var sPos = Math.floor(prand.length / 5);
		var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5));
		var incr = Math.ceil(pwd.length / 2);
		var modu = Math.pow(2, 31) - 1;
		if (mult < 2) {
			alert("Algorithm cannot find a suitable hash. Please choose a different password. \nPossible considerations are to choose a more complex or longer password.");
			return null;
		}
		var salt = Math.round(Math.random() * 1000000000) % 100000000;
		prand += salt;
		while (prand.length > 10) {
			prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
		}
		prand = (mult * prand + incr) % modu;
		var enc_chr = "";
		var enc_str = "";
		for (var i = 0; i < str.length; i++) {
			enc_chr = parseInt(str.charCodeAt(i) ^ Math.floor((prand / modu) * 255));
			if (enc_chr < 16) {
				enc_str += "0" + enc_chr.toString(16);
			} else
				enc_str += enc_chr.toString(16);
			prand = (mult * prand + incr) % modu;
		}
		salt = salt.toString(16);
		while (salt.length < 8)
			salt = "0" + salt;
		enc_str += salt;
		return enc_str;
	},
	decrypt : function(str, pwd) {
		if (str == null || str.length < 8) {
			alert("A salt value could not be extracted from the encrypted message because it's length is too short. The message cannot be decrypted.");
			return;
		}
		if (pwd == null || pwd.length <= 0) {
			alert("Please enter a password with which to decrypt the message.");
			return;
		}
		var prand = "";
		for (var i = 0; i < pwd.length; i++) {
			prand += pwd.charCodeAt(i).toString();
		}
		var sPos = Math.floor(prand.length / 5);
		var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) + prand.charAt(sPos * 4) + prand.charAt(sPos * 5));
		var incr = Math.round(pwd.length / 2);
		var modu = Math.pow(2, 31) - 1;
		var salt = parseInt(str.substring(str.length - 8, str.length), 16);
		str = str.substring(0, str.length - 8);
		prand += salt;
		while (prand.length > 10) {
			prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(10, prand.length))).toString();
		}
		prand = (mult * prand + incr) % modu;
		var enc_chr = "";
		var enc_str = "";
		for (var i = 0; i < str.length; i += 2) {
			enc_chr = parseInt(parseInt(str.substring(i, i + 2), 16) ^ Math.floor((prand / modu) * 255));
			enc_str += String.fromCharCode(enc_chr);
			prand = (mult * prand + incr) % modu;
		}
		return enc_str;
	}
};