/**
 * 测试日志方法是否合适
 */
const log = require("../lib/logTxt");


setInterval(() => {
    log.add(Math.random() + '');
}, 100)