const analyticsService = require('../service/analyticsService');

class AnalyticsController {
    async getAnalytics(req, res, next) {
        try {
            const { name, startDate, endDate } = req.query;
            const response = await analyticsService.getAnalytics(name, startDate, endDate);

            res.set(response.headers);
            response.body.pipe(res);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new AnalyticsController();