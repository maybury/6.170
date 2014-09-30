var hashmult = 7092;
var hashshift = 87237;
module.exports={
	GetHashedPassword: function(password)
	{
		var newPassword='';
		for(var i=0;i<password.length;i++)
		{
			newPassword+=(password.charCodeAt(i)+100).toString();
		}
		var intPassword = parseInt(newPassword);
		finalPassword = ((intPassword*hashmult)+hashshift).toString();
		return newPassword;
	},
	CheckSessionValidity: function(username, sessionId){
		var currentSession;
		Session.findOne({ _id: sessionId }, 

		function (err, currentSession) {
		    if (err) {
		        throw Error;
		    }
		    if(currentSession!=null){
		    	if(moment(Date.now()).isAfter(moment(currentSession.Expires)) || currentSession.Username!=username)
		    	{
		    		return false;
		    	}
		    	else{
		    		return true;
		    	}
		    	
		    }
		    return false;
		}
	);
	},
	ExtractAts : function(freet){
		var ats= [];
		for(var i=0;i<freet.length;i++){
			if (freet.charAt(i)=='@'){
				var username = ''
				i++;
				while(freet.charAt(i)!=' '){
					username+=freet.charAt(i);
					i++;
				}
				ats.append(username);
			}
		}
		return ats;
	},
	ExtractTags : function(freet){
		var tags= [];
		for(var i=0;i<freet.length;i++){
			if (freet.charAt(i)=='#'){
				var tag = ''
				i++;
				while(freet.charAt(i)!=' '){
					tag+=freet.charAt(i);
					i++;
				}
				tags.append(tag);
			}
		}
		return tags;
	}
}