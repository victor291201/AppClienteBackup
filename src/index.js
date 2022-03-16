const express = require("express");
const { json } = require("express/lib/response");
const app = express();
const path = require("path")

//settings
app.set("port",3000)
app.set("views",path.join(__dirname,"views"));
app.engine("html",require("ejs").renderFile);
app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}));
app.use(express(json));
//middlewares


//axuiliar functions
app.locals.tipeList = true
app.locals.handleList = ()=>{
    tipeList = !tipeList
    
}
//routes
app.use(require("./routes"))
//static files
app.use(express.static(__dirname + '/public'))

// bd conection

//listening the server
app.listen(app.get("port"),()=>{
    console.log("server on port ",app.get("port"))
})
