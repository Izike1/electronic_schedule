const { Router } = require('express');
const router = Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddlewareCreator = require("../middleware/roleMiddlewareCreator");

router.get('/getAnalyticsByStudentName', analyticsController.getAnalyticsByStudentName);
router.get('/getAnalyticsByGroupName', analyticsController.getAnalyticsByGroupName);

module.exports = router;
