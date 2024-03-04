const { Router } = require('express');
const router = Router();
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddlewareCreator = require("../middleware/roleMiddlewareCreator");

router.get('/getAnalytics', authMiddleware(), roleMiddlewareCreator(['teacher', 'admin', 'dean']));

module.exports = router;
