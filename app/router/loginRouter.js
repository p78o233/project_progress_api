module.exports = app => {
    // 登录接口
    app.router.post('/project_progress/api/login', app.controller.loginController.userLogin);
};
