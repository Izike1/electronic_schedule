const ApiError = require('../error/ApiError');
const { Attendance, Lesson, User, User_info } = require('../models/models');
const { Op } = require('sequelize');
const Excel = require('exceljs');

class AnalyticsService {
    async getAnalytics(name, startDate, endDate) {
        if (typeof startDate !== 'number' || typeof endDate !== 'number') {
            throw ApiError.badRequest('Неправильное время')
        }
        const attendance = await Attendance.findAll({
            where: {
                name: name,
                createAt: {
                    [Op.between]: [startDate, endDate]
                }
            },
            include: [
                {
                    model: Lesson,
                    attributes: ['name']
                },
                {
                    model: User,
                    include: [
                        {
                            model: User_info,
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
            { header: 'Name', key: 'lesson.name', width: 30 },
            { header: 'Last Name', key: 'user.user_info.last_name', width: 30 },
            { header: 'First Name', key: 'user.user_info.first_name', width: 30 },
            { header: 'Middle Name', key: 'user.user_info.middle_name', width: 30 },
            { header: 'Status', key: 'status', width: 30 },
            { header: 'Date', key: 'createAt', width: 30 },
        ];

        worksheet.addRows(attendance.map(item => ({
            id: item.id,
            lesson: item.lesson,
            user: item.user,
            status: item.status,
            createAt: item.createAt
        })));

        const fileName = `analytics_${name}_${startDate}_${endDate}.xlsx`;
        await workbook.xlsx.writeFile(fileName);

        return fileName
    }
}

module.exports = new AnalyticsService()
