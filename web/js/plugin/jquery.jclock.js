(function ($) {
    $.fn.jclock = function (options) {
    	$.fn.jclock.stopClock();
        $.fn.jclock.timerID = null;
        $.fn.jclock.running = false;
        $.fn.jclock.el = null;
        var version = '0.1.1';
        var opts = $.extend({}, $.fn.jclock.defaults, options);

        return this.each(function () {
            $this = $(this);
            $.fn.jclock.el = $this;

            var o = $.meta ? $.extend({}, opts, $this.data()) : opts;

            $.fn.jclock.withDate = o.withDate;
            $.fn.jclock.timeNotation = o.timeNotation;
            $.fn.jclock.withWeek = o.withWeek;
            $.fn.jclock.am_pm = o.am_pm;
            $.fn.jclock.utc = o.utc;
            $.fn.jclock.timeStamp = o.timeStamp;
            $.fn.jclock.offset = o.offset;
            $this.css({
                fontFamily: o.fontFamily,
                fontSize: o.fontSize,
                backgroundColor: o.background,
                color: o.foreground
            });

            $.fn.jclock.startClock();

        });
    };

    $.fn.jclock.startClock = function () {
        $.fn.jclock.stopClock();
        $.fn.jclock.displayTime();
    }
    $.fn.jclock.stopClock = function () {
        if ($.fn.jclock.running) {
            clearTimeout(timerID);
        }
        $.fn.jclock.running = false;
    }
    $.fn.jclock.displayTime = function (el) {
    	$.fn.jclock.running = true;
        var date = $.fn.jclock.getDate();
        var week = $.fn.jclock.getWeek();
        var time = $.fn.jclock.getTime();
        $.fn.jclock.el.html(date + time + week);
        $.fn.jclock.timeStamp = $.fn.jclock.timeStamp +1000;
        timerID = setTimeout("$.fn.jclock.displayTime()", 1000);
    }
    $.fn.jclock.getDate = function () {
        if ($.fn.jclock.withDate == true) {
        	var now;
        	if($.fn.jclock.timeStamp == 0){
        		now = new Date();
        	}else{
        		now = new Date($.fn.jclock.timeStamp + $.fn.jclock.offset);
        	}
            var year, month, date;

            if ($.fn.jclock.utc == true) {
                year = now.getUTCFullYear();
                month = now.getUTCMonth() + 1;
                date = now.getUTCDate();
            } else {
                year = now.getFullYear();
                month = now.getMonth() + 1;
                date = now.getDate();
            }

            month = ((month < 10) ? "0" : "") + month;
            date = ((date < 10) ? "0" : "") + date;

            var dateNow = year + "年" + month + "月" + date + "日 ";
        } else {
            var dateNow = "";
        }
        return dateNow;
    }
    $.fn.jclock.getWeek = function () {
        if ($.fn.jclock.withWeek == true) {
        	var now;
        	if($.fn.jclock.timeStamp == 0){
        		now = new Date();
        	}else{
        		now = new Date($.fn.jclock.timeStamp + $.fn.jclock.offset);
        	}
            var week;

            if ($.fn.jclock.utc == true) {
                week = now.getUTCDay();
            } else {
                week = now.getDay();
            }

            $.each(["日", "一", "二", "三", "四", "五", "六"], function (i, n) {
                if (i == week) { week = n; return; }
            });

            var weekNow = "星期" + week + " ";
        } else {
            var weekNow = "";
        }
        return weekNow;
    }
    $.fn.jclock.getTime = function () {
    	var now;
    	if($.fn.jclock.timeStamp == 0){
    		now = new Date();
    	}else{
    		now = new Date($.fn.jclock.timeStamp + $.fn.jclock.offset);
    	}
        var hours, minutes, seconds;

        if ($.fn.jclock.utc == true) {
            hours = now.getUTCHours();
            minutes = now.getUTCMinutes();
            seconds = now.getUTCSeconds();
        } else {
            hours = now.getHours();
            minutes = now.getMinutes();
            seconds = now.getSeconds();
        }
        $.fn.jclock.remind(hours);
        if ($.fn.jclock.timeNotation == '12h') {
            hours = ((hours > 12) ? hours - 12 : hours);
        } else {
            hours = ((hours < 10) ? "0" : "") + hours;
        }

        minutes = ((minutes < 10) ? "0" : "") + minutes;
        seconds = ((seconds < 10) ? "0" : "") + seconds;
        
        var timeNow = hours + ":" + minutes + ":" + seconds + " ";
        if($.fn.jclock.offset != 0 ){
        	timeNow += "UTC+" + $.fn.jclock.offset/3600000 +" ";
        }
        if (($.fn.jclock.timeNotation == '12h') && ($.fn.jclock.am_pm == true)) {
            timeNow += (hours >= 12) ? " P.M." : " A.M."
        }

        return timeNow;
    };
    
    $.fn.jclock.remind = function (hour) {
        if (hour > 4 && hour < 6) { 
        	$("#labelwelcome").html("凌晨好！") 
        }else if (hour < 9) { 
        	$("#labelwelcome").html("早上好！") 
        }else if (hour < 12) {
        	$("#labelwelcome").html("上午好！") 
        }else if (hour < 14) { 
        	$("#labelwelcome").html("中午好！")
        }else if (hour < 17) { 
        	$("#labelwelcome").html("下午好！") 
        }else if (hour < 19) {
        	$("#labelwelcome").html("傍晚好！") }
        else if (hour < 22) { 
        	$("#labelwelcome").html("晚上好！")
        }else { 
        	$("#labelwelcome").html("夜深了，注意休息！") 
        }
    }

    // plugin defaults
    $.fn.jclock.defaults = {
        withDate: false,
        withWeek: false,
        timeNotation: '24h',
        am_pm: false,
        utc: false,
        fontFamily: '',
        fontSize: '',
        foreground: '',
        background: '',
        timeStamp:0,
        offset:0
    };
})(jQuery);
