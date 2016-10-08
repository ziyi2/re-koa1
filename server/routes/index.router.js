const router = require('koa-router')();


router.get('/', function *(next) {
  yield this.render('index',{
    title:'主页',
    session:this.session
  });
});


module.exports = router;
