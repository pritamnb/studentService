import request from "supertest";
import supertest from "supertest";
import app from "../src/app"
let server: Express.Application

beforeAll(async () => {
    server = app
})

describe('Student', () => {
    describe("get list of students", () => {
        it('get Students should return 200', async () => {
            const { statusCode, body } = await supertest(server)
                .get('/api/student')
                .set('Accept', 'application/json')
            expect(statusCode).toBe(200)
            expect(body).toEqual({
                success: true,
                message: 'List of students',
                data: expect.any(Array)
            })
        })
    })


    describe('Create a student', () => {
        it("Should return a 200 and created student", async () => {
            const payload = {
                "name": "Pritam",
                "age": 25,
                "marks": "80",
                "subject": "Maths"
            }
            const { statusCode, body } = await supertest(server)
                .post("/api/student")
                .send(payload)
            expect(statusCode).toBe(200);
            expect(body).toEqual({

                success: true,
                message: 'Student added successfully !',
                data:
                {
                    "studentId": expect.any(Number),
                    "name": "Pritam",
                    "age": 25,
                    "marks": "80",
                    "subject": "Maths"
                }
            })
        })

    })

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