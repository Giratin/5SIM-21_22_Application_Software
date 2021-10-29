var express = require('express');
var router = express.Router();
const userController = require("../controllers/user.controller")


const multer = require("multer");
const path = require("path");

const storageData = multer.diskStorage({
    destination: (req, file, clb) => {
        clb(null, './public/images/');
    },
    filename: (req, file, cb) => {
        const newFileName = new Date().getTime().toString() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const upload = multer({ storage : storageData })

/**
 * @Path /users
 **/
router.route("/create")
  .get(userController.showCreateForm)
  .post(upload.single("avatar") ,userController.createUser)

router.get("/", userController.getListUsers)
router.get("/:_id", userController.getUserById)
router.get("/delete/:id", userController.deleteUser)

module.exports = router;
