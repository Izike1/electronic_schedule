const jwt = require('jsonwebtoken');
const { Token } = require('../models/models')
const { writeToLogFile } = require('../logger/index');


class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        return jwt.verify(token, process.env.SECRET_KEY)
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.REFRESH_SECRET_KEY)
        } catch (e) {
            return null;
        }
    }

    async saveToken(authId, refreshToken) {
        // const tokenData = await Token.findOne({where: {authId: authId}})
        // if (tokenData) {
        //     tokenData.refreshToken = refreshToken;
        //     return tokenData.save();
        // }
        const token = await Token.create({ AuthId: authId, refreshToken })
        return { token };
    }

    async removeToken(refreshToken) {
        return await Token.destroy({ where: { refreshToken: refreshToken } })
    }


    async deleteOldTokens() {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        await Token.destroy({
            where: {
                createdAt: {
                    [Op.lt]: threeMonthsAgo
                }
            }
        });
        writeToLogFile('Удаление старых токенов выполнено успешно')
        return 'Удаление старых токенов выполнено успешно';
    }

    async findToken(refreshToken) {
        return await Token.findOne({ where: { refreshToken: refreshToken } })
    }
}

module.exports = new TokenService();