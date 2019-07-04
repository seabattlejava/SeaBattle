var UserName;

var game_start = false;
var you_are_guest = false;
var playerShipArrayJson = "";
var anotherPlayerShipArrat = [];
var numberCellShot = 0;
var num = 0;
var timerShoot;
var timerShow = 60;
var water = new Image();
var ship = new Image();
var miss = new Image();
var hit = new Image();
var kill = new Image();

water.src = "/img/0.png";
ship.src = "/img/1.png";
miss.src = "/img/2.png";
hit.src = "/img/3.png";
kill.src = "/img/4.png";

function View()
{
	$('#adding_ship_area').hide();
	$('#game-content').hide();
	$('#main_game').hide();
	$('#guest_area').hide();
	$('#message_template').hide();
	$("#shoot").attr("disabled", true);
	$.ajax({
		url: 'viewer', // адрес обработчика
		success: function(msg) { // получен ответ сервера
			console.log("Log: " + msg);
			if (msg == "no") {
				$('#main-content').hide();
				$('#guest_area').show();
				$('#message_template').show();
				you_are_guest = true;
				createGuestArrays();
				connect();
				ViewerShow();
				GetNamePlayer();
			}
		}
	});
}

function GetNamePlayer()
{
    $.ajax({
    		url: 'playername', // адрес обработчика
    		success: function(msg) { // получен ответ сервера
    			console.log("Name: " + msg);
                var player = JSON.parse(msg);
                $('#player_one_name').html(player[0]);
                $('#player_two_name').html(player[1]);
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
					//$('#game-content').show();
					$('#main_game').hide();
					$('#main-content').hide();
					add_UserName($('#name').val());
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
	$(window).on('load', function(){$('#before-load').find('i').fadeOut().end().delay(400).fadeOut('slow');});
	$( "#send" ).click(function() { Send(); });
	$( "#shipsAdded" ).click(function() {ShipsAdded();});
	$( "#fastAddShips" ).click(function() {fastAddShipInArea();});
	$( "#shoot" ).click(function() {shoot();});
	$( "#shot_win" ).click(function() {$(location).attr('href', 'index');});
	$( "#shot_lose" ).click(function() {$(location).attr('href', 'index');});
	$(document).ready( function() { View() });
});


var allElems = [];
var arrayShips = [];

var playerAreaTable = [];
var anotherPlayerAreaTable = [];

var playerOneGuest = [];
var playerTwoGuest = [];

var ElemInField = function(x, y, typeElem, nameCtx)
{
	this.x = x;
	this.y = y;
	this.h = 23;
	this.w = 23;
	this.typeElem = typeElem;
	this.xCoordTrueSpace = 0;
	this.yCoordTrueSpace = 0;
	this.hCoordTrueSpace = 0;
	this.wCoordTrueSpace = 0;
	this.nameCtx = nameCtx;
	this.selected = false;
	
};


var Ship = function(x, y, palubs, position)
{
	this.x = x;
	this.y = y;
	this.palubs = palubs;
	this.position = position;
	this.h = 23;
	this.w = 23;
	this.selectOpportun = true;
	this.shipIsSet = false;

};

	//canvas и контекст
	var canvasAddShip;
	var ctxAddShip;
	var canvasPlayerArea;
	var ctxPlayerArea;
	var canvasAnotherPlayerArea;
	var ctxAnotherPlayerArea;
	var canvasGuestPlayerOne;
	var ctxGuestPlayerOne;
	var canvasGuestPlayerTwo;
	var ctxGuestPlayerTwo;

window.onload = function ()
{
	canvasAddShip = document.getElementById("addShips");
	ctxAddShip = canvasAddShip.getContext("2d");
	
	canvasPlayerArea = document.getElementById("playerArea");
	ctxPlayerArea = canvasPlayerArea.getContext("2d");
	canvasAnotherPlayerArea = document.getElementById("anotherPlayerArea");
	ctxAnotherPlayerArea = canvasAnotherPlayerArea.getContext("2d");
	
	canvasGuestPlayerOne = document.getElementById("canvasPlayerOne");
	ctxGuestPlayerOne = canvasGuestPlayerOne.getContext("2d");
	canvasGuestPlayerTwo = document.getElementById("canvasPlayerTwo");
	ctxGuestPlayerTwo = canvasGuestPlayerTwo.getContext("2d");
	
	ctxAddShip.linewidth = 2;
	
	ctxPlayerArea.linewidth = 2;
	ctxAnotherPlayerArea.linewidth = 2;
	
	ctxGuestPlayerOne.linewidth = 2;
	ctxGuestPlayerTwo.linewidth = 2;

var drawShip = function(x, y, palubs, position)
{
	for(var countPalubs = 0; countPalubs < palubs; countPalubs++) {
		if (position == "vert") {
		    ctxAddShip.drawImage(ship, x, y);
			ctxAddShip.strokeStyle = '#000000';
			ctxAddShip.strokeRect(x, y, 23, 23);
			y += 23
		}
		if (position == "horiz") {
		    ctxAddShip.drawImage(ship, x, y);
			ctxAddShip.strokeStyle = '#000000';
			ctxAddShip.strokeRect(x, y, 23, 23);
			x += 23
		}
	}
}

var drawELm = function(x, y, typeEl, nameCtx)
{
	switch(typeEl){
	//вода
		case 0: {
        	nameCtx.drawImage(water, x, y);
			nameCtx.strokeStyle = '#000000';
			nameCtx.strokeRect(x, y, 23, 23);
			break;
		}
	//корабль
		case 1: {
		    nameCtx.drawImage(ship, x, y);
			nameCtx.strokeStyle = '#000000';
			nameCtx.strokeRect(x, y, 23, 23);
			break;
		}
	//промах
		case 2: {
		    nameCtx.drawImage(miss, x, y);
			nameCtx.strokeStyle = '#000000';
			nameCtx.strokeRect(x, y, 23, 23);
			break;
		}
	//попадание
		case 3: {
		    nameCtx.drawImage(hit, x, y);
			nameCtx.strokeStyle = '#000000';
			nameCtx.strokeRect(x, y, 23, 23);
			break;
		}
	//УБИЙСТВО!!!!
		case 4: {
		    nameCtx.drawImage(kill, x, y);
			nameCtx.strokeStyle = '#000000';
			nameCtx.strokeRect(x, y, 23, 23);
			break;
		}
		default:{
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
		drawELm(this.x, this.y, this.typeElem, this.nameCtx);
	},
	drawSelection() {
		drawSelect(this.x, this.y);
	},
	select : function () {
		this.selected = !this.selected;
	}
};

var drawSelect = function(x, y)
{
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



var windowAddShips = function ()
{
	var xCoord = 23;
	var yCoord = 23;
	for (var i = 0; i < 10; i++) {
		for( var j = 0; j < 10; j++) {
			allElems.push(new ElemInField(xCoord, yCoord, 0, ctxAddShip));
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

var isCursorInShip = function (ship)
{
	return (mouse.x > ship.x) && (mouse.x < ship.x + ship.w) &&
		   (mouse.y > ship.y) && (mouse.y < ship.y + ship.h);
};

var isCursorInCell = function (element)
{
	return (mouse.x > element.x) && (mouse.x < element.x + 23) &&
		   (mouse.y > element.y) && (mouse.y < element.y + 23);
};

setInterval(function(){
	if (you_are_guest == true) {
		for (j in playerOneGuest) {
			playerOneGuest[j].draw();
			playerTwoGuest[j].draw();
		}
	} else {
		if (game_start == false) {
			ctxAddShip.clearRect(0, 0 , 736, 276);
			for (i in allElems) {
				allElems[i].draw();
			}
			for (j in arrayShips) {
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
			for (j in playerAreaTable) {
				playerAreaTable[j].draw();
				anotherPlayerAreaTable[j].draw();
				if (anotherPlayerAreaTable[j].selected) {
					anotherPlayerAreaTable[j].drawSelection();
				}
			}
			
		}
	}
}
, 20);

addShips.onmousemove = function (e)
{
	
	if(!game_start) {
		mouse.x = e.offsetX;
		mouse.y = e.offsetY;
	}
}

anotherPlayerArea.onmousemove = function(e)
{
	if(game_start) {
		mouse.x = e.offsetX;
		mouse.y = e.offsetY;
	}
}

var isCursorInCellAP = function (x, y, cell)
{
	return (x > cell.x) && (x < cell.x + 23) && (y > cell.y) && (y < cell.y + 23)
};

anotherPlayerArea.onclick = function (e)
{
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

addShips.onclick = function(e) 
{
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
	//4
	arrayShips[0].x = 23;
	arrayShips[0].y = 23;
	//3
	arrayShips[1].x = 161;
	arrayShips[1].y = 23;
	
	arrayShips[2].x = 184;
	arrayShips[2].y = 69;
	//2
	arrayShips[3].x = 69;
	arrayShips[3].y = 92;
	arrayShips[3].position = "vert";
	
	arrayShips[4].x = 115;
	arrayShips[4].y = 138;
	arrayShips[4].position = "vert";
	
	arrayShips[5].x = 184;
	arrayShips[5].y = 161;
	//1
	arrayShips[6].x = 138;
	arrayShips[6].y = 92;
	
	arrayShips[7].x = 23;
	arrayShips[7].y = 207;
	
	arrayShips[8].x = 69;
	arrayShips[8].y = 230;
	
	arrayShips[9].x = 161;
	arrayShips[9].y = 230;
}

var startGame = function ()
{
	var xCoord = 0;
	var yCoord = 0;
	var k = 0;
	for (var i = 0; i < 10; i++) {
		for( var j = 0; j < 10; j++) {
			playerAreaTable.push(new ElemInField(xCoord, yCoord, parseInt(allElems[k].typeElem, 10), ctxPlayerArea));
			anotherPlayerAreaTable.push(new ElemInField(xCoord, yCoord, 0, ctxAnotherPlayerArea));
			xCoord += 23;
			k++;
		}
		xCoord = 0;
		yCoord += 23;
	}
	$('#adding_ship_area').hide();
	$('#main_game').show();
	
}

function ShipsAdded() 
{
	game_start = true;
	for(k in arrayShips) {
		if(!arrayShips[k].shipIsSet) {
			game_start = false;
		}
	}
	if(game_start == true) {
		$('#shipsAdded').hide();
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
		
		$.ajax({
			url: 'giveNumber', // адрес обработчика
			success: function(msg) { // получен ответ сервера
				num = msg;
			}
		});
		
		
		
		playerShipArrayJson = JSON.stringify(numbersPlayerShipArray);
		$.ajax({
			url: 'addShips', // адрес обработчика
			data: { mas : playerShipArrayJson} , // отправляемые данные
			success: function(msg) { // получен ответ сервера
				console.log("Otvetka korbl: " + msg);
			}
		});
		startGame();
		TimerStartGame();
	}
}

//Чат
var Side = "left";
function connect()
{
	var socket = new SockJS('/chat-messaging');
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {
		console.log("connected: " + frame);
		stompClient.subscribe('/chat/messages', function(response) {
			var data = JSON.parse(response.body);
			draw(Side, data.message);
		});
	});
}

function draw(side, text)
{
	console.log("drawing...");
	var $message;
	$message = $($('.message_template').clone().html());
	$message.addClass(side).find('.text').html(text);
	$('.messages').append($message);
	Side = "left";
	return setTimeout(function () {
		return $message.addClass('appeared');
	}, 0);
}

function sendMessage()
{
	stompClient.send("/app/message", {}, JSON.stringify({'message': $("#message_input_value").val()}));
	Side = "right";
}

///////////////////////////////////////////
//Функиця таймре 
function Timer()
{
	var tt = 0;
	var flagShoot = 0;
	var timerId = setInterval(function() {
		tt++;
		if (tt == 60) {
			$(location).attr('href', 'win');
		}
		$.ajax({
			url: 'timer', // адрес обработчика7
			success: function(msg) { // получен ответ сервера
			    console.log("Teper I igray: " + msg);
				if (msg == "yes") {
					$.ajax({
						url: 'shootMe', // адрес обработчика7
						success: function(msg) { // получен ответ сервера
							var event = JSON.parse(msg);
							playerAreaTable[parseInt(event[0], 10)].typeElem = parseInt(event[1], 10);
						}
					});
					clearInterval(timerId);
					$("#shoot").attr("disabled", false);
					timerShoot = setInterval(TimerLose, 1000);
				} else if (msg == "end") {
					$(location).attr('href', 'lose');
				} else if (msg == "nope") {
					$.ajax({
						url: 'shootMe', // адрес обработчика7
						success: function(msg) { // получен ответ сервера
							var event = JSON.parse(msg);
							if (flagShoot != msg) {
								playerAreaTable[parseInt(event[0], 10)].typeElem = parseInt(event[1], 10);
								if (parseInt(event[1], 10) == 4) {
									checkDeathShip(playerAreaTable, parseInt(event[0], 10));
								}
								flagShoot = msg;
							}
							
						}
					});
					tt = 0;
				}
			}
		});
	}, 1000);
}

function TimerStartGame()
{
	var timerId = setInterval(function() {
		$.ajax({
			url: 'timerstartgame', // адрес обработчика
			success: function(msg) { // получен ответ сервера
				if (msg == "yes") {
				clearInterval(timerId);
				console.log("Gotov?: " + msg);
				Start();
				}
			}
		});
	}, 1000);
}

function TimerLose()
{
    timerShow--;
    $('#timer_show').html(timerShow);
    if (timerShow == 0) {
        $(location).attr('href', 'lose');
    }
}

function Start()
{
	
	$.ajax({
			url: 'playerNumber', // адрес обработчика
			data: { number : num} , // отправляемые данные
			success: function(msg) { // получен ответ сервера
				if (msg == "yes") {
					console.log("Perviy: " + msg);
					$("#shoot").attr("disabled", false);
					timerShoot = setInterval(TimerLose, 1000);
				} else {
					console.log("Vtoroi: " + msg);
					Timer();
				}
			}
		});
}

/////////////////////////////////////////
function shoot() 
{
	var selectedCell = false;
	for(k in anotherPlayerAreaTable) {
		if (anotherPlayerAreaTable[k].selected == true) {
			selectedCell = true;
		}
	}
	if(selectedCell) {
		var temp = "yes";
		var positionShoot = "";
		for(k in anotherPlayerAreaTable) {
			if(anotherPlayerAreaTable[k].selected == true) {
				positionShoot = JSON.stringify(k);
			}
		}
		console.log(positionShoot);
		$.ajax({
			url: 'shoot', // адрес обработчика
			data: { fire : positionShoot} , // отправляемые данные
			success: function(msg) { // получен ответ сервера
				console.log("otvetka: " + msg);
				if (msg == 5) {
					clearInterval(timerShoot);
					timerShow = 60;
					$(location).attr('href', 'win');
				}
				for(k in anotherPlayerAreaTable) {
					if(anotherPlayerAreaTable[k].selected == true) {
						anotherPlayerAreaTable[k].typeElem = parseInt(msg, 10);
						if (msg == 4) {
							clearInterval(timerShoot);
							timerShow = 60;
							timerShoot = setInterval(TimerLose, 1000);
							checkDeathShip(anotherPlayerAreaTable, k);
						}
						anotherPlayerAreaTable[k].selected = false;
					}
				}
				if (msg == 2) {
					clearInterval(timerShoot);
					timerShow = 60;
					$("#shoot").attr("disabled", true);
					Timer();
				}
				if (msg == 3) {
					clearInterval(timerShoot);
					timerShow = 60;
					timerShoot = setInterval(TimerLose, 1000);
				}
			}
		});
	}
}

function ViewerShow()
{
	var arrayViewer;
	var timerId = setInterval(function() {
		$.ajax({
			url: 'showViewer', // адрес обработчика
			success: function(msg) { // получен ответ сервера
				arrayViewer = JSON.parse(msg);
				for (i = 0; i < 100; i++) {
					playerOneGuest[i].typeElem = parseInt(arrayViewer[0][i], 10);
					playerTwoGuest[i].typeElem = parseInt(arrayViewer[1][i], 10);
				}
				if (arrayViewer[0][100] == 5) {
                   clearInterval(timerId);
                 	$(location).attr('href', 'index');
                } else if (arrayViewer[1][100] == 5) {
                    clearInterval(timerId);
                    $(location).attr('href', 'index');
                }
				for (k in playerOneGuest) {
					if (playerOneGuest[k].typeElem == 4) {
						checkDeathShip(playerOneGuest, k);
					}
					if (playerTwoGuest[k].typeElem == 4) {
						checkDeathShip(playerTwoGuest, k);
					}
				}
			}
		});
	}, 1000);
}

//Отрисовка смерти коробля и ячеек рядом с кораблем для горизонтальных кораблей
function checkDeathShipHorizontal(gameArea, i)
{
	var indexIterator = parseInt(i, 10);
	if((indexIterator - 1) >= 0) {
		while((gameArea[indexIterator - 1].typeElem == 3) && ((indexIterator - 1) >= 0)) {
			gameArea[indexIterator - 1].typeElem = 4;
			
			if (indexIterator - 1 - 10 >= 0) {
				gameArea[indexIterator - 1 - 10].typeElem = 2;
			}
			if (indexIterator - 1 + 10 < 100) {
				gameArea[indexIterator - 1 + 10].typeElem = 2;
			}
			
			if ((indexIterator - 1) > 0) {
				indexIterator--;
			}
			
		}
	}
	if((indexIterator - 1 > 0) && (div(indexIterator, 10) == div((indexIterator - 1), 10))) {
		if (indexIterator - 1 - 10 >= 0) {
				gameArea[indexIterator - 1 - 10].typeElem = 2;
			}
		if (indexIterator - 1 + 10 < 100) {
			gameArea[indexIterator - 1 + 10].typeElem = 2;
		}
		gameArea[indexIterator - 1].typeElem = 2;
	}
	
	indexIterator = parseInt(i, 10);
	
	if (indexIterator + 10 < 100) {
		gameArea[indexIterator + 10].typeElem = 2;
	}
	if (indexIterator - 10 >= 0) {
		gameArea[indexIterator - 10].typeElem = 2;
	}
	
	if(indexIterator + 1 < 100) {
		while((gameArea[indexIterator + 1].typeElem == 3) && ((indexIterator + 1) < 100)) {
			gameArea[indexIterator + 1].typeElem = 4;
			if (indexIterator + 1 + 10 < 100) {
				gameArea[indexIterator + 1 + 10].typeElem = 2;
			}
			if (indexIterator + 1 - 10 >= 0) {
				gameArea[indexIterator + 1 - 10].typeElem = 2;
			}
			if ((indexIterator + 1) < 99) {
				indexIterator++;
			}
		}
	}
	if((indexIterator + 1 < 99) && (div(indexIterator, 10) == div((indexIterator + 1), 10))) {
		if (indexIterator + 1 + 10 < 100) {
				gameArea[indexIterator + 1 + 10].typeElem = 2;
			}
		if (indexIterator + 1 - 10 >= 0) {
			gameArea[indexIterator + 1 - 10].typeElem = 2;
		}
		gameArea[indexIterator + 1].typeElem = 2;
	}
}
//Отрисовка смерти коробля и ячеек рядом с кораблем для вертикальных кораблей
function checkDeathShipVertical(gameArea, j)
{
	var indexIterator = parseInt(j, 10);
	if((indexIterator - 10) >= 0) {
		while((gameArea[indexIterator - 10].typeElem == 3) && ((indexIterator - 10) >= 0)) {
			gameArea[indexIterator - 10].typeElem = 4;
			if ((indexIterator - 10 - 1 >= 0) && (div(indexIterator - 10 - 1, 10) == div(indexIterator - 10, 10))) {
				gameArea[indexIterator - 10 - 1].typeElem = 2;
			}
			if ((indexIterator - 10 + 1 < 100) && (div(indexIterator - 10 + 1, 10) == div(indexIterator - 10, 10))) {
				gameArea[indexIterator - 10 + 1].typeElem = 2;
			}
			if ((indexIterator - 10) > 0) {
				indexIterator -= 10;
			}
			
		}
	}
	
	if((indexIterator - 10 > 0) && (indexIterator % 10 == (indexIterator - 10) % 10)) {
		if ((indexIterator - 10 - 1 >= 0) && (div(indexIterator - 10 - 1, 10) == div(indexIterator - 10, 10))) {
				gameArea[indexIterator - 10 - 1].typeElem = 2;
			}
		if ((indexIterator - 10 + 1 < 100) && (div(indexIterator - 10 + 1, 10) == div(indexIterator - 10, 10))) {
			gameArea[indexIterator - 10 + 1].typeElem = 2;
		}
		gameArea[indexIterator - 10].typeElem = 2;
	}
	
	indexIterator = parseInt(j, 10);
	
	if ((indexIterator + 1 < 100) && (div(indexIterator + 1, 10) == div(indexIterator, 10))) {
		gameArea[indexIterator + 1].typeElem = 2;
	}
	if ((indexIterator - 1 >= 0 ) && (div(indexIterator - 1, 10) == div(indexIterator, 10))) {
		gameArea[indexIterator - 1].typeElem = 2;
	}
	
	
	if(indexIterator + 10 < 100) {
		while((gameArea[indexIterator + 10].typeElem == 3) && ((indexIterator + 10) < 100)) {
			gameArea[indexIterator + 10].typeElem = 4;
			if ((indexIterator + 10 + 1 < 100) && (div(indexIterator + 10 + 1, 10) == div(indexIterator + 10, 10))) {
				gameArea[indexIterator + 10 + 1].typeElem = 2;
			}
			if ((indexIterator + 10 - 1 >= 0) && (div(indexIterator + 10 - 1, 10) == div(indexIterator + 10, 10))) {
				gameArea[indexIterator + 10 - 1].typeElem = 2;
			}
			if ((indexIterator + 10) < 99) {
				indexIterator += 10;
			}
		}
	}
	
	if((indexIterator + 10 < 99) && (indexIterator % 10 == (indexIterator - 10) % 10)) {
		if ((indexIterator + 10 + 1 < 100) && (div(indexIterator + 10 + 1, 10) == div(indexIterator + 10, 10))) {
				gameArea[indexIterator + 10 + 1].typeElem = 2;
			}
		if ((indexIterator + 10 - 1 >= 0) && (div(indexIterator + 10 - 1, 10) == div(indexIterator + 10, 10))) {
			gameArea[indexIterator + 10 - 1].typeElem = 2;
		}
		gameArea[indexIterator + 10].typeElem = 2;
	}
	
}

//Проверка расположения корабля и выбор нужной функции для отрисовки смерти корабля
function checkDeathShip (gameArea, indx)
{
	var index = parseInt(indx, 10);
	
	if (index - 1 >= 1) {
		if (gameArea[index - 1].typeElem == 4) {
			return;
		}
	}
	if (index - 10 >= 0) {
		if (gameArea[index - 10].typeElem == 4) {
			return;
		}
	}
	if (index + 1 < 100) {
		if (gameArea[index + 1].typeElem == 4) {
			return;
		}
	}
	if (index + 10 < 100) {
		if (gameArea[index + 10].typeElem == 4) {
			return;
		}
	}
	
	if (index - 1 >= 0) {
		if (gameArea[index - 1].typeElem == 3) {
			checkDeathShipHorizontal(gameArea, index);
			return;
		}
	}
	if (index + 1 < 100) {
		if (gameArea[index + 1].typeElem == 3) {
			checkDeathShipHorizontal(gameArea, index);
			return;
		}
	}
	if (index - 10 >= 0) {
		if (gameArea[index - 10].typeElem == 3) {
			checkDeathShipVertical(gameArea, index);
			return;
		}
	}
	if (index + 10 < 100) {
		if (gameArea[index + 10].typeElem == 3) {
			checkDeathShipVertical(gameArea, index);
			return;
		}
	}
	checkDeathShipHorizontal(gameArea, index);
}

//целое от деления
function div(val, by)
{
	return (val - val % by) / by;
}
// Заполнение полей для зрителя
function createGuestArrays () 
{
	var xCoord = 0;
	var yCoord = 0;
	var k = 0;
	for (var i = 0; i < 10; i++) {
		for( var j = 0; j < 10; j++) {
			playerOneGuest.push(new ElemInField(xCoord, yCoord, 0, ctxGuestPlayerOne));
			playerTwoGuest.push(new ElemInField(xCoord, yCoord, 0, ctxGuestPlayerTwo));
			xCoord += 23;
			k++;
		}
		xCoord = 0;
		yCoord += 23;
	}
}
