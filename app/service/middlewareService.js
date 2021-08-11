const Service = require('egg').Service;

class MiddleWareService extends Service{
    async checkExistToken(token){
        let tokenExist = await this.app.mysql.query('select count(*) as count from user where token = ?  and isdel = 0',[token])
        return tokenExist;
    }
}
module.exports = MiddleWareService;
