var express = require('express');
var router = express.Router();
var soketio=require('../sockets');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{});
});
router.get('/info', function(req, res, next) {
  let data={
    headers:req.headers,
    data:req.query
  }
  soketio.emitInfo(data);
  res.end('');
});
router.get('/warm', function(req, res, next) {
  let data={
    headers:req.headers,
    data:req.query
  }
  soketio.emitWarm(data);
  res.end('');
});
router.get('/err', function(req, res, next) {
  let data={
    headers:req.headers,
    data:req.query
  }
  soketio.emitErr(data);
  res.end('');
});

module.exports = router;
