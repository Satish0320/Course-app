
const { Router } = require("express");
const courseRouter = Router();
const {  CourseModel, AdminModel, UserModel } = require("../Database/DB");


courseRouter.get("/preview", (req, res) => {
    res.json({
        message: "All courses"
    })
})

courseRouter.post("/purcheased", (req, res) => {

    
    res.json({
        message: "purchased courses"
    })
})

module.exports = {
    courseRouter: courseRouter
}