let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
 
var myroom = "";

io.on('connection', (socket) => {
  

 socket.on('join:room', (room) =>{
     
     myroom = room;
     
    socket.join(room);
});

    

 
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.nickname, event: 'left'});   
  });
 
  socket.on('set-nickname', (nickname) => {
    socket.nickname = nickname;
    io.emit('users-changed', {user: nickname, event: 'joined'});    
  });
  
  socket.on('add-message', (message) => {
    socket.in(myroom).emit('message', {text: message.text, from: socket.nickname, created: new Date()});    
  });
});
 
var port = process.env.PORT || 3000;
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});
