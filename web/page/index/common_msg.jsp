<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<link href="${oa}/css/index/chart.css" rel="stylesheet" type="text/css" media="screen"/>
<script type="text/javascript" src="${oa}/js/index/chart/chart.tools.js"></script>
<script type="text/javascript" src="${oa}/js/index/chart/jquery.qqFace.js"></script>
<script type="text/javascript">
	var initChatDialog = function(obj) {
		var dialog = (typeof obj == 'string') ? $("#" + obj) : obj;
		
		$(".chartTools", dialog).initChartTools({
			editArea : $(".editarea", dialog),
			msgArea : $(".msgarea textarea", dialog),
			path : "${oa}/images/index/im/"
		})
	
		$(".editarea", dialog).focus(function() {
			dialog.bind("keydown", function(event) {
				if (event.keyCode != DWZ.keyCode.ENTER || event.shiftKey)
					return;
				$("button.send", dialog).trigger("click");
				event.preventDefault();
			});
		}).blur(function(){
			dialog.unbind("keydown");
		});
		$(".editarea", dialog).focus();
	
		$("button.send", dialog).click(function() {
			console.log("send")
		});
	
		
	
		$("#fontTools", dialog).click(function() {
			$(".im_msg_view", dialog).attr("layouth", $(".im_msg_footer", dialog).outerHeight());
			var content = $(this).parents(".dialogContent:eq(0)");
			content.find("[layoutH]").layoutH(content);
		});
		var area = $(".editarea", dialog);
		var plus = $(area).outerWidth(true) - $(area).width();
		$(area).width($(dialog).width() - 14 - plus);
		$(".msgarea textarea", dialog).width($(dialog).width() - 14 - plus);
	}

</script>
<div class="btn-group">
	<button class="btn btn-mini"><span>事务提醒</span></button>
	<button class="btn btn-mini seleted"><span>聊天</span></button>
</div>
<div class="message-im">
	<div class="message-im-info">
		<ul class="message-im-list">
			<li>
				<a title="张三1" target="dialog" rel="zs1" callback="initChatDialog" href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">张三1</span>
							<span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
				</a>
			</li>
			<li>
				<a title="李四1" target="dialog" combinable="true" rel="im_msg_02" callback="initChatDialog"  href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四1</span>
							<span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
				</a>
			</li>
			<li>
				<a title="李四2" target="dialog" combinable="true" rel="im_msg_03" callback="initChatDialog"  href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四2</span>
							<span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
				</a>
			</li>
			<li>
				<a title="李四3" target="dialog" combinable="true" rel="im_msg_04" callback="initChatDialog"  href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四3</span>
							<span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
				</a>
			</li>
			<li>
				<a title="李四4" target="dialog" combinable="true" rel="im_msg_05" callback="initChatDialog"  href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四4</span>
							<span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
				</a>
			</li>
			<li>
				<a title="李四5" target="dialog" combinable="true" rel="im_msg_06" callback="initChatDialog"  href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四5</span>
							<span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
				</a>
			</li>
			<li>
				<a title="李四6" target="dialog" combinable="true" rel="im_msg_07" callback="initChatDialog"  href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四6</span>
							<span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
				</a>
			</li>
			<li>
				<a title="李四7" target="dialog" combinable="true" rel="im_msg_08" callback="initChatDialog"  href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四7</span>
							<span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
				</a>
			</li>
			<li>
				<a title="李四8" target="dialog" combinable="true" rel="im_msg_09" callback="initChatDialog"  href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四8</span>
							<span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
				</a>
			</li>
			<li>
				<a title="李四9" target="dialog" combinable="true" rel="im_msg_10" callback="initChatDialog"  href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四9</span>
							<span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
				</a>
			</li>
			<li>
				<a title="李四10" target="dialog" combinable="true" rel="im_msg_11" callback="initChatDialog"  href="${oa}/page/index/common_im_msg.jsp">
					<div class="message-im-item">
						<img src="${oa}/images/index/man-menu.png">
						<div class="im-info">
							<span class="im-title">李四10</span>
							<span class="im-time">3分钟前</span>
							<p class="im-content">aaaaaaaa</p>
						</div>
					</div>
				</a>
			</li>
		</ul>
	</div>
</div>