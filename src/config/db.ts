import mongoose, { Connection, connect, disconnect, connection } from 'mongoose'
require('dotenv').config()
let database: Connection
export const connectDB = () => {
    const url = process.env.MONGO_CONNECTION_STRING
    if (database) {
        return
    }
    connect(url)
    database = connection
    database.once('open', () => {
        console.log(`Connected to Database`)
    })
    database.on('error', (err) => {
        console.log(`Error connecting Database`, err)
    })
}

export const disconnectDB = () => {
    if (!database) {
        return
    }
    disconnect()
    database.once('close', () => {
        console.log(`Disconnected to Database`)
    })
}