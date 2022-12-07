import { promises } from 'fs'
import { Student } from '../interfaces/student.interface'
const Students = './data/students.json'
export class Utils {
    async getStudents(Students = './data/students.json') {
        let students = []
        const rowData = await promises.readFile(Students)
        return students = (rowData?.length <= 0) ? [] : JSON.parse(rowData.toString())
    }
    async readFileData(file = './data/students.json') {
        const rowData = await promises.readFile(file)
        return (rowData?.length <= 0) ? [] : JSON.parse(rowData.toString())
    }
    getNextAvailableId(allStudents: Student[] = []) {
        let maxID = 0;
        let studLength = allStudents.length
        // return maxID = (studLength === 0) ? 1 : (allStudents[(studLength - 1)]?.studentId + 1)
    }
    async getFileNames(dirName = './data') {
        let files = []
        return await promises.readdir(dirName)
            .then(fileNames => {
                // return files = fileNames
                return fileNames
            })
            .catch(err => {
                console.log('Error', err);
            })
    }
    async saveStudentsData(data) {
        return await promises.writeFile(Students, JSON.stringify(data, null, 4));
    }
    async getFilteredStudents(students: Student[], name: string) {
        return students?.filter((stud: Student) => (stud?.name?.toLowerCase().includes(name?.toLowerCase())))
    }
    async skipCount(pageNumber, limit) {
        pageNumber = parseInt(pageNumber, 10)
        limit = parseInt(limit, 10)
        const skip: number = await (limit) ? ((pageNumber - 1) * limit) : (pageNumber - 1)
        return skip
    }
}