var UserName;

 var playerTable = [
[0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
[0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

var coordin = [0, 0];

function View()
{
	$.ajax({
		url: 'viewer', // адрес обработчика
		success: function(msg) { // получен ответ сервера
			console.log("Log: " + msg);
			if (msg == "no") {
				$('#send').hide();
				$('#name').hide();
				$('#name_mini').hide();
			}
		}
	});
}

function Send()
{
	$.ajax({
		url: 'names', // адрес обработчика
		data: ({name: $('#name').val()}), // отправляемые данные
		success: function(msg) { // получен ответ сервера
			if (msg != "=") {
				if(msg != "/") {
					$('#main-content').hide();
					$('#game-content').show();
					add_UserName(msg);
					console.log("Save:" + UserName);
					//$(location).attr('href', 'game');
				} else {
					alert("Wrong Number -_-");
				}
			} else {
				View();
			}
		}
	});
	
	//каждую секунду посылает запрос на сервер
	
}

function add_UserName(data)
{
	UserName = data;
}

$(function ()
{
	$( "#send" ).click(function() { Send(); });
	$(document).ready( function() { View() });
});