var Timer = function(limitMinute) {
	var that = this;

	this.limit = limitMinute * 60 * 1000;
	this.start = Date.now();
	this.id = setInterval(function(){that.tick();}, 1000);
	this.alertTime = [];
	this.progress = $('#bar');
	this.text = $('#text');
	for (var i = 1; i < limitMinute; ++i) {
		this.alertTime.push({
			'left': (limitMinute - i),
			'time': (this.start + i * 60 * 1000)
		});
	}
};
Timer.prototype.tick = function(){
	var elapsedMillis = Date.now() - this.start,
	    progress = Math.min(elapsedMillis * 100 / this.limit, 100),
	    leftMillis = this.limit - elapsedMillis;
	if (leftMillis <= 0) {
		this.stop();
		notice('time is over');
	} else if (this.alertTime.length > 0 && this.alertTime[0].time <= Date.now()) {
		notice(this.alertTime[0]['left'] + ' minutes left');
		this.alertTime.shift();
	}
	this.progress.width(progress + '%');
	this.text.text(format(leftMillis / 1000));
};
Timer.prototype.stop = function(){
	clearInterval(this.id);
};

function format(sec) {
	sec = Math.max(0, sec);
	var s = Math.floor(sec) % 60, m = Math.floor(sec / 60);
	if (s < 10) { s = '0' + s; }
	return m + ':' + s;
}

function notice(message) {
	console.log(message);	// TODO implement
}

$(function(){
function getLimit() {
	var hash = window.location.hash;
	if (!hash) {
		return 5;
	}
	return Math.max(1,  parseInt(hash.substr(1)));
}

new Timer(getLimit()).tick();
});