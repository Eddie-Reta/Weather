const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/client/index.html")
});

app.post("/", function(req, res){
   
    const query = req.body.cityName;
    const apiKey = "c93a11784166c017d25d3730cc0f67be";
    const units = "imperial";    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&units="+  units +"&appid=" + apiKey;
    const city = query[0].toUpperCase() + query.slice(1)

    //http request is native to node 
    https.get(url,function(response){
        console.log(response.statusCode)
        
        response.on("data",function(data){
            //json.parse takes the hexadecimal data and converts it into  javascript object.
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;

            const weatherDescription = weatherData.weather[0].description
            
            const icon = weatherData.weather[0].icon;

            const imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            //You can have multiple res.write
            res.write("<p>The weather is currently " + weatherDescription + ".</p>");                
            res.write("<h1>The temprature in "+ city +" is " + temp + " degrees ferenheit.</h1>")
            res.write("<img src="+ imageUrl +" alt="+ weatherDescription + ">")
            res.send()
            //json.stringify will turn a javascript object into a string
       })
   });

});

app.listen(3000, function(){
    console.log("Server is running PORT 3000!")
});