<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<div class="imContent pageContent">
	<div class="im_msg_content_area">
		<div class="im_msg_history imHistory" style="display: none;">
			<div class="im_history_box">
				<div class="from">
					<div class="im_msg_name">aaa</div>
					<div class="im_msg_time">10-20 10:00:00</div>
					<div class="im_msg_record">测试111</div>
				</div>
				<div class="to">
					<div class="im_msg_name">bbb</div>
					<div class="im_msg_time">10-20 10:00:00</div>
					<div class="im_msg_record">测试222</div>
				</div>
			</div>
		</div>
		<div class="im_msg_view" layoutH="130">
			<div class="im_msg_box from">
				<div class="im_msg_box_time">10-18 18:20</div>
				<div class="im_msg_popbox">
					<div class="im_msg_popbox_avatar">
						<img src="${oa}/images/index/man-menu.png">
					</div>
					<div class="im_msg_popbox_content">
						<span class="bubble">${param.toUID}-----${param.toICON}</span> <span class="bottomLevel"></span> <span class="topLevel"></span>
					</div>
				</div>
			</div>
			<div class="im_msg_box to">
				<div class="im_msg_box_time">10-18 18:20</div>
				<div class="im_msg_popbox">
					<div class="im_msg_popbox_avatar">
						<img src="${oa}/images/index/woman-menu.png">
					</div>
					<div class="im_msg_popbox_content">
						<span class="bubble rightBubble">测试2222</span> <span class="bottomLevel"></span> <span class="topLevel"> </span>
					</div>
				</div>
			</div>
			<div class="im_msg_box from">
				<div class="im_msg_box_time">10-18 18:20</div>
				<div class="im_msg_popbox">
					<div class="im_msg_popbox_avatar">
						<img src="${oa}/images/index/man-menu.png">
					</div>
					<div class="im_msg_popbox_content">
						<span class="bubble">测试1111</span> <span class="bottomLevel"></span> <span class="topLevel"></span>
					</div>
				</div>
			</div>
			<div class="im_msg_box from">
				<div class="im_msg_box_time">10-18 18:20</div>
				<div class="im_msg_popbox">
					<div class="im_msg_popbox_avatar">
						<img src="${oa}/images/index/man-menu.png">
					</div>
					<div class="im_msg_popbox_content">
						<span class="bubble">测试1111</span> <span class="bottomLevel"></span> <span class="topLevel"></span>
					</div>
				</div>
			</div>
			<div class="im_msg_box from">
				<div class="im_msg_box_time">10-18 18:20</div>
				<div class="im_msg_popbox">
					<div class="im_msg_popbox_avatar">
						<img src="${oa}/images/index/man-menu.png">
					</div>
					<div class="im_msg_popbox_content">
						<span class="bubble">测试1111</span> <span class="bottomLevel"></span> <span class="topLevel"></span>
					</div>
				</div>
			</div>
			<div class="im_msg_box to">
				<div class="im_msg_box_time">10-18 18:20</div>
				<div class="im_msg_popbox">
					<div class="im_msg_popbox_avatar">
						<img src="${oa}/images/index/woman-menu.png">
					</div>
					<div class="im_msg_popbox_content">
						<span class="bubble">测试2222</span> <span class="bottomLevel"></span> <span class="topLevel"> </span>
					</div>
				</div>
			</div>
			<div class="im_msg_box to">
				<div class="im_msg_box_time">10-18 18:20</div>
				<div class="im_msg_popbox">
					<div class="im_msg_popbox_avatar">
						<img src="${oa}/images/index/woman-menu.png">
					</div>
					<div class="im_msg_popbox_content">
						<span class="bubble">测试2222</span> <span class="bottomLevel"></span> <span class="topLevel"> </span>
					</div>
				</div>
			</div>
			<div class="im_msg_box to">
				<div class="im_msg_box_time">10-18 18:20</div>
				<div class="im_msg_popbox">
					<div class="im_msg_popbox_avatar">
						<img src="${oa}/images/index/woman-menu.png">
					</div>
					<div class="im_msg_popbox_content">
						<span class="bubble">测试22轻轻巧巧轻轻巧巧轻轻巧巧轻轻巧巧轻轻巧巧轻轻巧巧轻轻巧巧轻轻巧巧轻轻巧巧轻轻巧巧轻轻巧巧轻轻巧巧轻轻巧巧轻轻巧巧轻轻巧巧凄凄去亲爱222 </span> <span class="bottomLevel"></span> <span class="topLevel"> </span>
					</div>
				</div>
			</div>
		</div>
		<div class="im_msg_footer">
			<div class="im_msg_icon chartTools"></div>
			<div class="im_msg_editarea">
				<div class="editarea" contenteditable="true"></div>
			</div>
			<div class="im_msg_close_send">
				<span class="tip">按ENTER键发送消息</span>
				<input type="hidden" name="toUid" value="${param.toUid}">
				<input type="hidden" name="toImg" value="${param.toImg}">
				<button class="btn close">关闭</button>
				<button class="btn send" title="ENTER键发送消息">发送</button>
			</div>
		</div>
	</div>
</div>

