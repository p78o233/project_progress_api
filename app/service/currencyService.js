const Service = require('egg').Service;
class CurrencyService extends Service{
    // 通用查询,第一个参数表名,第二个条件筛选条件，第三个参数要查询的字段，第四个排序方式，第五个查询数量，第六个从哪个开始
    async currencySelect(tableName,selection,columns,order,limit,offset){
        const result = await  this.app.mysql.select(tableName,{
            // 使用select方法只用通过where设置条件只能支持等于 和 in两种方式，其他的要用query方法
            where:selection,//where条件  前面的是= 后面的是 in
            columns:columns,//要查询的字段
            order:order,//排序方式
            limit:limit,//查询的数据量
            offset:offset//从哪个字段开始
        })
        return result
    }
    // 通用新增，第一个参数是表名称  第二个是插入的参数单个插入用{} 批量插入用[]
    async currencyInsert(tableName,row){
        const result = await this.app.mysql.insert(tableName,row);
        let insertResult = {
            "insertId":result.insertId,
            "affectedRows":result.affectedRows
        }
        return {insertResult}
    }

    // 通用更新，第一个参数是表名称，第二个参数是更新的字段，第三个参数是筛选条件
    async currencyUpdate(tableName,row,selection){
        const options = {
            where: selection
        };
        const result = await this.app.mysql.update(tableName, row, options);
        // 影响的行数
        const updateSuccess = result.affectedRows;
        return {updateSuccess}
    }

    // 根据id通用物理删除，第一个参数表名称，第二个参数id对象
    async currencyDelete(tableName,row){
        const result = await this.app.mysql.delete(tableName,row);
        return result.affectedRows
    }
}
module.exports = CurrencyService
