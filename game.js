
const buttonColors = ["green", "red", "yellow", "blue"];

let gamePattern = [];
let userClickedPattern = [];

let startedGame = false;
let currentLevel = 0;

let playSound = (audioName) => {
    new Audio(`sounds/${audioName}.mp3`).play().then();
};

$(document).keypress(function() {
    if (!startedGame) {
        $("#level-title").text(`Level ${currentLevel}`);
        createNextSequence();
        startedGame = true;
    }
});

$(".btn").click(function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function createNextSequence() {
    userClickedPattern = [];
    currentLevel++;

    $("#level-title").text(`Level ${currentLevel}`);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = buttonColors[randomNumber];

    gamePattern.push(randomColor);

    $(`#${randomColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

function checkAnswer(level) {
    if (gamePattern[level] === userClickedPattern[level]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                createNextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        restartGame();
    }
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");

    setTimeout(() => {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

function restartGame() {
    startedGame = false;
    currentLevel = 0;
    gamePattern = [];
}


