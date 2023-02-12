const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");   
const mongoose = require("mongoose");

const login = require("./api/routes/login");
const main = require("./api/routes/main");
const musicManagement = require("./api/routes/MusicManagement")

mongoose.connect('mongodb+srv://tonklasmart:kla596596@cluster0.sqphda7.mongodb.net/MusicProject', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('public/page'));


// app.use((req, res, next) => {
//   // res.header("Access-Control-Allow-Origin", "*");
//   // res.header(
//   //   "Access-Control-Allow-Headers",
//   //   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   // );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });

// Routes which should handle requests

app.use("/", login); // http://localhost:3000/
app.use("/music", main) // http://localhost:3000/music
app.use("/music-manage", musicManagement) //http://localhost:3000/music-manange/


// app.use((req, res, next) => {
//   const error = new Error("Not found");
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message
//     }
//   });
// });

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
    console.log('http://localhost:3000');
});
module.exports = app;
