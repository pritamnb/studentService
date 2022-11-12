import { NextFunction, Request, Response } from "express"

export class StudentService{
    students = []
    constructor(){
    }
    getStudents(req:Request,res:Response,next:NextFunction){
        try{
            // throw new Error()
            const {name=''}=req.query
            if(!name){
                return res.send({
                    success:true,
                    message:'List of students',
                    data: this.students
                })
            }else if(name.length>0){
                let data
                const indexOfName = this.students.map(ele=>ele.name).indexOf(name)
                let isStudent = this.students[indexOfName]
                if(isStudent){
                    data ={
                        success:true,
                        message:"Student found",
                        data:isStudent
                    }
                }else{
                    data= {
                        success:false,
                        message:'Student not found!',
                        data:[]
                    }
                }
                return res.send(data)
            }
        }catch(err){
            next(err)
        }
    }
    addStudent(req:Request,res:Response,next:NextFunction){
        try{
            console.log("🚀 ~ file: student.service.ts ~ line 22 ~ StudentService ~ addStudent ~ req.body", req.body)
            const {name='', age='', marks='', subject=''} = req.body
            const student = {
                name,
                age,
                marks,
                subject
            }
            this.students.push(student)
            return res.send({
                success:true,
                message:'Student added successfully !',
                data:this.students
            })
        }catch(err){
            next(err)
        }
    }
}
