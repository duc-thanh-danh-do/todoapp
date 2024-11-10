import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { router as todoRouter } from './routers/todoRouter.js'
import { router as useRouter } from './routers/userRouter.js'

dotenv.config()
console.log('Environment:', process.env.NODE_ENV);
console.log('Database:', process.env.NODE_ENV === 'development' ? process.env.DB_NAME : process.env.TEST_DB_NAME);
console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);

const port = process.env.PORT;

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/',todoRouter)
app.use('/user', useRouter)
app.use((err, req,res,next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({error: err.message})
})

app.listen(port)