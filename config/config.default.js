/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1625040559227_5953';

    // 中间件的文件名
    config.middleware = ['middlewareFilter'];
    //指定某些路径不过滤,可以用数组展示 config后面跟的是中间件的名称,可以用*号来模糊校验的路径
    config.middlewareFilter = {
        // 登录接口这个过滤器不过滤
        ignore: ['/project_progress/api/login/*']
    }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  //egg 框架内置了安全系统，默认开启防止 XSS 攻击 和 CSRF 攻击，此处关闭（生产环境不推荐）  npm i egg-cors --save
  // config.security = {
  //   csrf: false
  // };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*']//[]中放放出的白名单，*代表所有
  };
  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  // 接收文件上传需要的配置  cnpm install egg-multipart -S
  exports.multipart = {
    mode: 'file',
  };
  // 数据库配置
  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'project_progress',
      // 调试 打印出sql语句
      // debug:true,
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  return {
    ...config,
    ...userConfig,
  };
};
