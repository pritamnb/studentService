import  express from 'express'
import studentRoute from './routes/students.routes'
class Index {
    public app : express.Application = express()  
    constructor() {
        this.useRoutes()
    }
    useRoutes(){
        this.app.use('/student',studentRoute)
    }
}
export default new Index().app