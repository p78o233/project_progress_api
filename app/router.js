'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
// 这个是主路由配置文件，router文件夹里面的是每个模块的分路由配置文件
module.exports = app => {
    const {router, controller} = app;
    router.get('/index', controller.home.index);
    // 引入通用的路由
    require('./router/currencyRouter')(app);
    // 引入登录路由
    require('./router/loginRouter')(app);
};
