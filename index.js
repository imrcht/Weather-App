const { urlencoded } = require('body-parser');
const bodyParser = require('body-parser');
const { RSA_NO_PADDING } = require('constants');
const express = require('express');
const app = express();
const https = require("https");
var city="Satna";



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("home");
})

app.post("/", (req, res) =>{
    city = req.body.cityName;
    https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=06075bee16d671f811bf6c2e41c2bf9d&units=metric`, (resp) => {
            resp.on("data", (chunk) => {
            weatherdata = JSON.parse(chunk);
            temp = weatherdata.main.temp;
            contname = weatherdata.sys.country;
            min = weatherdata.main.temp_min;
            max = weatherdata.main.temp_max;
            desc = weatherdata.weather[0].description;
            status = weatherdata.weather[0].main;
            // image = weatherdata.weather[0].icon;
            res.render("about", {
                Temp : temp,
                City : `${city}`,
                Cont : contname,
                minTemp : min,
                maxTemp : max,
                poss : desc,
                // icon : image,
                tempstatus : status,
            })
        })
    })
})


// app.get("/about", (req, res) => {
   
// })

app.listen(process.env.PORT || 7000, () => {
    if (process.env.PORT) console.log(`Listening to port ${process.env.PORT}`);
    else console.log(`Listening to port 7000.`);
})