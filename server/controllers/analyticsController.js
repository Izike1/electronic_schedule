const analyticsService = require('../service/analyticsService');

class AnalyticsController {
    async getAnalytics(req, res, next) {
        try {
            const { params } = req.query;
            const analytics = await analyticsService.getAnalytics(params)
            res.json(analytics)
        } catch (error) {
            console.error('Error generating attendance report:', error);
            next(error)
        }
    }
}

module.exports = new AnalyticsController();