import { promises } from 'fs'
import { Student } from '../interfaces/student.interface'
const Students = './src/data/students.json'
export class Utils {
    async getStudents() {
        let students = []
        const rowData = await promises.readFile(Students)
        return students = (rowData?.length <= 0) ? [] : JSON.parse(rowData.toString())
    }
    getNextAvailableId(allStudents: Student[] = []) {
        let maxID = 0;
        let studLength = allStudents.length
        return maxID = (studLength === 0) ? 1 : (allStudents[(studLength - 1)]?.studentId + 1)
    }
    async saveStudentsData(data) {
        return await promises.writeFile(Students, JSON.stringify(data, null, 4));
    }
    async getFilteredStudents(students: Student[], name: string) {
        return students?.filter((stud: Student) => (stud?.name?.toLowerCase().includes(name?.toLowerCase())))
    }
}