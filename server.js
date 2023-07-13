const mongoose = require("mongoose");

const express = require("express");
const { AuthRouter } = require("./Routes/UserRoute");
var cors = require('cors');
const { EmployeeRouter } = require("./Routes/Employee");

const app = express();

app.use(cors())
app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/newemployees", EmployeeRouter);

app.get("/", (req, res) => {
    res.send("<h1>Hello Welcome to Mock-5-Server</h1>")
})
app.listen(3400, () => {

    try {
        mongoose.connect("mongodb+srv://lokesh:lokeshcz@cluster0.dsoakmx.mongodb.net/Employee?retryWrites=true&w=majority")
        console.log("MongoDb Connected ")
    } catch (error) {

    }
    console.log("server Run")

})