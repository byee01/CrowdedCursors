var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');

app.listen(5000);

function handler(request, response) {
  fs.readFile(__dirname + '/index.html',
  function (error, data) {
    if(error) {
      response.writeHead(500);
      return response.end("Error loading index.html");
    }
    response.writeHead(200);
    response.end(data);
  });
}


io.sockets.on('connection', function(socket) {
  
  // Greet clients with a message and assign an id
  socket.emit('status', { message: 'You have connected', clid : socket.id });
  
  // When we receive a move event from a client send it to everyone else
  socket.on('move', function(data) {
    // Broadcasting will send 'move' to every client except the one
    // that originally sent it
    socket.broadcast.emit('move', data);
  });

  // Send a fun spin event when a user tries to interact
  socket.on('spin', function() {
    socket.broadcast.emit('spin', socket.id);
  });

  // Remove the cursor when the user disconnects
  socket.on('disconnect', function() {
    socket.broadcast.emit('close', socket.id);
  });
});
