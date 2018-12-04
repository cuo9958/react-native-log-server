/**
 * 使用本地日志形式记录日志
 */
const fs = require("fs");

const logs = [];
const baks = [];
let type = false;

let list = fs.readdirSync(process.cwd() + "/static");
if (!list.includes("logs")) {
    fs.mkdirSync(process.cwd() + "/static/logs/")
}

function save(tt) {
    let str = "\r\n\r\n" + tt.join("\r\n\r\n");
    tt.length = 0;
    fs.appendFile(process.cwd() + "/static/logs/logs.txt", str, function () { });
}
setInterval(() => {
    if (!type) {
        save(logs)
    } else {
        save(baks)
    }
    type = !type;
}, 1000)
module.exports = {
    /**
     * 写入日志内容
     * @param {*} str 
     */
    add(str) {
        if (!type) {
            logs.push(str)
        } else {
            baks.push(str)
        }
    }
}
