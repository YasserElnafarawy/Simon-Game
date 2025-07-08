var colors = ["green", "red", "yellow", "blue"];
var randomSequence = [];
var clickedSequence = [];

var playerLevel = 0;
var started = false;
$(document).keydown(function(){
    if (!started) {
        getStart();
        started = true
    } else if (jQuery.inArray(this.value, passwordArray) != -1) {
        alert("THIS IS WORKING");
    }

})


$(".btn").click(function (){
    var clickedColor = $(this).attr("id");
    clickedSequence.push(clickedColor);
    addAudio(clickedColor);
    addAnimation(clickedColor);

    var currentColor = clickedSequence.length - 1;
    check(currentColor);
})

function getStart() {
    playerLevel++;
    $("h1").text("Level " + playerLevel);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = colors[randomNumber];
    randomSequence.push(randomColor);

    $("#" + randomColor).fadeOut(40).fadeIn(40);
    addAudio(randomColor);
}

function check (currentColor) {
    if (randomSequence[currentColor] !== clickedSequence[currentColor]) {
        restart();
    }
    else if (randomSequence.length === clickedSequence.length) {
        if (randomSequence.toString() === clickedSequence.toString()) {
            setTimeout(() => {
                getStart();
            }, 700);
            clickedSequence = [];            
        } else {
            restart();
        }
    }
}

function addAudio (color) {
    var audio = new Audio("sounds/"+ color +".mp3");
    audio.play();
}
function addAnimation(color) {
 $("#" + color).addClass("pressed");
 setTimeout(function() {
    $("#" + color).removeClass("pressed");
 }, 50);   
}
function redBackground() {
    $("body").addClass("game-over")
    setTimeout(() => {
        $("body").removeClass("game-over")
    }, 200); 
}
function restart() {
    $("h1").text("Game Over, Press Any Key to Restart");
    redBackground();
    var wrong = new Audio("sounds/wrong.mp3")
    wrong.play();
    clickedSequence = [];
    randomSequence = [];
    playerLevel = 0;
    started = false;
}

function footerAnimation () {
    $("footer").slideUp(2000).slideDown(2000, footerAnimation);
}
footerAnimation();