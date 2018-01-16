var socket = io.connect('http://localhost:8080', { 'forceNew': true});


socket.on('messages', function(data){
          console.log(data);
    
    render(data);
          })

function render(data){
    var html =`<div><strong>${data.author}</strong>: <em>${data.text}</em><div>`;
    
    document.getElementById('messages').innerHTML = html;
} 