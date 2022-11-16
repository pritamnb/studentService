import request from "supertest";
import { Express } from 'express-serve-static-core';
import app from "../src/app"
let server: Express.Application

beforeAll(async () => {
    server = await app
})

describe('API testing', () => {

    it('get Students should return 200', (done) => {
        request(server)
            .get('/api/student')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(async (err, res) => {
                if (err) return done(err)

                expect(res.body).toMatchObject(
                    {
                        success: true,
                        message: 'List of students'
                    }
                )
                done()
            })
    })

    // it('Add student should return 200 with added entry', (done) => {
    //     const payload = {
    //         "name": "Pritam",
    //         "age": 25,
    //         "marks": "80",
    //         "subject": "Maths"
    //     }
    //     request(server)
    //         .post('/api/student')
    //         .send(payload)
    //         .set('Accept', 'application/json')
    //         .expect('Content-Type', 'application/json; charset=utf-8')
    //         .expect(200)
    //         .end(async (err, res) => {
    //             console.log("🚀 ~ file: student.test.ts ~ line 34 ~ .end ~ err", err)
    //             console.log("🚀 ~ file: student.test.ts ~ line 44 ~ .end ~ res", res.body)
    //             if (err) return done(err)
    //             expect(res.body).toMatchObject(
    //                 {
    //                     success: true,
    //                     message: 'Student added successfully !',
    //                     data:
    //                     {
    //                         "studentId": 1,
    //                         "name": "Pritam",
    //                         "age": 25,
    //                         "marks": "80",
    //                         "subject": "Maths"
    //                     }

    //                 }
    //             )
    //         })
    // }, 1000)

    it('get Student by Name should return 200', (done) => {
        request(server)
            .get('/api/student/getStudentByName?name=Pritam')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(async (err, res) => {
                if (err) return done(err)
                if (res?.body?.data?.length > 0) {
                    expect(res.body).toMatchObject(
                        {
                            success: true,
                            message: 'Student(s) found.'
                        }
                    )
                } else {
                    expect(res.body).toMatchObject(
                        {
                            success: true,
                            message: 'Student(s) does not exists!'
                        }
                    )
                }
                done()
            })
    })
})