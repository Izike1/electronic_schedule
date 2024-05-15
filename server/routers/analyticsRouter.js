const { Router } = require('express');
const router = Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddlewareCreator = require("../middleware/roleMiddlewareCreator");

router.get('/getAnalyticsByStudentName', authMiddleware(), roleMiddlewareCreator(['admin', 'dean']), analyticsController.getAnalyticsByStudentName);
router.get('/getAnalyticsByGroupName', authMiddleware(), roleMiddlewareCreator(['admin', 'dean']), analyticsController.getAnalyticsByGroupName);
router.get('/getAnalyticsByFaculty', authMiddleware(), roleMiddlewareCreator(['admin', 'dean']), analyticsController.getAnalyticsByFaculty);
router.get('/getAnalyticsByLessonName', authMiddleware(), roleMiddlewareCreator(['admin', 'teacher', 'dean']), analyticsController.getAnalyticsByLessonName);

module.exports = router;
