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
  socket.emit('status', { message: 'You have connected' });


});
