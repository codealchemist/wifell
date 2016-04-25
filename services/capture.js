var addresses = require('../config/addresses');

// pcap might not work on all environments
// and we might want to code in an environment where it doesn't work
// this is an attempt to simplify that
try {
    var pcap = require("pcap"),
        pcap_session = pcap.createSession("wlan0", "");

    module.exports = captureService();
} catch(e) {
    module.exports = captureServiceMock();    
}

//------------------------------------------------------------------

/**
 * Logs passed arguments to console using a prefix.
 *
 */
function log() {
    var prefix = '[ CAPTURE-SERVICE ]-->',
        args = [prefix];

    for (var i=0; i<arguments.length; ++i) {
        args.push(arguments[i]);
    }

    console.log.apply(console, args);
}

/**
 * Mocks capture service functionality by emitting events
 * periodically.
 *
 * @method     captureServiceMock
 */
function captureServiceMock() {
    var service = {
        start: start
    };

    return service;

    //----------------------------------------

    function start(io) {
        // simulate finding a known device every 3 seconds
        setInterval(emitDeviceAppeared, 3000);

        function emitDeviceAppeared() {
            var device = addresses['0c:77:1a:12:f6:c3'];
            date = (new Date()).toLocaleString();
            log(date + ': FOUND KNOWN DEVICE:', device);

            var data = {
                device: device,
                date: new Date()
            };
            io.emit('device-appeared', data);
        }
    }
}

function captureService() {
    var service = {
        start: start
    };

    return service;

    //----------------------------------------

    function start(io) {
        log("Listening on " + pcap_session.device_name);

        pcap_session.on('packet', function (raw_packet) {
            var packet = pcap.decode.packet(raw_packet),
                header = packet.pcap_header,
                senderMacAddress = getSenderMacAddress(packet);
         
            // log('PACKET:', packet);
            if (senderMacAddress) {
                // log('FOUND DEVICE MAC ADDRESS:', senderMacAddress);

                if (senderMacAddress in addresses) {
                    var device = addresses[senderMacAddress],
                    date = (new Date()).toLocaleString();
                    log(date + ': FOUND KNOWN DEVICE:', device);

                    // emit event
                    var data = {
                        device: device,
                        date: new Date()
                    };
                    io.emit('device-appeared', data); 
                }
            }
        });

        function getSenderMacAddress(packet) {
            if (packet.payload.payload && packet.payload.payload.sender_ha) {
                return packet.payload.payload.sender_ha.toString().trim();
            }

            return null;
        }
    } // end start
} // end service

