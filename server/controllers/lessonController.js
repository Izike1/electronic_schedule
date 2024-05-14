const lessonService = require('../service/lessonService')

class LessonController {
    async getLessons(req, res, next) {
        try {
            const lesson = await lessonService.getLessons();
            res.json(lesson)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new LessonController()