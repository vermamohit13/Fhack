const express = require("express");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const { spawn } = require('child_process');
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

app.get("/", (req, res) => {
    res.render("home");
});
app.post("/", (req, res) => {
    const python = spawn('python', ['face.py']);
    const python3 = spawn('python3', ['sound.py']);
    // collect data from script
    let firstData = "";
    let secondData = "";
    python3.stdout.on('data', function (data) {
        console.log('Pipe data from python3 script ...');
        secondData = data.toString();
        console.log("secondData", secondData);
    });
    python3.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        python.stdout.on('data', function (data) {
            console.log('Pipe data from python script ...');
            firstData = data.toString();
            console.log("firstData", firstData);
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
            
        });
    });
    var data = { "books": [], "music": [], "exercise": [], "games": [] };
    console.log(firstData);
    if (firstData == "sad") {
        data["books"] = "You Are a Badass by Jen Sincero";
        data["music"] = "Gonna Fly Now by Bill Conti";
        data["exercise"] = "Go for a Run for an All-Natural Mood Boost"
        data["games"] = "Kirby: Planet Robobot";
    }
    else if (firstData == "happy") {
        data["books"] = "The Art of Happiness by the Dalai Lama";
        data["music"] = "'Let's Go Crazy' by Prince"
        data["exercise"] = "Three Walks a Week"
        data["games"] = "Saran Wrap Game"
    }
    else if (firstData == "neutral") {
        data["books"] = "The Price of Illusion by Joan Juliet Buck";
        data["music"] = "Happy — Pharrell Williams";
        data["exercise"] = "Aerobics";
        data["games"] = "Alto's Adventure";
    }
    else {
        data["books"] = "Anger: Taming a Powerful Emotion - Gary Chapman";
        data["music"] = "'Betty' by Taylor Swift";
        data["exercise"] = "Deep Breathing";
        data["games"] = "Mad Dragon";
    }
    res.render("reveal");
});
app.get("/suggest", (req, res) => {
    res.render("suggest");
});
app.get("/connect", (req, res) =>{
    res.render("Connect");
});
app.get("/meditate", (req, res) =>{
    res.render("Meditate");
});
app.get("/music", (req, res) =>{
    res.render("Music");
});
app.get("/play", (req, res) =>{
    res.render("Play");
});
app.get("/reveal", (req, res) =>{
    res.render("reveal");
});
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Connection Established!! http://localhost:${port}`);
});