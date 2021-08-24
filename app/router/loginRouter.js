module.exports = app => {
    // 登录接口
    app.router.post('/project_progress/api/login', app.controller.loginController.userLogin);
    // 修改密码接口
    app.router.post('/project_progress/api/changePassWord', app.controller.loginController.changePassWord);
    // 忘记密码接口
    app.router.post('/project_progress/api/forgetPassword', app.controller.loginController.forgetPassword);
};
