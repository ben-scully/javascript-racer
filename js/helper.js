var players = [{
  "code" : "P1",
  "name" : "Player 1",
  "controls" : "<p>a/w/s/d & 'r'<p>",
  "selection" : "asdf",
  "belts" : "1",
  "suits" : "2"
},{
  "code" : "P2",
  "name" : "Player 2",
  "controls" : "<p>left/right/up/down & 'Enter'<p>",
  "selection" : "qwer",
  "belts" : "4",
  "suits" : "3"
}]

var fighters = [{
  "code" : "cm",
  "name" : "Conor McGregor",
  "image" : "images/ufc_conor_mcgregor.png"
},{
  "code" : "ja",
  "name" : "Jose Aldo",
  "image" : "images/ufc_jose_aldo.png"
},{
  "code" : "rda",
  "name" : "Rafael dos Anjos",
  "image" : "images/ufc_rda.png"
},{
  "code" : "nd",
  "name" : "Nate Diaz",
  "image" : "images/ufc_nate_diaz.png"
}]

var HTMLchooseTitle = "<h4>%data% choose your Fighter...</h4>";
var HTMLcontrolsTitle = "<h4>%data% Controls</h4>";
var HTMLcontrolsText = "<p>%data%<p>";
var HTMLhowToPlayTitle = "<h4>How To Play</h4>";
var HTMLhowToPlayText = "<p>Run around collecting 'Belts' & 'Suits' to improve 'Strength' & 'Speed' and then fight in the Octagon. 'Belts' = increases Strength. 'Suits' = increases Speed.<p>";
var HTMLbelt = "images/belt.png";
var HTMLsuit = "images/suit.png";

document.getElementById("startFight").addEventListener('click', function() {
  startFight();
});

// Choosing a fighter & starting a fight
function setupStartFight() {
  // re display start fight incase it has been made display:none from a previous game
  // display : none;

  for (p in players) {

    // Choose your fighter...
    var title = HTMLchooseTitle.replace('%data%', players[p].name);
    var selector = "fighterSelect" + players[p].code;
    document.getElementById(selector).innerHTML = title;

    // Dropdown of fighters to choose from
    var list = fighters.map(function(val){
      return val.name;
    });

    var selector = "fighterDropdown" + players[p].code;
    var dropdown = document.getElementById(selector);

    for (item in list) {
      var option = document.createElement("option");
      option.text = list[item];
      dropdown.add(option);
    }

    // Controls for each respective player
    var title = HTMLcontrolsTitle.replace('%data%', players[p].name);
    var text = HTMLcontrolsText.replace('%data%', players[p].controls);
    var selector = "fighterControls" + players[p].code;
    document.getElementById(selector).innerHTML = title + text;
  }

  // How to play
  document.getElementById("howToPlay").innerHTML = HTMLhowToPlayTitle + HTMLhowToPlayText;
}

setupStartFight();


// start fight
/**
*   take dropdown fighter and assign to each players
*         ** add name to each player banner
*         ** add pic to each player banner
*
*   start timer
*   put fighters in to the stadium
*   remove (display:none) the choose fighters panel from the screen
**/

function startFight() {
  // update players fighter based on their selection
  for (p in players) {
    var selector = "fighterDropdown" + players[p].code;
    var dropdown = document.getElementById(selector);
    var selection = dropdown.options[dropdown.selectedIndex].text;
    players[p].selection = selection;
  }

  // make the start fight display disappear

  // call methods to get the actual game going
  initPlayers();
}


function initPlayers() {
  for (p in players) {
    var content = players[p].name + ": " + players[p].selection;
    var selector = "player" + players[p].code;
    document.getElementById(selector).innerHTML = content;
  }
}

function updateItems(index) {
  var belts = "Belts: ";
  for (i = 0; i < players[index].belts; i++) {
    belts += HTMLbelt + " - ";
  }

  var selector = "belts" + players[index].code;
  document.getElementById(selector).innerHTML = belts;

  var suits = "Suits: ";
  for (i = 0; i < players[index].suits; i++) {
    suits += HTMLsuit + " - ";
  }

  var selector = "suits" + players[index].code;
  document.getElementById(selector).innerHTML = suits;
}


updateItems(0);
updateItems(1);
