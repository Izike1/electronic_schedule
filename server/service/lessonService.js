const { Lesson } = require('../models/models')

class LessonService {
    async getLessons() {
        return await Lesson.findAll()
    }
}
module.exports = new LessonService()