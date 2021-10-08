const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
    {
        firstName : {
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
        }
    },
    {
        timestamps: true
    }
);

const Student = mongoose.model("student", studentSchema);

module.exports = Student;