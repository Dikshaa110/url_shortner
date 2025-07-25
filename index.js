const express= require("express");
const path =require("path");
const cookieParser= require('cookie-parser');

const{connectToMongodb}= require("./connect");
const{restrictToLoggedinUserOnly}=require('./middleware/auth');
const url= require('./models/url')

const urlRoute= require("./routes/url");
const staticRoute= require("./routes/staticRouter")
const userRoute= require("./routes/user");
const app= express();
const port= 8001;
connectToMongodb('mongodb://localhost:27017/short-url')
.then(()=>console.log("mongodb connected"))
app.set("view engine","ejs");
app.set('views',path.resolve("./views"));// telling express that html view is in the views folder
app.use(express.json())// middleware to take url from the body
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use("/url",restrictToLoggedinUserOnly,urlRoute);
app.use("/user",userRoute);
app.use('/',staticRoute);
app.get('/url/:shortId',async (req,res)=>{
const shortId=req.params.shortId;
const entry= await url.findOneAndUpdate(
    {
        shortId
    },
{$push:
    {
        visitedHistory:{
            timestamp:Date.now()} ,
    },
}
);
res.redirect(entry.redirectURL)


})
app.listen(port, ()=> console.log(`server started at port:${port}`));