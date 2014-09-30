LoginPage = {
	ShowCreateNewAccountBox: function(){
		$("#existingUserBox").hide();
		$("#newUserBox").show();
		$("#errorContainer").hide();
	},
	HideCreateNewAccountBox: function(){
		$("#existingUserBox").show();
		$("#newUserBox").hide();
		$("#errorContainer").hide();
	},
	Login: function(){
		$("#errorContainer").hide();
		if($("#username").val()==''){
			$("#errorMessage").text("please enter a username");
			$("#errorContainer").show();
			return;
		}
		if($("#password").val()==''){
			$("#errorMessage").text("please enter a password");
			$("#errorContainer").show();
			return;
		}
		var username=$("#username").val();
		var password=$("#password").val();
		console.log(username);
		console.log(password);

		//document.cookie="p="+password;
		//document.cookie="u="+username;
		$.post('/login',
		{
			Username:username,
			Password:password
		},
		function(response){
			if(response.success){
				document.cookie="u="+username;
				document.cookie="s="+response.sessionId;
				window.location.replace('/home');
			}
			else{
				$("#errorMessage").text(response.errmsg);
				$("#errorContainer").show();
			}
		});
	},
	CreateAccount: function(){
		$("#errorContainer").hide();
		if($("#newUsername").val()==''){
			$("#errorMessage").text("please enter a username");
			$("#errorContainer").show();
			return;
		}
		if($("#newPassword").val()==''){
			$("#errorMessage").text("please enter a password");
			$("#errorContainer").show();
			return;
		}
		if($("#newPassword").val()!=$("#passwordConfirm").val()){
			$("#errorMessage").text("passwords must match.");
			$("#errorContainer").show();
			return;
		}
		var username=$("#newUsername").val();
		var password=$("#newPassword").val();
		$.post('/CreateAccount',
		{
			Username:username,
			Password:password
		}, 
		function(response){
			if(response.success){
				document.cookie="u="+username;
				document.cookie="s="+response.sessionId;
				window.location.replace('/home');
			}
			else{
				$("#errorMessage").text(response.errmsg);
				$("#errorContainer").show();
			}
		});
	}
};
$(document).ready(function(){
	$("#existingUserBox").submit(function(event){
		event.preventDefault();
		LoginPage.Login();
	});
	$("#newUserBox").submit(function(event){
		event.preventDefault();
		LoginPage.CreateAccount();
	})
});