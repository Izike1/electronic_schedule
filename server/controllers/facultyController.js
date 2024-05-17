const facultyService = require('../service/facultyService')

class FacultyController {
    async createFaculty(req, res, next) {
        try {
            const { facultyName } = req.body;
            const faculty = await facultyService.createFaculty(facultyName)
            res.json(faculty)
        } catch (e) {
            next(e)
        }
    }

    async changeFaculty(req, res, next) {
        try {
            const { id, facultyName } = req.body;
            const faculty = await facultyService.changeFaculty(id, facultyName)
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
    async getFacultyInfo(req, res, next) {
        try {
            const { facultyId } = req.query
            const faculty = await facultyService.getFacultyInfo(facultyId)
            res.json(faculty)
        } catch (e) {
            next(e)
        }
    }

    async deleteFaculty(req, res, next) {
        try {
            const { id } = req.body;
            const faculty = await facultyService.deleteFaculty(id)
            res.json(faculty)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new FacultyController()