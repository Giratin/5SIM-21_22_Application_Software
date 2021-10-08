const router = require("express").Router();
const Student = require("../models/student.model");

router.post("/", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const student = new Student({
        firstName,
        lastName,
        email : email.toLowerCase().trim(),
        password
    });

    const isUnique = await Student.findOne({ email: email.toLowerCase().trim() });
    if(!isUnique){
        await student.save();
        return res.json({ student })
    }
    
    res.json({ error: "email already registred" });
});

router.get("/", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

module.exports = router;