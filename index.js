const express = require("express");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const {spawn} = require('child_process');
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
    // const python = spawn('python', ['face.py']);
    // const python3 = spawn('python3', ['sound.py']);
    // // collect data from script
    // firstData = ""
    // python.stdout.on('data', function (data) {
    //     console.log('Pipe data from python script ...');
    //     firstData = data.toString();
    //     console.log("h1");
    //     console.log(firstData);
    // });
    // // in close event we are sure that stream from child process is closed
    // python.on('close', (code) => {
    //     console.log(`child process close all stdio with code ${code}`);
    //     // send data to browser
    // });
    // var secondData = ""
    // python3.stdout.on('data', function (data) {
    //     console.log('Pipe data from python3 script ...');
    //     secondData = data.toString();
    //     console.log("h2");
    //     console.log(secondData);
    // });
    // // in close event we are sure that stream from child process is closed
    // python3.on('close', (code) => {
    //     console.log(`child process close all stdio with code ${code}`);
    //     // send data to browser
    // });
    res.render("home");
});
app.post("/", (req,res) => {
   var res = { table:[]};
   var x = Math.floor((Math.random() * 10) + 1);
    
   if(req.mood == "sad")
  {
     res.table.push({})
  }else if( req.mood == "happy")
  {
  }
  else
  {

  }   
    
});
app.get("/suggest", (req, res) =>{
    res.render("suggest");
});
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Connection Established!! http://localhost:${port}`);
});