const Service = require('egg').Service;
class LoginService extends Service{
    async currencySelect(userId,level,parentId){
        const menus = await this.app.mysql.query('select * from\n' +
            '(select menu.id,menu.menu_name,menu.menu_level,menu.menu_page_path,menu.menu_component_url,menu.menu_parent_id from menu\n' +
            'LEFT JOIN menu_role on menu.id = menu_role.menu_id\n' +
            'LEFT JOIN\n' +
            '(select menu_role.menu_id from menu_role\n' +
            'LEFT JOIN user_role on menu_role.menu_id = user_role.role_id\n' +
            'LEFT JOIN\n' +
            '(select role.id from role \n' +
            'LEFT JOIN  user_role on role.id = user_role.role_id\n' +
            'LEFT JOIN (\n' +
            '\tselect user_role.role_id from user_role WHERE user_id = ?\n' +
            ') as user_role_temp ON user_role_temp.role_id = role.id) as role_temp on role_temp.id = menu_role.role_id) \n' +
            'as menu_role_temp ON menu_role_temp.menu_id = menu.id) menu_temp where menu_level = ? and menu_parent_id = ?;\n'
            ,[userId,level,parentId])
        return menus
    }
}
module.exports = LoginService
