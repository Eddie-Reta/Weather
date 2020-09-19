const express = require("express");

const https = require("https");

const app = express();

app.get("/", function(req, res) {
    
    const url = "https://api.openweathermap.org/data/2.5/weather?zip=78586&units=imperial&appid=c93a11784166c017d25d3730cc0f67be"

    //http request is native to node 
    https.get(url,function(response){
        console.log(response.statusCode)
        
        response.on("data",function(data){
            //json.parse takes the hexadecimal data and converts it into  javascript object.
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;

            const weatherDescription = weatherData.weather[0].description
            console.log(weatherDescription );

            //json.stringify will turn a javascript object into a string
        })
    });

    res.send("Server is up and running.");
});

app.listen(3000, function(){
    console.log("Server is running PORT 3000!")
});