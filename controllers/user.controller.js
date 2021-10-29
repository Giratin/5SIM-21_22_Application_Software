const User = require("../models/user.model");

module.exports = {
    showCreateForm: async (req, res, next) => {
        res.render("create")
    },
    createUser: async (req, res) => {
        const { firstName, lastName, email } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(403).json({ exists: true });
        }
        const user = new User({ firstName, lastName, email });
        if (req.file) {
            user.image = `/images/${req.file.filename}`;
        }

        await user.save();
        res.redirect("/users")
    },
    getUserById: async (req, res) => {
        const { _id } = req.params;
        const user = await User.findById(_id);
        res.render("details", { user });
    },
    getListUsers: async (req, res) => {
        const users = await User.find();
        res.render("list", { users });
    },
    deleteUser: async (req, res) => {
        const { id } = req.params;

        await User.findByIdAndDelete(id);
        console.log({ id });
        res.redirect("/users")
    },
}