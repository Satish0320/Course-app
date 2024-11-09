const jwt = require("jsonwebtoken");
const z = require("zod")
const bcrypt = require("bcrypt");
const { Router } = require("express");
const userRouter = Router();
const { UserModel, PurchaseModel } = require("../Database/DB");
const express = require("express");
const { JWT_USER_SECRET } = require("../cofig.js/config");
const { usermiddlewre } = require("../middleware/usermiddleware")

userRouter.post("/signup", async (req, res) => {

    const requiredbody = z.object({
        email: z.string().email(),
        password: z.string(),
        firstname: z.string(),
        lastname: z.string()
    })

    const validatebody = requiredbody.safeParse(req.body);

    if (!validatebody.success) {
        res.json({
            message: 'Invalid Inputs',
            Error: validatebody.error
        })
        return
    }

    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    const hashpassword = await bcrypt.hash(password, 5);

    await UserModel.create({
        email: email,
        password: hashpassword,
        firstname: firstname,
        lastname: lastname
    })

    // const allUsers = await UserModel.find(); // Fetch all users from the database
    // console.log(allUsers); // Log all users

    res.json({
        message: "you are ready to signin"
    })
})


userRouter.post("/login", async(req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const person = await UserModel.findOne({
        email: email
    })

    if (!person) {
        res.json({
            message: "Invalid Email"
        })
        return
    }
    // console.log(person);
    
    const validatepassword = await bcrypt.compare(password, person.password);

    if(validatepassword){
        const token = jwt.sign({
            id: person._id.toString()
        }, JWT_USER_SECRET)

        res.json({
            token: token
        })
    }else{
        res.status(404).json({
            message: "Invalid Inputs"
        })
    }

})


userRouter.get("/purchase", usermiddlewre, (req, res) => {
    res.json({
        message: "purchase"
    })
})

module.exports = {
    userRouter: userRouter
}
