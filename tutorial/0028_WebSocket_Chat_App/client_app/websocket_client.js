var express = require('express');
var socket = require('socket.io-client');
//var {io}  = require('socket.io');

/*Global Variables*/
var event_connect = 'connection';
var event_chat    = 'chat';
var event_typing  = 'typing';
var url = 'http://localhost:6000';
var client_socket;

/* Make Client Listen to Incoming Messages*/
function ClientListenForChatEvent(){
    client_socket.on(event_chat, function(data){
        /*Some Client has with username (data.uname) has sent message (data.message)*/
        console.log(data.uname+" : "+data.message);
        message = '<p><strong><i>'+ data.uname + ' : </i></strong>' + data.message + '</p>';
        document.getElementById("typing_status").innerHTML = "";
        document.getElementById("message_output").innerHTML += message;
        document.getElementById("message_input").value = "";
    });
}

/* Make Client Listen to Incoming Typing Event*/
function ClientListenForTypingEvent(){
    client_socket.on(event_typing, function(data){
        /*Some Client has with username (data.uname) has sent message (data.message)*/
        console.log(data.uname+" is typing ...");
        message = '<i>'+ data.uname + ' is  typing ... </i>';
        document.getElementById("typing_status").innerHTML = message;
    });
}

/* Send HTML-UI Typing Event to Server [ Server broadcast this event to other clients ]*/
function SendTypingMessageToServer(user_name){

    client_data_object = { uname: user_name };
    /* Username is the user name of this client : 
     * We are sending username to inform server, who is typing
     */
    client_socket.emit(event_typing, client_data_object);
}

function SendChatMessageToServer(data){
    client_socket.emit(event_chat, data);
}

function button_click_action(){

    user_name  = document.getElementById("username").value;
    user_msg = document.getElementById("message_input").value;

    client_data_object = { uname: user_name, message: user_msg};
    SendChatMessageToServer(client_data_object);

}

function capture_html_typing_event(){
    document.getElementById("message_input").addEventListener('keypress', function(key){
            //Enter Key Pressed and shiftkey not pressed
            if (key.keyCode === 13 && !key.shiftKey) {
                button_click_action();
            }

            //console.log("Key Pressed");
            user_name  = document.getElementById("username").value;
            SendTypingMessageToServer(user_name);
    });
}

function main(){
    client_socket = socket.connect(url);
    ClientListenForChatEvent();
    ClientListenForTypingEvent();
    capture_html_typing_event();
}


