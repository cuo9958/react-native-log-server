# react-native-log-server
拦截react-native的日志输出，将日志转到node服务上。这样就把模拟器的速度提升至少5倍。

## 服务器发布顺序

- `git pull`拉取最新代码
- `rm -rf node_modules`删除依赖
- `npm i`安装依赖
- `npm run build`生成界面
- `pm2 restart xxxx`刷新服务,xxxx对应服务名称(或者使用单独的守护进程代码)

## 启动服务

- 运行`npm run start`启动vue，默认端口8080
- 运行 vscode的服务，启动express，默认端口8002
- 启动pm2，使用pm2.json文件启动

## 启动日志

- 在react-native项目中引用`lib\log.js`
- 在app启动之后调用`initLog`方法，初始化日志
- 所有输出日志都是用`lib/log.js`里面的方法输出日志

## 示例

- 在线网站。[个人网站示例](http://logs.guofangchao.com)

## 更新日志

- 添加新的日志记录方法。 2018-12-04
- 更新配置文件。 2018-12-04
- 添加name拦截无用请求。2017-11-26
- 全部改为post请求提交数据。 2017-11-25
- 添加get方式传送数据。2017-11-24