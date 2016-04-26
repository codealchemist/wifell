# wifell

Wifell captures wifi packages looking for known mac addresses and sends notifications when they are found.


### What's needed for wifell to work?

You need a computer with a wifi card able to run in promiscuous mode that's able to run `nodejs` and `node_pcap`.
I've tested wifell on the ***RaspberryPi*** and it works there, making the Pi a great test environment for this tool.

### Adding your own devices

You can add the mac addresses of your own devices on:

`config/addresses.js`

Wifell will emit notifications when any mac address listed there is nearby.

If you want to use test mode after adding your own devices you should edit:

`services/capture.js`

And replace `MAC-ADDRESS-HERE` with a mac address listed on `config/addresses.js`.


### Test Client

Wifell comes with a very simple client you can use to see generated events.
If `node_pcap` is not available events will be automatically generated every 3 seconds.
This allows easy testing the server connection.

Build the client:

`grunt`

Start the server:

`node index.js`

Open a browser at the specified address:

`http://localhost:3000`

Have fun!
