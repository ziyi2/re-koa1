const app = require('koa')()
  , koa = require('koa-router')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror')
  , mongoose = require('mongoose')
  , session = require('koa-session');

const index = require('./server/routes/index.router');
const user = require('./server/routes/user.router');

// global middlewares
// Must be used before any router is used
app.use(views(__dirname + '/views', {
  map: {
    html: 'ejs'   //ejs模板引擎
  }
}));

//初始化配置
require('./config')(mongoose);


app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

//打印日志中间件
app.use(function *(next){
  let start = new Date;
  yield next;
  let ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));

//session
app.keys=['riLbqTemd3NAdUBwUU7nfsuteqwapN'];
app.use(session(app));


// routes definition
koa.use('/', index.routes(), index.allowedMethods());
koa.use('/user', user.routes(), user.allowedMethods());


// mount root routes  
app.use(koa.routes());

app.on('error', function(err, ctx){
  logger.error('server error', err, ctx);
});

module.exports = app;
