var UserName;

oneDeckShip = 4;
twoDeckShip = 3;
threeDeckShip = 2;
fourDeckShip = 1;

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
				ctxAddShip.strokeStyle = '#000000';
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

var Ship = function(x, y, palubs, position){
	this.x = x;
	this.y = y;
	this.palubs = palubs;
	this.position = position;
};

Ship.prototype = {
	draw() {
		drawShip(this.x, this.y, this.palubs, this.position);
	}
	
};

var drawShip = function(x, y, palubs, position){
	for(var countPalubs = 0; countPalubs < palubs; countPalubs++) {
		if (position == "vertical") {
			ctxAddShip.fillStyle = '#C1C9CD';
			ctxAddShip.strokeStyle = '#000000';
			ctxAddShip.fillRect(x, y, 23, 23);
			ctxAddShip.strokeRect(x, y, 23, 23);
			y += 23
		} else {
			x += 23;
		}
	}
}

var allElems = [];
var xCoord = 23;
var yCoord = 23;
for (var i = 0; i < 10; i++) {
	for( var j = 0; j < 10; j++) {
		allElems.push(new ElemInField(xCoord, yCoord, 0));
		xCoord += 23;
	}
	xCoord = 23;
	yCoord += 23;
}

var oneShip = new Ship(300, 23, 4, "vertical");


addShips.onclick = function(e) {
	var x = e.pageX;
	var y = e.pageY;
}




setInterval(function(){
	for(i in allElems) {
		allElems[i].draw();
	}
	oneShip.draw();
}
, 30);


}


//txAddShip.drawImage(imgWater, 10, 10);



