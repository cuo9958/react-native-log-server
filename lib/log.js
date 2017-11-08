
import socketClient from 'socket.io-client'
let socket;
let logs = [];

const getLogs = () => {
    return logs;
}

const log = (...args) => {
    sendlog(...args);
    logs.unshift({
        time: new Date(),
        msg: JSON.stringify(args)
    });
    if (logs.length > 100) logs.length = 100;
}

function sendlog(...args) {
    if (socket&&socket.connected) {
        socket.emit("log",args);
    } else {
        console.log(...args)
    }
}
function initLog() {
    try {
        socket = socketClient('http://127.0.0.1:3000');
        socket.on("connect", function () { });
    } catch (e) {
        socket=null;
    }
}

export { getLogs, log, initLog }