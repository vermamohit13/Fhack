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
async function runCode() {
    const { success, err = '', results } = await new Promise((resolve, reject) => {
        const python = spawn('python', ['face.py']);
        const python3 = spawn('python3', ['sound.py']);
        var firstData = "";
        python3.stdout.on('data', function (data) {
            console.log('Pipe data from python3 script ...');
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
        console.log("firstData -> ",firstData);
        let data = { "books": [], "music": [], "exercise": [], "games": [] };
        if (firstData === "sad") {
            data["books"] = "You Are a Badass by Jen Sincero";
            data["music"] = "Gonna Fly Now by Bill Conti";
            data["exercise"] = "Go for a Run for an All-Natural Mood Boost"
            data["games"] = "Kirby: Planet Robobot";
        }
        else if (firstData === "happy") {
            data["books"] = "The Art of Happiness by the Dalai Lama";
            data["music"] = "'Let's Go Crazy' by Prince"
            data["exercise"] = "Three Walks a Week"
            data["games"] = "Saran Wrap Game"
        }
        else if (firstData === "neutral") {
            data["books"] = "The Price of Illusion by Joan Juliet Buck";
            data["music"] = "Happy ??? Pharrell Williams";
            data["exercise"] = "Aerobics";
            data["games"] = "Alto's Adventure";
        }
        else if(firstData === "angry") {
            data["books"] = "Anger: Taming a Powerful Emotion - Gary Chapman";
            data["music"] = "'Betty' by Taylor Swift";
            data["exercise"] = "Deep Breathing";
            data["games"] = "Mad Dragon";
        }
    });
    if (err) {
        logger.error(err, '[ config - runManufacturingTest() ]');
        reject({ success: false, err });
    }
    resolve({ success: true, results:data });
    if(success)
    {
        return results;
    }
  }
app.post("/", async (req, res) => {
    // collect data from script
    let data = { "books": [], "music": [], "exercise": [], "games": [] };
    data["books"] = "You Are a Badass by Jen Sincero";
    data["music"] = "Gonna Fly Now by Bill Conti";
    data["exercise"] = "Go for a Run for an All-Natural Mood Boost"
    data["games"] = "Kirby: Planet Robobot";
    // data = await runCode();
    // console.log(data);
    res.render("reveal",{data : data});
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
    let data = { "books": [], "music": [], "exercise": [], "games": [] };
    res.render("reveal",{data : data});
});
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Connection Established!! http://localhost:${port}`);
});