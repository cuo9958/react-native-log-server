const express = require('express');
const router = express.Router();
const soketio = require('../sockets');

let cacheList = [];

let nameList = new Set();
nameList.add("dev")

// const filters=['10.0.31.18'];
const filters = [];

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(`访问来源地址：${JSON.stringify(req.headers)};`)
  if (!req.headers.host) return res.end('');
  res.render('index', {});
});

router.get('/index', function (req, res, next) {
  res.render('index', {});
});

/**
 * 设置一个监听
 */
router.get('/api/set', function (req, res, next) {
  if (req.query.name) {
    nameList.add(req.query.name);
  }
  res.json({
    code: 1
  });
});

/**
 * 获取内部监听
 */
router.get('/api/get', function (req, res, next) {
  // if (req.headers.referer.indexOf(req.headers.host) < 0) return res.end('');
  let list = [];
  nameList.forEach(item => {
    list.push({
      name: item
    })
  })
  res.json({
    code: 1,
    data: list
  });
});

/**
 * 删除内部监听
 */
router.get('/api/del', function (req, res, next) {
  if (req.query.name) {
    nameList.delete(req.query.name)
  }
  res.json({
    code: 1
  });
});

/**
 * 获取单个缓存消息
 */
router.get('/api/getData', function (req, res, next) {
  if (req.query.id) {
    let data = getCache(req.query.id)
    res.json({
      code: 1,
      data: data.data
    });
  } else {
    res.json({
      code: 0
    });
  }
});
/**
 * 获取缓存消息
 */
router.get('/api/getlist', function (req, res, next) {
  res.json({
    code: 1,
    data: cacheList
  });
});

/**
 * 设置缓存
 * @param {*} data 
 */
function setCache(data) {
  let key = Date.now() + '' + (Math.random() * 1000 >> 0);
  data.id = key;
  cacheList.push(data)
  if (cacheList.length > 300) {
    cacheList.shift();
  }
  return key;
}
/**
 * 从内存获取数据
 * @param {*} key 
 */
function getCache(key) {
  let list = cacheList.filter(item => item.id == key);
  if (list && list.length > 0) {
    return list[0]
  }
  return {};
}

//检查ip是否在排除范围
function inFilters(ip) {
  let res = filters.filter(item => item == ip);
  return res.length > 0;
}

/**
 * 我来组成头部
 */
function comb(req, tag) {
  let data = {
    tag: tag,
    name: req.body.name,
    data: req.body.data,
    url: req.body.url,
    opt: req.body.opt,
    header: req.headers,
    ip: req.headers["x-real-ip"] || req.ip,
    date: new Date().getTime()
  }
  setCache(data);
  return data;
}


/**
 * 测试消息
 */
router.get('/info', function (req, res, next) {
  let data = comb(req, "info");
  soketio.emitInfo(data);
  res.end('你好，再见。');
});

/**
 * 收到消息,data/name/url/opt
 */
router.post('/info', function (req, res, next) {
  if (inFilters(req.ip)) return res.end('');
  console.log(`访问来源地址：${JSON.stringify(req.ip)};`)
  if (!req.headers.name) return res.end('');
  if (!nameList.has(req.headers.name)) {
    next();
    return;
  }
  let data = comb(req, "info");
  soketio.emitInfo(data);
  res.end('');
});
/**
 * 收到警告消息
 */
router.post('/warm', function (req, res, next) {
  if (inFilters(req.ip)) return res.end('');
  if (!req.headers.name) return res.end('');
  if (!nameList.has(req.headers.name)) {
    next();
    return;
  }
  let data = comb(req, "warm");
  soketio.emitWarm(data);
  res.end('');
});
/**
 * 收到错误消息
 */
router.post('/err', function (req, res, next) {
  if (inFilters(req.ip)) return res.end('');
  if (!req.headers.name) return res.end('');
  if (!nameList.has(req.headers.name)) {
    next();
    return;
  }
  let data = comb(req, "err");
  soketio.emitErr(data);
  res.end('');
});

// router.use(function (req, res) {
//   res.status(404);
//   res.send('err');
// })

module.exports = router;
