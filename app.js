console.log("hi")
const http=require("http")
const express=require("express")
const app=express()
const bodyparser=require("body-parser")
const path=require("path")
const hn='127.0.0.1'
const port=8000
const mongoose = require("mongoose")
const { format } = require("path")
const { render, renderFile } = require("pug")
const { response } = require("express")
mongoose.connect("mongodb://localhost/site2",{useNewUrlParser:true,useUnifiedTopology:true})
var db=mongoose.connection
db.on("error",console.error.bind(console,"Connection Error"))
db.once("open",function()
{
    console.log("Connected to database")
})
var sch=new mongoose.Schema(
{
    firstname: String,
    lastname: String,
    email: String,
    password: String
});
var sch2=new mongoose.Schema(
{
    firstname: String,
    lastname: String
});
const site2 =mongoose.model("registration_form",sch)
const site22 =mongoose.model("details_form",sch2)
app.use('/static',express.static('static'))
app.use(express.urlencoded())
// app.set('view engine','pug')
// app.set('views',path.join(__dirname,'views'))
app.get('/',(req,res)=>
{
    res.status(200).sendFile(__dirname+'/index.html')
    // res.status(200).render(__dirname,'/index.html')
})
app.get('/index.html',(req,res)=>
{
    res.status(200).sendFile(__dirname+'/index.html')
})
app.get('/about.html',(req,res)=>
{
    res.status(200).sendFile(__dirname+'/about.html')
})
app.get('/services.html',(req,res)=>
{
    res.status(200).sendFile(__dirname+'/services.html')
})
app.get('/contact.html',(req,res)=>
{
    res.status(200).sendFile(__dirname+'/contact.html')
})
app.get('/registration.html',(req,res)=>
{
    res.status(200).sendFile(__dirname+'/registration.html')
})
app.get('/details.html',(req,res)=>
{
    res.status(200).sendFile(__dirname+'/details.html')
})
app.post('/form_registration',(req,res)=>
{ 
    var data=new site2(req.body)
    data.save().then(()=>
    {
        res.status(400).send("Data saved")   
    }).catch(()=>
    {
        res.status(400).send("Data not saved")
    })
})
app.post('/details_form',(req,res)=>
{ 
    var data=new site22(req.body)
    data.save().then(()=>
    {
        var fn=req.body.firstname;
        var ln=req.body.lastname;
        let opfn=0
        let opln=0
        let ope=0
        site2.find({firstname:fn,lastname:ln},function(err,op)
        {
            // var opff =op
            //     let opf = opff.toString()
            var o1=op
            let o=o1.toString()
            console.log("start o is "+o)
            console.log("start o1 is "+o1)
            console.log("start op is "+op)
            if(o=="")
            {
                opfn="Not"
                opln="Found"
                ope="Not Found"
                console.log("if err is "+err)
                console.log("if op is "+op)
                res.statusCode=200
                res.setHeader('Content-Type','text/html')
                console.log("Data Not Found")
                res.end(`<!doctype html>
                <html lang="en">
                <head>
                    <!-- Required meta tags -->
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                
                    <!-- Bootstrap CSS -->
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                    <link rel="icon" type="image/x-icon" href="/static/logo.jfif" class="logo">
                    <title>Drive</title>
                    <style>
                        .logo {
                            border-radius: 20px;
                            margin-right: 20px;
                        }
                
                        #navbar {
                            background-color: brown;
                        }
                
                        .navbut1:hover {
                            background-color: rgb(184, 164, 164);
                        }
                
                        .fp1 {
                            text-align: center;
                        }
                
                        .footer {
                            font-family: Arial, Helvetica, sans-serif;
                            background-color: black;
                            background-size: 100%;
                        }
                
                        .navbut1 {
                            background-color: brown;
                        }
                    </style>
                </head>
                
                <body>
                    <nav class="navbar navbar-expand-lg navbar-light" id="navbar">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item">
                                    <!-- <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
                                    <a href="/index.html"><button type="button" style="color: white;" class="btn nav-link navbut1">
                                            <h4>Home</h4>
                                        </button></a>
                                </li>
                                <li class="nav-item">
                                    <!-- <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
                                    <a href="/about.html"><button type="button" style="color: white;" class="btn nav-link navbut1">
                                            <h4>About</h4>
                                        </button></a>
                                </li>
                                <li class="nav-item">
                                    <a href="/services.html"><button type="button" style="color: white;" class="btn nav-link navbut1">
                                            <h4>Services</h4>
                                        </button></a>
                                </li>
                                <li class="nav-item">
                                    <a href="/contact.html"><button type="button" style="color: white;" class="btn nav-link navbut1">
                                            <h4>Contact</h4>
                                        </button></a>
                                </li>
                            </ul>
                            <form class="form-inline my-2 my-lg-0">
                            <img src="static/logo.jfif" height="50px" width="50px" class="logo">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </div>
                    </nav>
                    <section style="background-color: rgba(128, 128, 128, 0.233); font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; font-size: 30px;"> 
                        Name: ${opfn} ${opln} 
                        <br><br>
                        Email:&nbsp;${ope}
                        <br><br><br><br><br><br><br><br><br>
                    </section>
                    <section class="footer">
                        <h2 class="fp1">Site Made by Umar</h2><br>
                        <h5 class="fp1">Copyright &#169; 2023</h5><br>
                    </section>
                    <!-- Optional JavaScript -->
                    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
                    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
                    </body>
                    <script src="app.js"></script>
                    <script src="info.js"></script>
                </html>`)
                return console.log(err)
            }
            else
                var opff =op
                console.log(opff)
                var str=1
                var s= str.toString()
                console.log(s)
                let opf = opff.toString()
                var fi=opf.indexOf('firstname')
                console.log(parseInt(fi))
                var sfv=(opf.indexOf("'",fi))+1
                var lfv=(opf.indexOf("'",sfv))
                opfn=opf.slice(sfv,lfv)
                var li=opf.indexOf('lastname')
                var slv=(opf.indexOf("'",li))+1
                var llv=(opf.indexOf("'",slv))
                opln=opf.slice(slv,llv)
                var ei=opf.indexOf('email')
                var sev=(opf.indexOf("'",ei))+1
                var lev=(opf.indexOf("'",sev))
                ope=opf.slice(sev,lev)
                console.log("opfn is"+ opfn)
                console.log("opln is"+ opln)
                console.log("ope is"+ ope)
                res.statusCode=200
                res.setHeader('Content-Type','text/html')
                console.log("Data saved")
                res.end(`<!doctype html>
                <html lang="en">
                <head>
                    <!-- Required meta tags -->
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                
                    <!-- Bootstrap CSS -->
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                    <link rel="icon" type="image/x-icon" href="/static/logo.jfif" class="logo">
                    <title>Drive</title>
                    <style>
                        .logo {
                            border-radius: 20px;
                            margin-right: 20px;
                        }
                
                        #navbar {
                            background-color: brown;
                        }
                
                        .navbut1:hover {
                            background-color: rgb(184, 164, 164);
                        }
                
                        .fp1 {
                            text-align: center;
                        }
                
                        .footer {
                            font-family: Arial, Helvetica, sans-serif;
                            background-color: black;
                            background-size: 100%;
                        }
                
                        .navbut1 {
                            background-color: brown;
                        }
                    </style>
                </head>
                
                <body>
                    <nav class="navbar navbar-expand-lg navbar-light" id="navbar">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item">
                                    <!-- <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
                                    <a href="/index.html"><button type="button" style="color: white;" class="btn nav-link navbut1">
                                            <h4>Home</h4>
                                        </button></a>
                                </li>
                                <li class="nav-item">
                                    <!-- <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
                                    <a href="/about.html"><button type="button" style="color: white;" class="btn nav-link navbut1">
                                            <h4>About</h4>
                                        </button></a>
                                </li>
                                <li class="nav-item">
                                    <a href="/services.html"><button type="button" style="color: white;" class="btn nav-link navbut1">
                                            <h4>Services</h4>
                                        </button></a>
                                </li>
                                <li class="nav-item">
                                    <a href="/contact.html"><button type="button" style="color: white;" class="btn nav-link navbut1">
                                            <h4>Contact</h4>
                                        </button></a>
                                </li>
                            </ul>
                            <form class="form-inline my-2 my-lg-0">
                            <img src="static/logo.jfif" height="50px" width="50px" class="logo">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </div>
                    </nav>
                    <section style="background-color: rgba(128, 128, 128, 0.233); font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; font-size: 30px;"> 
                        Name: ${opfn} ${opln} 
                        <br><br>
                        Email:&nbsp;${ope}
                        <br><br><br><br><br><br><br><br><br>
                    </section>
                    <section class="footer">
                        <h2 class="fp1">Site Made by Umar</h2><br>
                        <h5 class="fp1">Copyright &#169; 2023</h5><br>
                    </section>
                    <!-- Optional JavaScript -->
                    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
                    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
                    </body>
                    <script src="app.js"></script>
                    <script src="info.js"></script>
                </html>`)
        }).catch(()=>
        {
            console.log("Data not saved")
        })
    })
})
app.listen(port,hn,()=>
{
    console.log("Server is running at "+hn+":"+port)
})