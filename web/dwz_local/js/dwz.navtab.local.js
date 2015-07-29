navTab = $.extend(navTab,{
	DEFAULT:{
			data:{},
			navTabId:"",
			callback:null,
			title:"New Tab", 
			type:"POST",
			fresh:true, 
			external:false,
			loadingmask:true
	},
	_reload: function($tab, flag){
		flag = flag || $tab.data("reloadFlag");
		var url = $tab.attr("url");
		if (flag && url) {
			$tab.data("reloadFlag", null);
			var $panel = this.getPanel($tab.attr("tabid"));
			
			if ($tab.hasClass("external")){
				navTab.openExternal(url, $panel);
			}else {
				//获取pagerForm参数
				var $pagerForm = $("#pagerForm", $panel);
				var args = $pagerForm.size()>0 ? $pagerForm.serializeArray() : {}
				
				$panel.loadUrl(url, args, function(){navTab._loadUrlCallback($panel);});
			}
		}
	},
	reload : function(url, options){
		var op = $.extend($.navTab.DEFAULT, options);
		var $tab = op.navTabId ? this._getTab(op.navTabId) : this._getTabs().eq(this._currentIndex);
		var $panel =  op.navTabId ? this.getPanel(op.navTabId) : this._getPanels().eq(this._currentIndex);
		if ($panel){
			if (!url) {
				url = $tab.attr("url");
			}
			if (url) {
				if ($tab.hasClass("external")) {
					navTab.openExternal(url, $panel);
				} else {
					if ($.isEmptyObject(op.data)) { //获取pagerForm参数
						var $pagerForm = $("#pagerForm", $panel);
						op.data = $pagerForm.size()>0 ? $pagerForm.serializeArray() : {}
					}
					
					$panel.ajaxUrl({
						type:"POST", url:url, data:op.data, loadingmask:op.loadingmask, callback:function(response){
							navTab._loadUrlCallback($panel);
							if ($.isFunction(op.callback)) op.callback(response);
						}
					});
				}
			}
		}
	},
	openTab : function(tabid, url, options){ //if found tabid replace tab, else create a new tab.
		var op = $.extend(navTab.DEFAULT, options);

		var iOpenIndex = this._indexTabId(tabid);
		if (iOpenIndex >= 0){
			var $tab = this._getTabs().eq(iOpenIndex);
			var span$ = $tab.attr("tabid") == this._op.mainTabId ? "> span > span" : "> span";
			$tab.find(">a").attr("title", op.title).find(span$).html(op.title);
			var $panel = this._getPanels().eq(iOpenIndex);
			if(op.fresh || $tab.attr("url") != url) {
				$tab.attr("url", url);
				if (op.external || url.isExternalUrl()) {
					$tab.addClass("external");
					navTab.openExternal(url, $panel);
				} else {
					$tab.removeClass("external");
					$panel.ajaxUrl({
						type:op.type, url:url, data:op.data, loadingmask:op.loadingmask, callback:function(){
							navTab._loadUrlCallback($panel);
						}
					});
				}
			}
			this._currentIndex = iOpenIndex;
		} else {
			var tabFrag = '<li tabid="#tabid#"><a href="javascript:" title="#title#" class="#tabid#"><span>#title#</span></a><a href="javascript:;" class="close">close</a></li>';
			this._tabBox.append(tabFrag.replaceAll("#tabid#", tabid).replaceAll("#title#", op.title));
			this._panelBox.append('<div class="page unitBox"></div>');
			this._moreBox.append('<li><a href="javascript:" title="#title#">#title#</a></li>'.replaceAll("#title#", op.title));
			
			var $tabs = this._getTabs();
			var $tab = $tabs.filter(":last");
			var $panel = this._getPanels().filter(":last");
			
			if (op.external || url.isExternalUrl()) {
				$tab.addClass("external");
				navTab.openExternal(url, $panel);
			} else {
				$tab.removeClass("external");
				$panel.ajaxUrl({
					type:op.type, url:url, data:op.data, loadingmask:op.loadingmask, callback:function(){
						navTab._loadUrlCallback($panel);
					}
				});
			}
			
			if ($.History) {
				setTimeout(function(){
					$.History.addHistory(tabid, function(tabid){
						var i = navTab._indexTabId(tabid);
						if (i >= 0) navTab._switchTab(i);
					}, tabid);
				}, 10);
			}
				
			this._currentIndex = $tabs.size() - 1;
			this._contextmenu($tabs.filter(":last").hoverClass("hover"));
		}
		
		this._init();
		this._scrollCurrent();
		
		this._getTabs().eq(this._currentIndex).attr("url", url);
	}
});
