var buttonColours =["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var highest_score = 0;

function nextSequnce(){
    level += 1;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColours = buttonColours[randomNumber];
    $("#"+randomChosenColours).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColours);
    playSound(randomChosenColours);
}


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    check_answer(userClickedPattern.length-1);
});

function check_answer(curlevel){

    if (userClickedPattern[curlevel] != gamePattern[curlevel]){
        highest_score = Math.max(highest_score,gamePattern.length - 1) ;
        start_over();
    }
    else{
        
        if (curlevel + 1 == gamePattern.length) {
            userClickedPattern = [];
            setTimeout(function(){
                nextSequnce();
            },1000);
           

        }
    }
}

function playSound(colours){
    var audio = new Audio("sounds/" + colours + ".mp3");
    audio.play();
}


$(document).keypress(function()
{
    //$("h1").html("Level " + level);
    if (started === false){
        $("#level-title").text("Level " + level);
        nextSequnce()
        started = true;
    }
});

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function start_over(){
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $("h1").html("Game Over, Highest Score is: " + highest_score + " Press Any Key to Restart");
    //$("h1").width("60%");
    playSound("wrong");
}