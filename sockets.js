var socket_io = require('socket.io');
var socketio = {};
var io;
socketio.getServer = function (server) {
     io = socket_io(server);
    io.sockets.on("connection",function(socket){
        console.log("连接成功");
        socket.on("log",function(obj){
            io.emit("log",obj);
        })
    });
}
socketio.emitMsg=function(msg){
    if(io){
        io.emit("log",msg);
    }
}
module.exports = socketio; 