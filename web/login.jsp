<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@ include file="/page/public/common.jsp"%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>OA系统登录界面</title>

<link rel="stylesheet" href="${oa}/css/login/supersized.css" />
<link rel="stylesheet" href="${oa}/css/login/login.css" />
<link href="${oa}/css/login/bootstrap.min.css" rel="stylesheet" />
<script src="${oa}/js/jquery/jquery-1.8.2.min.js"></script>
<script src="${oa}/js/jquery/jquery-1.3.2.min.js" type="text/javascript"></script>
<script src="${oa}/js/plugin/png.js" type="text/javascript"></script>
<script src="${oa}/js/plugin/md5.js" type="text/ecmascript"></script>
<script src="${oa}/js/plugin/jquery.form.js" type="text/javascript"></script>
<script src="${oa}/js/login/tooltips.js" type="text/javascript"></script>
<script src="${oa}/js/login/login.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function() {
		var msg = "${SPRING_SECURITY_LAST_EXCEPTION.message}";
		if (msg != null && msg != "" && msg != "undefined") {
			show_err_msg(msg);
<%request.getSession().removeAttribute(
					"SPRING_SECURITY_LAST_EXCEPTION");%>
	}
		$("#j_username").focus();
		if (window.parent.frames.length > 0) {
			window.parent.location.reload();
		}

		$("form").submit(function() {
			var token = getToken();
			pwdMd5Enc(token);
			return true;
		});
	})

	function getToken() {
		var token;
		$.ajax({
			url : "${oa}/login/token.do",
			type : "post",
			async : false,// 同步
			success : function(msg) {
				token = msg;
			}
		});
		return token;
	}
<%--对密码进行加密--%>
	function pwdMd5Enc(token) {
		var pwd = $("#password").val();

		var pwdEnc = hex_md5(token + hex_md5(pwd));
		var form = document.form;

		form.j_password.value = pwdEnc;
	}
	var src = "${oa}/login/kaptcha-image.do";
	function flushValidate(obj) {
		$(obj).attr("src", src + "?random=" + Math.random());
	}
</script>
</head>
<body class="pgLogin">
	<div class="page-container">
		<div class="main_box">
			<div class="login_box">
				<div class="login_logo">
					<span style="font-size: 25px; font-weight: bolder;">OA平台登录</span>
					<!-- <img src="images/login/logo.png"> -->
				</div>
				<div class="login_form">
					<form action="${oa}/j_spring_security_check" id="login_form" method="post" name="form">
						<div class="form-group">
							<label for="j_username" class="t">用户名：</label>
							<!--  -->
							<input id="j_username" value="" name="j_username" type="text" class="form-control x315 in" />
						</div>
						<div class="form-group">
							<label for="j_password" class="t">密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
							<!--  -->
							<input name="j_password" id="j_password" value="" type="hidden" /> <input id="password" value="" type="password" class="password form-control x315 in" />
						</div>
						<div class="form-group">
							<label class="t">验证码：</label>
							<!--  -->
							<input name="j_validateCode" type="text" class="form-control x164 in" />
							<!--  -->
							<img id="captcha_img" title="点击更换" onclick="flushValidate(this)" src="${oa}/login/kaptcha-image.do" class="m" />
						</div>
						<div class="form-group space">
							<button type="button" id="submit_btn" class="btn btn-primary btn-lg">&nbsp;登&nbsp;录&nbsp;</button>
							<input type="reset" value="&nbsp;重&nbsp;置&nbsp;" class="btn btn-default btn-lg" />
						</div>
					</form>
				</div>
			</div>
			<div class="bottom">
				Copyright &copy; 2015 - 2016
				<p class="copy">广州OA网络科技有限公司</p>
			</div>
		</div>
	</div>
	<!-- Javascript -->
	<script src="${oa}/js/login/supersized.3.2.7.min.js"></script>
	<script src="${oa}/js/login/supersized-init.js"></script>
	<script src="${oa}/js/login/scripts.js"></script>
</body>
</html>
