var numPlayers = 2;           // Number of players in the game
var keys = [81, 82, 85, 80];  // keys q,r,u,p
var raceLength = 8;

function newGame() {
  // Start listening for the players key to move
  addListeners();

  // Reset the table to empty
  document.querySelector(".racer_table").innerHTML = "";

  // Get number of players from dropdown
  numPlayers = document.querySelector("#numPlayers").value;

  // Create a row with a marker square for each player
  var table = document.querySelector(".racer_table");
  for (var i = numPlayers; i > 0; i--) {
    var row = table.insertRow(0);
    row.id = "player" + i + "_strip";
    var cell = row.insertCell(0);
    cell.className = "active";
  };
};

function checkForWinner() {
  for (var i = numPlayers; i > 0; i--) {
    var numCells = document.getElementById("player" + i + "_strip").cells.length;
    if (numCells > raceLength) {
      alert("Player" + i + " wins!!!!");
      removeListeners();
    }
  }
}

function addListeners() {
  document.addEventListener('keyup', addKeyListeners);
}

function removeListeners() {
  document.removeEventListener('keyup', addKeyListeners);
}

function addKeyListeners(e) {
  if ((e.keyCode || e.which) == keys[0]) {
      var row = document.getElementById("player1_strip");
      var x = row.insertCell(0);
      x.innerHTML="";
  }
  else if ((e.keyCode || e.which) == keys[1]) {
      var row = document.getElementById("player2_strip");
      var x = row.insertCell(0);
      x.innerHTML="";
  }
  else if ((e.keyCode || e.which) == keys[2] && numPlayers >= 3) {
      var row = document.getElementById("player3_strip");
      var x = row.insertCell(0);
      x.innerHTML="";
  }
  else if ((e.keyCode || e.which) == keys[3] && numPlayers == 4) {
      var row = document.getElementById("player4_strip");
      var x = row.insertCell(0);
      x.innerHTML="";
  }
  else {
    alert("Not a valid key. There is no player using that key in this game.");
  }

  checkForWinner();
}
