var UserName;

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
	var imgWater = new Image();
	var imgSpace = new Image();
	var imgShip = new Image();
	var imgSpaceShot = new Image();
	var imgShipShot = new Image();
	
	var canvasAddShip = document.getElementById("addShips");
	var ctxAddShip = canvasAddShip.getContext("2d");
	
	imgWater.onload = function(){
		var xCoordWater = 23, yCoordWater = 23;
		for (var i = 0; i < 10; ++i) {
			for (var j = 0; j < 10; ++j) {
				switch(playerTable[i][j]){
					case 0: {
						ctxAddShip.drawImage(imgWater, xCoordWater, yCoordWater);
						break;
					}
					case 1: {
						ctxAddShip.drawImage(imgShip, xCoordWater, yCoordWater);
						break;
					}
					case 2: {
						ctxAddShip.drawImage(imgSpaceShot, xCoordWater, yCoordWater);
						break;
					}
					case 3: {
						ctxAddShip.drawImage(imgShipShot, xCoordWater, yCoordWater);
						break;
					}
					default:{
						break;
					}
				}
				xCoordWater += 23;
			}
			yCoordWater += 23;
			xCoordWater = 23;
		}
	}
	

	ctxAddShip.fillText("Hello HTML5!", 220, 220);
	imgSpace.onload = function() {
		for(var i = 0; i < 253; i += 23) {
			ctxAddShip.drawImage(imgSpace, i, 0);
			
			ctxAddShip.drawImage(imgSpace, 0, i);
		}
	}
	ctxAddShip.font = "10px Verdana";
	imgWater.src = "../images/water.png";
	imgSpace.src = "../images/space.png";
	imgShip.src = "../images/ship.png";
	imgSpaceShot.src = "../images/spaceShot.png";
	imgShipShot.src = "../images/shipShot.png";
	addEventListener ("mousemove", function (event) {
                    var x = event.clientX;
                    var y = event.clientY;

                    context.fillStyle = "rgb(255, 0, 0)";  
                    context.fillRect (x - xy[0], y - xy[1], 5, 5);
                });
}


//txAddShip.drawImage(imgWater, 10, 10);



