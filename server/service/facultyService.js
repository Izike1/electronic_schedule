const {Faculty} = require('../models/models')

class FacultyService {
    async getFaculties() {
        return await Faculty.findAll()
    }

    async createFaculty(name) {
        const faculty = await Faculty.findAll({where: {name: name}})
        if (faculty) {
            console.log('Faculty don\'\t create');
        }
        return await Faculty.create({name: name})
    }
}

module.exports = new FacultyService()