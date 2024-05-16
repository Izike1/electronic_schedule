const { Op } = require('sequelize');
const { Lesson } = require('../models/models')

class LessonService {
    async getLessons(chunkSize, pageNumber, search) {
        const offset = (pageNumber - 1) * chunkSize;
        return await Lesson.findAll({
            offset: Number(offset),
            limit: Number(chunkSize),
            where: {
                name: { [Op.like]: `%${search}%` }
            }
        });
    }
}
module.exports = new LessonService()