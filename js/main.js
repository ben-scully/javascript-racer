document.addEventListener('keyup', function(e) {

    if ((e.keyCode || e.which) == 65) {
        var row = document.getElementById("player1_strip");
        var x = row.insertCell(0);
        x.innerHTML="";
    }

    if ((e.keyCode || e.which) == 66) {
        var row = document.getElementById("player2_strip");
        var x = row.insertCell(0);
        x.innerHTML="";
    }

    if ((e.keyCode || e.which) == 67) {
        var row = document.getElementById("player3_strip");
        var x = row.insertCell(0);
        x.innerHTML="";
    }
}, true);
