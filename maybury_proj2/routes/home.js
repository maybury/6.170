var express = require('express');
var moment = require('moment');
var router = express.Router();
var Session = require('../models/Session.js');
var util = require('../public/javascripts/util.js');
var Freet = require('../models/Freet.js');

/* GET users listing. */
router.get('/', function(req, res) {
	var currentSession;
	var username = req.cookies.u;
	var sessionId = req.cookies.s;
	var valid;
	Session.findOne({ _id: sessionId }, 
		function (err, currentSession) {
		    if (err) {
		        throw Error;
		    }
		    if(currentSession!=null){
		    	if(moment(Date.now()).isAfter(moment(currentSession.Expires)) || currentSession.Username!=username)
		    	{
		    		valid= false;
		    	}
		    	else{
		    		valid= true;
		    	}
		    	
		    }
		    else{
		    	valid= false;
			}
		    if(valid)
			{
				res.render('home',{title:'Fritter | Home', Username:req.cookies.u, Session:req.cookies.s});
				return;
			}
			else{
				res.redirect('/');
				return;
			}
		}
	);
});
router.post('/SubmitFreet', function(req,res){
	var currentSession;
	var username = req.cookies.u;
	var sessionId = req.cookies.s;
	var valid;
	Session.findOne({ _id: sessionId }, 
		function (err, currentSession) {
		    if (err) {
		        throw Error;
		    }
		    if(currentSession!=null){
		    	if(moment(Date.now()).isAfter(moment(currentSession.Expires)) || currentSession.Username!=username)
		    	{
		    		valid= false;
		    	}
		    	else{
		    		valid= true;
		    	}
		    	
		    }
		    else{
		    	valid= false;
			}
		    if(valid)
			{
				var newFreet = new Freet();
				newFreet.UserFreet = req.cookies.u;
				newFreet.FreetText = req.body.freet;
				newFreet.UpdatedDate = moment();
				newFreet.DirectedAt = util.ExtractAts(req.body.freet);
				newFreet.Tagged = util.ExtractTags(req.body.freet);
				newFreet.save(function (err, newFreet){
					if (err){
						throw Error;
					}
					res.send({success:true,freet: newFreet});
				});
				return;
			}
			else{
				
				return;
			}
		}
	);

});
router.post('/GetAllFreets', function(req,res){
	Freet.find({}).sort('UpdatedDate').exec(function(err,freets){
		res.send({freets:freets});
		return;
	});
});

router.post('/DeleteFreet', function(req,res){
	var currentSession;
	var username = req.cookies.u;
	var sessionId = req.cookies.s;
	var valid;
	var freetId = req.body.FreetId
	console.log(freetId);
	Session.findOne({ _id: sessionId }, 
		function (err, currentSession) {
		    if (err) {
		        throw Error;
		    }
		    if(currentSession!=null){
		    	if(moment(Date.now()).isAfter(moment(currentSession.Expires)) || currentSession.Username!=username)
		    	{
		    		valid= false;
		    	}
		    	else{
		    		valid= true;
		    	}
		    	
		    }
		    else{
		    	valid= false;
			}
		    if(valid)
			{
				Freet.findOne({_id:freetId}).remove(
					function (err, freet){
						if(!err){
							res.send({success:true});
						}
					}
				);
			}
			return;
		}
	);
});
router.post('/updateFreet', function(req,res){
	var currentSession;
	var username = req.cookies.u;
	var sessionId = req.cookies.s;
	var valid;
	var freetId = req.body.freetId
	var newText= req.body.freetText;
	Session.findOne({ _id: sessionId }, 
		function (err, currentSession) {
		    if (err) {
		        throw Error;
		    }
		    if(currentSession!=null){
		    	if(moment(Date.now()).isAfter(moment(currentSession.Expires)) || currentSession.Username!=username)
		    	{
		    		valid= false;
		    	}
		    	else{
		    		valid= true;
		    	}
		    	
		    }
		    else{
		    	valid= false;
			}
		    if(valid)
			{
				var newFreet;
				Freet.findOne({_id:freetId},
					function (err, newFreet){
						if(newFreet!=null){
							newFreet.FreetText = newText;
							newFreet.UpdatedDate = moment();
							newFreet.save(function (err,currentSession){
								if(err){
									return console.error(err);
								}
								res.send({success:true});
								return;
							});
						}
					}
				);
			}
			return;
		}
	);
});
router.post('/logout', function(req,res){
	var currentSession;
	Session.findOne({ _id: req.cookies.s }, 
		function (err,currentSession) {
			if (err){
				throw Error;
			}
			if (currentSession!=null){
				currentSession.Expires = moment(Date.now());
				currentSession.save(function (err, currentSession){
		    		if (err){
		    			return console.error(err);
		    		}
		    		res.send({success:true});
		    	});
			}
		}
	);
});

module.exports = router;
