var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3001);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/server2.js', function (req, res) {
  res.sendFile(__dirname + '/server2.js');
});

app.get('/news3', function (req, res) {
  res.send("test");
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});


io.on('connection', function (socket) {
	console.log("client connected");
	//socket.emit('news3', { hello: 'world3' });
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  
  //Event fired from the Client
  socket.on('event2', function (data) {
    console.log(data);
  });
  
  //Event fired from the Client manually
  socket.on('event3', function (data) {
	  console.log("..received event from web client...");
	  
    console.log(data);
	socket.emit('news3', { hello: 'world3' });
	socket.broadcast.emit('hi');
	
  });
});