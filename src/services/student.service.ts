import { NextFunction, Request, Response } from "express"
import { Utils } from '../utils/utils'
import { Student } from '../interfaces/student.interface'
export class StudentService {
    private utils: Utils
    constructor() {
        this.utils = new Utils()
    }
    async addStudent(req: Request, res: Response, next: NextFunction) {
        try {
            let response = {}
            const { name = '', age = '', marks = '', subject = '' } = req.body
            if (!name || !age || !subject) return res.send({ success: false, message: 'Please enter require fields!', data: [] })
            const students: Student[] = await this.utils.getStudents()
            const studentId = this.utils.getNextAvailableId(students)
            const student: Student = {
                studentId,
                name,
                age,
                marks,
                subject
            }
            students.push(student)
            let isStudentAdded = await this.utils.saveStudentsData(students)
                .then((data) => {
                    response = {
                        success: true,
                        message: 'Student added successfully !',
                        data: student
                    }
                })
                .catch((err) => {
                    response = {
                        sucess: false,
                        message: err,
                        data: []
                    }
                })
            return res.send(response)
        } catch (err) {
            next(err)
        }
    }
    async getStudents(req: Request, res: Response, next: NextFunction) {
        try {
            let data: object[] = [], response = {}
            const name: string = req?.query?.name as string
            const students: Student[] = await this.utils.getStudents()
            if (!name) {
                return res.send({
                    success: true,
                    message: 'List of students',
                    data: students
                })
            }
            if (students?.length > 0) {
                const getFilteredStudents: object[] = await this.utils.getFilteredStudents(students, name)
                data = (getFilteredStudents?.length > 0) ? getFilteredStudents : []
                response = {
                    success: true,
                    message: (data.length > 0) ? 'Student(s) found.' : 'Student(s) does not exists!',
                    data
                }
            } else {
                response = {
                    success: true,
                    message: 'Student(s) does not exists!',
                    data
                }
            }
            return res.send(response)
        } catch (err) {
            next(err)
        }
    }
}

// export default new StudentService()