module.exports = app => {
    // 角色
    app.router.get('/project_progress/api/role/getRole', app.controller.roleController.getRole);
    app.router.post('/project_progress/api/role/insetRole', app.controller.roleController.insetRole);
    app.router.post('/project_progress/api/role/editRole', app.controller.roleController.editRole);
    app.router.post('/project_progress/api/role/deleteRoel', app.controller.roleController.deleteRoel);
    // 角色用户
    app.router.get('/project_progress/api/role/getUserLikeLoginAccount', app.controller.roleController.getUserLikeLoginAccount);
    app.router.get('/project_progress/api/role/getRoleUser', app.controller.roleController.getRoleUser);
    app.router.post('/project_progress/api/role/insertRoleUser', app.controller.roleController.insertRoleUser);
    app.router.post('/project_progress/api/role/deleteRoleUser', app.controller.roleController.deleteRoleUser);
    // 角色菜单
    app.router.get('/project_progress/api/role/getRoleMenu', app.controller.roleController.getRoleMenu);
};
