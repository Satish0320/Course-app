const { Router } = require("express");
const jwt = require("jsonwebtoken");
const z = require("zod")
const bcrypt = require("bcrypt");
const { UserModel, CourseModel, PurchaseModel, AdminModel } = require("../Database/DB");
const { JWT_ADMIN_SECRET } = require("../cofig.js/config");
const adminRouter = Router();
const { adminmiddleware } = require("../middleware/adminmiddleware")

adminRouter.post("/signup", async(req, res) => {
    
    const requiredbody = z.object({
        email: z.string().email(),
        password: z.string(),
        firstname: z.string(),
        lastname: z.string()
    })

    const validatebody = requiredbody.safeParse(req.body);

    if (!validatebody.success) {
        res.status(404).json({
            message: "Invalid Inputs",
            Error: validatebody.error
        })
        return
    }

    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname

    const hashpassword = await bcrypt.hash(password, 5);

    await AdminModel.create({
        email: email,
        password: hashpassword,
        firstname: firstname,
        lastname: lastname
    })

    // const alladmin = await AdminModel.find(); // Fetch all users from the database
    // console.log(alladmin); // Log all users

    res.json({
        message: "Ready to signin"
    })
})

adminRouter.post("/login", async(req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;

    const findadmin = await AdminModel.findOne({
        email: email
    })

    if(!findadmin){
        res.status(404).json({
            message: "Cannot find the admin"
        })
    }

    const validatepassword = await bcrypt.compare(password, findadmin.password);
    
    if (validatepassword) {
        const token = jwt.sign({
            id: findadmin._id.toString()
        }, JWT_ADMIN_SECRET)

        res.json({
            token: token,
            id: findadmin._id
        })
    }else{
        res.status(404).json({
            message: "Invalid Admin"
        })
    }
})

adminRouter.post("/create/course", adminmiddleware, async (req,res)=>{

    const requiredbody = z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(),
        adminId: z.string()
    }) 

    const validatebody = requiredbody.safeParse(req.body);

    if (!validatebody.success) {
        res.status(404).json({
            message: "Invalid admin",
            Error: validatebody.error
        })
        return
    }

    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const adminId = req.userId;

    const course = await CourseModel.create({
        title: title,
        description: description,
        price: price,
        adminId: adminId
    })

    res.json({
        message: "course created",
        courseId: course._id
    })
})

adminRouter.delete("/delete/course", adminmiddleware, async (req, res) => {
   
    const adminId = req.userId;
    const courseId = req.body.courseId;
    // console.log(courseId);
    
    const courses = await CourseModel.findOne({
        _id: courseId,
        adminId: adminId
    })
    // console.log(courses);
    
   if(courses){
    await courses.deleteOne();

    res.json({
        message: "courses deleted"
    })
   }else{
    res.json({
        message: "course not deleted"
    })
   }
    
})

adminRouter.put("/add/content", adminmiddleware, async (req, res) => {
    
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const adminId = req.userId;
    const courseId = req.body.courseId

    const course = await CourseModel.updateOne({
        _id: courseId,  //672fc80bb774f2825014d177
        adminId: adminId   //672fb1b72863a032b086d1d2
    },{
        title: title,
        description: description,
        price: price,
    })

    res.json({
        message: "course updated",
        id: course._id
    })
})

adminRouter.get("/course/preview", adminmiddleware, async (req, res) => {
    
    const adminId = req.userId;
    
    const courses = await CourseModel.find({
        adminId: adminId
    })
    
    res.json({
        message: "All courses",
        courses : courses
    })
})

module.exports = {
    adminRouter: adminRouter
}