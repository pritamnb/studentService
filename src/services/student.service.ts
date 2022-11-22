import { NextFunction, Request, Response } from "express"
import { Utils } from '../utils/utils'
import { Student } from '../interfaces/student.interface'
import { getStudents, addStudent } from '../repository/student.repository'

export class StudentService {
    private utils: Utils
    constructor() {
        this.utils = new Utils()
    }
    async addStudent(req: Request, res: Response, next: NextFunction) {
        try {
            const { name = '', age = '', marks = '', subject = '' } = req.body
            if (!name || !age || !subject) return res.send({ success: false, message: 'Please enter require fields!', data: [] })
            const student: Student = {
                name,
                age,
                marks,
                subject
            }
            const isStudentAdded = await addStudent(student)
            return res.send(isStudentAdded)
        } catch (err) {
            next(err)
        }
    }

    async getStudents(req: Request, res: Response, next: NextFunction) {
        try {
            let data: object[] = [], response = {}
            const { name = '', pageNumber = 1, limit = 10 } = req.query
            const queryParams = { name, pageNumber, limit }
            const students = await getStudents(queryParams)
            response = {
                success: students.success,
                message: students.message,
                data: students.data
            }
            return res.send(response)
        } catch (err) {
            next(err)
        }
    }

}
