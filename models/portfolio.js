const mongoose = require('mongoose');

var portfolioSchema = new mongoose.Schema({
	title: String,
	link: String,
	image : String,
	description : String,
	iframe: String
});

module.exports = mongoose.model("Portfolio", portfolioSchema);