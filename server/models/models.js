const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Auth = sequelize.define('Auth', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, notNull: true },
    password: { type: DataTypes.STRING, notNull: true },
    role: { type: DataTypes.STRING, defaultValue: "STUDENT" }
})
const Token = sequelize.define('Token', {
    refreshToken: { type: DataTypes.STRING }
})
const Lesson = sequelize.define('Lesson', {
    name: { type: DataTypes.STRING, primaryKey: true, notNull: true },
})
const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})
const User_info = sequelize.define('User_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    last_name: { type: DataTypes.STRING, notNull: true },
    first_name: { type: DataTypes.STRING },
    middle_name: { type: DataTypes.STRING }
})

const Attendance = sequelize.define('Attendance', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.STRING }
})

const Groups = sequelize.define('Groups', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, notNull: true },
})

const Faculty = sequelize.define('Faculty', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, notNull: true }
})

const Departament = sequelize.define('Departament', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING }
})

const Schedule = sequelize.define('Schedule', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING },
    additional: { type: DataTypes.STRING },
    date: { type: DataTypes.DATE, notNull: true }
})

const Lesson_has_Schedule = sequelize.define('Lesson_has_Schedule', {})

Auth.hasOne(User)
User.belongsTo(Auth)

Auth.hasMany(Token)
Token.belongsTo(Auth)

User_info.hasOne(User)
User.belongsTo(User_info)

User.hasMany(Schedule)
Schedule.belongsTo(User)

User.hasMany(Attendance)
Attendance.belongsTo(User)

Groups.hasMany(User)
User.belongsTo(Groups)

Departament.hasMany(User)
User.belongsTo(Departament)

Schedule.hasMany(Attendance)
Attendance.belongsTo(Schedule)

Groups.hasMany(Schedule)
Schedule.belongsTo(Groups)

Faculty.hasMany(Groups)
Groups.belongsTo(Faculty)

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
    User_info,
    Faculty,
    Departament,
    Lesson_has_Schedule
}