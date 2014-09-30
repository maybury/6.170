var express = require('express');
var mongoose = require('mongoose');
var util = require('../public/javascripts/util.js');
var router = express.Router();
var User = require('../models/User.js');
var Session = require('../models/Session.js');
var moment = require('moment');
/* GET home page. */
router.get('/', function(req, res) {
	if(req.cookies.s!=null && req.cookies.u!=null){
		var currentSession;
		var validSession;
		var username=req.cookies.u;
		var sessionId = req.cookies.s;
		Session.findOne({ _id: sessionId }, 

			function (err, currentSession) {
			    if (err) {
			        throw Error;
			    }
			    if(currentSession!=null){
			    	if(moment(Date.now()).isAfter(moment(currentSession.Expires)) || currentSession.Username!=username)
			    	{
			    		validSession = false;
			    	}
			    	else{
			    		validSession = true;
			    	}
			    	
			    }
			    else{
			     	validSession = false;
			 	}
				if(validSession){
					res.redirect('/home');
					return;
				}
	  			res.render('index', { title: 'Welcome to Fritter' });
	  			return;
			}
		);
	}
	else{
		res.render('index', { title: 'Welcome to Fritter' });
		return;
	}
});
router.post('/login',function(req,res){
	var match;
	var enteredPassword = util.GetHashedPassword(req.body.Password);
	User.findOne({ Username: req.body.Username }, 
		function (err, match) {
		    if (err) {
		        throw Error;
		    }
		    if (match!=null){
		    	if (enteredPassword!=match.Password){
		    		res.json({success:false,errmsg:'Incorrect Password'});
		    		return;
		    	}
		    	var currentSession = new Session();
		    	currentSession.Username = req.body.Username;
		    	currentSession.Expires = moment(Date.now()).add(1,'days');
		    	currentSession.save(function (err, currentSession){
		    		if (err){
		    			return console.error(err);
		    		}
		    		res.json({success:true, sessionId:currentSession._id});
		    		return;
		    	});
		    	
		    }
		    else{
				res.json({ success: false, errmsg:'Username not recognized'});
				return;
			}
		});
	//res.json({success:false, errmsg:'Login problem'});
});
router.post('/CreateAccount',function(req,res){
	var potentialMatch;
	User.findOne({ Username: req.body.Username }, 
		function (err, potentialMatch) {
		    if (err) {
		        throw Error;
		    }
		    if(potentialMatch!=null){
		    	res.json({success:false, errmsg:'Username'+ req.body.Username +'already exists'});
		    	return;
		    }	
		}
	);

	var newUser = new User();

	newUser.UserId = mongoose.Types.ObjectId;
	newUser.Username = req.body.Username;
	newUser.Password = util.GetHashedPassword(req.body.Password);

	newUser.save(function(err, newUser) {
		  if (err) {
		  	return console.error(err);
		  }
		  else{
		  	var currentSession = new Session();
		    	currentSession.Username = req.body.Username;
		    	currentSession.Expires = moment(Date.now()).add(1,'days');
		    	currentSession.save(function (err, currentSession){
		    		if (err){
		    			return console.error(err);
		    		}
		    		res.json({success:true, sessionId:currentSession._id});
		    		return;
		    	});
		  }

	});

});

module.exports = router;
