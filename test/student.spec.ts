import request from 'supertest'
import express, { Express } from 'express'
let server: Express
beforeAll(async () => {
    server = express()
})
describe("GET /", () => {
    it("Should return 200 & valid response if request param list is empty", (done) => {
        request(server)
            .get('/api/student')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({ success: true, message: 'List of students', data: [] || [{}] })
            })
    })
})