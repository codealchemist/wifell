var pcap = require("pcap"),
    pcap_session = pcap.createSession("wlan0", ""),
    addresses = require('../config/addresses');


module.exports = captureService();

function captureService() {
    var service = {
        start: start
    };

    return service;

    //----------------------------------------

    function start(io) {
        console.log("Listening on " + pcap_session.device_name);

        pcap_session.on('packet', function (raw_packet) {
            var packet = pcap.decode.packet(raw_packet),
                header = packet.pcap_header,
                senderMacAddress = getSenderMacAddress(packet);
         
            //console.log('PACKET:', packet);
            if (senderMacAddress) {
                // console.log('FOUND DEVICE MAC ADDRESS:', senderMacAddress);

                if (senderMacAddress in addresses) {
                    var device = addresses[senderMacAddress],
                    date = (new Date()).toLocaleString();
                    console.log(date + ': FOUND KNOWN DEVICE:', device);

                    // emit event
                    io.emit('device-appeared', device); 
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

