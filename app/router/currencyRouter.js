module.exports = app => {
    // 统一通用接口
    app.router.post('/project_progress/currency/currencyInsert/:tableName', app.controller.currencyController.currencyInsert);
    app.router.post('/project_progress/currency/currencyUpdate/:tableName', app.controller.currencyController.currencyUpdate);
    app.router.post('/project_progress/currency/currencyDelete/:tableName', app.controller.currencyController.currencyDelete);
};
