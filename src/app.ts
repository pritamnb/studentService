import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import Index from './routes/index'
const PORT = process.env.PORT || 3000
class App {
    public express: Application
    constructor() {
        this.express = express()
        this.listen()
        this.middleware()
        this.routes()
        this.handleErrors()
    }
    private listen() {
        this.express.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }
    private routes() {
        this.express.get('/', (req, res) => {
            return res.send("Hello world")
        })
        this.express.use('/api', Index)
        this.express.use(morgan('tiny'))
    }
    private handleErrors() {
        this.express.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500
            res.status(errorStatus).json({
                success: false,
                message: error.message || 'Something went wrong. Please try again',
                status_code: errorStatus
            })
        })
    }
    private middleware(): void {
        this.express.use(bodyParser.json())
        this.express.use(bodyParser.urlencoded({ extended: false }))
        this.express.use(cors({ origin: "*" }))
    }
    public createdServer() {
        return express
    }
}
export default new App().express