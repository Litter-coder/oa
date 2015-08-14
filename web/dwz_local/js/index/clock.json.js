clockJson = {
	result : {
		datetime : {},
		time : {},
		week : {},
		remind : {}
	},
	clock : function(options) {
		clockJson.stopClock();
		clockJson.timerID = null;
		clockJson.running = false;

		var o = $.extend({}, clockJson.defaults, options);

		clockJson.withDate = o.withDate;
		clockJson.timeNotation = o.timeNotation;
		clockJson.withWeek = o.withWeek;
		clockJson.am_pm = o.am_pm;
		clockJson.utc = o.utc;
		clockJson.timeStamp = parseInt(o.timeStamp);
		clockJson.offset = parseInt(o.offset);
		clockJson.callback = o.callback;

		clockJson.startClock();

	},

	startClock : function() {
		clockJson.stopClock();
		clockJson.returnTimeJson();
	},
	stopClock : function() {
		if (clockJson.running) {
			clearTimeout(timerID);
		}
		clockJson.running = false;
	},
	returnTimeJson : function() {
		clockJson.running = true;
		var datetime = clockJson.getDate();
		var week = clockJson.getWeek();
		var time = clockJson.getTime();
		var rel = $.extend(true, {}, {
			datetime : datetime
		}, {
			time : time.time
		}, {
			week : week
		}, {
			remind : time.remind
		});
		clockJson.result = $.extend(true, {}, clockJson.result, rel);
		clockJson.timeStamp = clockJson.timeStamp + 1000;
		if ($.isFunction(clockJson.callback)){
			clockJson.callback();
		}
		timerID = setTimeout("clockJson.returnTimeJson()", 1000);
	},
	getDate : function() {
		if (clockJson.withDate == true) {
			var now;
			if (clockJson.timeStamp == 0) {
				now = new Date();
			} else {
				now = new Date(clockJson.timeStamp + clockJson.offset);
			}
			var year, month, date;

			if (clockJson.utc == true) {
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

			var dateNow = {
				year : year,
				month : month,
				date : date
			}
		} else {
			var dateNow = {
				year : "",
				month : "",
				date : ""
			};
		}
		return dateNow;
	},
	getWeek : function() {
		if (clockJson.withWeek == true) {
			var now;
			if (clockJson.timeStamp == 0) {
				now = new Date();
			} else {
				now = new Date(clockJson.timeStamp + clockJson.offset);
			}
			var week;

			if (clockJson.utc == true) {
				week = now.getUTCDay();
			} else {
				week = now.getDay();
			}

			$.each([ "日", "一", "二", "三", "四", "五", "六" ], function(i, n) {
				if (i == week) {
					week = n;
					return;
				}
			});

			var weekNow = {
				value : "星期" + week
			}
		} else {
			var weekNow = {
				value : ""
			};
		}
		return weekNow;
	},
	getTime : function() {
		var now;
		if (clockJson.timeStamp == 0) {
			now = new Date();
		} else {
			now = new Date(clockJson.timeStamp + clockJson.offset);
		}
		var hours, minutes, seconds;

		if (clockJson.utc == true) {
			hours = now.getUTCHours();
			minutes = now.getUTCMinutes();
			seconds = now.getUTCSeconds();
		} else {
			hours = now.getHours();
			minutes = now.getMinutes();
			seconds = now.getSeconds();
		}
		var rem = clockJson.remind(hours);
		if (clockJson.timeNotation == '12h') {
			hours = ((hours > 12) ? hours - 12 : hours);
		} else {
			hours = ((hours < 10) ? "0" : "") + hours;
		}

		minutes = ((minutes < 10) ? "0" : "") + minutes;
		seconds = ((seconds < 10) ? "0" : "") + seconds;

		var timeNow = $.extend({}, {
			remind : rem
		}, {
			time : {
				hours : hours,
				minutes : minutes,
				seconds : seconds,
				utc : 0,
				am_pm : ""
			}
		});
		if (clockJson.offset != 0) {
			timeNow.time.utc = clockJson.offset / 3600000;
		}
		if ((clockJson.timeNotation == '12h') && (clockJson.am_pm == true)) {
			timeNow.time.am_pm = (hours >= 12) ? " P.M." : " A.M."
		}

		return timeNow;
	},

	remind : function(hour) {
		var rem = {
			value : ""
		};
		if (hour > 4 && hour < 6) {
			rem.value = "凌晨好！"
		} else if (hour < 9) {
			rem.value = "早上好！"
		} else if (hour < 12) {
			rem.value = "上午好！"
		} else if (hour < 14) {
			rem.value = "中午好！"
		} else if (hour < 17) {
			rem.value = "下午好！"
		} else if (hour < 19) {
			rem.value = "傍晚好！"
		} else if (hour < 22) {
			rem.value = "晚上好！"
		} else {
			rem.value = "夜深了，注意休息！"
		}
		return rem;
	},

	// plugin defaults
	defaults : {
		withDate : false,
		withWeek : false,
		timeNotation : '24h',
		am_pm : false,
		utc : false,
		timeStamp : 0,
		offset : 0,
		callback : null
	}
}
