import { NextFunction, Request, Response } from "express"
import { promises } from 'fs'
import { Utils } from '../utils/utils'
import { Student } from '../interfaces/student.interface'
export class StudentService {
    private utils: Utils
    constructor() {
        this.utils = new Utils()
    }
    async getStudents(req: Request, res: Response, next: NextFunction) {
        try {
            let students: Student[] = await this.utils.getStudents()
            return res.send({
                success: true,
                message: 'List of students',
                data: students
            })
        } catch (err) {
            next(err)
        }
    }
    async addStudent(req: Request, res: Response, next: NextFunction) {
        try {
            const { name = '', age = '', marks = '', subject = '' } = req.body
            if (!name || !age || !subject) return res.send({ success: false, message: 'Please enter require fields!', data: [] })
            const students: Student[] = await this.utils.getStudents()
            console.log("🚀 ~ file: student.service.ts ~ line 27 ~ StudentService ~ addStudent ~ students", students)
            const studentId = this.utils.getNextAvailableId(students)
            const student: Student = {
                studentId,
                name,
                age,
                marks,
                subject
            }
            students.push(student)
            this.utils.saveStudentsData(students)
            return res.send({
                success: true,
                message: 'Student added successfully !',
                data: students
            })
        } catch (err) {
            next(err)
        }
    }
    async getStudentByName(req: Request, res: Response, next: NextFunction) {
        try {
            const students: Student[] = await this.utils.getStudents()

        } catch (err) {
            next(err)
        }
    }
}
