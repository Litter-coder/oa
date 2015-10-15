<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<script type="text/javascript">
	function insertHtmlAtCaret(html) {
		var sel, range;
		if (window.getSelection) {
			// IE9 and non-IE
			sel = window.getSelection();
			if (sel.getRangeAt && sel.rangeCount) {
				range = sel.getRangeAt(0);
				range.deleteContents();
				// Range.createContextualFragment() would be useful here but is
				// non-standard and not supported in all browsers (IE9, for one)
				var el = document.createElement("div");
				el.innerHTML = html;
				var frag = document.createDocumentFragment(), node, lastNode;
				while ((node = el.firstChild)) {
					lastNode = frag.appendChild(node);
				}
				range.insertNode(frag);
				// Preserve the selection
				if (lastNode) {
					range = range.cloneRange();
					range.setStartAfter(lastNode);
					range.collapse(true);
					sel.removeAllRanges();
					sel.addRange(range);
				}
			}
		} else if (document.selection && document.selection.type != "Control") {
			// IE < 9
			document.selection.createRange().pasteHTML(html);
		}
	};

</script>
<div class="imContent pageContent">
	<div class="im_msg_content_area">
		<div class="im_msg_view" layouth="130">
			<button type="button" onclick="document.getElementById('test').focus(); insertHtmlAtCaret('<img src=/oa/images/index/im/face/1.gif/>');">插入字符</button>
			<div contentEditable="true" style="height: 50px; border: 2px solid red;" id="test"></div>
		</div>
		<div class="im_msg_footer">
			<div class="im_msg_icon chartTools"></div>
			<div class="im_msg_editarea">
				<div class="msgarea">
					<textarea></textarea>
				</div>
				<div class="editarea" contenteditable="true"></div>
			</div>
			<div class="im_msg_close_send">
				<button class="btn close">关闭</button>
				<button class="btn send">发送</button>
			</div>
		</div>
	</div>
</div>

