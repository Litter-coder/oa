<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<script type="text/javascript">
	$(".fixed_textarea").focus(function(){
		$(this).css("font-size","16px");
	});
	
	$(".im_msg_icon a").click(function(){
		if ($(this).hasClass("focus")) {
			$(this).removeClass("focus");
		} else {
			if($(".im_msg_icon a.focus")[0]){
				$(".im_msg_icon a.focus").click();
			}
			$(this).addClass("focus");
		}
	});
	
	$("#fontTools").click(function(){
		if($(".fontTools").is(":hidden")){
			$(".fontTools").show();
		}else{
			$(".fontTools").hide();
		}
		$(".im_msg_view").attr("layouth", $(".im_msg_footer").outerHeight());
		var content = $(this).parents(".dialogContent:eq(0)");
		content.find("[layoutH]").layoutH(content);
	});
	
	
</script>
<div class="imContent pageContent">
	<div class="im_msg_content_area">
		<div class="im_msg_view" layouth="130"></div>
		<div class="im_msg_footer">
			<div class="fontTools">
				<div>
					<span>字体</span>
					<select name="fontFamily">
						<option>默认字体</option>
					</select>
				</div>
				<div>
					<span>大小</span>
					<select name="fontSize">
						<option>14px</option>
					</select>
				</div>
			</div>
			<div class="im_msg_icon">
				<ul>
					<li>
						<a href="javascript:void(0)" class="im_msg_tools" id="fontTools" title="字体选择工具栏"><img src="${oa}/images/index/im/font.png"></a>
					</li>
					<li>
						<a href="javascript:void(0)" class="im_msg_tools" id="emojiChoose" title="选择表情"><img src="${oa}/images/index/im/face.png"></a>
					</li>
					<li>
						<a href="javascript:void(0)" class="im_msg_tools" id="msgHistory" title="显示消息记录"><img src="${oa}/images/index/im/history.png"><span>消息记录</span></a>
					</li>
				</ul>
			</div>
			<div class="im_msg_editarea">
				<textarea class="fixed_textarea"></textarea>
			</div>
			<div class="im_msg_close_send">
				<button class="btn close">关闭</button>
				<button class="btn">发送</button>
			</div>
		</div>
	</div>
</div>

