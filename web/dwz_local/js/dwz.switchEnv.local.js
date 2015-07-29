(function($){
	$.fn.navMenu = function(){
		return this.each(function(){
			var $box = $(this);
			$box.find("li>a").click(function(){
				var $a = $(this);
				// 加入参数传递 --by dinghuan
				var data = "{";
				$("input:hidden", $a).each(function(){
					var $input = $(this);
					var name = $input.attr("name");
					var value = $input.val();
					data += name + ":" + value + ",";
				});
				if(data != "{"){
					data = data.substr( 0, data.length - 1);
				}
				data += "}";
				
				var $accordion = $(".accordion",$("#sidebar"));
				$accordion.trigger(DWZ.eventType.ajaxLoadingMask);
				
				$.post($a.attr("href"), eval("(" + data + ")"), function(html){
					if($.fn.jBarDisplay){
						$.fn.jBarDisplay();
					}
					$("#sidebar").find(".accordion").remove().end().append(html).initUI();
					$box.find("li").removeClass("selected");
					$a.parent().addClass("selected");
				});
				return false;
			});
		});
	}
	
	$.fn.switchEnv = function(){
		var op = {cities$:">ul>li", boxTitle$:">a>span"};
		return this.each(function(){
			var $this = $(this);
			alert($this.html())
			$this.click(function(){
				if ($this.hasClass("selected")){
					_hide($this);
				} else {
					_show($this);
				}
				return false;
			});
			
			$this.find(op.cities$).click(function(){
				var $li = $(this);

				$.post($li.find(">a").attr("href"), {}, function(html){
					_hide($this);
					$this.find(op.boxTitle$).html($li.find(">a").html());
					$("#sidebar").find(".accordion").remove().end().append(html).initUI();
				});
				return false;
			});
		});
	}
})(jQuery);