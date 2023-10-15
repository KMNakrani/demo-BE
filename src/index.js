import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import { errorHandler } from './middleware/error.middleware.js'
import routes from "./routes/index.js"

const app = express()
const port = process.env.PORT || 4000

// middlewarw
app.use(express.json())
app.use(routes)
app.use(errorHandler)
app.use(cors())

// mongodb database connection
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//listen server
app.listen(port, ()=>{
    console.log("Server is running on port ", port)
})