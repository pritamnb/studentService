import { promises } from 'fs'
const Students = './src/data/students.json'
export class Utils {
    async getStudents() {
        let students = []
        const rowData = await promises.readFile(Students)
        return students = (rowData?.length <= 0) ? [] : JSON.parse(rowData.toString())
    }
    getNextAvailableId(allStudents = []) {
        let maxID = 0;
        let studLength = allStudents.length
        return maxID = (studLength === 0) ? 1 : (allStudents[(studLength - 1)].studentId + 1)
    }
    saveStudentsData(data) {
        return promises.writeFile(Students, JSON.stringify(data, null, 4));
    }
}