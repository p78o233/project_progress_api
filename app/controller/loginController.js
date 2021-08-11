const Controller = require('egg').Controller;
// 文件上传需要引用
// 统一返回值
var R = require('../utils/responseBean.js');
var MD5 = require('../utils/md5.js');
var TOOL = require('../utils/tools.js');

class LoginController extends Controller {
    // 登录接口
    async userLogin(){
        const {ctx} = this;
        let login_account = this.ctx.request.body.login_account;
        let pwd = this.ctx.request.body.pwd
        pwd = MD5.md5(pwd)
        // 根据用户名以及加密后的密码检测用户是否存在
        let userExist = await this.app.mysql.query('select count(*) as count from user where login_account = ? and pwd = ?',[login_account,pwd])
        userExist = TOOL.jsonFromatSingle(userExist)
        if(userExist.count>0){
            // 用户名密码正确，更新token
            let token =  MD5.md5(login_account+pwd+new Date().toDateString())
            let selection ={
                "login_account":login_account,
                "pwd":pwd
            }
            let row = {
                "token":token
            }
            let result = await ctx.service.currencyService.currencyUpdate('user',row,selection);
            if(result.updateSuccess>0){
                let selection = {
                    "login_account":login_account,
                    "pwd":pwd
                }
                let columns = ["id"];
                let order = [['id','desc']]
                let userId = await ctx.service.currencyService.currencySelect('user',selection,columns,order,1,0);
                userId = TOOL.jsonFromatSingle(userId)
                let returnResult = {
                    "userId":userId.id,
                    "token":token
                }
                ctx.body = R.retrunResult(true,0,returnResult,"操作成功");
            }
        }else{
            // 用户名密码不正确
            ctx.body = R.retrunResult(false,1,"账号或密码不正确","操作失败");
        }
    }
}
module.exports = LoginController;
