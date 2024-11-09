const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/courses")
const { adminRouter } = require("./routes/admin");
const { UserModel, AdminModel, CourseModel, PurchaseModel } = require("./Database/DB");
const app = express();
app.use(express.json());


app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/courses", courseRouter);



async function connect(){
await mongoose.connect(process.env.MONGODB_URI)
    app.listen(3000);
    console.log("connected sucessfully");
    
}

connect();


