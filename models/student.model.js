const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// ODM : Object Document Mapping
const studentSchema = mongoose.Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: false
    }
);


studentSchema.pre("save", async function (next) {
    try {
        //the user schema is instantiated
        const user = this;
        //check if the user has been modified to know if the password has already been hashed
        if (!user.isModified('password')) {
            next();
        }
        // Generate a salt
        const salt = await bcrypt.genSalt(12);
        // Generate a password hash (salt + hash)
        const passwordHash = await bcrypt.hash(this.password, salt);
        // Re-assign hashed version over original, plain text password
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error)
    }
});

studentSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

const Student = mongoose.model('student', studentSchema);

module.exports = Student;