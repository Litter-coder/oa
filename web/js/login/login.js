// JavaScript Document
//支持Enter键登录
		document.onkeydown = function(e){
			if($(".bac").length==0)
			{
				if(!e) e = window.event;
				if((e.keyCode || e.which) == 13){
					var obtnLogin=document.getElementById("submit_btn")
					obtnLogin.focus();
				}
			}
		}

    	$(function(){
			//提交表单
			$('#submit_btn').click(function(){
				show_loading();
				var myReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //邮件正则
				if($('#j_username').val() == ''){
					show_err_msg('用户名还没填呢！');	
					$('#j_username').focus();
				}/*else if(!myReg.test($('#email').val())){
					show_err_msg('您的邮箱格式错咯！');
					$('#email').focus();
				}*/else if($('#password').val() == ''){
					show_err_msg('密码还没填呢！');
					$('#password').focus();
				}else if($("#j_captcha").val()==''){
					show_err_msg('验证码还没填呢！');
					$('#j_captcha').focus();
				}else{
					//ajax提交表单，#login_form为表单的ID。 如：$('#login_form').ajaxSubmit(function(data) { ... });
					show_msg('登录中！  正在为您验证...','');	
					$('#login_form').submit();
				}
			});
		});