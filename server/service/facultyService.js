const {Faculty} = require('../models/models')

class FacultyService {
    async getFaculties(id){
        return  await Faculty.findAll({where: {id:id}})
    }
}

module.exports = new FacultyService()