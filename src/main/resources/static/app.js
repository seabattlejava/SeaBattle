var UserName;

function Send()
{
    $.ajax({
        url: 'names', // адрес обработчика
        data: ({name: $('#name').val()}), // отправляемые данные          
        success: function(msg) { // получен ответ сервера  
			console.log(msg);
			$('#main-content').hide();
			$('#game-content').show();
			add_UserName(msg);
			console.log("Save:" + UserName);
			//$(location).attr('href', 'game');
        },
    });
	
	//каждую секунду посылает запрос на сервер
	
}

function add_UserName(data)
{
    UserName = data;
}

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
			} else {
				$('#chat').show();
			}
        }
    });
}


$(function ()
{
    $( "#send" ).click(function() { Send(); });
	$(document).ready( function() { View() });
});

