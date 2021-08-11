// RowDataPacket取值,返回一个值
function jsonFromatSingle(result){
    var dataString = JSON.stringify(result);
    var data = JSON.parse(dataString);
    return data[0];
}
//RowDataPacket取值 返回一个数组 []
function jsonFromat(result){
    var dataString = JSON.stringify(result);
    var data = JSON.parse(dataString);
    return data;
}
module.exports = {
    jsonFromatSingle,jsonFromat
}
