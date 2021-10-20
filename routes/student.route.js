const router = require("express").Router();
const Student = require("../models/student.model");
const db = require("../config/db");

const query = require("util").promisify(db.query).bind(db);
/**
 * @Path /
 */
router.post("/", async (req, res) => {

    const { firstName, lastName, email, password } = req.body;
    const student = new Student({ firstName, lastName, email, password });
    const verifEmail = await Student.findOne({ email });
    console.log(verifEmail);
    if (verifEmail) {
        res.status(401).json({ error: "Cannot Duplicate email", user: verifEmail })
    } else {
        await student.save();
        res.json(student);
    }
});

router.post("/create", async (req, res) => {
    const { prenom, nom, email } = req.body;
    const insertQuery = "INSERT INTO `students` (`prenom`,`nom`,`email`) VALUES (?,?,?)";
    const isEmailUniqueQuery = "SELECT * FROM `students` WHERE `email`=? LIMIT 1";

    const isEmailUniqueResult = await query(isEmailUniqueQuery, [email]);
    if (isEmailUniqueResult.length == 0) {
        const insertResult = await query(insertQuery, [prenom, nom, email]);
        return res.json(insertResult);
    }

    res.status(405).json({ error: "Email already created" })



    // let result;
    // db.query(isEmailUniqueQuery, [email], (error, data) => {
    //     if (data.length == 0) {
    //         db.query(insertQuery, [prenom, nom, email], (err, rows) => {
    //             if (!err) {
    //                 result = rows;
    //                 //return res.json(rows);
    //             }else{
    //                 result = err
    //             }
    //             //res.status(405).json({ err })
    //         })
    //     }else{
    //         result = { error : "Email already created" }
    //         //res.json({ error : "Email already created" })
    //     }
    // });

    // res.json(result)

});

router.post("/bulk-create", async (req, res) => {
    const { data } = req.body;
    const insertQuery = "INSERT INTO `students` (`prenom`,`nom`,`email`) VALUES ?";

    const insertResult = await query(insertQuery, [
        data.map((el) => [el.prenom, el.nom, el.email])
    ]);

    res.json(insertResult);
})

module.exports = router;