var UserName;

var playerElemsTable = [
[0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
[0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 3, 3, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 2, 2, 0, 0, 0, 0]
];







 var playerTable = [
[0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
[0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 3, 3, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 2, 2, 0, 0, 0, 0]
];

var anotherPlayerTable = [
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
];

var coordin = [0, 0];
/*
function Send()
{
    $.ajax({
        url: 'names', // адрес обработчика
        data: ({name: $('#name').val()}), // отправляемые данные          
        success: function(msg) { // получен ответ сервера  
			if(msg != "/") {
				$('#main-content').hide();
				$('#game-content').show();
				add_UserName(msg);
				console.log("Save:" + UserName);
				//$(location).attr('href', 'game');
			} else {
				alert("Wrong Number -_-");
			}
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
			}
        }
    });
}


$(function ()
{
    $( "#send" ).click(function() { Send(); });
	$(document).ready( function() { View() });
});
*/

window.onload = function () {
	var canvasAddShip = document.getElementById("addShips");
	var ctxAddShip = canvasAddShip.getContext("2d");


	var ElemInField = function(x, y, typeElem) {
	this.x = x;
	this.y = y;
	this.h = 23;
	this.w = 23;
	this.typeElem = typeElem;
};

ctxAddShip.linewidth = 2;

ElemInField.prototype = {
	draw(){
		drawELm(this.x, this.y, this.typeElem);
	}
};

var drawELm = function(x, y, typeEl) {
	switch(typeEl){
			case 0: {
				ctxAddShip.fillStyle = '#72CCFD';
				ctx.AddShip.strokeStyle = '#000000';
				ctxAddShip.fillRect(x, y, 23, 23);
				ctxAddShip.strokeRect(x, y, 23, 23);
				break;
			}
			case 1: {
				ctxAddShip.fillStyle = '#C1C9CD';
				ctxAddShip.strokeStyle = '#000000';
				ctxAddShip.fillRect(x, y, 23, 23);
				ctxAddShip.strokeRect(x, y, 23, 23);
				break;
			}
			case 2: {
				ctxAddShip.fillStyle = '#F63C4D';
				ctxAddShip.strokeStyle = '#000000';
				ctxAddShip.fillRect(x, y, 23, 23);
				ctxAddShip.strokeRect(x, y, 23, 23);
				break;
			}
			case 3: {
				ctxAddShip.fillStyle = '#0626A7';
				ctxAddShip.strokeStyle = '#000000';
				ctxAddShip.fillRect(x, y, 23, 23);
				ctxAddShip.strokeRect(x, y, 23, 23);
				break;
			}
			default:{
				break;
			}
		}
}

var allElems = [];
var xCoord = 23;
var yCoord = 23;
for (var i = 0; i < 10; i++) {
	for( var j = 0; j < 10; j++) {
		allElems.push(new ElemInField(xCoord, yCoord, 1));
		xCoord += 23;
	}
	xCoord = 23;
	yCoord += 23;
}
setInterval(function(){
	for(i in allElems) {
		allElems[i].draw();
	}
}
, 30);


}


//txAddShip.drawImage(imgWater, 10, 10);



