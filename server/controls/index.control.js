

/**
 * describe: 首页渲染
 * data:     16.10.07
 * author:   zhuxiankang
 * parm:     next
 */
module.exports.indexRender =  function *(next) {
    yield this.render('index',{
        title:'主页',
        username:this.session.username
    });
};


