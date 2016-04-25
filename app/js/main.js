'use strict';

var socket = io(),
	$foundDevices = $('#found-devices'),
	$serverConnection = $('#server-connection');

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
	var date = (new Date()).toLocaleString();
	$foundDevices.append('<li>(' + date + ') <b>' + data.device.name + '</b> is nearby!</li>');
}

function onHello(data) {
	log('onHello:', data);
	var date = (new Date()).toLocaleString();
	$serverConnection
		.html('Connection Established @' + date)
		.removeClass('text-danger')
		.addClass('text-success');
}

function onServerDisconnected(data) {
	log('onServerDisconnected:', data);
	var date = (new Date()).toLocaleString();
	$serverConnection
		.html('Connection Lost @' + date)
		.removeClass('text-success')
		.addClass('text-danger');
}

