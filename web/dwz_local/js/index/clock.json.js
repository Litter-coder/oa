var pageID_timeID = {};
clockJson = {
	clock : function(options) {
		var pageID = Math.random();// 页面id
		pageID_timeID[pageID] = -1;// 让初始timeID为-1，用于判断
		console.log("start "+pageID)
		var o = $.extend({}, clockJson.defaults, options, {
			running : false,
			pageID : pageID
		});
		if (o.timeStamp != 0) {
			o.timeStamp = parseInt(o.timeStamp) + parseInt(o.timeout);
		}
		setTimeout(function() {
			clockJson.startClock(o);
		}, o.timeout);

	},

	startClock : function(options) {
		clockJson.stopClock(options);
		clockJson.returnTimeJson(options);
	},
	stopClock : function(options) {
		if (options.running && pageID_timeID[options.pageID] != -1) {
			clearTimeout(pageID_timeID[options.pageID]);
		}
		options.running = false;
	},
	returnTimeJson : function(options) {
		options.running = true;
		if (!pageID_timeID[options.pageID]) {
			// 表示刷新了页面，或者
			console.log("remove "+options.pageID)
			return;
		}

		var datetime = clockJson.getDate(options);
		var week = clockJson.getWeek(options);
		var time = clockJson.getTime(options);
		var result = $.extend(true, {}, {
			datetime : datetime,
			time : time.time,
			week : week,
			remind : time.remind
		});
		options.timeStamp = options.timeStamp + 1000;
		if ($.isFunction(options.callback)) {
			options.callback(result);
		}

		var timerID = setTimeout(function() {
			clockJson.startClock(options);
		}, 1000);
		pageID_timeID[options.pageID] = timerID;
	},
	getDate : function(options) {
		var dateNow = {};
		if (options.withDate == true) {
			var now;
			if (options.timeStamp == 0) {
				now = new Date();
			} else {
				now = new Date(parseInt(options.timeStamp) + parseInt(options.offset));
			}
			var year, month, date;

			if (options.utc == true) {
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

			dateNow = {
				year : year,
				month : month,
				date : date
			}
		} else {
			dateNow = {
				year : "",
				month : "",
				date : ""
			};
		}
		return dateNow;
	},
	getWeek : function(options) {
		var weekNow = {};
		if (options.withWeek == true) {
			var now;
			if (options.timeStamp == 0) {
				now = new Date();
			} else {
				now = new Date(parseInt(options.timeStamp) + parseInt(options.offset));
			}
			var week;

			if (options.utc == true) {
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

			weekNow = {
				value : "星期" + week
			}
		} else {
			weekNow = {
				value : ""
			};
		}
		return weekNow;
	},
	getTime : function(options) {
		var now;
		if (options.timeStamp == 0) {
			now = new Date();
		} else {
			now = new Date(parseInt(options.timeStamp) + parseInt(options.offset));
		}
		var hours, minutes, seconds;

		if (options.utc == true) {
			hours = now.getUTCHours();
			minutes = now.getUTCMinutes();
			seconds = now.getUTCSeconds();
		} else {
			hours = now.getHours();
			minutes = now.getMinutes();
			seconds = now.getSeconds();
		}
		var rem = clockJson.remind(hours);
		if (options.timeNotation == '12h') {
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
		if (options.offset != 0) {
			timeNow.time.utc = options.offset / 3600000;
		}
		if ((options.timeNotation == '12h') && (options.am_pm == true)) {
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
		timeout : 0,
		callback : null
	}
}
