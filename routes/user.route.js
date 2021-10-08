const router = require("express").Router();
const userController = require("../controllers/user.controller");

/**
 * @Path /user
 */
router.route("/")
    .get(userController.listUser)
    .post(userController.createUser)

/**
 * @Path /user/:id
 */
router.route("/:id")
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;