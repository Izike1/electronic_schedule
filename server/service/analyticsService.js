const ApiError = require('../error/ApiError');
const { Attendance, User, User_info, Schedule, Lesson, Groups, Faculty } = require('../models/models');
const { Op } = require('sequelize');
const Excel = require('exceljs');
const { Sequelize } = require('../db');

const attendancesRu = {
    'unknown': 'не изучал',
    'attended': 'присутствовал',
    'absent': 'не был',
    'sick': 'болел',
    'order': 'распоряжение'
}

class AnalyticsService {
    async getAttendanceData(criteria, include) {
        const attendance = await Attendance.findAll({
            where: criteria,
            include,
        });

        return attendance;
    }

    async createExcelWorkbook(rows, fileName) {
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

        worksheet.addRows(rows);

        const buffer = await workbook.xlsx.writeBuffer();
        return buffer;
    }

    async getAnalyticsByStudentName(studentId, startDate, endDate) {
        const student = await User_info.findOne({
            where: {
                id: studentId
            },
            include: [{ model: User }]
        });

        if (!student) {
            throw ApiError.badRequest('Студент не найден');
        }

        const criteria = {
            UserId: student.User.id
        };
        const endDateObject = new Date(endDate)
        endDateObject.setDate(endDateObject.getDate() + 1)
        const include = [
            {
                model: Schedule,
                required: true,
                where: {
                    id: Sequelize.col('attendance.ScheduleId'),
                    date: {
                        [Op.between]: [new Date(startDate), endDateObject]
                    }
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
        ];

        const attendance = await this.getAttendanceData(criteria, include);

        const rows = attendance.map(item => ({
            id: item.id,
            group: '',
            lesson: item.Schedule.Lessons[0].name,
            lastName: item.User.User_info.last_name,
            firstName: item.User.User_info.first_name,
            middleName: item.User.User_info.middle_name,
            status: attendancesRu[item.status],
            createdAt: item.createdAt
        }));

        return this.createExcelWorkbook(rows, 'student_analytics.xlsx');
    }

    async getAnalyticsByGroup(groupId, startDate, endDate) {
        const group = await Groups.findOne({
            where: { id: groupId },
            include: [{ model: User }]
        });

        if (!group) {
            throw ApiError.badRequest('Группа не найдена');
        }

        const criteria = {
            UserId: { [Op.in]: group.Users.map(user => user.id) }
        };
        const endDateObject = new Date(endDate)
        endDateObject.setDate(endDateObject.getDate() + 1)
        const include = [
            {
                model: Schedule,
                required: true,
                where: {
                    id: Sequelize.col('attendance.ScheduleId'),
                    date: {
                        [Op.between]: [new Date(startDate), endDateObject]
                    }
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
        ];

        const attendance = await this.getAttendanceData(criteria, include);

        const rows = attendance.map(item => ({
            id: item.id,
            group: group.name,
            lesson: item.Schedule.Lessons[0].name,
            lastName: item.User.User_info.last_name,
            firstName: item.User.User_info.first_name,
            middleName: item.User.User_info.middle_name,
            status: attendancesRu[item.status],
            createdAt: item.createdAt
        }));

        return this.createExcelWorkbook(rows, 'group_analytics.xlsx');
    }

    async getAnalyticsByFaculty(facultyId, startDate, endDate) {
        const faculty = await Faculty.findOne({
            where: { id: facultyId },
            include: [{ model: Groups, include: [{ model: User }] }],
        });

        if (!faculty) {
            throw ApiError.badRequest('Факультет не найден');
        }

        const studentIds = faculty.Groups.flatMap(group => group.Users.map(user => user.id));

        const criteria = {
            UserId: { [Op.in]: studentIds },
        };
        const endDateObject = new Date(endDate)
        endDateObject.setDate(endDateObject.getDate() + 1)
        const include = [
            {
                model: Schedule,
                required: true,
                where: {
                    id: Sequelize.col('attendance.ScheduleId'),
                    date: {
                        [Op.between]: [new Date(startDate), endDateObject]
                    }
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
        ];

        const attendance = await this.getAttendanceData(criteria, include);

        const rows = attendance.map(item => {
            const group = faculty.Groups.find(group => group.Users.find(user => user.id === item.UserId));

            return {
                id: item.id,
                group: group.name,
                lesson: item.Schedule.Lessons[0].name,
                lastName: item.User.User_info.last_name,
                firstName: item.User.User_info.first_name,
                middleName: item.User.User_info.middle_name,
                status: attendancesRu[item.status],
                createdAt: item.createdAt
            };
        });

        return this.createExcelWorkbook(rows, 'faculty_analytics.xlsx');
    }

    async getAnalyticsByLessonName(lessonName, startDate, endDate) {
        const lesson = await Lesson.findOne({
            where: { name: lessonName },
            include: [{ model: Schedule }],
        });

        if (!lesson) {
            throw ApiError.badRequest('Предмет не найден');
        }
        const scheduleIds = lesson.Schedules.map((schedule) => schedule.id);

        const criteria = {
            ScheduleId: { [Op.in]: scheduleIds }
        };
        const endDateObject = new Date(endDate)
        endDateObject.setDate(endDateObject.getDate() + 1)
        const include = [
            {
                model: Schedule,
                required: true,
                where: {
                    id: Sequelize.col('attendance.ScheduleId'),
                    date: {
                        [Op.between]: [new Date(startDate), endDateObject]
                    }
                },
                include: [
                    {
                        model: Lesson,
                        required: true,
                        through: { attributes: ['LessonName'] },
                    },
                    {
                        model: Groups,
                        required: true,
                    },
                ],
            },
            {
                model: User,
                required: true,
                include: [
                    {
                        model: User_info,
                        required: true,
                        attributes: ['last_name', 'first_name', 'middle_name'],
                    },
                    {
                        model: Groups,
                        required: true,
                    },
                ],
            },
        ];

        const attendance = await this.getAttendanceData(criteria, include);
        const rows = attendance.map((item) => ({
            id: item.id,
            group: item.User.Group.name,
            lesson: item.Schedule.Lessons[0].name,
            lastName: item.User.User_info.last_name,
            firstName: item.User.User_info.first_name,
            middleName: item.User.User_info.middle_name,
            status: attendancesRu[item.status],
            createdAt: item.createdAt,
        }));

        return this.createExcelWorkbook(rows, 'lesson_analytics.xlsx');
    }
}

module.exports = new AnalyticsService();
