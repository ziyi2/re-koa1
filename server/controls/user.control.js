const mongoose = require('mongoose');
const mongodb = require('../constants/mongodb.constant');
const common = require('../constants/common.constant');
const httpStatus = require('../constants/httpStatus.constant');
const crypto = require('crypto');

/**
 * describe: 登录页渲染
 * data:     16.10.07
 * author:   zhuxiankang
 * parm:     next
 */
module.exports.loginRender = function *(next) {
    yield this.render('login',{
        title:'登录',
        session:this.session
    });
};

/**
 * describe: 登录权限认证
 * data:     16.10.07
 * author:   zhuxiankang
 * parm:     next
 */
module.exports.login = function *(next) {
    try {
        let User = mongoose.model(mongodb.User);
        let query = this.request.body;
        let md5 = crypto.createHash('md5');

        let loginUser = {
            username:query.username,
            password:query.password
                //md5.update(`${query.password}${common.salt}`,'utf8').digest('base64');
        };


        //需要注意的是yield语句本身是没有返回值的(返回undefined)
        //next方法可以带一个参数,该参数就会被当作上一个yield语句的返回值
        //注意一下yield*的返回值
        let queryUser = yield User.findOne({username:loginUser.username});

        if(queryUser) {

            if(queryUser.password === md5.update(`${loginUser.password}${common.salt}`,'utf8').digest('base64')) {
                this.session.username=loginUser.username;
                this.redirect('/');
            } else {
                yield this.render('login',{
                    title:'登录',
                    session:this.session
                });
            }

        } else {
            yield this.render('login',{
                title:'登录',
                session:this.session
            });
        }


    } catch(e) {    //在Generator函数体内捕获

        console.log(e);

        yield this.render('login',{
            title:'登录',
            session:this.session
        });
    }
};


/**
 * describe: 注册页渲染
 * data:     16.10.04
 * author:   zhuxiankang
 * parm:     next
 */
module.exports.registerRender = function *(next) {
    yield this.render('register',{
        title:'注册',
        session:this.session
    });
};

/**
 * describe: 账号注册
 * data:     16.10.07
 * author:   zhuxiankang
 * parm:     next
 */
module.exports.register = function *(next) {
    try {
        let User = mongoose.model(mongodb.User);

        let query = this.request.body;
        let user = {
            username:query.username,
            password:query.password,
            email:query.email
        };

        let result = yield User.findOne({username:user.username});

        if(!result) {
            yield User.create(user);
            this.session.username = user.username;
            this.redirect('/');
            this.status = 301;
        } else {
            yield this.render('register',{
                title:'注册',
                session:this.session
            });
        }
    } catch(e) {

        console.log(e);

        yield this.render('register',{
            title:'注册',
            session:this.session
        });
    }
};

/**
 * describe: 注销
 * data:     16.10.07
 * author:   zhuxiankang
 * parm:     next
 */

module.exports.logout = function *(next) {
    this.session.username=null;
    this.status=303;
    this.redirect('/');
};