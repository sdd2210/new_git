const express=require('express');
const app=express();
const http=require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
var port =3000;
app.get('/', (req, res) => {
    res.sendFile(__dirname +"/public/index.html");
  });
app.use(express.static('public'));

var user={}

io.on('connection', (socket) => {

  console.log('a user connected:'+socket.id);
   
  socket.on('join',name=>{
     user[socket.id]=name,
     socket.broadcast.emit('user-connected',name)
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected',user[socket.id])
    console.log('user disconnected');
    delete user[socket.id]
  });

  
  socket.on('chat message', msg => {
    socket.broadcast.emit('chat message', {mess:msg, username:user[socket.id]});
  });

  socket.on('typing',data=>{
     socket.broadcast.emit('typing',data)
  })
});
server.listen(port, () => {
    console.log('listening on http://localhost:'+port);
  });