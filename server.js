const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const cityName = req.body.city;
    const unitType = req.body.unit;
    let unitName = "";

    if (unitType.toLowerCase() === "metric") {
        unitName = "Degrees Celsius";
    } else if (unitType.toLowerCase() === "imperial") {
        unitName = "Fahrenheit";
    }

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=be87b99bf0959607389507572abf8709&units=" + unitType;

    https.get(url, function (response) {
        console.log("Status code = " + response.statusCode);

        let responseData = "";

        response.on("data", function (data) {
            responseData += data;
        });

        response.on("end", function () {
            const weatherData = JSON.parse(responseData);
            const iconCode = weatherData.weather[0].icon;
            const iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";

            const weatherDescription = weatherData.weather[0].description;
            const temperature = weatherData.main.temp;

            const formattedResponse = `
                <html>
                <head>
                    <style>
                        body {
                            font-family: 'Helvetica', sans-serif;
                            background-color: #f8f9fa;
                            margin: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                        }

                        #container {
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
                            text-align: center;
                        }

                        h1 {
                            color: #343a40;
                            margin-bottom: 20px;
                        }

                        p {
                            font-size: 18px;
                            color: #555;
                            margin-top: 10px;
                        }

                        img {
                            margin-top: 20px;
                            max-width: 100px;
                        }
                    </style>
                </head>
                <body>
                    <div id="container">
                        <h1>Weather in ${cityName}</h1>
                        <p>Current conditions: ${weatherDescription}</p>
                        <p>Temperature: ${temperature} ${unitName}</p>
                        <img src="${iconUrl}" alt="Weather Icon">
                    </div>
                </body>
                </html>
            `;

            res.send(formattedResponse);
        });
    });
});

app.listen(3000, function () {
    console.log("Server running at port 3000");
});




// const express=require("express");
// const https=require("https");
// const bodyParser=require("body-parser")
// const app=express();

// app.use(bodyParser.urlencoded({extended:true}));

// app.get("/",function (req,res) {
//     res.sendFile(__dirname+"/index.html");
// })

// app.post("/", function(req,res){
//     let cityName= req.body.city;
//     let unitType= req.body.unit;
//     let unitName="";
//     if(unitType.toLowerCase=="metric"){
//         unitName="Degrees"
//     }
//     else if(unitType.toLowerCase=="imperial"){
//         unitName="farenheit"
//     }

//     let url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=be87b99bf0959607389507572abf8709&units="+unitType;
//     https.get(url,function (response){
//         console.log("status code="+response.statusCode)
   
//         response.on("data",function(data){
//             let weatherData=JSON.parse(data);
//             let iconCode=weatherData.weather[0].icon;
//             let iconUrl="https://openweathermap.org/img/wn/"+iconCode+"@2x.png";
//             res.write("<p>weather in "+cityName+ " currently is "+weatherData.weather[0].description +"</p>");
//             res.write("<h1>temperature in "+cityName+ " currently is "+weatherData.main.temp+" " +unitName+"</h1>");
//             res.write("<img src="+iconUrl+">");
//             res.send();
//         })
//     })
    

// })
// app.listen(3000,function(){
//     console.log("server running at port 3000");
    
// })