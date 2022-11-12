import express, { NextFunction, Request, Response } from 'express'
import {StudentController} from '../controllers/students.controller'
class Index{
    public app :express.Application = express()
    private studentController : StudentController
    constructor(){
        this.studentController = new StudentController()
        this.getRoutes()
        this.postRoutes()
    }
    getRoutes(){
        this.app.get('/',(req:Request,res:Response,next:NextFunction)=>{
            this.studentController.getStudent(req,res,next)
        })
    }
    postRoutes(){
        this.app.post('/',(req:Request,res:Response,next:NextFunction)=>{
            this.studentController.addStudent(req,res,next)
        })
    }
}
export default new Index().app