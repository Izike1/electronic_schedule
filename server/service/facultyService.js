const {Faculty} = require('../models/models')
const {ApiError} = require('../error/ApiError')

class FacultyService {
    async createFaculty(facultyName) {
        const faculty = await Faculty.findAll({where: {name: facultyName}})
        if (faculty) {
            console.log('Факультет не создан');
        }
        return await Faculty.create({name: facultyName})
    }

    async changeFaculty(id, facultyName) {
        const faculty = await Faculty.findOne({where: {id: id}})
        if (!faculty) {
            throw ApiError.badRequest('Факультета не существует')
        }
        faculty.name = facultyName
        await faculty.save()
        return faculty
    }

    async getFaculties() {
        return await Faculty.findAll()
    }

    async deleteFaculty(id) {
        return await Faculty.destroy({where: {id: id}})
    }
}

module.exports = new FacultyService()