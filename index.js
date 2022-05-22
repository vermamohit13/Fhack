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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
const app = express();
const rs = require("./static/data.json");

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
//     var res = { books:[] , music:[] ,exercise:[] ,games:[] };
//    var x = getRandomInt(9);
//    var z = 0;
//    if(req.mood == "happy")
//     z = 1;
//   else if( req.mood == "neutral")
//    z = 2;
//   else if( req.mood == "angry")
//    z = 3;
//    z = z*10 + x;
//    res[books] = data[books][z];
//    res[music] = data[music][z];
//    res[exercise] = data[exercise][z];
//    res[games] = data[exercise][z];
//    console.log(res[books]);
//   console.log(data);
    res.render("home");
    
});
app.post("/", (req,res) => {
   var res = { books:[] , music:[] ,exercise:[] ,games:[] };
//    var x = getRandomInt(9);
//    var z = 0;
   if(req.mood == "sad")
   { 
    //    z = 1;
    res[books] = "You Are a Badass by Jen Sincero";
    res[music] = "Gonna Fly Now by Bill Conti";
    res[exercise] = "Go for a Run for an All-Natural Mood Boost"
    res[games] = "Kirby: Planet Robobot";
   }
  else if( req.mood == "happy")
   {
    //    z = 2;
    res[books] = "The Art of Happiness by the Dalai Lama";
    res[music] ="‘Let’s Go Crazy’ by Prince"
    res[exercise] = "Three Walks a Week"
    res[games] = "Saran Wrap Game"
   }
  else if( req.mood == "neutral")
   {
    //    z = 3;
    res[books] ="The Price of Illusion by Joan Juliet Buck";
    res[music] = "Happy — Pharrell Williams";
    res[exercise] = "Aerobics";
    res[games] = "Alto's Adventure";
   }
   else
   {
    res[books] = "Anger: Taming a Powerful Emotion – Gary Chapman";
    res[music] = "'Betty' by Taylor Swift";
    res[exercise] = "Deep Breathing";
    res[games] = "Mad Dragon";
   }
   z = z*10 + x;
   console.log(res[books]);
});
app.get("/suggest", (req, res) =>{
    res.render("suggest");
});
app.get("/connect", (req, res) =>{
    res.render("Connect");
});
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Connection Established!! http://localhost:${port}`);
});