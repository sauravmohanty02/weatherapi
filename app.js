/*const express = require("express");
const { Http2ServerResponse } = require("http2");
const https = require("https");
const bodyparser= require("body-parser")
const app =express();

app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
    res.sendFile(__dirname +"/index.html");    
});

app.post("/",function(req,res)
{
    // console.log("post received");
    console.log(req.body.cityname);
    const cty=req.body.cityname;
    const appid= "671eb59925a72027fd0cf2e560e93e69";
    const url= https.get("https://api.openweathermap.org/data/2.5/weather?q="+cty+"&appid="+appid+"&units=metric")
    https.get(url,function(response)
    {
        console.log(response.statusCode);
    
    
    response.on("data", function(data)
    {
        const weatherdata= JSON.parse(data)
        // const temp= weatherdata.main.temp
        const icn  = weatherdata.weather.icon;
        const imgurl= "http://openweathermap.org/img/wn" + icn + "@2x.png"
        console.log(weatherdata);
        res.write("<h1>Temperature  in "+ cty +" is " + weatherdata.main.temp +" celsius</h1> ");
        res.write("<h1>Pressure  in "+ cty +" is " + weatherdata.main.pressure +" pascals</h1> ");
        res.write("<h1>Humidity  in "+ cty +" is " + weatherdata.main.humidity +" mm</h1> ");
        res.write("<img src="+ imgurl +">");
        res.send()
    })
})

})

app.listen(3000,function()
{
    console.log("app is running on port 3000");
})*/

const express = require("express");
const https = require("https"); //the structure that allows us to get what we want from the data we have. you don't need to download this module to a native structure.Its'a native module.
const bodyParser = require("body-parser");
require('dotenv').config(); //for security (api keys)

const app = express();

//for encoding data
app.use(bodyParser.urlencoded({extended:true})); // for using body-parser
app.use(express.static(__dirname + '/public')); //for css files

app.set('view engine', 'ejs');

app.get("/",function(req,res){ //bilgi talebi
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  let query = req.body.cityName;
  const apiKey = process.env.WEATHER_API_KEY
  const unit = "metric";
  const lang = "en";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units=" + unit + "&lang=" + lang + "&appid=" + apiKey;

  https.get(url,function(response){
    console.log(response.statusCode); //control 200 OK
    
    response.on("data",function(data){
      //console.log("Data:" + data);  //this gives us buffer(hexadecimal codes). instead, you have to rotate it in JSON format, and if you print it like this, it comes in HEXADECIMAL.
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const feel = weatherData.main.feels_like;
      const desc = weatherData.weather[0].description; //weather is an array
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@4x.png";
      
      //res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
      query = query.toUpperCase();
    
      res.render('weather',{city : query,temperature : temp,explain : desc,image : imageURL});

      res.end();
    });
  });
});

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log("Server is running on port.");
});

