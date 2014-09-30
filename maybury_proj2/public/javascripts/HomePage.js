var HomePage = {
	Logout : function(){
		$.post('/home/logout', {username: HomePage.getCookie('u')},
			function(response){
				if (response.success){
					document.cookie.s='';
					document.cookie.u='';
					window.location.replace('/');
				}
			}
		);
	},
	GetRawUserFreetHTML :function(response){
		var tweetDate = moment(response.UpdatedDate);
		var now = moment.utc(Date.now());
		var duration = moment.duration(now.diff(tweetDate));
		var formatString = 's[s]';
		if (duration._data.minutes>1){
			formatString = 'm[m]'
		}
		if (duration._data.hours>1){
			formatString = 'h[h] m[m]'
		}		
		if (duration.days>1){
			formatString = 'd[d] h[h]'
		}
		if (response.UserFreet == HomePage.getCookie('u')){
			console.log('userfreet');
			return "<div class='freetbox row' id="+response._id+"> <h5 class='col-md-2 freet-username'>"+
			response.UserFreet+
			": </h5><div class='col-md-7 freet-text'>"+
			response.FreetText+
			"</div><div class='col-md-1 freet-options'><div class='options-inner'><i class='fa fa-pencil'></i><i class='fa fa-remove'></i></div></div><div class='col-md-2 freet-date'>"+ 
			moment.utc(now.diff(tweetDate)).format(formatString)+
			" ago</div></div>";
		}
		else{
			return "<div class='freetbox row'> <h5 class='col-md-2 freet-username'>"+
			response.UserFreet+
			": </h5><div class='col-md-8 freet-text'>"+
			response.FreetText+
			"</div><div class='col-md-2 freet-date'>"+ 
			moment.utc(now.diff(tweetDate)).format(formatString)+
			" ago</div></div>";
		}
	},
	SubmitFreet : function(){
		if($("#makeFreetBox").val()=='')
		{
			return;
			//something
		}
		var freetText=$("#makeFreetBox").val();
		console.log(freetText);
		$.post('/home/SubmitFreet',{freet:freetText},
			function(response){
				console.log(response)
				if (response.success){
					$("#freetsContainer").prepend(HomePage.GetRawUserFreetHTML(response.freet));
					HomePage.setListeners();
				}
				else{
					console.log('failed');
				}
			}
		);
	},
	CancelDeletion : function(freetId){
		$(".freet-delete-confirm")
		$("#"+freetId).find('.freet-delete-confirm').hide();
		$("#"+freetId).find('.options-inner').show();
		$("#"+freetId).find('.freet-options').addClass('col-md-1');
		$("#"+freetId).find('.freet-options').removeClass('col-md-2');
		$("#"+freetId).find('.freet-text').removeClass('col-md-6');
		$("#"+freetId).find('.freet-text').addClass('col-md-7');
	},
	DeleteFreet : function(freetId){
		$.post('home/DeleteFreet',{FreetId:freetId},
			function(response){
				if (response.success){
					window.location.replace('/home');
				}
		});
	},
	setListeners: function(){
		$(".fa-remove").bind('click', function(){
			console.log('remove click');
			var freetId = $(this).closest('.freetbox')[0].id;
			var options = $(this).closest('.freet-options');
			options.find('.options-inner').hide();
			options.removeClass('col-md-1');
			options.addClass('col-md-2');
			$(this).closest('.freetbox').find('.freet-text').removeClass('col-md-7');
			$(this).closest('.freetbox').find('.freet-text').addClass('col-md-6');
			
			options.append('<div class="freet-delete-confirm"> <button onclick="HomePage.DeleteFreet('+"'"+freetId+"'"+')" class="btn-xs fritter-button-small freet-edit-btn">Delete</button><button onclick="HomePage.CancelDeletion('+"'"+freetId+"'"+')" class="btn-xs fritter-button-small freet-edit-btn">Cancel</button></div>');
		});
		$(".fa-pencil").bind('click' ,function(){
			console.log('click')

			var freetDiv = $(this).closest('.freetbox').find('.freet-text');

			var freet = freetDiv.text();
			var options = $(this).closest('.options-inner');
			options.hide();
			freetDiv.text('');
			freetDiv.append("<input class='freet-edit col-md-9'></input><button class='btn-xs fritter-button-small freet-edit-btn'>Save Edits</button>");
			freetDiv.find('.freet-edit').val(freet);
			freetDiv.removeClass('freet-text');
			freetDiv.addClass('freet-div-edit')
			console.log(freet);
			freetDiv.find('.freet-edit-btn').bind('click', function(){
				$.post('/home/updateFreet', {freetText: freetDiv.find('.freet-edit').val(), freetId: freetDiv.closest('.freetbox')[0].id},
					function(response){
						if (response.success){
							window.location.replace('/home');
						}
					}
				);

			});
		});
	},
	getCookie : function(name){
		var value = "; " + document.cookie;
  		var parts = value.split("; " + name + "=");
  		return parts.pop().split(";").shift();
	}
}
$(document).ready(function(){
	$("#freetForm").submit(function(event){
		event.preventDefault();
		HomePage.SubmitFreet();
	});
	$.post('/home/GetAllFreets',{},function(response){
		for(var i=0; i<response.freets.length;i++){
			$("#freetsContainer").prepend(HomePage.GetRawUserFreetHTML(response.freets[i]));
		}
		HomePage.setListeners();
	});
});