const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/5SIM3")
    .then(() => {
        console.log("db connected");
    })
    .catch((error) => {
        console.log(error); 
    });

app.use(express.json());
app.use("/" , require("./routes/student.route"));

app.listen(PORT, () => {
    console.log(`APP running on port ${PORT}`);
})