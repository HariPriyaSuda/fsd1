import express from 'express'
import mongoose from 'mongoose';
import userRouter from "./routes/user_routes.js"
import authRouter from "./routes/auth_route.js"
import dotenv from 'dotenv'

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database is connected");
    
}).catch((err) => {
    console.log(err);
    
})

const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

app.use(express.json());

app.use("/server/user", userRouter);
app.use("/server/auth", authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
