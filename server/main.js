var express= require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

app.use(express.static('public'))

app.get('/', function(req, res){
    res.status(200).send("MKTG Chat...!");
})

io.on('connection', function(socket) {
    console.log('Alguien en Sockets');
    socket.emit('message',{
        id:1,
        text: "Mi mensaje",
        author: "Ubiraci"
    })
})

server.listen(8080, function(){
    console.log("corriendo..!");
})