var players = [{
	"code": "P1",
	"name": "Player 1",
	"controls": {
		"left": ["Left", "'a'", "65"],
		"right": ["Right", "'d'", "68"],
		"up": ["Up", "'w'", "87"],
		"down": ["Down", "'s'", "83"],
		"fight": ["Fight", "'r'", "82"]
	},
	"selection": "Conor McGregor",
	"belts": "1",
	"suits": "0"
}, {
	"code": "P2",
	"name": "Player 2",
	"controls": {
		"left": ["Left", "'j'", "74"],
		"right": ["Right", "'l'", "76"],
		"up": ["Up", "'i'", "73"],
		"down": ["Down", "'k'", "75"],
		"fight": ["Fight", "'p'", "80"]
	},
	"selection": "",
	"belts": "0",
	"suits": "1"
}]

var fighters = [{
  "name" : "Conor McGregor",
  "image" : "images/conor.png"
},{
  "name" : "Jose Aldo",
  "image" : "images/jose.png"
},{
  "name" : "Rafael dos Anjos",
  "image" : "images/rafael.png"
},{
  "name" : "Nate Diaz",
  "image" : "images/nate.png"
}]

var HTMLchooseTitle = "<h4>%data% choose your Fighter...</h4>";
var HTMLcontrolsTitle = "<h4>%data% Controls</h4>";
var HTMLcontrolsText = "<p>%data%<p>";
var HTMLhowToPlayTitle = "<h4>How To Play</h4>";
var HTMLhowToPlayText = "<p>Run around collecting 'Belts' & 'Suits'<br>to improve 'Strength' & 'Speed'<br>then fight in the Octagon.</p><p>'Belts' = increase Strength.<br>'Suits' = increase Speed.</p>";
var HTMLbelt = '<img src="images/belt.png" width="25" height="25" alt="Belt">';
var HTMLsuit = '<img src="images/suit.png" width="25" height="25" alt="Suit">';
