const express = require('express')
const app = express();
const https=require("https");
const bodyParser=require("body-parser");
const request=require("request");
const path=require("path");
const port=3000;
app.use('/',express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+ "/signup.htm");
});
app.post("/",function(req,res){
var firstName=req.body.first;
var lastName=req.body.last;
var emailid=req.body.email;
var data={
    members : [
        {
            email_address:emailid,
            status: "subscribed",
        merge_fields:{
            FNAME:firstName,
            LNAME:lastName,
        }
        }
    ]
}
// for sending data to mailchimp
const jsondata=JSON.stringify(data);
const url="https://us1.api.mailchimp.com/3.0/lists/b7aee21b53"
const option={
    method:"POST",
    auth:"vs:1de9215adf65dd0a78c1358aa9dbf08f-us--",
}
const request=https.request(url,option,function(response){
    if(response.statusCode==200) res.sendFile(__dirname+"/success.htm");
    else res.sendFile(__dirname+"/failure.htm");
response.on("data",function(data){
    console.log(JSON.parse(data));
});
console.log(response.statusCode);
});
// Write data to request body
request.write(jsondata);
request.end();

}); 
// used to redirect to main home screen for signup if fails

app.post("/failure",function(req,res){
res.redirect("/");
});
app.listen(process.env.PORT || port,function(){
    console.log("running");
});
















// api key
//92780f107e3ad681babdfbd43b5f3f6c-us1

// id
//b7aee21b53