/**
 * node:        config.js
 * data:        16.10.04
 * author:      zhuxiankang
 * describe:    mongodb,redis等数据配置文件
 */

module.exports = {
    //mongo
    mongodb: {
        'local': 'mongodb://localhost/re-koa1',
        'development':'mongodb://10.33.31.234/re-koa1',
        'production': 'mongodb://10.33.31.234/re-koa1' //有待修改
    }
};

