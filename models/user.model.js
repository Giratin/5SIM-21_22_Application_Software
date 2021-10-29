const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            unique: true
        },
        image: String
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("user", userSchema);

module.exports = User;