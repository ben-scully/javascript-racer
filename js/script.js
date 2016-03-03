// Run these functions when page first loads
setupStartFight();
setupBanner();

document.getElementById("startFight").addEventListener('click', function() {
  startFight();
});


// Choosing a fighter & starting a fight
function setupStartFight() {
  document.getElementById('startFightBox').style.display= "inline-block";
  ready = false;

  for (p in players) {
    // Build list of different Fighters names
    var list = fighters.map(function(val) {
      return val.name;
    });

    // Put all the different Fighters in to the Dropdown lists
    var selector = "fighters" + players[p].code;
    var dropdown = document.getElementById(selector);
    for (item in list) {
      var option = document.createElement("option");
      option.text = list[item];
      dropdown.add(option);
    }

    // Insert list of Controls for each Player
    var title = HTMLcontrolsTitle.replace('%data%', players[p].name);

    var content = "";
    for (c in players[p].controls) {
      var dir = players[p].controls[c][0];
      var char = players[p].controls[c][1];
      content += "Press: " + char + " to " + dir + "<br>";
    }

    var text = HTMLcontrolsText.replace('%data%', content);
    var selector = "controls" + players[p].code;
    document.getElementById(selector).innerHTML = title + text;
  }

  // Insert 'How to Play' information
  document.getElementById("howToPlay").innerHTML = HTMLhowToPlayTitle + HTMLhowToPlayText;
}




function setupBanner() {
  updatePlayerNames();
  updateAllItems();
}

function updatePlayerNames() {
  for (p in players) {
    var content = "<span>" + players[p].name + ": " + players[p].selection + "</span>";
    var selector = "player" + players[p].code;
    document.getElementById(selector).innerHTML = content;
  }
}

function updateAllItems() {
  updateItems(0);
  updateItems(1);
}

function updateItems(index) {
  var belts = "<span>Belts:</span>";
  for (i = 0; i < players[index].belts; i++) {
    belts += HTMLbelt;
  }

  var selector = "belts" + players[index].code;
  document.getElementById(selector).innerHTML = belts;

  var suits = "<span>Suits:</span>";
  for (i = 0; i < players[index].suits; i++) {
    suits += HTMLsuit;
  }

  var selector = "suits" + players[index].code;
  document.getElementById(selector).innerHTML = suits;
}


/*  Set each Player with their choosen Fighter
*   Start the gametimer
*   Put the Fighters on the canvas
*   Allow Players to start moving their Fighters
*/
function startFight() {
  // make the start fight display disappear
  document.getElementById('startFightBox').style.display='none';

  // update players fighter based on their selection
  for (p in players) {
    var selector = "fighters" + players[p].code;
    var dropdown = document.getElementById(selector);
    var selection = dropdown.options[dropdown.selectedIndex].text;
    players[p].selection = selection;
  }

  // Update top banner with Fighter name, Belts, Suits
  setupBanner();
  ready = true;
}
