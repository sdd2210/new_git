var socket = io();
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var feedback=document.getElementById('feedback');
var Uname= prompt("User name:")
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    appendInputItems('You:'+input.value)
    input.value = '';
  }
});

appendSmallItems('You joined')
//messages.innerHTML='<p><em>You joined</em></p>'
socket.emit('join',Uname);

socket.on('user-connected',name=>{
  appendSmallItems(name+ ' connected')
 // messages.innerHTML='<p><em>'+name+' connected`</em></p>'
});

socket.on('chat message', function(msg) {
  appendItems(msg.username+":"+msg.mess);
  feedback.innerHTML=''
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('user-disconnected',name=>{
  appendSmallItems(name+ ' out')
  //messages.innerHTML='<p><em>'+name+'`has left`</em></p>'
});

input.addEventListener('keypress',()=>{
  socket.emit('typing',Uname);
});


socket.on('typing',(name)=>{
  feedback.innerHTML='<p><em>'+name+'is typing....</em></p>'
   
});

function appendSmallItems(msg){
   var item =document.createElement('p')
   item.innerHTML='<em>'+msg+'</em>'
   messages.appendChild(item)
   item.style.alignSelf='center'
}

function appendItems(msg){
  var item = document.createElement('div');
  item.textContent = msg;
  messages.appendChild(item);
  item.style.borderRadius="15px"
  item.style.backgroundColor='rgb(240, 242, 245)';
}
function appendInputItems(msg){
  var item = document.createElement('div');
  item.textContent = msg;
  messages.appendChild(item);
  item.style.backgroundColor='blue';
  item.style.color='white';
  item.style.borderRadius="15px"
  item.style.alignSelf="flex-start"
}