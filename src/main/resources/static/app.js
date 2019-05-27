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
	this.xCoordTrueSpace = 0;
	this.yCoordTrueSpace = 0;
	this.hCoordTrueSpace = 0;
	this.wCoordTrueSpace = 0;
	
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
	this.selectOpportun = true;
	this.shipIsSet = false;

};

Ship.prototype = {
	draw() {
		drawShip(this.x, this.y, this.palubs, this.position);
	},
	checkPositionSHip() {
		if(this.position == "horiz") {
			this.w = 23 * this.palubs;
			this.h = 23;
		}
		if( this.position == "vert") {
			this.h = 23 * this.palubs;
			this.w = 23;
		}
	},
	createTrueSpace() {
		this.wCoordTrueSpace = this.w + 23;
		this.hCoordTrueSpace = this.h + 23;
		this.xCoordTrueSpace = this.x - 23;
		this.yCoordTrueSpace = this.y - 23;
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
		arrayShips.push(new Ship(350, yShipCoord, docksShip, "horiz"));
	}
	yShipCoord += 56
	docksShip--;
}

var isCursorInShip = function (ship) {
	return (mouse.x > ship.x) && (mouse.x < ship.x + ship.w) &&
		   (mouse.y > ship.y) && (mouse.y < ship.y + ship.h);
};

var isCursorInCell = function (element) {
	return (mouse.x > element.x) && (mouse.x < element.x + 23) &&
		   (mouse.y > element.y) && (mouse.y < element.y + 23);
};

var playerShipArray = [];

setInterval(function(){
	ctxAddShip.clearRect(0, 0 , 736, 276);
	for(i in allElems) {
		allElems[i].draw();
	}
	for(j in arrayShips) {
		arrayShips[j].checkPositionSHip();
		arrayShips[j].createTrueSpace();
		arrayShips[j].draw();
		
	}
	///////
	if (selected) {
		if ((mouse.x > 23) && (mouse.x < 253) && (mouse.y > 23) && (mouse.y < 253)) {
			for(i in allElems) {
				if(isCursorInCell(allElems[i])) {
					selected.x = allElems[i].x;
					selected.y = allElems[i].y;
				}
			}
		} else {
			selected.x = mouse.x;
			selected.y = mouse.y;
		}
	}
}
, 20);

addShips.onmousemove = function (e) {
	
	mouse.x = e.offsetX;
	mouse.y = e.offsetY;
}

var opportToPutShip = true;

addShips.onclick = function(e) {
	if (mouse.checked == true) {
		for(k in allElems) {
			if((allElems[k].typeElem == 1) && (allElems[k].x >= selected.xCoordTrueSpace) && (allElems[k].x < selected.xCoordTrueSpace + selected.wCoordTrueSpace + 23)
			&& (allElems[k].y >= selected.yCoordTrueSpace) && (allElems[k].y <selected.yCoordTrueSpace + selected.hCoordTrueSpace + 23)) {
				opportToPutShip = false;
			}
		}
		console.log(selected.x + " " + selected.y + " " + (selected.x + selected.w) + " " + (selected.y + selected.h));
		console.log(selected.xCoordTrueSpace + " " + selected.yCoordTrueSpace + " " + (selected.xCoordTrueSpace + selected.wCoordTrueSpace + 23) + " " +(selected.yCoordTrueSpace + selected.hCoordTrueSpace + 23));
		if((selected.x >= 23) && (selected.y >= 23) && (selected.y + selected.h <= 253) && (selected.x + selected.w <= 253)) {
			if(opportToPutShip == true) {
				for(j in allElems) {
					if((allElems[j].x >= selected.x) &&(allElems[j].x < selected.x + selected.w) &&
						(allElems[j].y >= selected.y) && (allElems[j].y < selected.y + selected.h)) {
						allElems[j].typeElem = 1;
						selected.shipIsSet = true;
					}
				}
				mouse.checked = false;
				selected.selectOpportun = false;
				selected = false;
			}
		}
		opportToPutShip = true;
	} else if( mouse.checked == false) {
		
		if(!selected) {
			var k;
			for(k in arrayShips) {
				if(isCursorInShip(arrayShips[k])) {
					if(arrayShips[k].selectOpportun == true) {
						selected = arrayShips[k];
						mouse.checked = true;
					}
				}
			}
		}
	}
}

addShips.oncontextmenu = function(e) {
	if(mouse.checked == true) {
		if (selected.position == "horiz") {
			selected.position = "vert";
		} else if (selected.position == "vert") {
			selected.position = "horiz";
		}
	}
	return false;
}



}

var createPlayerShipArray = function(elems, playeArray) {
	playeArray = [];
	for(k in elems) {
		playeArray.push(elems[k].typeElem)
	}
	var str = JSON.stringify(playeArray);
	console.log(str);
}


//txAddShip.drawImage(imgWater, 10, 10);



