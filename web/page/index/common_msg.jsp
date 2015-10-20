<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<link href="${oa}/chart/css/chart.css" rel="stylesheet" type="text/css" media="screen" />
<link href="${oa}/chart/css/emoji.css" rel="stylesheet" type="text/css" media="screen" />
<script type="text/javascript" src="${oa}/chart/js/chart.core.js"></script>
<script type="text/javascript" src="${oa}/chart/js/chart.tools.js"></script>
<script type="text/javascript" src="${oa}/chart/js/jquery.emoji.js"></script>
<script type="text/javascript">
	var dialogResize = function(dialog) {
		var area = $(".editarea", dialog);
		var plus = $(area).outerWidth(true) - $(area).width();
		$(area).width($(dialog).width() - 14 - plus);
		$(".msgarea textarea", dialog).width($(dialog).width() - 14 - plus);

		$('.im_msg_view', dialog).scrollTop($('.im_msg_view', dialog)[0].scrollHeight);
	}

	var imgPath = "${oa}/chart/images/";

	/*
	var msgJson = {
		type : "from", // to,表示发送接收
		icon : "",// 用户头像
		time : "",// 消息时间
		content : [ // 消息内容
		{
			nodeType : 1, // 3 ,表示节点类型 1是元素节点，3是文本节点
			nodeName : "", // 元素节点的元素名称
			attribute : { // 元素节点属性
				src : ""
			},
			text : "" // 元素节点的文本内容，或者是文本节点的文本
		}, {}, {} ]
	}*/
	var encodeMsg = function(contents) {
		var msg;
		contents.each(function() {
			if ($(this)[0].nodeType == 1) {
				if ($(this).is("br")) {
					msg += (msg == "" ? "" : "\n");
				}
				if ($(this).is("img")) {
					var src = $(this).attr("src");
					src = src.replace(imgPath + 'face/', "");
					src = src.replace('.gif', "");
					msg += "[:" + src + "]";
				}
			} else if ($(this)[0].nodeType == 3) {
				var text = $(this).text();
				msg += text;
			}
		});
		msg = msg.replace(/\</g, '&lt;');
		msg = msg.replace(/\>/g, '&gt;');
	}

	var initChatDialog = function(obj) {
		var dialog = (typeof obj == 'string') ? $("#" + obj) : obj;

		$(".chartTools", dialog).initChartTools({
			editArea : $(".editarea", dialog),
			imgPath : imgPath
		})

		$(".editarea", dialog).focus(function() {
			dialog.bind("keydown", function(event) {
				if (event.keyCode != DWZ.keyCode.ENTER || event.shiftKey)
					return;
				$("button.send", dialog).trigger("click");
				event.preventDefault();
			});
		}).blur(function() {
			dialog.unbind("keydown");
		});
		$(".editarea", dialog).focus();

		$("button.send", dialog).click(function() {
			var msg = encodeMsg($(".editarea", dialog).contents());

			$('.im_msg_view', dialog).scrollTop($('.im_msg_view', dialog)[0].scrollHeight);
		});

		// 自适应
		$("#fontTools", dialog).click(function() {
			$(".im_msg_view", dialog).attr("layoutH", $(".im_msg_footer", dialog).outerHeight());
			var content = $(this).parents(".dialogContent:eq(0)");
			content.find("[layoutH]").layoutH(content);
			dialogResize(dialog);
		});

		dialogResize(dialog);
	}
</script>
<div class="btn-group">
	<button class="btn btn-mini">
		<span>事务提醒</span>
	</button>
	<button class="btn btn-mini seleted">
		<span>聊天</span>
	</button>
</div>
<div class="message-im">
	<div class="message-im-info">
		<ul class="message-im-list">
			<li><a title="张三1" target="dialog" rel="zs1" callback="initChatDialog" dialogResize="dialogResize" href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">张三1</span> <span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
			</a></li>
			<li><a title="李四1" target="dialog" combinable="true" rel="im_msg_02" callback="initChatDialog" dialogResize="dialogResize" href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四1</span> <span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
			</a></li>
			<li><a title="李四2" target="dialog" combinable="true" rel="im_msg_03" callback="initChatDialog" dialogResize="dialogResize" href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四2</span> <span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
			</a></li>
			<li><a title="李四3" target="dialog" combinable="true" rel="im_msg_04" callback="initChatDialog" dialogResize="dialogResize" href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四3</span> <span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
			</a></li>
			<li><a title="李四4" target="dialog" combinable="true" rel="im_msg_05" callback="initChatDialog" dialogResize="dialogResize" href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四4</span> <span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
			</a></li>
			<li><a title="李四5" target="dialog" combinable="true" rel="im_msg_06" callback="initChatDialog" dialogResize="dialogResize" href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四5</span> <span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
			</a></li>
			<li><a title="李四6" target="dialog" combinable="true" rel="im_msg_07" callback="initChatDialog" dialogResize="dialogResize" href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四6</span> <span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
			</a></li>
			<li><a title="李四7" target="dialog" combinable="true" rel="im_msg_08" callback="initChatDialog" dialogResize="dialogResize" href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四7</span> <span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
			</a></li>
			<li><a title="李四8" target="dialog" combinable="true" rel="im_msg_09" callback="initChatDialog" href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四8</span> <span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
			</a></li>
			<li><a title="李四9" target="dialog" combinable="true" rel="im_msg_10" callback="initChatDialog" dialogResize="dialogResize" href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四9</span> <span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
			</a></li>
			<li><a title="李四10" target="dialog" combinable="true" rel="im_msg_11" callback="initChatDialog" dialogResize="dialogResize" href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四10</span> <span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
			</a></li>
		</ul>
	</div>
</div>