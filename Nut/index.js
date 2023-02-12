const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const app = express()
const connect1 = 'mongodb+srv://nattanan1707:Na426674@cluster0.psin4w3.mongodb.net/?retryWrites=true&w=majority'
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(express.static('public/page'))


const path = require('path')
const rootPath = path.join(__dirname, "..", "..");
const pagePath = path.join(rootPath, "public", "page", "index.ejs");

const client = new MongoClient(connect1, { useNewUrlParser: true });
client.connect(err => {
  console.log("Connected to MongoDB");
});

// MongoClient.connect(connect1, {useUnifiedTopology: true}, function(err,client){
//     if(err) return console.err(err);
// })

app.get('/', (req, res) => {
    // res.send('Hello World')
    res.render(__dirname + '/lo.ejs')
})
app.post('/insert', (req,res) =>{
    console.log(req.body)

    client.db('Musics').collection('musics_db').insertOne({name:req.body.name , pass:req.body.pass})
    .then(result => {
        res.redirect('/')
    })
})


app.listen(4000, ()=>{
    console.log ("Server is running on port 3000")
});