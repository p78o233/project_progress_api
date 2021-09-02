const Controller = require('egg').Controller;
var R = require('../utils/responseBean.js');
var MD5 = require('../utils/md5.js');
var TOOL = require('../utils/tools.js');
class RoleController extends Controller{
    // 分页获取角色
    async getRole(){
        const {ctx} = this;
        const queryParam = this.ctx.query;
        let page = queryParam.page || 1
        let pageSize = queryParam.pageSize || 10
        let start = (page - 1 )*pageSize
        let count = await ctx.service.roleService.getRoleCount(queryParam.roleName)
        let roles = await ctx.service.roleService.getRoleQuery(queryParam.roleName,start,pageSize);
        count = TOOL.jsonFromatSingle(count)
        let pageInfo = {
            "count":count.count,
            "info":roles
        }
        ctx.body = R.retrunResult(true,0,pageInfo,"操作成功");
    }
    // 新增角色
    async insetRole(){
        const {ctx} = this;
        // userid
        let userId = ctx.headers["userid"];
        let roleName = this.ctx.request.body.role_name;
        let date = new Date();
        let row = {
            "role_name":roleName,
            "create_time":date,
            "create_user_id":userId,
            "modify_time":date,
            "modify_user_id":userId
        }
        let result = await ctx.service.currencyService.currencyInsert("role",row);
        ctx.body = R.retrunResult(true, 0, result, "操作成功");
    }
    // 修改角色
    async editRole(){
        const {ctx} = this;
        // userid
        let userId = ctx.headers["userid"];
        let roleId = this.ctx.request.body.id;
        let roleName = this.ctx.request.body.role_name;
        let date = new Date();
        let row = {
            "role_name":roleName,
            "modify_time":date,
            "modify_user_id":userId
        }
        let selection = {
            "id":roleId
        }
        let result = await ctx.service.currencyService.currencyUpdate("role",row,selection);
        if(result.updateSuccess > 0) {
            ctx.body = R.retrunResult(true, 0, result.updateSuccess, "操作成功");
        }else{
            ctx.body = R.retrunResult(false,1,"修改失败","操作失败");
        }
    }
    // 删除角色
    async deleteRoel(){
        const {ctx} = this;
        // userid
        let userId = ctx.headers["userid"];
        let roleId = this.ctx.request.body.id;
        let date = new Date();
        let row = {
            "isdel":1,
            "modify_time":date,
            "modify_user_id":userId
        }
        let selection = {
            "id":roleId
        }
        let result = await ctx.service.currencyService.currencyUpdate("role",row,selection);
        if(result.updateSuccess > 0) {
            ctx.body = R.retrunResult(true, 0, result.updateSuccess, "操作成功");
        }else{
            ctx.body = R.retrunResult(false,1,"修改失败","操作失败");
        }
    }

    // 根据用户手机号码模糊获取用户列表
    async getUserLikeLoginAccount(){
        const {ctx} = this;
        const queryParam = this.ctx.query;
        let users = await this.app.mysql.query('select id,user_name,login_account from user where isdel = 0 and login_account like ?',['%'+queryParam.login_account+'%'])
        ctx.body = R.retrunResult(true,0,users,"操作成功");
    }
    // 根据角色id分页获取用户
    async getRoleUser(){
        const {ctx} = this;
        const queryParam = this.ctx.query;
        let page = queryParam.page || 1
        let pageSize = queryParam.pageSize || 10
        let start = (page - 1 )*pageSize
        let count = await ctx.service.roleService.getRoleUserCount(queryParam.roleId,queryParam.userName)
        let userRoles = await ctx.service.roleService.getRoleUserQuery(queryParam.roleId,queryParam.userName,start,pageSize);
        count = TOOL.jsonFromatSingle(count)
        let pageInfo = {
            "count":count.count,
            "info":userRoles
        }
        ctx.body = R.retrunResult(true,0,pageInfo,"操作成功");
    }
    // 新增角色用户
    async insertRoleUser(){
        const {ctx} = this;
        // userid
        let userId = ctx.headers["userid"];
        let roleId = this.ctx.request.body.role_id
        let insetUserId = this.ctx.request.body.user_id
        let row = {
            "user_id":insetUserId,
            "role_id":roleId,
            "create_time":new Date(),
            "create_user_id":userId,
            "modify_time":new Date(),
            "modify_user_id":userId
        }
        let result = await ctx.service.currencyService.currencyInsert("user_role",row);
        ctx.body = R.retrunResult(true, 0, result, "操作成功");
    }
    // 删除角色用户
    async deleteRoleUser(){
        const {ctx} = this;
        // userid
        let userId = ctx.headers["userid"];
        let id = this.ctx.request.body.id;
        let row = {
            "isdel":1,
            "modify_time":new Date(),
            "modify_user_id":userId
        }
        let selection = {
            "id":id
        }
        let result = await ctx.service.currencyService.currencyUpdate("user_role",row,selection);
        if(result.updateSuccess > 0) {
            ctx.body = R.retrunResult(true, 0, result.updateSuccess, "操作成功");
        }else{
            ctx.body = R.retrunResult(false,1,"修改失败","操作失败");
        }
    }

    // 根据角色id获取菜单和已经有权限的菜单列表
    async getRoleMenu(){
        const {ctx} = this;
        const queryParam = this.ctx.query;
        // 1、先获取全部的菜单
        let meuns = await this.app.mysql.query('select id,menu_name,menu_level,menu_parent_id from menu where isdel = 0')
        // 2、根据角色id获取已有的菜单
        let menuRoles = await this.app.mysql.query('select id,menu_id,role_id from menu_role where isdel = 0 and role_id = ?',[queryParam.role_id])
        // 3、在步骤1中添加一个checked属性值，在步骤2中有数据的checked为1  没有为0

        // 4、把菜单整理为树状结构
    }
    // 修改角色菜单
    async editRoleMenu(){}
}
module.exports = RoleController;
