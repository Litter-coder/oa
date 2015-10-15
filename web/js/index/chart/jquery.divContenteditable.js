/**
 * div contentEditable=true时光标获取设置的js
 * 
 * @param $
 */
var cursor = 0; // 光标位置
document.onselectionchange = function() {
	var range = document.selection.createRange();
	var srcele = range.parentElement();// 获取到当前元素
	var copy = document.body.createTextRange();
	copy.moveToElementText(srcele);

	for (cursor = 0; copy.compareEndPoints("StartToStart", range) < 0; cursor++) {
		copy.moveStart("character", 1);// 改变光标位置，实际上我们是在记录cursor的数量.
	}
}

function moveEnd(obj) {

	obj.focus();
	var r = document.selection.createRange();
	// 因为这里死从当前光标开始移动的(好像文本框的是从0算起.)所以我们需要拿到当前光标位置，然后就可以计算出要移动多少位了，这样就可以把光标移动到想要的位置了
	r.moveStart('character', obj[0].innerText.length - cursor);
	r.collapse(true);
	r.select();
}