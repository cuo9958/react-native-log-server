var socket_io = require('socket.io');
var socketio = {};
socketio.getServer = function (server) {
    var io = socket_io(server);
    io.sockets.on("connection",function(socket){
        console.log("连接成功");
        socket.on("log",function(obj){
            io.emit("log",obj);
        })
    });
}
module.exports = socketio; 