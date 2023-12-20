const facultyService = require('../service/facultyService')

class FacultyController {
    async createFaculty(req, res, next) {
        try {
            const {name} = req.body;
            const faculty = await facultyService.createFaculty(name)
            res.json(faculty)
        } catch (e) {
            next(e)
        }
    }

    async getFaculties(req, res, next) {
        try {
            const faculty = await facultyService.getFaculties()
            res.json(faculty)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new FacultyController()