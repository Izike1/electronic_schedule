const lessonService = require('../service/lessonService')

class LessonController {
    async getLessons(req, res, next) {
        try {
            const { chunkSize, pageNumber, search } = req.query;
            const auth = await lessonService.getLessons(chunkSize, pageNumber, search);
            res.json(auth)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new LessonController()