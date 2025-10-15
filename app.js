import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))
app.use(cors({
  origin:["https://panchayat-eight.vercel.app","http://localhost:3000"], 
  credentials: true                
}));
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import requestRouter from './routes/requests.routes.js'
import schemeRouter from './routes/scheme.routes.js'
import activityRouter from './routes/activity.routes.js'
//routes declaration
// app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/request", requestRouter)
app.use("/api/v1/scheme",schemeRouter)
app.use("/api/v1/activity",activityRouter)

export { app }