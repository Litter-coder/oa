var def_option = {
	webName : "",
	avtar : {
		def_image : "/images/index/man-img.png",
		user_sex : 1,// 男
		user_img : ""
	},
	callback : null
}

var node_option = {
	rootNode : "ul.infoNav",
	nav_item : ".nav-item",
	nav_content : ".nav-content"
}

var $p = $(node_option.rootNode);

var $nav_item = $(node_option.nav_item, $p);

var $nav_content = $(node_option.nav_content, $p);

function initCommonMenu(option) {
	var op = $.extend(true, def_option, option);

	initNavitem(op);

	initAvtar(op);

	$(window).resize(function() {
		resizeMsgContent(op);
	});

	setTimeout(function() {
		resizeMsgContent(op);
	}, 10);

	$("ul.nav-tabs li", $nav_content).each(function(index) {
		var $this = $(this);
		$this.click(function() {
			if (!$this.hasClass("active")) {
				$this.addClass("active");
				$this.siblings(".active").removeClass("active");
				$this.parent().next().find(">div.active").removeClass("active");
				$this.parent().next().find(">div").eq(index).addClass("active");
			}
		});
	});

	if ($.isFunction(op.callback))
		op.callback();

}

function hideNavContent() {
	$nav_item.removeClass("selected");
	$nav_content.each(function() {
		if ($(this).is(":visible")) {
			if ($(this).is(".msg-content")) {
				$(this).css("right", "0px");
			}
			$(this).hide();
		}
	});
}

function initReloadContent() {
	$(".nav-tabs-content", $nav_content).mousedown(function() {
		var flag = false;
		var stop = setTimeout(function() {
			flag = true;
			console.log("下拉刷新");
		}, 500);
		$(this).mouseup(function() {
			if (!flag) {
				clearTimeout(stop)
			}
		});
	});
}

// 初始化公共方法
function initNavitem(option) {
	$(document).on("click", function(e) {
		var target = e.target;

		if ($(target).closest($nav_item).length <= 0 && $(target).closest($nav_content).length <= 0) {
			if(!$(target).data("events")){
				hideNavContent();
			}
		}

		if ($(target).closest("div.avtar-info-online").length <= 0) {
			if ($(".avtar-info-online .avtar-info-tip").hasClass("show_status")) {
				$(".avtar-info-online .avtar-info-tip").removeClass("show_status");
			}
		}
	}).on("mouseover", function(e) {
		var target = e.target;
		var $avtar_content = $("div.avtar-content", $p);
		if ($(target).closest($nav_item).length <= 0 && $(target).closest("div.avtar-content").length <= 0) {
			$avtar_content.prev().removeClass("selected");
			$avtar_content.hide();

			if ($(".avtar-info-online .avtar-info-tip").hasClass("show_status")) {
				$(".avtar-info-online .avtar-info-tip").removeClass("show_status");
			}

		}
	});

	$nav_item.each(function() {
		if ($(this).hasClass("hover")) {
			$(this).hover(function() {
				hideNavContent();

				$(this).addClass("selected");
				$(this).next().show();
			}, function() {
			});
		} else {
			$(this).click(function() {
				if (!$(this).hasClass("selected")) {
					hideNavContent();
					$(this).addClass("selected");
					if ($(this).next().hasClass("msg-content")) {
						$(this).next().show().animate({
							right : "270px"
						});
					} else {
						$(this).next().show();
					}
				}
			});
		}
	});
}

// 初始化用户显示菜单
function initAvtar(option) {
	var def_image = option.webName + option.avtar.def_image;
	var user_sex = option.avtar.user_sex;
	if (user_sex == 0) {// 0
		$(".avtar-menu >img", $p).attr("src",option.webName + "/images/index/woman-menu.png");
		def_image = option.webName + "/images/index/woman-img.png";
	}
	var user_img = option.avtar.user_img;
	if (!user_img) {
		$(".avtar-img >img").attr("src", def_image);
	} else {
		$(".avtar-img >img").attr("src", user_img);
	}

	$(".avtar-info-online >img").click(function() {
		if ($(this).next().hasClass("show_status")) {
			$(this).next().removeClass("show_status");
		} else {
			$(this).next().addClass("show_status");
		}

	});
}

function resizeMsgContent(option) {
	var $msg_content = $(".msg-content", $p);
	var padTop = $msg_content.css("padding-top").replace('px', '');
	var padBot = $msg_content.css("padding-bottom").replace('px', '');
	var height = $("#container").height() - 2 - padTop - padBot;
	$msg_content.height(height + "px");
}
