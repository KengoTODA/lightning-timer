var Timer = function(limitMinute) {
	var that = this;

	this.limit = limitMinute * 60 * 1000;
	this.start = Date.now();
	this.id = setInterval(function(){that.tick();}, 1000);
	this.alertTime = [];
	this.progress = $('#progress-bar');
	for (var i = 1; i < limitMinute; ++i) {
		this.alertTime.push({
			'left': (limitMinute - i),
			'time': (this.start + i * 60 * 1000)
		});
	}
};
Timer.prototype.tick = function(){
	var elapsedMillis = Date.now() - this.start,
	    progress = Math.min(elapsedMillis * 100 / this.limit, 100);
	if (this.limit <= elapsedMillis) {
		// time over
		this.stop();
		notice('time is over');
	} else if (this.alertTime.length > 0 && this.alertTime[0].time <= Date.now()) {
		notice(this.alertTime[0]['left'] + ' minutes left');
		this.alertTime.shift();
	}
	this.progress.width(progress + '%');
};
Timer.prototype.stop = function(){
	clearInterval(this.id);
};

function notice(message) {
	if (typeof webkitNotifications === 'undefined' || webkitNotifications.checkPermission() !== 0) {
		alert(message);
		return;
	}

	var notification = webkitNotifications.createNotification(
		'', 'Lightning talk timer', message
	);
	notification.ondisplay = function(){
		setTimeout(function(){
			notification.cancel();
		}, 3000);
	};
	notification.show();
}

$(function(){
$('form#timer').submit(function(e){
	var limit = $('input#input-limit').val(),
	    timer = new Timer(limit);
	e.preventDefault();
	return false;
});

if (typeof webkitNotifications !== 'undefined') {
	var permission = webkitNotifications.checkPermission();
	if (permission === 1) {
		$('#group-permit').show();
	}
	$('#input-permit').click(function(e){
		e.preventDefault();
		webkitNotifications.requestPermission(function(){
		});
		return false;
	});
}
});