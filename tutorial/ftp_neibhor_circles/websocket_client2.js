var express = require('express');
var socket = require('socket.io-client');
//var {io}  = require('socket.io');

/*Global Variables*/
var event_connect = 'connection';
var event_chat    = 'chat';
var event_typing  = 'typing';
/*path to html and css files (./public)*/
var static_path = "public";
var url = 'http://localhost:6000';
var client_socket;

/* Make Client Listen to Incoming Messages*/
function ClientListenForChatEvent(){
    client_socket.on(event_chat, function(data){
        /*Some Client has with username (data.uname) has sent message (data.message)*/
        console.log(data.uname+" : "+data.message);
    });
}

/* Send HTML-UI Typing Event to Server [ Server broadcast this event to other clients ]*/
function SendTypingEventToServer(){

    /* Username is the user name of this client : 
     * We are sending username to inform server, who is typing
     */
    client_socket.on(event_typing, function(username){
        client_socket.emit(event_typing, username);
    });
}

function SendMessageToServer(data){
    client_socket.emit(event_chat, data);
}

client_socket = socket.connect(url);
ClientListenForChatEvent();
client_data_object = { uname: "puppy", message: "Hello"};
SendMessageToServer(client_data_object);

