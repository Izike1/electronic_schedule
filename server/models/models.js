const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Auth = sequelize.define('Auth', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "HEADMAN" }
})
const Token = sequelize.define('Token', {
    accessToken: { type: DataTypes.STRING }
})
const Lesson = sequelize.define('Lesson', {
    name: { type: DataTypes.STRING, primaryKey: true },
})
const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})
const User_info = sequelize.define('User_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    middle_name: { type: DataTypes.STRING }
})

const Attendance = sequelize.define('Attendance', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.STRING }
})

const Groups = sequelize.define('Groups', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    faculty: { type: DataTypes.STRING }
})

const Schedule = sequelize.define('Schedule', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATE }
})

const Lesson_has_Schedule = sequelize.define('Lesson_has_Schedule', {
    Lesson_name: { type: DataTypes.STRING },
    Schedule_id: { type: DataTypes.INTEGER }
})

Auth.hasOne(User)
User.belongsTo(Auth)

Auth.hasMany(Token)
Token.belongsTo(Auth)

User.hasOne(User_info)
User_info.belongsTo(User)

User.hasMany(Schedule)
Schedule.belongsTo(User)

User.hasMany(Attendance)
Attendance.belongsTo(User)

User.hasOne(Groups)
Groups.belongsTo(User)

Schedule.hasMany(Attendance)
Attendance.belongsTo(Schedule)

Schedule.hasMany(Groups)
Groups.belongsTo(Schedule)

Lesson.belongsToMany(Schedule, { through: Lesson_has_Schedule })
Schedule.belongsToMany(Lesson, { through: Lesson_has_Schedule })

module.exports = {
    Auth,
    Lesson,
    Attendance,
    Schedule,
    Groups,
    Token,
    User,
    User_info
}