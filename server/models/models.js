const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Headman = sequelize.define('Headman', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    group_id: {type: DataTypes.INTEGER},
    role: {type: DataTypes.STRING, defaultValue: "HEADMAN"}
})
const Alternate = sequelize.define('Alternate', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    group_id: {type: DataTypes.INTEGER},
    role: {type: DataTypes.STRING, defaultValue: "HEADMAN"}
})
const Teacher = sequelize.define('Teacher', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "TEACHER"}
})
const Director = sequelize.define('Director', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "DIRECTOR"}
})
const Group = sequelize.define('Group', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    group_id: {type: DataTypes.INTEGER},
    role: {type: DataTypes.STRING, defaultValue:"USER"}
})