var express= require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var path = require('path');

var messages = [{
    id:1,
    text: "Mi mensaje",
    author: "Andy Ubiraci" 
}];

app.use(express.static('public'));

app.get('/public/index.html', function(req, res){
    res.status(200).send("MKTG Chat...!");
    res.sendfile(path.resolve(__dirname, '../public/index.html'));
});

io.on('connection', function(socket) {
    console.log('Alguien en Sockets');
    socket.emit('messages',messages);
    
    
    socket.on('new-message', function(data){
        
        messages.push(data);
        io.sockets.emit('messages', messages);
        
    });
    
});

server.listen(80, function(){
    console.log("corriendo..!");
});