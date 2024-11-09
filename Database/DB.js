const mongoose = require("mongoose");
// require("dotenv").config();
// mongoose.connect(process.env.MONGODB_URI)
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String,
    lastname: String
})

const AdminSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String,
    lastname: String
})

const CourseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    adminId: {
        type: mongoose.Types.ObjectId,
        ref: "Admin"
    }

})

const PurchaseSchema = new Schema({
    courseId:{
        type: mongoose.Types.ObjectId,
        ref: "Course"
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

})

const UserModel = mongoose.model("User", UserSchema);
const AdminModel = mongoose.model("Admin", AdminSchema);
const CourseModel = mongoose.model("Course", CourseSchema);
const PurchaseModel = mongoose.model("PurchasedCourse", PurchaseSchema);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}