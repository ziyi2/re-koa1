var crypto = require('crypto');


/**
 * describe: 注册页渲染
 * data:     16.10.04
 * author:   zhuxiankang
 * parm:     next
 */
module.exports.registerRender = function *(next) {
    yield this.render('register',{title:'注册'});
};

/**
 * describe: 账号注册
 * data:     16.10.04
 * author:   zhuxiankang
 * parm:     next
 */
module.exports.register = function *(next) {
    try {

        let query = this.request.body;
        let user = {
            username:query.username,
            password:query.password,
            email:query.email
        };

        let md5=crypto.createHash('md5');
        user.salt=new Date()+user.username;                                       //盐
        user.password=md5.update(user.password+user.salt,'utf8').digest('base64');//md5加盐加密




        this.body = {
            status: 'success'
        }

    } catch(e) {

        console.log(e);
    }




};