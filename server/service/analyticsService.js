const ApiError = require('../error/ApiError');
const { Attendance, User, User_info, Schedule, Lesson, Groups } = require('../models/models');
const { Op } = require('sequelize');
const Excel = require('exceljs');
const { Sequelize } = require('../db');

class AnalyticsService {
    async getAnalyticsByStudentName(studentLastName, studentFirstName, startDate, endDate) {

        const student = await User_info.findOne({
            where: {
                last_name: studentLastName,
                first_name: studentFirstName || ''
            },
            include: [{ model: User }]
        })

        if (!student) {
            throw ApiError.badRequest('Студент не найден')
        }
        const attendance = await Attendance.findAll({
            where: {
                UserId: student.User.id,
                createdAt: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            },
            include: [
                {
                    model: Schedule,
                    required: true,
                    where: {
                        id: Sequelize.col('attendance.ScheduleId')
                    },
                    include: [
                        {
                            model: Lesson,
                            required: true,
                            through: { attributes: ['LessonName'] },
                        }
                    ]
                },
                {
                    model: User,
                    required: true,
                    include: [
                        {
                            model: User_info,
                            required: true,
                            attributes: ['last_name', 'first_name', 'middle_name']
                        }
                    ]
                }
            ]
        })

        const workbook = new Excel.Workbook();

        const worksheet = workbook.addWorksheet('Analytics');

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Название дисциплины', key: 'lesson', width: 100 },
            { header: 'Фамилия', key: 'lastName', width: 30 },
            { header: 'Имя', key: 'firstName', width: 30 },
            { header: 'Отчество', key: 'middleName', width: 30 },
            { header: 'Статус', key: 'status', width: 30 },
            { header: 'Дата', key: 'createdAt', width: 30 },
        ];

        const rows = [];
        attendance.forEach(item => {
            const row = {
                id: item.id,
                lesson: item.Schedule.Lessons[0].name,
                lastName: item.User.User_info.last_name,
                firstName: item.User.User_info.first_name,
                middleName: item.User.User_info.middle_name,
                status: item.status,
                createdAt: item.createdAt
            };

            rows.push(row);
        });

        worksheet.addRows(rows);

        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    }

    async getAnalyticsByGroup(groupName, startDate, endDate) {

        const group = await Groups.findOne({
            where: { name: groupName },
            include: [{
                model: User
            }]
        });

        if (!group) {
            throw ApiError.badRequest('Группа не найдена');
        }

        const students = await User.findAll({ where: { GroupId: group.id } })
        const userIds = students.map(user => user.dataValues.id);
        const attendance = await Attendance.findAll({
            where: {
                UserId: userIds,
                createdAt: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            },
            include: [
                {
                    model: Schedule,
                    required: true,
                    where: {
                        id: Sequelize.col('attendance.ScheduleId')
                    },
                    include: [
                        {
                            model: Lesson,
                            required: true,
                            through: { attributes: ['LessonName'] },
                        }
                    ]
                },
                {
                    model: User,
                    required: true,
                    include: [
                        {
                            model: User_info,
                            required: true,
                            attributes: ['last_name', 'first_name', 'middle_name']
                        }
                    ]
                }
            ]
        });
        const workbook = new Excel.Workbook();

        const worksheet = workbook.addWorksheet('Analytics');
        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Группа', key: 'group', width: 30 },
            { header: 'Название дисциплины', key: 'lesson', width: 100 },
            { header: 'Фамилия', key: 'lastName', width: 30 },
            { header: 'Имя', key: 'firstName', width: 30 },
            { header: 'Отчество', key: 'middleName', width: 30 },
            { header: 'Статус', key: 'status', width: 30 },
            { header: 'Дата', key: 'createdAt', width: 30 },
        ];

        const rows = [];
        attendance.forEach(item => {
            const row = {
                id: item.id,
                group: groupName,
                lesson: item.Schedule.Lessons[0].name,
                lastName: item.User.User_info.last_name,
                firstName: item.User.User_info.first_name,
                middleName: item.User.User_info.middle_name,
                status: item.status,
                createdAt: item.createdAt
            };

            rows.push(row);
        });

        worksheet.addRows(rows);

        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    }

}

module.exports = new AnalyticsService()