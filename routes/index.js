const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");


//Home
router.get('/', (req, res) => {
    res.render('home')
})


//About
router.get('/about', (req, res) => {
    res.render('about')
})


//=======================
//AUTH ROUTES FOR ONLY ME
router.get("/register", function(req,res){
	res.render("register");
})

router.post("/register", function(req,res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err)
			return res.render("register")
		} else{
			passport.authenticate("local")(req,res,function(){
				res.redirect("/projects")
			})
		}
	});
})

//Login 
router.get("/login", function(req,res){
	res.render("login");
	
})

// =============== passport.authenticate is middleware==================
router.post("/login", passport.authenticate("local", {successRedirect: "/projects", failureRedirect: "/login"}) ,function(req,res){
});

router.get("/logout", function(req,res){
	req.logout();
	res.redirect("/projects")
})

function isLoggedIn(req,res, next){
	if(req.isAuthenticated()){
		return next();
	} else{
		res.redirect("/login")
	}
}

module.exports = router