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

var mouse = {
	x : 0,
	y : 0,
	checked : false
};

var selected = false;

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
	this.h = 23;
	this.w = 23;

};

Ship.prototype = {
	draw() {
		drawShip(this.x, this.y, this.palubs, this.position);
	},
	checkPositionSHip() {
		if(this.position == "horiz") {
			this.w = 23 * this.palubs - 1;
		}
		if( this.position == "vert") {
			this.h = 23 * this.palubs - 1;
		}
	}
	
};

var drawShip = function(x, y, palubs, position){
	for(var countPalubs = 0; countPalubs < palubs; countPalubs++) {
		if (position == "vert") {
			ctxAddShip.fillStyle = '#C1C9CD';
			ctxAddShip.strokeStyle = '#000000';
			ctxAddShip.fillRect(x, y, 23, 23);
			ctxAddShip.strokeRect(x, y, 23, 23);
			y += 23
		}
		if (position == "horiz") {
			ctxAddShip.fillStyle = '#C1C9CD';
			ctxAddShip.strokeStyle = '#000000';
			ctxAddShip.fillRect(x, y, 23, 23);
			ctxAddShip.strokeRect(x, y, 23, 23);
			x += 23
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

var arrayShips = [];
var docksShip = 4; 
var yShipCoord = 23
for(var i = 0; i < 4; i ++) {
	for ( var j = 0; j < i + 1; j++) {
		arrayShips.push(new Ship(300, yShipCoord, docksShip, "horiz"));
	}
	yShipCoord += 56
	docksShip--;
}

var isCursorInShip = function (ship) {
	return (mouse.x > ship.x) && (mouse.x < ship.x + ship.w) &&
		   (mouse.y > ship.y) && (mouse.y < ship.y + ship.h);
};




setInterval(function(){
	ctxAddShip.clearRect(0, 0 , 736, 276);
	for(i in allElems) {
		allElems[i].draw();
	}
	for(j in arrayShips) {
		arrayShips[j].checkPositionSHip();
		arrayShips[j].draw();
		if(isCursorInShip(arrayShips[j])) {
			console.log(mouse.x + " " + mouse.y + " | " + arrayShips[0].x + " " + arrayShips[0].y+ " | " + arrayShips[0].w + " " + arrayShips[0].h);
		}
	}
	
	if (selected) {
		selected.x = mouse.x;
		selected.y = mouse.y;
	}
}
, 30);

addShips.onmousemove = function (e) {
	
	mouse.x = e.offsetX;
	mouse.y = e.offsetY;
}

addShips.onclick = function(e) {
	if (mouse.checked == true) {
		mouse.checked = false;
		selected = false;
	} else if( mouse.checked == false) {
		mouse.checked = true;
	if(!selected) {
		var k;
		for(k in arrayShips) {
			if(isCursorInShip(arrayShips[k])) {
				selected = arrayShips[k];
			}
		}
	}
	}
		
}

addShips.onmousedown = function () {
	
}
addShips.onmouseup = function () {
	
}




}




//txAddShip.drawImage(imgWater, 10, 10);



