import {Sample} from '../src/sample'
describe("Sample test suite",()=>{
    test("Hello world output",()=>{
        let s = new Sample()
        expect(s.hello("Pritam")).toEqual("Hello Pritam")
    })  
})