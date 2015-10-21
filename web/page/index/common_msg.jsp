<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<link href="${oa}/chart/css/chart.css" rel="stylesheet" type="text/css" media="screen" />
<link href="${oa}/chart/css/emoji.css" rel="stylesheet" type="text/css" media="screen" />
<script type="text/javascript" src="${oa}/chart/js/chart.core.js"></script>
<script type="text/javascript" src="${oa}/chart/js/chart.tools.js"></script>
<script type="text/javascript" src="${oa}/chart/js/chart.msg.js"></script>
<script type="text/javascript" src="${oa}/chart/js/jquery.emoji.js"></script>
<script type="text/javascript">
	var fromUid = userInfo.loginUsername + "@dinghuan-s";
	var fromImg = userInfo.image;
	var msg_password = "1234567890abcdef";
	var imgPath = "${oa}/chart/images/";
	var dialogResize = function(dialog) {
		var area = $(".editarea", dialog);
		var plus = $(area).outerWidth(true) - $(area).width();
		$(area).width($(dialog).width() - 14 - plus);

		$('.im_msg_view', dialog).scrollTop($('.im_msg_view', dialog)[0].scrollHeight);
	}
	
	var displayMsg = function(msg, isSend, isPsd){
		if(isPsd){
			var content = msg.content;
			chartMsg.encrypt(content, msg_password);
			msg.content = eval(content);
		}
		// 使用JsRender
		/*
		<div class="im_msg_box from">
				<div class="im_msg_box_time">10-18 18:20</div>
				<div class="im_msg_popbox">
					<div class="im_msg_popbox_avatar">
						<img src="${oa}/images/index/man-menu.png">
					</div>
					<div class="im_msg_popbox_content">
						<span class="bubble">aaa</span> <span class="bottomLevel"></span> <span class="topLevel"></span>
					</div>
				</div>
			</div>
		*/
		
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
			var msg = {};
			msg.fromUid = fromUid;
			msg.fromImg = fromImg;
			$(this).siblings("input:hidden").each(function() {
				msg[$(this).attr("name")] = $(this).val();
			});
			msg.sendTime = currentTime.datetime.month + "-" + currentTime.datetime.date + " " + currentTime.time.hours + ":" + currentTime.time.minutes;
			var content = chartMsg.getEditareaMsgArray($(".editarea", dialog));
			msg.content = content;
			displayMsg(msg, true)
			content = chartMsg.encrypt(JSON.stringify(content), msg_password);
			msg.content = content;
			
			
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
		<ul class="message-im-list" id="admin@dinghuan-s">
			<li><a title="张三1" target="dialog" rel="zs1" callback="initChatDialog" dialogResize="dialogResize" href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">张三1</span> <span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
			</a></li>
			<li><a title="admin" target="dialog" combinable="true" rel="admin@dinghuan-s" callback="initChatDialog" dialogResize="dialogResize"
				href="${oa}/page/index/common_im_msg.jsp?toUid=admin@dinghuan-s&toImg=${oa}/images/index/man-menu.png">
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