# wifell

Wifell captures wifi packages looking for known mac addresses and sends notifications when they are found.


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
