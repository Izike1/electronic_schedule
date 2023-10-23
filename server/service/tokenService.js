const jwt = require('jsonwebtoken');
const { Token } = require('../models/models')
class TokenService {
    generateToken (payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(authId, refreshToken) {
        const tokenData = await Token.findOne(({where: {authId:authId}}))
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({AuthId: authId, refreshToken})
        return { token };
    }
}
module.exports = new TokenService();