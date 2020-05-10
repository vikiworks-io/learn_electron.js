const WebSocket = require('ws')
const url = 'ws://localhost:10000/'
const connection = new WebSocket(url)
var connected = false;

function send(msg)
{
  connection.onopen = () =>{
    connection.send(msg) 
  }
}

function onerror(error)
{
  console.log(`WebSocket error: ${error}`)
}

function recv(msg)
{
  console.log(msg.data)
}

send("CLIENT: HELLO1");
send("CLIENT: HELLO2");
send("CLIENT: HELLO3");
send("CLIENT: HELLO4");
send("CLIENT: HELLO5");
connection.onerror      = onerror;
connection.onmessage    = recv;

//connection.close()
