module.exports = class AuthDto {
    login;
    id;

    constructor(model) {
        this.login = model.login;
        this.id = model.id;
    }
}