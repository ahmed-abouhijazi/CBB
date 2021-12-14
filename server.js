require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const txRouter = require("./api/transactions/tx.router")

app.use(express.json());
app.use("/api/users",userRouter);
app.use("/api/tx",txRouter);
app.listen(process.env.PORT,()=>{
    console.log("Server up and running on PORT : ",process.env.PORT);
})