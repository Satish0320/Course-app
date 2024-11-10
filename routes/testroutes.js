const express = require("express");
const app = express();
const { Router } = require("express");
const courseRouter = Router();

courseRouter.get("/preview", (req, res) => {
    res.json({ message: "All courses" });
});

courseRouter.post("/purchased", (req, res) => {
    res.json({ message: "Course purchased successfully" });
});

app.use("/courses", courseRouter);

app.listen(3000, () => {
    console.log("Test server is running on port 3000");
});
