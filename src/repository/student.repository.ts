import { StudentModel } from "../models/students.model"
import { Utils } from "../utils/utils"
const utils = new Utils


export const addStudent = async (data) => {
    try {
        const student = new StudentModel(data)
        await student.save()
        if (student) {
            return {
                success: true,
                message: 'Student added successfully !',
                data: student
            }
        } else {
            return {
                success: false,
                message: 'Unable to save!',
                data: student
            }
        }
    } catch (err) {
        return {
            success: false,
            message: 'Something went wrong!',
            data: err
        }
    }
}

export const getStudents = async (data) => {
    try {
        const { name, pageNumber = 1, limit = 10 } = data
        const skip = await utils.skipCount(pageNumber, limit)
        let matchQuery = {
            $match: {}
        }
        if (name) {
            matchQuery = {
                $match: {
                    "name": { $regex: `${name}`, $options: "gi" }
                }
            }
        }
        const query: any[] = [
            matchQuery,
            {
                $project: {
                    name: 1,
                    age: 1,
                    marks: 1,
                    subject: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            },
            { $sort: { createdAt: -1 } },
            {
                $facet: {
                    paginatedResult: [{ $skip: skip }, { $limit: parseInt(limit, 10) }],
                    totalCount: [{ $count: "count" }]
                }
            },
            {
                $addFields: {
                    totalCount: { $ifNull: [{ $arrayElemAt: ["$totalCount.count", 0] }, 0] }
                }
            },
            {
                $project: {
                    paginatedResult: 1,
                    totalCount: 1,
                    pageCount: {
                        $ceil: { $divide: ["$totalCount", parseInt(limit, 10)] }
                    }
                }
            }
        ]
        const isStudent = await StudentModel.aggregate(query).collation({ locale: 'en' })
        return {
            success: true,
            message: 'Student(s) found.',
            data: isStudent
        }

    } catch (err) {
        return {
            success: false,
            message: 'Something went wrong!',
            data: []
        }
    }
}