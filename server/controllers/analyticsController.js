const analyticsService = require('../service/analyticsService');

class AnalyticsController {

    async getAnalyticsByLessonName(req, res, next) {
        try {
            const { lessonName, startDate, endDate } = req.query;
            const fileBuffer = await analyticsService.getAnalyticsByLessonName(lessonName, startDate, endDate);
            res.set({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="Analitika_Lesson.xlsx"`,
            });
            res.send(fileBuffer);
        } catch (error) {
            next(error);
        }
    }

    async getAnalyticsByStudentName(req, res, next) {
        try {
            const { studentId, startDate, endDate } = req.query;
            const fileBuffer = await analyticsService.getAnalyticsByStudentName(studentId, startDate, endDate);
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
        try {
            const { groupId, startDate, endDate } = req.query;
            const fileBuffer = await analyticsService.getAnalyticsByGroup(groupId, startDate, endDate);
            res.set({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="AnalitikaByGroup.xlsx"`,
            });
            res.send(fileBuffer);
        } catch (error) {
            next(error)
        }
    }

    async getAnalyticsByFaculty(req, res, next) {
        try {
            const { facultyId, startDate, endDate } = req.query;
            const fileBuffer = await analyticsService.getAnalyticsByFaculty(facultyId, startDate, endDate);
            res.set({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="AnalitikaByGroup.xlsx"`,
            });
            res.send(fileBuffer);
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new AnalyticsController();