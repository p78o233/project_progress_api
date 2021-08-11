const Controller = require('egg').Controller;
// 文件上传需要引用
const path = require('path');
const fs = require('fs');

// 统一返回值
var R = require('../utils/responseBean.js');

class CurrentyController extends Controller {
    // 通用新增接口
    async currencyInsert(){
        const {ctx} = this;
        // 表名
        let tableName = this.ctx.params.tableName
        // 数据
        let row = this.ctx.request.body;
        let insertResult = await ctx.service.currencyService.currencyInsert(tableName,row);
        let result
        if(insertResult.affectedRows>0) {
            result = R.retrunResult(true, 0, insertResult, "操作成功")
        }else{
            result = R.retrunResult(true, 0, null, "操作失败")
        }
        ctx.body = result;
    }

    // 通用修改接口
    async currencyUpdate(){
        const {ctx} = this;
        // 表名
        let tableName = this.ctx.params.tableName
        // 数据
        let sendData = this.ctx.request.body;
        // 更新的数据
        let row = sendData.row;
        // 更新的条件，这个接口条件只能是等于
        let selection = sendData.selection;
        let updateResult = await ctx.service.currencyService.currencyUpdate(tableName,row,selection);
        let result
        if(updateResult>0) {
            result = R.retrunResult(true, 0, updateResult, "操作成功")
        }else{
            result = R.retrunResult(true, 0, null, "操作失败")
        }
        ctx.body = result;
    }

    // 通用删除接口
    async currencyDelete(){
        const {ctx} = this;
        // 表名
        let tableName = this.ctx.params.tableName
        // 删除的id {"id":1}
        let row = this.ctx.request.body;
        let deleteResult = await ctx.service.currencyService.currencyDelete(tableName,row);
        let result
        if(deleteResult>0) {
            result = R.retrunResult(true, 0, deleteResult, "操作成功")
        }else{
            result = R.retrunResult(true, 0, null, "操作失败")
        }
        ctx.body = result;
    }
}
module.exports = CurrentyController;
