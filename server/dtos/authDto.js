module.exports = class AuthDto {
    login;
    role;
    id;

    constructor(model) {
        this.login = model.login;
        this.role = model.role;
        this.id = model.id;
    }
}