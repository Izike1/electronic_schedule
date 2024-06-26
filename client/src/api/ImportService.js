import $api from "./api";

export class ImportService {
    static async importUsers(file, type) {
        const formData = new FormData()
        formData.append('excelFile', file)
        formData.append('type', type)
        return await $api.post('/upload/uploadFromExcel', formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            }
        )
    }
}