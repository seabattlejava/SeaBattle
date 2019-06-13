var UserName;

var game_start = false;
var playerShipArray = [];
var playerShipArrayJson = "";
var anotherPlayerShipArrat = [];
var numberCellShot = 0;


function View()
{
	$('#adding_ship_area').hide();
	$('#game-content').hide();
	$('#main_game').hide();
	$('#chat_window').hide();
	$('#message_template').hide();
	$.ajax({
		url: 'viewer', // адрес обработчика
		success: function(msg) { // получен ответ сервера
			console.log("Log: " + msg);
			if (msg == "no") {
				$('#main-content').hide();
				$('#chat_window').show();
				$('#message_template').show();
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
					$('#adding_ship_area').show();
					$('#game-content').show();
					$('#main_game').show();
					$('#main-content').hide();
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
	$( "#shipsAdded" ).click(function() {ShipsAdded();});
	$( "#fastAddShips" ).click(function() {fastAddShipInArea();});
	$( "#shoot" ).click(function() {shoot();});
	$(document).ready( function() { View() });
});


var allElems = [];
var arrayShips = [];

var playerAreaTable = [];
var anotherPlayerAreaTable = [];

var ElemInField = function(x, y, typeElem, numberCanvas) {
	this.x = x;
	this.y = y;
	this.h = 23;
	this.w = 23;
	this.typeElem = typeElem;
	this.xCoordTrueSpace = 0;
	this.yCoordTrueSpace = 0;
	this.hCoordTrueSpace = 0;
	this.wCoordTrueSpace = 0;
	this.numberCanvas = numberCanvas;
	this.selected = false;
	
};


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


window.onload = function () {
	var canvasAddShip = document.getElementById("addShips");
	var ctxAddShip = canvasAddShip.getContext("2d");
	var canvasPlayerArea = document.getElementById("playerArea");
	var ctxPlayerArea = canvasPlayerArea.getContext("2d");
	var canvasAnotherPlayerArea = document.getElementById("anotherPlayerArea");
	var ctxAnotherPlayerArea = canvasAnotherPlayerArea.getContext("2d");
	
	ctxAddShip.linewidth = 2;
	ctxPlayerArea.linewidth = 2;
	ctxAnotherPlayerArea.linewidth = 2;

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

var drawELm = function(x, y, typeEl, numberCanvas) {
	switch(numberCanvas) {
		case 0: {
			switch(typeEl){
				//вода
				case 0: {
					ctxAddShip.fillStyle = '#72CCFD';
					ctxAddShip.strokeStyle = '#000000';
					ctxAddShip.fillRect(x, y, 23, 23);
					ctxAddShip.strokeRect(x, y, 23, 23);
					break;
				}
				//корабль
				case 1: {
					ctxAddShip.fillStyle = '#C1C9CD';
					ctxAddShip.strokeStyle = '#000000';
					ctxAddShip.fillRect(x, y, 23, 23);
					ctxAddShip.strokeRect(x, y, 23, 23);
					break;
				}
				//промах
				case 2: {
					ctxAddShip.fillStyle = '#0626A7';
					ctxAddShip.strokeStyle = '#000000';
					ctxAddShip.fillRect(x, y, 23, 23);
					ctxAddShip.strokeRect(x, y, 23, 23);
					break;
				}
				//попадание
				case 3: {
					ctxAddShip.fillStyle = '#FF05F0';
					ctxAddShip.strokeStyle = '#000000';
					ctxAddShip.fillRect(x, y, 23, 23);
					ctxAddShip.strokeRect(x, y, 23, 23);
					break;
				}
				//УБИЙСТВО!!!!
				case 4: {
					ctxAddShip.fillStyle = '#F63C4D';
					ctxAddShip.strokeStyle = '#000000';
					ctxAddShip.fillRect(x, y, 23, 23);
					ctxAddShip.strokeRect(x, y, 23, 23);
					break;
				}
				default:{
					break;
				}
			}
			break;
		}
		case 1: {
			switch(typeEl){
				case 0: {
					ctxPlayerArea.fillStyle = '#72CCFD';
					ctxPlayerArea.strokeStyle = '#000000';
					ctxPlayerArea.fillRect(x, y, 23, 23);
					ctxPlayerArea.strokeRect(x, y, 23, 23);
					break;
				}
				case 1: {
					ctxPlayerArea.fillStyle = '#C1C9CD';
					ctxPlayerArea.strokeStyle = '#000000';
					ctxPlayerArea.fillRect(x, y, 23, 23);
					ctxPlayerArea.strokeRect(x, y, 23, 23);
					break;
				}
				case 2: {
					ctxPlayerArea.fillStyle = '#0626A7';
					ctxPlayerArea.strokeStyle = '#000000';
					ctxPlayerArea.fillRect(x, y, 23, 23);
					ctxPlayerArea.strokeRect(x, y, 23, 23);
					break;
				}
				case 3: {
					ctxPlayerArea.fillStyle = '#FF05F0';
					ctxPlayerArea.strokeStyle = '#000000';
					ctxPlayerArea.fillRect(x, y, 23, 23);
					ctxPlayerArea.strokeRect(x, y, 23, 23);
					break;
				}
				case 4: {
					ctxPlayerArea.fillStyle = '#F63C4D';
					ctxPlayerArea.strokeStyle = '#000000';
					ctxPlayerArea.fillRect(x, y, 23, 23);
					ctxPlayerArea.strokeRect(x, y, 23, 23);
					break;
				}
				default:{
					break;
				}
			}
			break;
		}
		case 2: {
			switch(typeEl){
				case 0: {
					ctxAnotherPlayerArea.linewidth = 2;
					ctxAnotherPlayerArea.fillStyle = '#72CCFD';
					ctxAnotherPlayerArea.strokeStyle = '#000000';
					ctxAnotherPlayerArea.fillRect(x, y, 23, 23);
					ctxAnotherPlayerArea.strokeRect(x, y, 23, 23);
					break;
				}
				case 1: {
					ctxAnotherPlayerArea.linewidth = 2;
					ctxAnotherPlayerArea.fillStyle = '#C1C9CD';
					ctxAnotherPlayerArea.strokeStyle = '#000000';
					ctxAnotherPlayerArea.fillRect(x, y, 23, 23);
					ctxAnotherPlayerArea.strokeRect(x, y, 23, 23);
					break;
				}
				case 2: {
					ctxAnotherPlayerArea.linewidth = 2;
					ctxAnotherPlayerArea.fillStyle = '#0626A7';
					ctxAnotherPlayerArea.strokeStyle = '#000000';
					ctxAnotherPlayerArea.fillRect(x, y, 23, 23);
					ctxAnotherPlayerArea.strokeRect(x, y, 23, 23);
					break;
				}
				case 3: {
					ctxAnotherPlayerArea.linewidth = 2;
					ctxAnotherPlayerArea.fillStyle = '#FF05F0';
					ctxAnotherPlayerArea.strokeStyle = '#000000';
					ctxAnotherPlayerArea.fillRect(x, y, 23, 23);
					ctxAnotherPlayerArea.strokeRect(x, y, 23, 23);
					break;
				}
				case 4: {
					ctxAnotherPlayerArea.fillStyle = '#F63C4D';
					ctxAnotherPlayerArea.strokeStyle = '#000000';
					ctxAnotherPlayerArea.fillRect(x, y, 23, 23);
					ctxAnotherPlayerArea.strokeRect(x, y, 23, 23);
					break;
				}
				default:{
					break;
				}
			}
			break;
		}
	}
		
}

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

ElemInField.prototype = {
	draw(){
		drawELm(this.x, this.y, this.typeElem, this.numberCanvas);
	},
	drawSelection() {
		drawSelect(this.x, this.y);
	},
	select : function () {
		this.selected = !this.selected;
	}
};

var drawSelect = function(x, y) {
	ctxAnotherPlayerArea.strokeStyle = "#FD9826";
	ctxAnotherPlayerArea.lineWidth = 4;
	ctxAnotherPlayerArea.strokeRect(x, y, 23, 23);
	ctxAnotherPlayerArea.lineWidth = 2;
	
}

var mouse = {
	x : 0,
	y : 0,
	checked : false
};

var selected = false;



var windowAddShips = function () {
	
	var xCoord = 23;
	var yCoord = 23;
	for (var i = 0; i < 10; i++) {
		for( var j = 0; j < 10; j++) {
			allElems.push(new ElemInField(xCoord, yCoord, 0, 0));
			xCoord += 23;
		}
		xCoord = 23;
		yCoord += 23;
	}
	
	
	
}






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






setInterval(function(){
	if(game_start == false) {
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
	} else {
		
		for(j in playerAreaTable) {
			playerAreaTable[j].draw();
			anotherPlayerAreaTable[j].draw();
			if(anotherPlayerAreaTable[j].selected) {
				anotherPlayerAreaTable[j].drawSelection();
			}
		}
		
	}
}
, 20);

addShips.onmousemove = function (e) {
	
	if(!game_start) {
		mouse.x = e.offsetX;
		mouse.y = e.offsetY;
	}
}

anotherPlayerArea.onmousemove = function(e) {
	if(game_start) {
		mouse.x = e.offsetX;
		mouse.y = e.offsetY;
	}
}

var isCursorInCellAP = function (x, y, cell) {
	return (x > cell.x) && (x < cell.x + 23) && (y > cell.y) && (y < cell.y + 23)
};

anotherPlayerArea.onclick = function (e) {
	var i;
	var x = e.offsetX,
		y = e.offsetY;
	for(i in anotherPlayerAreaTable) {
		if(isCursorInCellAP(x, y, anotherPlayerAreaTable[i])) {
			if(anotherPlayerAreaTable[i].typeElem == 0) {
				for(j in anotherPlayerAreaTable) {
					if(anotherPlayerAreaTable[j].selected) {
						anotherPlayerAreaTable[j].selected = false;
					}
				}
				anotherPlayerAreaTable[i].select();
				numberCellShot = i;
			}
		}
	}
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
		if((selected.x >= 23) && (selected.y >= 23) && (selected.y + selected.h <= 253) && (selected.x + selected.w <= 253)) {
			if(opportToPutShip == true) {
				for(j in allElems) {
					if((allElems[j].x >= selected.x) &&(allElems[j].x < selected.x + selected.w) &&
						(allElems[j].y >= selected.y) && (allElems[j].y < selected.y + selected.h)) {
						allElems[j].typeElem = 1;
					}
				}
				mouse.checked = false;
				selected.selectOpportun = false;
				selected.shipIsSet = true;
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


windowAddShips();


}

function fastAddShipInArea()
{
	var fastArea = [1,1,1,1,0,0,1,1,1,0,
					0,0,0,0,0,0,0,0,0,0,
					0,0,0,0,0,0,0,1,1,1,
					0,0,1,0,0,1,0,0,0,0,
					0,0,1,0,0,0,0,0,0,0,
					0,0,0,0,1,0,0,0,0,0,
					0,0,0,0,1,0,0,1,1,0,
					0,0,0,0,0,0,0,0,0,0,
					1,0,0,0,0,0,0,0,0,0,
					0,0,1,0,0,0,1,0,0,0]
	for(var i in allElems) {
		allElems[i].typeElem = fastArea[i];
	}
	for(var j in arrayShips) {
		arrayShips[j].shipIsSet = true;
	}
	arrayShips[0].x = 23;
	arrayShips[0].y = 23;
}

var startGame = function () {
	var xCoord = 0;
	var yCoord = 0;
	var k = 0;
	for (var i = 0; i < 10; i++) {
		for( var j = 0; j < 10; j++) {
			playerAreaTable.push(new ElemInField(xCoord, yCoord, playerShipArray[k], 1));
			anotherPlayerAreaTable.push(new ElemInField(xCoord, yCoord, 0, 2));
			xCoord += 23;
			k++;
		}
		xCoord = 0;
		yCoord += 23;
	}



	anotherPlayerAreaTable[40].typeElem = 1;
	anotherPlayerAreaTable[42].typeElem = 2;
	anotherPlayerAreaTable[44].typeElem = 3;
	anotherPlayerAreaTable[46].typeElem = 4;
	
	
}


function ShipsAdded() 
{
	$('#shipsAdded').hide();
	game_start = true;
	for(k in arrayShips) {
		if(!arrayShips[k].shipIsSet) {
			game_start = false;
		}
	}
	if(game_start == true) {
		
		for(j in allElems) {
			playerShipArray.push(allElems[j].typeElem);
		}
		
		var numbersPlayerShipArray = [];
		var coordVertHoriz = 0;
		for(kInShips in arrayShips) {
			for(kInElem in allElems) {
				if(arrayShips[kInShips].x == allElems[kInElem].x && arrayShips[kInShips].y == allElems[kInElem].y) {
					if(arrayShips[kInShips].position == "horiz") {
						coordVertHoriz = parseInt(kInElem, 10);
						for(j = 0; j < arrayShips[kInShips].palubs; j++) {
							numbersPlayerShipArray.push(coordVertHoriz);
							coordVertHoriz++;
						}
					} else {
						coordVertHoriz = parseInt(kInElem, 10);
						for(j = 0; j < arrayShips[kInShips].palubs; j++) {
							numbersPlayerShipArray.push(coordVertHoriz);
							coordVertHoriz = coordVertHoriz + 10;
						}
					}
					break;
				}
			}
		}
		
		
		
		playerShipArrayJson = JSON.stringify(numbersPlayerShipArray);
		$.ajax({
			url: 'addShips', // адрес обработчика
			data: { mas : playerShipArrayJson} , // отправляемые данные
			success: function(msg) { // получен ответ сервера
				console.log("Otvetka: " + msg);
			}
		});
		startGame();
	}
}

function connect() {
	var socket = new SockJS('/chat-messaging');
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {
		console.log("connected: " + frame);
		stompClient.subscribe('/chat/messages', function(response) {
			var data = JSON.parse(response.body);
			draw("left", data.message);
		});
	});
}

function draw(side, text) {
	console.log("drawing...");
    var $message;
    $message = $($('.message_template').clone().html());
    $message.addClass(side).find('.text').html(text);
    $('.messages').append($message);
    return setTimeout(function () {
        return $message.addClass('appeared');
    }, 0);

}
function disconnect(){
	stompClient.disconnect();
}
function sendMessage(){
	stompClient.send("/app/message", {}, JSON.stringify({'message': $("#message_input_value").val()}));
}

function shoot() 
{
	var positionShoot = "";
	for(k in anotherPlayerAreaTable) {
		if(anotherPlayerAreaTable[k].selected == true) {
			positionShoot = JSON.stringify(k);
		}
	}
	console.log(positionShoot);
}




