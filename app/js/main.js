'use strict';

var socket = io(),
	$foundDevices = $('#found-devices'),
	$serverConnection = $('#server-connection'),
	$useVoice = $('#useVoice');

socket.on('device-appeared', onDeviceAppeared);
socket.on('hello', onHello);
socket.on('disconnect', onServerDisconnected);

/**
 * Logs passed arguments to console using a prefix.
 *
 */
function log() {
	var prefix = '[ WIFELL-CLIENT ]-->',
	args = [prefix];

	for (var i=0; i<arguments.length; ++i) {
		args.push(arguments[i]);
	}

	console.log.apply(console, args);
}

function onDeviceAppeared(data) {
	log('onDeviceAppeared:', data);
	var date = (new Date()).toLocaleString(),
		name = data.device.name;
	$foundDevices.append('<li>(' + date + ') <b>' + name + '</b> is nearby!</li>');

	// speak!
	if ($useVoice.is(':checked')) speak(name + ' is nearby!');
}

function onHello(data) {
	log('onHello:', data);
	var date = (new Date()).toLocaleString();
	$serverConnection
		.html('Connection Established @' + date)
		.removeClass('text-danger')
		.addClass('text-success');

	// speak!
	if ($useVoice.is(':checked')) speak('Yay! Wifell says hello.');
}

function onServerDisconnected(data) {
	log('onServerDisconnected:', data);
	var date = (new Date()).toLocaleString();
	$serverConnection
		.html('Connection Lost @' + date)
		.removeClass('text-success')
		.addClass('text-danger');

	// speak!
	if ($useVoice.is(':checked')) speak('Oops... Holy crap! Damn you Internet! Server disconnected.');
}

