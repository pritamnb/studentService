import {StudentService} from '../services/student.service'
import { NextFunction, Request, Response } from 'express'

export class StudentController{
    private studentService:StudentService
    constructor(){
        this.studentService = new StudentService()
    }
    async getStudent(req:Request,res:Response,next:NextFunction){
        return await this.studentService.getStudents(req,res,next)
    }
    async addStudent(req:Request,res:Response,next:NextFunction){
        return await this.studentService.addStudent(req,res,next)
    }
}