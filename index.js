var express = require("express")
var bodyparser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    console.log("----",req.body);
    var name = req.body.name;
    var email = req.body.email;
    var dob = req.body.datebirth;
    var gender = req.body.gender;
    var password = req.body.password;
    

    var data = {
        "name": name,
        "email" : email,
        "dob" : dob,
        "gender":gender,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(5000);

console.log("listening on port 5000");


