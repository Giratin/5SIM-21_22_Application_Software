const express = require("express");
const mongoose = require("mongoose");

// Protocol:: MongoDb Wire Protocol
mongoose.connect("mongodb://localhost:27017/5SIM1")
    .then(() => {
        console.log("Database connected");
    }).catch((reason) => {
        console.log(reason);
    });

const app = express();
app.use(express.json());
app.use("/", require("./routes/students.route"));



app.listen(3000, () => {
    console.log("SERVER Is Up On 3000");
})