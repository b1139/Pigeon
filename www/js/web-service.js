function getBaseURL() {
    var url = location.href;  // entire url including querystring - also: window.location.href; 
	alert(url);
}
 

function hideFormMessages()
{
    $('.error').fadeOut('fast');
}

function showMessage(message)
{
	$('.error').html(message);
	$('.error').fadeIn('fast');
	clearTimeout(top.timerId);
    top.timerId = setTimeout(hideFormMessages, 5000);
}

function doSignUp()
{	
	if(($.trim($('#name').val()) == '' ||  $.trim($('#name').val()) == '')){ 
		showMessage('Please Enter Your Name');
		$('#name').select();
		return false;
	}else if( ($.trim($('#mob-num').val()) == '' ||  $.trim($('#mob-num').val()) == '') )
	{ 
		showMessage('Please Enter Mobile Num');
		$('#mob-num').select();
		return false;	
	}
	else if( ($.trim($('#email').val()) != '' &&  $.trim($('#email').val()) == '')&&(!IsEmail($.trim($('#email').val()))) )
	{
		showMessage('Email Address Invalid');
		$('#email').select();
		return false;
	}
	else if( ($.trim($('#pword').val()) == '' ||  $.trim($('#pword').val()) == 'Password') )
	{ 
		showMessage('Please Enter Password');
		$('#pword').select();
		return false;	
	}
	else if( ($.trim($('#re-pword').val()) == '' ||  $.trim($('#re-pword').val()) == 'Password') )
	{
		//$("#divMessage").html('Email ID is required');
		showMessage('Please Re-Type password');
		$('#re-pword').select();
		return false;
	}
	else if( ($.trim($('#pword').val()).length <5 ) )
	{ 
		showMessage('Password needs to be atleast 5 characters long');
		$('#pword').select();
		return false;
	}
	else if( $.trim($('#pword').val()) != $.trim($('#re-pword').val()) )
	{
		//$("#divMessage").html('Email ID is required');
		showMessage('Passwords Do not match');
		$('#re-pword').select();
		return false;
	}
	else 
	{ 
		startPageLoad();
		$.ajax({
			type:'POST',
			//url:"/spillmobile/process/api.php?rquest=login",
			url:"http://localhost:8090/pigeon/rest/api.php?rquest=signuppigeon",
			data: $("#signupform").serialize(),
			//dataType: 'json',
			success:function(responseText){ 
					endPageLoad();
					window.location.href= 'home.html';
					/*if(responseText > 0)
					{
						if(actionPending == "response")
						{
							$("#loginPopup").popup("close");
							showSuccessMessage("Response submitted. Thanks!");
							submitResponse();
							loadSpill();
							actionPending = null;
						}
						else if(actionPending == "hug")
						{
							loadSpill();
							actionPending = null;
						}
						else
						{
							window.location.href= getBaseURL()+'home.html';
						}
					}
					else
					{
						showMessage("Sign up failed. Please check your details..");
					}*/
					/*$.each(responseText, function(key, value){
						$("#result").html('Logged User: ' + value);   					
					});*/		
			},			
			failed:function(responseText)
			{
				endPageLoad();
				//alert(responseText);
				$.each(responseText, function(i,item)
				{
					alert(item);
				});
				//$("#divMessage").html(responseText);   					
			}
		});/*
		return false;*/
	}
}

function startPageLoad()
{
	$("#pagedimmer").show();
	$('#pagedimmer').animate({'opacity': .8}, 0);
	$.mobile.loading( 'show', {
		text: 'foo',
		textVisible: false,
		theme: 'e',
		//html: "Loading..."
	});
}

function endPageLoad()
{
	$("#pagedimmer").hide();
	$.mobile.loading( 'hide', {
		text: 'foo',
		textVisible: true,
		theme: 'a',
		html: "Loading..."
	});
}

function IsEmail(email) 
{
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function doLogin(){
		if( ($.trim($('#mob-num').val()) == '' ||  $.trim($('#mob-num').val()) == '') )
		{ 
			showMessage('Please Enter Mobile Num');
			$('#mob-num').select();
			return false;	
		}else if( ($.trim($('#pword').val()) == '' ||  $.trim($('#pword').val()) == 'Password') )
		{ 
			showMessage('Please Enter Password');
			$('#pword').select();
			return false;	
		}
		else {
			startPageLoad();
			$.ajax({
				type:'POST', 
				url:"http://localhost:8090/pigeon/rest/api.php?rquest=login",
				data: $("#login").serialize(),
				//dataType: 'json',
				success:function(responseText){
						endPageLoad(); 
						if(responseText == 0)
						{ 
							showMessage("Invalid User Credentials");
						}
						else
						{
							window.location.href= 'home.html';
						} 		
				},			
			});
			return false;
		}
}