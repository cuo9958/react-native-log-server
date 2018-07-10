/**
 * 日志处理类
 */
module.exports = new class {
  /**
   * 
   * @param {*} name 
   */
  constructor(name = "/api/log") {
    this.name = name;
    this.cache = [];
    this.log = this.log.bind(this);
  }
  //监听请求
  log(ctx, next) {
    if (this.name === ctx.url) {
      this.chuli(ctx);
      ctx.body = "";
    } else {
      next();
    }
  }
  //将请求转化为对象
  chuli(ctx) {
    let model = {
      url: ctx.url,
      host: ctx.request.headers["host"],
      referer: ctx.request.headers["referer"] || "",
      cookie: ctx.request.headers["cookie"],
      agent: ctx.request.headers["user-agent"],
      system: "",
      webkit: "",
    }
    let system_match = model.agent.match(/(\(.+?\))/g);
    if (system_match.length > 0) {
      model.system = system_match[0];
    }
    console.log(model);
    this.cache.push(model);
  }
}
