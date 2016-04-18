var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    capture = require('./services/capture');

// start capturing packets
capture.start(io);

// TODO: move to its own file
// routes
app.get('/', function(req, res){
    res.sendfile('./views/index.html');
});

// TODO: move to its own file
// events
io.on('connection', function(socket){
    console.log('a user connected');

    io.emit('hello', {message: 'hello', date: new Date()});
});

// start web server
http.listen(3000, function(){
    console.log('listening on *:3000');
});