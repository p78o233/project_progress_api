var R = require('../utils/responseBean.js');
var TOOL = require('../utils/tools.js');
module.exports = (options, app) => {
    return async function auth(ctx, next) {
        // 1、检查token是否正常
        let token =  ctx.headers["token"]
        let userId = ctx.headers["userId"]
        let tokenExist = await ctx.service.middlewareService.checkExistToken(token)
        tokenExist = TOOL.jsonFromatSingle(tokenExist)
        if(tokenExist.count>0){
            // token有效，获取请求路径
            let url = ctx.request.url
            await next();
            // 根据userId鉴权
            // 项目操作的url走另一个鉴权方式
        }else{
            // token无效
            ctx.body = R.retrunResult(false,201,"","token失效请重新登录")
        }

    }
}
