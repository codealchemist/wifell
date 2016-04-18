var pcap = require("pcap"),
    pcap_session = pcap.createSession("wlan0", ""),
    addresses = require('./addresses');

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
        }
    }
});

function getSenderMacAddress(packet) {
    if (packet.payload.payload && packet.payload.payload.sender_ha) {
        return packet.payload.payload.sender_ha.toString().trim();
    }

    return null;
}
