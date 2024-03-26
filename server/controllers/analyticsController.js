const analyticsService = require('../service/analyticsService');

class AnalyticsController {

    async getAnalyticsByStudentName(req, res, next) {
        try {
            const { studentLastName, studentFirstName, startDate, endDate } = req.query;
            const fileBuffer = await analyticsService.getAnalyticsByStudentName(studentLastName, studentFirstName, startDate, endDate);
            res.set({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="Analitika.xlsx"`,
            });
            res.send(fileBuffer);
        } catch (error) {
            next(error)
        }
    }

    async getAnalyticsByGroupName(req, res, next) {

    }

}

module.exports = new AnalyticsController();