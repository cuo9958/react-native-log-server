/**
 * 使用koa实现的web服务
 */
const Koa = require("koa");
const LogServer = require("./LogServer");

const app = new Koa();

app.use(LogServer.log);

app.use(async ctx => {
  ctx.body = 'Hello World';
  console.log(1);
});

//监听
app.listen(3000, function () {
  console.log("启动服务");
});
