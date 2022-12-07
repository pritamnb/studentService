import request from "supertest";
import supertest from "supertest";
import app from "../src/app"
import { Utils } from "../src/utils/utils";
import { Sample } from "../src/sample";
import assert from 'assert'
let server: Express.Application
let utils = new Utils()
import { promises, readFileSync, readdir } from 'fs';
jest.setTimeout(3 * 60 * 1000);
let inputFileNames: any = []
let outPutFiles: any = []
let inputData: any = []
let outputData: any = []
beforeAll(async () => {
    // server = app
    inputFileNames = await utils.getFileNames()
    outPutFiles = await utils.getFileNames(`./response`)
    console.log("🚀 ~ file: student.test.ts:13 ~ beforeAll ~ fileNames", inputFileNames, outPutFiles)
    for (let i = 0; i < inputFileNames?.length; i++) {
        const readFile = await utils.readFileData(`./data/${inputFileNames[i]}`)
        // instead of calling the file call the calculate function and store the output of that function return
        console.log("🚀 ~ file: student.test.ts:23 ~ beforeAll ~ readFile", readFile)
        inputData.push({ name: inputFileNames[i], data: readFile })
    }
    for (let o = 0; o < outPutFiles?.length; o++) {
        const readFile = await utils.readFileData(`./response/${outPutFiles[o]}`)
        outputData.push({ name: outPutFiles[o], data: readFile })
    }

})
beforeEach(async () => {
    // fileNames = await utils.getFileNames()
    // console.log("🚀 ~ file: student.test.ts:20 ~ beforeEach ~ fileNames", fileNames)
})
// describe('Student', () => {
//     describe("get list of students", () => {
//         it('get Students should return 200', async () => {
//             const { statusCode, body } = await supertest(server)
//                 .get('/api/student')
//                 .set('Accept', 'application/json')
//             expect(statusCode).toBe(200)
//             expect(body).toEqual({
//                 success: true,
//                 message: 'Student(s) found.',
//                 data: expect.any(Array)
//             })
//         })
//     })


//     describe('Create a student', () => {
//         it("Should return a 200 and created student", async () => {
//             const payload = {
//                 "name": "Test",
//                 "age": 25,
//                 "marks": "80",
//                 "subject": "Maths"
//             }
//             const { statusCode, body } = await supertest(server)
//                 .post("/api/student")
//                 .send(payload)
//             expect(statusCode).toBe(200);
//             expect(body).toEqual({
//                 success: true,
//                 message: 'Student added successfully !',
//                 data:
//                 {
//                     "name": "Test",
//                     "age": 25,
//                     "marks": "80",
//                     "subject": "Maths",
//                     "_id": expect.any(String),
//                     "createdAt": expect.any(String),
//                     "updatedAt": expect.any(String),
//                     "__v": expect.any(Number)
//                 }
//             })
//         })

//     })

//     it('get Student by Name should return 200', (done) => {
//         request(server)
//             .get('/api/student/getStudentByName?name=Pritam')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', 'application/json; charset=utf-8')
//             .expect(200)
//             .end(async (err, res) => {
//                 if (err) return done(err)
//                 if (res?.body?.data?.length > 0) {
//                     expect(res.body).toMatchObject(
//                         {
//                             success: true,
//                             message: 'Student(s) found.'
//                         }
//                     )
//                 } else {
//                     expect(res.body).toMatchObject(
//                         {
//                             success: true,
//                             message: 'Student(s) does not exists!'
//                         }
//                     )
//                 }
//                 done()
//             })
//     })
// })

// describe('Get files=========================================== ', () => {

//     // describe('Testing all files ', () => {

//     //     if (fileNames?.length > 0) {
//     //         console.log('===================================================');

//     //         console.log('Inside if condition');
//     //         console.log('===================================================');

//     //         fileNames?.forEach(element => {
//     //             describe('Reading each file one by one', () => {
//     //                 beforeAll(async () => {
//     //                     console.log('Reading file : ', element);
//     //                 })
//     //                 it('Should be string', () => {
//     //                     assert(element === element)
//     //                 })
//     //             })
//     //         });
//     //     } else {
//     //         console.log('------------------------------------------');

//     //         console.log('else  condition');
//     //         console.log('------------------------------------------');

//     //     }
//     //     it('Should pass', () => {

//     //     })
//     // })

//     describe('async behavior', () => {
//         (() =>
//             describe('block 1', () => {
//                 console.log('fileNames ************************************88', fileNames);
//                 it('Should pass', () => {
//                 })
//             }))();

//         (() =>
//             describe('block 2', () => {

//             }))();
//     });
// })


test('using Test', () => {
    console.log('File Data \n Input : ', inputData, '\n output : ', outputData);
    assert(Sample.testData(inputData, outputData))
})