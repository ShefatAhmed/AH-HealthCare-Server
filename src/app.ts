import express, { Application, Request, Response } from "express"
import cors from 'cors';
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundHandler from "./app/middlewares/notFoundHandler";
import cookieParser from "cookie-parser"
const app: Application = express()
app.use(cors())
app.use(cookieParser())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: "Ah Healthcare server"
    })
})

app.use('/api/v1', router)
app.use(globalErrorHandler)

app.use(notFoundHandler)

export default app;