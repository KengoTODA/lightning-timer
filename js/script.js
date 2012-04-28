var Timer = function(limitMinute) {
	var that = this;

	this.limit = limitMinute * 60 * 1000;
	this.start = Date.now();
	this.id = setInterval(function(){that.tick();}, 1000);
	this.alertTime = [];
	for (var i = 1; i < limitMinute; ++i) {
		this.alertTime.push({
			'left': (limitMinute - i),
			'time': (this.start + i * 60 * 1000)
		});
	}
};
Timer.prototype.tick = function(){
	var elapsedMillis = Date.now() - this.start;
	if (this.limit <= elapsedMillis) {
		// time over
		this.stop();
		notice('time is over');
	} else if (this.alertTime.length > 0 && this.alertTime[0].time <= Date.now()) {
		notice(this.alertTime[0]['left'] + ' minutes left');
		this.alertTime.shift();
	}
};
Timer.prototype.stop = function(){
	clearInterval(this.id);
};

function notice(message) {
	alert(message);
}

$('form#timer').submit(function(e){
	var limit = $('input#input-limit').val(),
	    timer = new Timer(limit);
	e.preventDefault();
	return false;
});