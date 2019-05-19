var UserName;

function Send()
{
	console.log('OK');
    $.ajax({
        url: 'names', // адрес обработчика
        data: ({name: $('#name').val()}), // отправляемые данные          
        success: function(msg) { // получен ответ сервера  
			$('#main-content').hide();
			$('#game-content').show();
			add_UserName(msg);
			console.log("Save:" + UserName);
			//$(location).attr('href', 'game');
        },
    });
}

function add_UserName(data) {
    UserName = data;
}

function View()
{
	console.log(UserName);
	 $.ajax({
        url: 'getName', // адрес обработчика
        data: {name: UserName}, // отправляемые данные          
        success: function(msg) { // получен ответ сервера  
			console.log("It is :" + msg);
        }
    });
}

$(function () {
    $( "#send" ).click(function() { Send(); });
	$( "#itsme" ).click(function() { View(); });
});