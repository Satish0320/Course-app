
const { Router } = require("express");
const courseRouter = Router();
// const {  CourseModel, PurchaseModel } = require("../Database/DB");
const{ CourseModel, PurchaseModel } = require("../Database/DB");

const  {usermiddleware}   = require("../middleware/usermiddleware")


courseRouter.get("/preview",async (req, res) => {
    
    const courses = await CourseModel.find({})
    console.log(courses);
    res.json({
        message: "All courses",
        courses: courses
    })
})

courseRouter.post("/purchased", usermiddleware, async (req, res) => {
    
    const userId  = req.userId;
    const courseId = req.body.courseId;

    await PurchaseModel.create({
        courseId: courseId,
        userId: userId
    })

    res.json({
        message: "purchased courses"
    })
})

module.exports = {
    courseRouter: courseRouter
}

