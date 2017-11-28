const express = require('express');
const router = express.Router();
const soketio = require('../sockets');

let cacheList = [];
let nameList = new Set();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {});
});
router.get('/index', function (req, res, next) {
  res.render('index', {});
});

router.get('/api/set', function (req, res, next) {
  if (req.query.name) {
    nameList.add(req.query.name);
  }
  res.json({
    code: 1
  });
});
router.get('/api/get', function (req, res, next) {
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
router.get('/api/del', function (req, res, next) {
  if (req.query.name) {
    nameList.delete(req.query.name)
  }
  res.json({
    code: 1
  });
});

router.get('/api/getData', function (req, res, next) {
  if (req.query.id) {
    let data = getCache(req.query.id)
    res.json({
      code: 1,
      data: data
    });
  } else {
    res.json({
      code: 0
    });
  }
});

function setCache(data) {
  let key = Date.now() + '' + (Math.random() * 1000 >> 0);
  cacheList.push({
    id: key,
    data: JSON.stringify(data)
  })
  if (cacheList.length > 500) {
    cacheList.shift();
  }
  return key;
}

function getCache(key) {
  let list = cacheList.filter(item => item.id == key);
  if (list.length > 0) {
    try{
      return JSON.parse(list[0]);
    }catch(e){
      return list[0]
    }
  }
  return {};
}

function getHeader(headers) {
  return {
    host: headers.host,
    referer: headers.referer,
    clientid: headers.clientid,
    version: headers.version,
    model: headers.model,
    OSVersion: headers.OSVersion,
    brand: headers.brand,
    channel: headers.channel,
    net: headers.net,
    bundle: headers.bundle,
    jsversion: headers.jsversion,
    utoken: headers.utoken,
    platform: headers.platform,
  }
}

function getData(req) {
  let list = req.body.data;
  let id = ''
  if (req.body.data) {
    id = setCache(list);
  }
  let data = {
    id: id,
    headers: getHeader(req.headers),
    name: req.body.name,
    url: req.body.url,
    opt: req.body.opt
  }
  return data;
}
router.get('/info', function (req, res, next) {
  soketio.emitInfo(req.query);
  res.end('你好，再见。');
});

router.post('/info', function (req, res, next) {
  if (!req.headers.name) return res.end('');
  if (!nameList.has(req.headers.name)) {
    next();
    return;
  }
  if (!req.body.name) return res.end('');
  let data = getData(req);
  soketio.emitInfo(data);
  res.end('');
});
router.post('/warm', function (req, res, next) {
  if (!req.headers.name) return res.end('');
  if (!nameList.has(req.headers.name)) {
    next();
    return;
  }
  if (!req.body.name) return res.end('');
  let data = getData(req);
  soketio.emitWarm(data);
  res.end('');
});
router.post('/err', function (req, res, next) {
  if (!req.headers.name) return res.end('');
  if (!nameList.has(req.headers.name)) {
    next();
    return;
  }
  if (!req.body.name) return res.end('');
  let data = getData(req);
  soketio.emitErr(data);
  res.end('');
});

// router.use(function (req, res) {
//   res.status(404);
//   res.send('err');
// })

module.exports = router;
