const facultyService = require('../service/facultyService')

class FacultyController {
    async getFaculties(req,res,next) {
        try {
            const {id} = req.query;
            const faculty = facultyService.getFaculties(id)
            res.json(faculty)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new FacultyController()