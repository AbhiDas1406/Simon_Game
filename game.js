var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
 $(document).keypress(function()
{
    if(!started)
        {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
})

function playSound(name)
{
    var audio = new Audio("sounds/"+ name+ ".mp3");
    audio.play();
}

$(".btn").click( function()
{
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var num = Math.random();
    num *= 4;
    num = Math.floor(num);

    var randomChosenColour = buttonColours[num];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length){
                setTimeout(function(){
                nextSequence();
                }, 1000);
            }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver()
{
    level = 0;
    started = false;
    gamePattern = [];
    userClickedPattern =  [];
}



