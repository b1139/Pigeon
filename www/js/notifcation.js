/**
	Files used to send and retrieve the notification for Pigeon
*/
function getBaseURL() {
    var url = location.href;  // entire url including querystring - also: window.location.href; 
	if(url.indexOf("http://localhost") != -1){
		return "http://localhost:8090/pigeon/rest/api.php";
	}else{
		return "http://creatustent.com/pigeon/rest/api.php";
	}
}

function sendRegistrationId(registrationId){
	alert(registrationId);
	$.ajax({
				type:'POST', 
				url:getBaseURL()+"?rquest=retrieveRegistrationId",  
				data:{'registrationId':registrationId},
				success:function(responseText){  alert(responseText);
				},			
			});
}