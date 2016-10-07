const router = require('koa-router')();
const user = require('../controls/user.control');

//登录
router.get('/login', user.loginRender);
router.post('/login', user.login);

//注销
router.get('/logout', user.logout);

//注册
router.get('/register', user.registerRender);
router.post('/register', user.register);

module.exports = router;
