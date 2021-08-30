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
                // 获取用户信息
                let userId = await ctx.service.currencyService.currencySelect('user',selection,columns,order,1,0);
                userId = TOOL.jsonFromatSingle(userId)
                let userInfo = {
                    "userId":userId.id,
                    "token":token
                }
                // 获取用户能够使用的菜单列表
                // 初级菜单
                let menuInfo = await ctx.service.loginService.currencySelect(userId.id,0,0)
                for(let i = 0 ; i < menuInfo.length ;i++){
                    // 获取第二级菜单
                    let secondMenuInfo = await ctx.service.loginService.currencySelect(userId.id,1,menuInfo[i].id)
                    for(let j = 0 ;j < secondMenuInfo.length ;j++){
                        // 获取第三级菜单
                        let thirdMenuInfo = await ctx.service.loginService.currencySelect(userId.id,2,secondMenuInfo[j].id)
                        secondMenuInfo[j].children = thirdMenuInfo;
                    }
                    menuInfo[i].children = secondMenuInfo
                }
                let returnResult = {
                    "userInfo":userInfo,
                    "menuInfo":menuInfo
                }
                ctx.body = R.retrunResult(true,0,returnResult,"操作成功");
            }
        }else{
            // 用户名密码不正确
            ctx.body = R.retrunResult(false,1,"账号或密码不正确","操作失败");
        }
    }

    // 修改密码
    async changePassWord(){
        const {ctx} = this;
        let login_account = this.ctx.request.body.login_account;
        let newPwd = this.ctx.request.body.newPwd;
        let oldPwd = this.ctx.request.body.oldPwd;
        newPwd = MD5.md5(newPwd)
        oldPwd = MD5.md5(oldPwd)
        // 检查账号是否存在
        let userExist = await this.app.mysql.query('select count(*) as count from user where login_account = ?',[login_account])
        userExist = TOOL.jsonFromatSingle(userExist)
        if(userExist.count > 0){
            // 用户存在
            // 校验旧密码是否正确
            let oldPwdCheck = await this.app.mysql.query("select count(*) as count from user where login_account = ? and pwd = ?",[login_account,oldPwd])
            oldPwdCheck   = TOOL.jsonFromatSingle(oldPwdCheck)
            if(oldPwdCheck.count > 0){
                // 旧密码正确
                // 更改旧密码
                let selection = {
                    "login_account":login_account,
                    "pwd":oldPwd
                }
                let row = {
                    "pwd":newPwd
                }
                // 更新密码
                let updateCount = await ctx.service.currencyService.currencyUpdate("user",row,selection);
                if(updateCount.updateSuccess > 0) {
                    ctx.body = R.retrunResult(true, 0, updateCount.updateSuccess, "操作成功");
                }else{
                    ctx.body = R.retrunResult(false,1,"修改失败","操作失败");
                }
            }else{
                // 旧密码错误
                ctx.body = R.retrunResult(false,1,"旧密码错误","操作失败");
            }
        }else{
            // 用户不存在
            ctx.body = R.retrunResult(false,1,"用户不存在","操作失败");
        }
    }
    // 忘记密码
    async forgetPassword(){
        const {ctx} = this;
        let login_account = this.ctx.request.body.login_account;
        let newPwd = this.ctx.request.body.newPwd;
        let confirmPwd = this.ctx.request.body.confirmPwd;
        // 检查新密码和确认密码是否一致
        if(newPwd === confirmPwd){
            // 密码一致
            // 检查账号是否存在
            let userExist = await this.app.mysql.query('select count(*) as count from user where login_account = ?',[login_account])
            userExist = TOOL.jsonFromatSingle(userExist)
            if(userExist.count > 0) {
                // 用户存在
                // 更新密码
                let selection = {
                    "login_account":login_account
                }
                newPwd = MD5.md5(newPwd)
                let row = {
                    "pwd":newPwd
                }
                let updateCount = await ctx.service.currencyService.currencyUpdate("user",row,selection);
                if(updateCount.updateSuccess > 0) {
                    ctx.body = R.retrunResult(true, 0, updateCount.updateSuccess, "操作成功");
                }else{
                    ctx.body = R.retrunResult(false,1,"修改失败","操作失败");
                }
            }else{
                // 用户不存在
                ctx.body = R.retrunResult(false,1,"用户不存在","操作失败");
            }
        }else{
            // 密码不一致
            ctx.body = R.retrunResult(false,1,"密码与确认密码不一致","操作失败");
        }
    }
}
module.exports = LoginController;
