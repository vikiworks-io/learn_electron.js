var express = require('express');
var socket  = require('socket.io');

/*Global Variables*/
var web_app;
var http_server;
var server_socket;
var event_connect = 'connection';
var event_chat    = 'chat';
var event_typing  = 'typing';
/*path to html and css files (./public)*/
var static_path = "public";

function InvokeHttpServer(port){
    web_app = express();

    http_server = web_app.listen(port, function(){
        console.log("HTTP: Listening....");
    });
    
    web_app.use(express.static(static_path));

    return http_server;
}

/* Broadcast message from server to all other clients 
 * 
 */
function BroadcastChatMessage(data){
    server_socket.sockets.emit(event_chat, data);
}

function DisplayClientMessage(data){
    console.log(data.uname +" : "+data.message);
}

/*Some client has sent/posted a message on the socket*/
function HandleNewChatEvent(data){
    DisplayClientMessage(data);

    /* Broadcast Received Message to all(including the client which sents this data) 
     * clients
     */
    BroadcastChatMessage(data);
}

/*Handle Typing Event From Clients*/
function HandleNewTypingEvent(data){
    console
}

/*Make client_socket listen to new chat event*/
/*Check for Incoming Message*/
function ServerListenForChatEvent(client_socket){
    client_socket.on(event_chat, HandleNewChatEvent);
}

/* Listen for typing event from any client */
function ServerListenForTypingEvent(client_socket){
    client_socket.on(event_typing, function(data){ 
        /*Handle Typing Event*/

        console.log(data.uname+" : typing .... ");
        /* Broadcast typing event by username to all clients except the 
         * sender(client)
         */
        client_socket.broadcast.emit(event_typing, data);
    });
}


/*Called when a new client is connected to server*/
function HandleNewClientConnection(client_socket){
    console.log("New Client Connected | Client Id : ", client_socket.id);
    
    /*Check for Incoming Message*/
    ServerListenForChatEvent(client_socket);
    
    /*Check for UI Typing Event*/
    ServerListenForTypingEvent(client_socket);
}

/*Make server_socket listen for new connection event*/
function ServerListenForNewConnection(){
    server_socket.on(event_connect, HandleNewClientConnection);
}

//http_server   = 
InvokeHttpServer(6000);
server_socket = socket(http_server);
ServerListenForNewConnection();
