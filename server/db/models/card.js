'use strict'

var mongoose = require('mongoose');

//Schema
var CardSchema = new mongoose.Schema({
	title: {
		type: String,
		unique: true,
		required: true
	},
	prompt: {
		type: String,
		required: true
	},
	answers: {
		type: []
	},
	color: {
		type: String, 
		enum: ['blue', 'purple', 'red', 'orange']
	}
})

//Methods and Statics
CardSchema.methods.addAnswer = function(answer){
	if (!this.answers){
		return this.answers = [answer];
	}
	else {
		return this.answers.push(answers)
	}	
}

//Export
module.exports = mongoose.model('Card', CardSchema);
