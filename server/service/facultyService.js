const {Faculty} = require('../models/models')
const {ApiError} = require('../error/ApiError')
const {writeToLogFile} = require("../logger");

class FacultyService {
    async createFaculty(facultyName) {
        const faculty = await Faculty.findOne({where: {name: facultyName}})
        if (faculty) {
            writeToLogFile(`Факультет существует ${facultyName}`)
            console.log('Факультет существует');
        }
        return await Faculty.create({name: facultyName})
    }

    async changeFaculty(id, facultyName) {
        const faculty = await Faculty.findOne({where: {id: id}})
        if (!faculty) {
            writeToLogFile(`Факультет не существует`)
            throw ApiError.badRequest('Факультета не существует')
        }
        faculty.name = facultyName
        await faculty.save()
        return faculty
    }

    async getFaculties() {
        writeToLogFile(`Получение факультетов`)
        return await Faculty.findAll()
    }

    async deleteFaculty(id) {
        writeToLogFile(`Удаление факультета id - ${id}`)
        return await Faculty.destroy({where: {id: id}})
    }
}

module.exports = new FacultyService()