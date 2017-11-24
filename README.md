# react-native-log-server
拦截react-native的日志输出，将日志转到node服务上。这样就把模拟器的速度提升至少5倍。

## 启动服务

- 运行`npm run start`启动express服务
- 此时`http://127.0.0.1:3000`同时运行了http服务和websocket服务
- 打开网页`http://127.0.0.1:3000`

## 启动日志

- 在react-native项目中引用`lib\log.js`
- 在app启动之后调用`initLog`方法，初始化日志
- 所有输出日志都是用`lib/log.js`里面的方法输出日志


## 更新日志

- 添加get方式传送数据。2017-11-24