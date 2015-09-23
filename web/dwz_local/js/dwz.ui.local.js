function initEnv() {
	$("body").append(DWZ.frag["dwzFrag"]);

	if ($.browser.msie && /6.0/.test(navigator.userAgent)) {
		try {
			document.execCommand("BackgroundImageCache", false, true);
		} catch (e) {
		}
	}
	// 清理浏览器内存,只对IE起效
	if ($.browser.msie) {
		window.setInterval("CollectGarbage();", 10000);
	}

	$(window).resize(function() {
		initLayout();
		$(this).trigger(DWZ.eventType.resizeGrid);
	});

	$(document).on(DWZ.eventType.ajaxLoadingMask, function(e) {
		var $target = $(e.target), ajax_mask = init_ajaxstatus_mask($target);
		$target.one('ajaxStart', function() {
			ajax_mask.$bg.fadeIn();
			ajax_mask.$pr.fadeIn();
		}).one('ajaxStop', function() {
			ajax_mask.$bg.fadeOut();
			ajax_mask.$pr.fadeOut();
		});
	});

	$("#leftside").jBar({
		minW : 150,
		maxW : 700
	});

	if ($.taskBar)
		$.taskBar.init();
	navTab.init();
	if ($.fn.switchEnv)
		$("#switchEnvBox").switchEnv();
	if ($.fn.navMenu)
		$("#navMenu").navMenu();

	setTimeout(function() {
		initLayout();
		initUI();
		// navTab styles
		var jTabsPH = $("div.tabsPageHeader");
		jTabsPH.find(".tabsLeft").hoverClass("tabsLeftHover");
		jTabsPH.find(".tabsRight").hoverClass("tabsRightHover");
		jTabsPH.find(".tabsMore").hoverClass("tabsMoreHover");

	}, 10);

}

function initLayout() {
	var iContentW = $(window).width() - (DWZ.ui.sbar ? $("#sidebar").width() + 5 : 34) - 3;
	var iTaskbarH = 0;
	if ($("#taskbar").is(":visible")) {
		iTaskbarH = $("#taskbar").outerHeight();
	}
	var iContentH = $(window).height() - $("#header").height() - $("#footer").height() - iTaskbarH - 5;
	$("#container").width(iContentW);
	$("#container .tabsPageContent").height(iContentH -1 - $("#navTab .tabsPageHeader").outerHeight()).find("[layoutH]").layoutH();
	$("#sidebar, #sidebar_s .collapse, #splitBar, #splitBarProxy").height(iContentH);
	$("#taskbar").css({
		top : iContentH + $("#header").height() + 5,
		width : $(window).width()
	});
}

// 遮罩
function init_ajaxstatus_mask($target) {
	var $this = $target;
	var $offset = $this;
	var position = $offset.css('position');

	if (position == 'static')
		$offset = $this.offsetParent();

	var zIndex = parseInt($offset.css('zIndex')) || 0;

	var $ajaxBackground = $this.find('> .background');
	var $ajaxProgress = $this.find('> .progressBar');

	if (!$ajaxBackground.length) {
		$ajaxBackground = $('<div class="background"></div>')
		$ajaxProgress = $('<div class="progressBar">数据加载中，请稍等...</div>')
		$this.append($ajaxBackground).append($ajaxProgress)
	}

	var bgZindex = parseInt($ajaxBackground.css('zIndex')) || 0
	var prZindex = parseInt($ajaxProgress.css('zIndex')) || 0

	$ajaxBackground.css('zIndex', zIndex + 1)
	$ajaxProgress.css('zIndex', zIndex + 2)

	return {
		$bg : $ajaxBackground,
		$pr : $ajaxProgress
	}
}