const { Auth, User, Groups } = require('../models/models');
async function registerGroupsInAuthAndUser() {

        const allGroups = await Groups.findAll({
            attributes: ['id', 'name']
        });


        await Promise.all(allGroups.map(async (group) => {
            const groupName = group.name;


            const password = Math.floor(1000000 + Math.random() * 9000000).toString();

            const createdAuth = await Auth.create({
                login: groupName,
                password: password,
                role: 'group'
            });

            await User.create({
                AuthId: createdAuth.id,
                GroupId: group.id
            });
        }));

        return 'Имена групп успешно зарегистрированы в Auth и User';

}

module.exports = registerGroupsInAuthAndUser
