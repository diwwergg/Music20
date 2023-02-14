// import libraries
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");   
const mongoose = require("mongoose");
const env = require('dotenv');

// import routes 
const login = require("./api/routes/login");
const main = require("./api/routes/main");
const musicManagement = require("./api/routes/MusicManagement")


// set up routes which should handle requests 
const envPath = __dirname + '/.env';
const result = env.config({ PATH: envPath });
if (result.error) {
  throw result.error
}
console.log(result.parsed)
const URL = process.env.URL;

mongoose.connect(URL, 
{ 
  useNewUrlParser: true,
  useUnifiedTopology: true 
});
mongoose.Promise = global.Promise;


app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('public/page'));
app.use(express.static('public/page/public'));
app.use(express.static('public/page/public/js'));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests

app.use("/", login); 
app.use("/music", main) // URL/music
app.use("/music-manage", musicManagement) // URL/music-manange/


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


module.exports = app;
