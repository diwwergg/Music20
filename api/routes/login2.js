const express = require("express");
const router = express.Router();
const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");
const path = require("path");

const connect1 = 'mongodb+srv://nattanan1707:Na426674@cluster0.psin4w3.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(connect1, { useNewUrlParser: true });
client.connect(err => {
  console.log("Connected to MongoDB");
});


const rootPath = path.join(__dirname, "..", "..");
const pagePath = path.join(rootPath, "public", "page", "login2.ejs");


router.get('/', (req, res) => {
    // res.send('Hello World')
    res.render(pagePath)
})
router.post('/insert', (req,res) =>{
    console.log(req.body)

    client.db('Musics').collection('musics_db').insertOne({name:req.body.name , email:req.body.email , pass:req.body.pass})
    .then(result => {
        res.redirect('/')
    })
})

router.get('/insert', (req,res) =>{
    client.db('Musics').collection('musics_db').find().toArray()
    .then(result => {
        res.render(__dirname + '/login.ejs')
    })
})




module.exports = router;