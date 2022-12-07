export class Sample {
   public hello(name: string): string {
      return `Hello ${name}`;
   }
   static testData(inputArray = [], outputArray = []) {
      console.log("🚀 ~ file: sample.ts:6 ~ Sample ~ testData ~ outputArray", outputArray)
      console.log("🚀 ~ file: sample.ts:6 ~ Sample ~ testData ~ inputArray", inputArray)
      // input must be equal to the output
      /**
       * [
            {
               "studentId": 1,
               "name": "Pritam",
               "age": 25,
               "marks": "80",
               "subject": "Maths"
            }
         ]
       */


      const results = inputArray.filter(({ name: name1 }) => !outputArray.some(({ name: name2 }) => name2 === name1)); //  input files compared with output files
      console.log("🚀 ~ file: sample.ts:19 ~ Sample ~ testData ~ results", results)
      return true
   }
}