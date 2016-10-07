const router = require('koa-router')();


router.get('/', function *(next) {

  if(this.session.username) {
    var username = this.session.username
  }

  yield this.render('index',{
    title:'主页',
    session:this.session
  });
});




module.exports = router;
