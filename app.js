const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); 
const Portfolio = require("./models/portfolio")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user")
const methodOverride = require("method-override");


const projectRoutes = require("./routes/projects")
const indexRoutes = require("./routes/index")

// //connect mongoose
// mongoose.connect('mongodb://localhost:27017/portfolio',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

mongoose.connect('mongodb+srv://finn1729:Jake4529^^@cluster0.lribb.mongodb.net/Portfolio',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// mongoose.connect('mongodb+srv://finn1729:Jake4529^^@whoever.mlazf.mongodb.net/<dbname>?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex:true
// })


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//PASSPORT
app.use(require("express-session")({
	secret: "@Galaxy Airpod@",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
})

app.use(indexRoutes); // name app as router
app.use("/projects",projectRoutes); // remove redundancy of url /projects
app.use(express.static(path.join(__dirname, 'public'))); // path for public/stylesheet

app.listen( process.env.PORT || 3000 , process.env.IP, function() {
      console.log("Portfolio started");
});