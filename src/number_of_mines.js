
var counterVal = 40;
var buttons = document.querySelectorAll(".fied__button");

function incrementClick() {
    updateDisplay(--counterVal);

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].oncontextmenu = function() {
            buttons.innerHTML = '<img src="img/flag.png">';
        }; 
        return;
    } 
}

function updateDisplay(val) {
    document.getElementById("counter__label").innerHTML = val; 
}

