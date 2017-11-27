var express = require('express');
var router = express.Router();
var soketio = require('../sockets');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {});
});

let cacheList = [];

function setCache(data) {
  let key = Date.now() + '' + (Math.random() * 1000 >> 0);
  cacheList.push({
    id: key,
    data: data
  })
  if (cacheList.length > 500) {
    cacheList.shift();
  }
  return key;
}

function getCache(key) {
  let list = cacheList.filter(item => item.id == key);
  if (list.length > 0) return list[0];
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

router.post('/info', function (req, res, next) {
  if (!req.body.data) return res.end('');
  let list = JSON.parse(req.body.data);
  let id = ''
  if (req.body.data.length > 200) {
    id = setCache(list);
    list.length = 2;
  }
  let data = {
    headers: getHeader(req.headers),
    data: list,
    id: id
  }
  soketio.emitInfo(data);
  res.end('');
});
router.post('/warm', function (req, res, next) {
  if (!req.body.data) return res.end('');
  let list = JSON.parse(req.body.data);
  let id = ''
  if (req.body.data.length > 200) {
    id = setCache(list);
    list.length = 2;
  }
  let data = {
    headers: getHeader(req.headers),
    data: list,
    id: id
  }
  soketio.emitWarm(data);
  res.end('');
});
router.post('/err', function (req, res, next) {
  if (!req.body.data) return res.end('');
  let list = JSON.parse(req.body.data);
  let id = ''
  if (req.body.data.length > 200) {
    id = setCache(list);
    list.length = 2;
  }
  let data = {
    headers: getHeader(req.headers),
    data: list,
    id: id
  }
  soketio.emitErr(data);
  res.end('');
});

module.exports = router;
