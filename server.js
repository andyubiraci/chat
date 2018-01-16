var express= require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var path = require('path');

var messages = [{
    id:1,
    text: "Mi mensaje",
    author: "Andy Ubiraci" 
}];

