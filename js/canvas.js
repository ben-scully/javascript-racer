var ready = false;

(function(){

	var canvas = document.getElementById("canvas");   // the canvas where game will be drawn
	var context = canvas.getContext("2d");            // canvas context
	var levelCols = 16;							// level width, in tiles
	var levelRows = 16;							// level height, in tiles
	var tileSize = 32;							// tile size, in pixels
	var tilePlayer = tileSize - 4;

	var player1Col = 1;           // player1 starting column
	var player1Row = 3;           // player1 starting row

	var player2Col = 5;           // player2 starting column
	var player2Row = 4;           // player2 starting row

	var leftPressed1 = false;     // are we pressing LEFT arrow key?
	var rightPressed1 = false;    // are we pressing RIGHT arrow key?
	var upPressed1 = false;       // are we pressing UP arrow key?
	var downPressed1 = false;     // are we pressing DOWN arrow key?

	var leftPressed2 = false;     // are we pressing LEFT arrow key?
	var rightPressed2 = false;    // are we pressing RIGHT arrow key?
	var upPressed2 = false;       // are we pressing UP arrow key?
	var downPressed2 = false;     // are we pressing DOWN arrow key?

	var baseSpeed = 3

	var movementSpeed1 = Number(players[0].suits) + baseSpeed;   // the speed we are going to move, in pixels per frame
	var player1XSpeed = 0;                               				 // player horizontal speed, in pixels per frame
	var player1YSpeed = 0;                               				 // player vertical speed, in pixels per frame

	var movementSpeed2 = Number(players[1].suits) + baseSpeed;  // the speed we are going to move, in pixels per frame
	var player2XSpeed = 0;                               				// player horizontal speed, in pixels per frame
	var player2YSpeed = 0;  																		// player vertical speed, in pixels per frame

	var level = [        						// the 11x9 level - 1=wall, 0=empty space
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	];

	var player1YPos = player1Row * tileSize;			// converting Y player1 position from tiles to pixels
	var player1XPos = player1Col * tileSize;      // converting X player1 position from tiles to pixels

	var player2YPos = player2Row * tileSize;			// converting Y player2 position from tiles to pixels
	var player2XPos = player2Col * tileSize;      // converting X player2 position from tiles to pixels

	canvas.width = tileSize * levelCols;                   // canvas width. Won't work without it even if you style it from CSS
	canvas.height = tileSize * levelRows;                   // canvas height. Same as before

	// simple WASD listeners
	document.addEventListener("keydown", function(e){
		switch(e.keyCode){
			// Player 1
			case 65:
				leftPressed1 = true;
				break;
			case 87:
				upPressed1 = true;
				break;
			case 68:
				rightPressed1 = true;
				break;
			case 83:
				downPressed1 = true;
				break;
			// Player 2
			case 74:
				leftPressed2 = true;
				break;
			case 73:
				upPressed2 = true;
				break;
			case 76:
				rightPressed2 = true;
				break;
			case 75:
				downPressed2 = true;
				break;
		}
	}, false);

	document.addEventListener("keyup", function(e){
		switch(e.keyCode){
			// Player 1
			case 65:
				leftPressed1=false;
				break;
			case 87:
				upPressed1=false;
				break;
			case 68:
				rightPressed1=false;
				break;
			case 83:
				downPressed1=false;
				break;
			// Player 2
			case 74:
				leftPressed2 = false;
				break;
			case 73:
				upPressed2 = false;
				break;
			case 76:
				rightPressed2 = false;
				break;
			case 75:
				downPressed2 = false;
				break;
		}
	}, false);

	// function to display the level

	function renderLevel(){
		// clear the canvas
		context.clearRect(0, 0, canvas.width, canvas.height);
		// walls = red boxes
		for(i=0;i<levelRows;i++){
			for(j=0;j<levelCols;j++){
				// if(level[i][j] == 1){
				// 	context.fillStyle = "#ff0000";
				// 	context.fillRect(j*tileSize,i*tileSize,tileSize,tileSize);
				// }
				// if(level[i][j] == 2){
				// 	context.fillStyle = "#343434";
				// 	context.fillRect(j*tileSize,i*tileSize,tileSize,tileSize);
				// }
				if(level[i][j] == 3){
					var belt = document.getElementById("belt");
					context.drawImage(belt, j * tileSize, i * tileSize, tileSize, tileSize);
				}
				if(level[i][j] == 4){
					var suit = document.getElementById("suit");
					context.drawImage(suit, j * tileSize, i * tileSize, tileSize, tileSize);
				}
			}
		}

		if (ready) {
			// Player 1 render image
			var fighter = players[0].selection.split(" ")[0].toLowerCase();
			var img = document.getElementById(fighter);
			context.drawImage(img, player1XPos, player1YPos, tileSize, tileSize);

			// Player 2 render image
			var fighter = players[1].selection.split(" ")[0].toLowerCase();
			var img = document.getElementById(fighter);
			context.drawImage(img, player2XPos, player2YPos, tileSize, tileSize);
		}
	}

	// this function will do its best to make stuff work at 60FPS - please notice I said "will do its best"

	window.requestAnimFrame = (function(callback) {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000/60);
		};
	})();

	// function to handle the game itself

	function updateGame() {
		// no friction or inertia at the moment, so at every frame initial speed is set to zero
		// Player 1
		movementSpeed1 = Number(players[0].suits) + baseSpeed;
		// Player 2
		movementSpeed2 = Number(players[0].suits) + baseSpeed;

		// Player 1
		player1XSpeed = 0;
		player1YSpeed = 0;
		// Player 2
		player2XSpeed = 0;
		player2YSpeed = 0;

		// updating speed according to key pressed
		// Player 1
		if(rightPressed1){
			player1XSpeed = movementSpeed1;
		}
		else{
			if(leftPressed1){
				player1XSpeed =- movementSpeed1;
			}
			else{
				if(upPressed1){
					player1YSpeed =- movementSpeed1;
				}
				else{
					if(downPressed1){
						player1YSpeed = movementSpeed1;
					}
				}
			}
		}
		// Player 2
		if(rightPressed2){
			player2XSpeed = movementSpeed2;
		}
		else{
			if(leftPressed2){
				player2XSpeed =- movementSpeed2;
			}
			else{
				if(upPressed2){
					player2YSpeed =- movementSpeed2;
				}
				else{
					if(downPressed2){
						player2YSpeed = movementSpeed2;
					}
				}
			}
		}

		// updating player position
		// Player 1
		player1XPos += player1XSpeed;
		player1YPos += player1YSpeed;
		// Player 1
		player2XPos += player2XSpeed;
		player2YPos += player2YSpeed;


		// check for horizontal collisions
		// Player 1
		var baseCol = Math.floor(player1XPos / tileSize);
		var baseRow = Math.floor(player1YPos / tileSize);
		var colOverlap = player1XPos % tileSize;
		var rowOverlap = player1YPos % tileSize;

		// Moving right
		if (player1XSpeed > 0) {

			if (level[baseRow][baseCol+1] != 0) {
				if (level[baseRow][baseCol+1] <= 2) {
					player1XPos = baseCol * tileSize;
				}
				else if (level[baseRow][baseCol+1] == 3) {
					level[baseRow][baseCol+1] = 0;
					players[0].belts++;
				}
				else if (level[baseRow][baseCol+1] == 4) {
					level[baseRow][baseCol+1] = 0;
					players[0].suits++;
				}
			}

			if (level[baseRow+1][baseCol+1] != 0 && rowOverlap) {
				if (level[baseRow+1][baseCol+1] <= 2 && rowOverlap) {
					player1XPos = baseCol * tileSize;
				}
				else if (level[baseRow+1][baseCol+1] == 3 && rowOverlap) {
					level[baseRow+1][baseCol+1] = 0;
					players[0].belts++;
				}
				else if (level[baseRow+1][baseCol+1] == 4 && rowOverlap) {
					level[baseRow+1][baseCol+1] = 0;
					players[0].suits++;
				}
			}
		}

		if (player1XSpeed < 0){
			// Moving left
			if (level[baseRow][baseCol] != 0) {
				if (level[baseRow][baseCol] <= 2) {
					player1XPos = (baseCol+1) * tileSize;
				}
				else if (level[baseRow][baseCol] == 3) {
					level[baseRow][baseCol] = 0;
					players[0].belts++;
				}
				else if (level[baseRow][baseCol] == 4) {
					level[baseRow][baseCol] = 0;
					players[0].suits++;
				}
			}

			if (level[baseRow+1][baseCol] != 0 && rowOverlap) {
				if (level[baseRow+1][baseCol] <= 2) {
					player1XPos = (baseCol+1) * tileSize;
				}
				else if (level[baseRow+1][baseCol] == 3) {
					level[baseRow+1][baseCol] = 0;
					players[0].belts++;
				}
				else if (level[baseRow+1][baseCol] == 4) {
					level[baseRow+1][baseCol] = 0;
					players[0].suits++;
				}
			}
		}

		// check for vertical collisions
		// Player 1
		baseCol = Math.floor(player1XPos / tileSize);
		baseRow = Math.floor(player1YPos / tileSize);
		colOverlap = player1XPos % tileSize;
		rowOverlap = player1YPos % tileSize;

		// Moving down
		if (player1YSpeed > 0){
			if (level[baseRow+1][baseCol] != 0) {
				if (level[baseRow+1][baseCol] <= 2) {
					player1YPos = baseRow * tileSize;
				}
				else if (level[baseRow+1][baseCol] == 3) {
					level[baseRow+1][baseCol] = 0;
					players[0].belts++;
				}
				else if (level[baseRow+1][baseCol] == 4) {
					level[baseRow+1][baseCol] = 0;
					players[0].suits++;
				}
			}

			if (level[baseRow+1][baseCol+1] != 0 && colOverlap) {
				if (level[baseRow+1][baseCol+1] <= 2) {
					player1YPos = baseRow * tileSize;
				}
				else if (level[baseRow+1][baseCol+1] == 3) {
					level[baseRow+1][baseCol+1] = 0;
					players[0].belts++;
				}
				else if (level[baseRow+1][baseCol+1] == 4) {
					level[baseRow+1][baseCol+1] = 0;
					players[0].suits++;
				}
			}
		}

		// Moving up
		if (player1YSpeed < 0){
			if (level[baseRow][baseCol] != 0) {
				if (level[baseRow][baseCol] <= 2) {
					player1YPos = (baseRow+1) * tileSize;
				}
				else if (level[baseRow][baseCol] == 3) {
					level[baseRow][baseCol] = 0;
					players[0].belts++;
				}
				else if (level[baseRow][baseCol] == 4) {
					level[baseRow][baseCol] = 0;
					players[0].suits++;
				}
			}

			if (level[baseRow][baseCol+1] != 0 && colOverlap) {
				if (level[baseRow][baseCol+1] <= 2) {
					player1YPos = (baseRow+1) * tileSize;
				}
				else if (level[baseRow][baseCol+1] == 3) {
					level[baseRow][baseCol+1] = 0;
					players[0].belts++;
				}
				else if (level[baseRow][baseCol+1] == 4) {
					level[baseRow][baseCol+1] = 0;
					players[0].suits++;
				}
			}
		}

		// check for horizontal collisions
		// Player 1
		var baseCol = Math.floor(player2XPos / tileSize);
		var baseRow = Math.floor(player2YPos / tileSize);
		var colOverlap = player2XPos % tileSize;
		var rowOverlap = player2YPos % tileSize;

		// Moving right
		if (player2XSpeed > 0) {

		  if (level[baseRow][baseCol+1] != 0) {
		    if (level[baseRow][baseCol+1] <= 2) {
		      player2XPos = baseCol * tileSize;
		    }
		    else if (level[baseRow][baseCol+1] == 3) {
		      level[baseRow][baseCol+1] = 0;
		      players[0].belts++;
		    }
		    else if (level[baseRow][baseCol+1] == 4) {
		      level[baseRow][baseCol+1] = 0;
		      players[0].suits++;
		    }
		  }

		  if (level[baseRow+1][baseCol+1] != 0 && rowOverlap) {
		    if (level[baseRow+1][baseCol+1] <= 2 && rowOverlap) {
		      player2XPos = baseCol * tileSize;
		    }
		    else if (level[baseRow+1][baseCol+1] == 3 && rowOverlap) {
		      level[baseRow+1][baseCol+1] = 0;
		      players[0].belts++;
		    }
		    else if (level[baseRow+1][baseCol+1] == 4 && rowOverlap) {
		      level[baseRow+1][baseCol+1] = 0;
		      players[0].suits++;
		    }
		  }
		}

		if (player2XSpeed < 0){
		  // Moving left
		  if (level[baseRow][baseCol] != 0) {
		    if (level[baseRow][baseCol] <= 2) {
		      player2XPos = (baseCol+1) * tileSize;
		    }
		    else if (level[baseRow][baseCol] == 3) {
		      level[baseRow][baseCol] = 0;
		      players[0].belts++;
		    }
		    else if (level[baseRow][baseCol] == 4) {
		      level[baseRow][baseCol] = 0;
		      players[0].suits++;
		    }
		  }

		  if (level[baseRow+1][baseCol] != 0 && rowOverlap) {
		    if (level[baseRow+1][baseCol] <= 2) {
		      player2XPos = (baseCol+1) * tileSize;
		    }
		    else if (level[baseRow+1][baseCol] == 3) {
		      level[baseRow+1][baseCol] = 0;
		      players[0].belts++;
		    }
		    else if (level[baseRow+1][baseCol] == 4) {
		      level[baseRow+1][baseCol] = 0;
		      players[0].suits++;
		    }
		  }
		}

		// check for vertical collisions
		// Player 2
		baseCol = Math.floor(player2XPos / tileSize);
		baseRow = Math.floor(player2YPos / tileSize);
		colOverlap = player2XPos % tileSize;
		rowOverlap = player2YPos % tileSize;

		// Moving down
		if (player2YSpeed > 0){
		  if (level[baseRow+1][baseCol] != 0) {
		    if (level[baseRow+1][baseCol] <= 2) {
		      player2YPos = baseRow * tileSize;
		    }
		    else if (level[baseRow+1][baseCol] == 3) {
		      level[baseRow+1][baseCol] = 0;
		      players[1].belts++;
		    }
		    else if (level[baseRow+1][baseCol] == 4) {
		      level[baseRow+1][baseCol] = 0;
		      players[1].suits++;
		    }
		  }

		  if (level[baseRow+1][baseCol+1] != 0 && colOverlap) {
		    if (level[baseRow+1][baseCol+1] <= 2) {
		      player2YPos = baseRow * tileSize;
		    }
		    else if (level[baseRow+1][baseCol+1] == 3) {
		      level[baseRow+1][baseCol+1] = 0;
		      players[1].belts++;
		    }
		    else if (level[baseRow+1][baseCol+1] == 4) {
		      level[baseRow+1][baseCol+1] = 0;
		      players[1].suits++;
		    }
		  }
		}

		// Moving up
		if (player2YSpeed < 0){
		  if (level[baseRow][baseCol] != 0) {
		    if (level[baseRow][baseCol] <= 2) {
		      player2YPos = (baseRow+1) * tileSize;
		    }
		    else if (level[baseRow][baseCol] == 3) {
		      level[baseRow][baseCol] = 0;
		      players[1].belts++;
		    }
		    else if (level[baseRow][baseCol] == 4) {
		      level[baseRow][baseCol] = 0;
		      players[1].suits++;
		    }
		  }

		  if (level[baseRow][baseCol+1] != 0 && colOverlap) {
		    if (level[baseRow][baseCol+1] <= 2) {
		      player2YPos = (baseRow+1) * tileSize;
		    }
		    else if (level[baseRow][baseCol+1] == 3) {
		      level[baseRow][baseCol+1] = 0;
		      players[1].belts++;
		    }
		    else if (level[baseRow][baseCol+1] == 4) {
		      level[baseRow][baseCol+1] = 0;
		      players[1].suits++;
		    }
		  }
		}

		// rendering level
		renderLevel();

		// update the game in about 1/60 seconds
		requestAnimFrame(function() {
			updateGame();
		});
	}

	updateGame();
})();
