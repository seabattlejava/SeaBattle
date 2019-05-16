
function Send()
{
	console.log('OK');
    $.ajax({
        url: 'names', // адрес обработчика
        data: ({name : $('#name').val()}), // отправляемые данные          
        success: function(msg) { // получен ответ сервера  
			console.log('Connected: ' + msg);
            //$('#my_form').hide('slow');
            //$('#my_message').html(msg);
        }
    });
}
	

$(function () {
    $( "#send" ).click(function() { Send(); });
});