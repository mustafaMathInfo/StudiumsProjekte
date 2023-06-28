import express from 'express'
import dotenv from 'dotenv'
import 'express-async-errors'
import morgan from "morgan";
import cors from "cors";

const app = express();
dotenv.config()

// db and authenticateUser
import connectDb from './db/connect.js'

//routers
import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

//middleware
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from "./middleware/not-found.js";
import authenticateUser from './middleware/auth.js'

if(process.env.NODE_ENV){
    app.use(morgan('dev'))
}
app.use(cors())
app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/item',authenticateUser,itemRoutes);
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDb(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server started on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()











