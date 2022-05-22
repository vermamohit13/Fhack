const express = require("express");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
// const connectDB = require("./config/db");
// var url = require("url");

// Load config
// require("dotenv").config({ path: "./config/config.env" });


// connect to Database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
        });

        console.log(`[STATUS] Connected to Database: ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
// connectDB();

const app = express();


// set template view engine
app.set("views", "./templates");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/static"));
app.use("/images", express.static(__dirname + "static/images"));



app.get("/", (req, res) =>{
    res.render("home");
});
app.post("/", (req,res) => {
    console.log("hi");
    // do logic here
    // acces data from req
    
});
app.get("/suggest", (req, res) =>{
    res.render("suggest");
});
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Connection Established!! http://localhost:${port}`);
});