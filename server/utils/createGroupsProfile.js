const { Auth, User, Groups } = require('../models/models.js');
const { rusToLogin } = require('./rusToLatin')

async function registerGroupsInAuthAndUser(_, res, next) {
    try {
        console.log(typeof Auth)
        const allGroups = await Groups.findAll({
            attributes: ['id', 'name']
        });
        await Promise.all(allGroups.map(async (group) => {
            const groupName = group.name;


            const password = Math.floor(1000000 + Math.random() * 9000000).toString();
            const rusLogin = rusToLogin(groupName)

            const findAuth = await Auth.findOne({
                where: {
                    login: rusLogin
                }
            })

            if (!findAuth) {
                const createdAuth = await Auth.create({
                    login: rusLogin,
                    password: password,
                    role: 'group'
                });

                await User.create({
                    AuthId: createdAuth.id,
                    GroupId: group.id
                });
            }
        }));

        return res.json({ message: 'Имена групп успешно зарегистрированы в Auth и User' });
    } catch (e) {
        next(e)
    }


}

module.exports = registerGroupsInAuthAndUser
