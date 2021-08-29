const express = require("express")
const router = express.Router();
const Portfolio = require("../models/portfolio")
const bodyParser = require("body-parser"); 
const methodOverride = require("method-override");

//Projects
//데이터베이스이름은 portfolio, 경로는 proejct
router.get('/', (req,res) => {
	Portfolio.find({}, function(err,allPortfolio){
		if(err){
			console.log(err)
		} else{
			res.render("projects",{portfolios:allPortfolio})
		}
	})
})

router.post("/", isLoggedIn ,function(req,res){
	var title = req.body.title;
	var link = req.body.link;
	var image = req.body.image;
	var description = req.body.description;
	var iframe = req.body.iframe;
	var newP = {title: title, link: link, image: image, description:description, iframe:iframe};
	Portfolio.create(newP, function(err,newPortfolio){
		if(err){
			console.log(err)
			
		} else{
			res.redirect('/projects')
		}
	})
})

//Make new Project
router.get("/new", isLoggedIn ,function(req,res){
	res.render('new.ejs');
})

router.get("/:id", function(req,res){
	Portfolio.findById(req.params.id, function(err, foundPortfolio){
		if(err){
			console.log(err)
		} else{
			res.render("show", {portfolio: foundPortfolio});
		}
	})
})

router.delete("/:id", isLoggedIn ,function(req,res){
	Portfolio.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/projects")
		} else{
			res.redirect("/projects")
		}
	})
})

	
function isLoggedIn(req,res, next){
	if(req.isAuthenticated()){
		return next();
	} else{
		res.redirect("/login");
	}
};



module.exports = router;