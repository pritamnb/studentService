import { Document, Model, model, Schema } from 'mongoose'
import { Student } from '../interfaces/student.interface'

const StudentSchema: Schema = new Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    marks: {
        type: String,
        require: true
    },
    subject: {
        type: String,
        require: true
    }
}, { timestamps: true })

export const StudentModel: Model<Student> = model<Student>('Student', StudentSchema)