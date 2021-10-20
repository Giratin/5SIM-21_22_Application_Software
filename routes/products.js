var express = require('express');
var router = express.Router();

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, clb) => {
        clb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        const newFileName = (new Date().getTime().toString()) + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const upload = multer({ storage });

const userMiddleWare = (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization);
    if (authorization == "test") {
        req.user = {};
        req.user.id = 1;
        req.user.role = "admin";
        req.user.username = "username";
        return next();
    }
    res.status(403).end();
}

/**
 * @Path /products
 */
router.post("/", userMiddleWare, upload.single("avatar"), async (req, res) => {
    const { title, price } = req.body;
    const { user } = req;
    const fileName = req.file.filename;
    res.json({ title, price, fileName, user })
})

module.exports = router;