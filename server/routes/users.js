const router = require('koa-router')();
const user = require('../controls/user.js');


//注册页
router.get('/register', user.registerRender);

//账号注册
router.post('/register', user.register);

module.exports = router;
