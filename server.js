let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
 
io.on('connection', (socket) => {
    
    

socket.on('join:room', function(data) {
alert(data.room_name);
var room_name = data.room_name;
socket.join(room_name);
console.log('someone joined room ' + room_name + ' ' + socket.id);          
});
  
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.nickname, event: 'left'});   
  });
 
  socket.on('set-nickname', (nickname) => {
    socket.nickname = nickname;
    io.emit('users-changed', {user: nickname, event: 'joined'});    
  });
  
  socket.on('add-message', (message) => {
      io.in(message.room).emit('message', {text: 'r: ' + message.room +' t:' + message.text, from: socket.nickname, created: new Date()}); 
      
 console.log('room: ' + message.room + ' m: ' + message.text);
      
  });
    
    
socket.on('send:message', function(msg){
    socket.in(msg.room).emit('message', msg);
});
    
    
    
    
    
});
 
var port = process.env.PORT || 3000;
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});