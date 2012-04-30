$(function(){
$('form#timer').submit(function(e){
	var limit = $('input#input-limit').val();
	// TODO validate

	if (typeof webkitNotifications !== 'undefined' && !!webkitNotifications.createHTMLNotification) {
		webkitNotifications.createHTMLNotification('http://skypencil.jp/lightning-timer/notification.html#' + limit).show();
	} else {
		alert('please use Google Chrome');
	}
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
			var permission = webkitNotifications.checkPermission();
			if (permission === 0) {
				$('#group-permit').fadeOut('normal');
			}
		});
		return false;
	});
}
});