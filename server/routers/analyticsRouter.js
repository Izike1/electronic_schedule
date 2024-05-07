const { Router } = require('express');
const router = Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddlewareCreator = require("../middleware/roleMiddlewareCreator");

router.get('/getAnalyticsByStudentName', authMiddleware(), roleMiddlewareCreator(['admin', 'teacher', 'dean']), analyticsController.getAnalyticsByStudentName);
router.get('/getAnalyticsByGroupName', authMiddleware(), roleMiddlewareCreator(['admin', 'teacher', 'dean']), analyticsController.getAnalyticsByGroupName);
router.get('/getAnalyticsByFaculty', authMiddleware(), roleMiddlewareCreator(['admin', 'dean']), analyticsController.getAnalyticsByGroupName);

module.exports = router;
