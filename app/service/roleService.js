const Service = require('egg').Service;

class RoleService extends Service{
    // 分页获取角色
    async getRoleCount(roleName){
        let sql =  'select count(*) as count from role where isdel = 0 '
        if(roleName != ""&&roleName!=null&&roleName!=undefined){
            sql += ' and role_name like '+"'%"+roleName+"%'"
        }
        const count = await this.app.mysql.query(
            sql
        )
        return count
    }
    async getRoleQuery(roleName,start,pageSize){
        let sql =  'select * from role where isdel = 0 '
        if(roleName != ""&&roleName!=null&&roleName!=undefined){
            sql += ' and role_name like '+"'%"+roleName+"%'"
        }
        sql += "order by modify_time desc limit "+ start +" , "+ pageSize
        const roles = await this.app.mysql.query(
           sql
        )
        return roles
    }
    // 分页获取角色用户
    async getRoleUserCount(roleId,userName){
        let sql = 'select count(*) as count from (select user_role.id,user_role.role_id,user_role.user_id,`user`.user_name,`user`.login_account,`user`.email,user_role.isdel from user_role ' +
            'LEFT JOIN `user` on `user`.id = user_role.user_id)t where isdel = 0 and role_id = '+roleId
        if(userName != ""&&userName!=null&&userName!=undefined){
            sql += ' and user_name like '+"'%"+userName+"%'"
        }
        const count = await this.app.mysql.query(
            sql
        )
        return count
    }
    async getRoleUserQuery(roleId,userName,start,pageSize){
        let sql = 'select * from (select user_role.id,user_role.role_id,user_role.user_id,`user`.user_name,`user`.login_account,`user`.email,user_role.isdel from user_role ' +
            'LEFT JOIN `user` on `user`.id = user_role.user_id)t where isdel = 0 and role_id = '+roleId
        if(userName != ""&&userName!=null&&userName!=undefined){
            sql += ' and user_name like '+"'%"+userName+"%'"
        }
        sql+= " order by id desc limit "+ start +" , "+ pageSize
        const userRoles = await this.app.mysql.query(
            sql
        )
        return userRoles
    }
}
module.exports = RoleService;
