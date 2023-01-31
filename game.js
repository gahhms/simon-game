var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

function playSound(name) { //guess what?
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

function animatePress(currentColour) {  //animate button
    $("."+currentColour).addClass("pressed");
    
    setTimeout(function(){

        $("."+currentColour).removeClass("pressed");

    }, 100); 
}

function nextSequence() { //calls for next random colour after comparison to players input
    userClickedPattern = [];
    level++;
    $("h1").html("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    $("#"+randomChosenColour).fadeOut(100).fadeIn();
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);

}

function checkAnswer(level) { //checks if gamePattern and userClickedPattern are alike

    if (gamePattern[level] === userClickedPattern[level]) {
        $("body").addClass("next-level");
        setTimeout(function(){
    
            $("body").removeClass("next-level");
    
        }, 200); 

        setTimeout(function(){

            nextSequence();
    
        }, 1000); 
        
    } else {
        startOver();
        $("h1").html("YOU LOSE! Press ANY Key to Start");  
    }
  }

  function startOver() { //game-over funcion to reset the game
    $("body").addClass("game-over");
    setTimeout(function(){

        $("body").removeClass("game-over");

    }, 200); 
    playSound("wrong")
    userClickedPattern = [];
    gamePattern = [];
    start = false;
    level = 0;
  }

$(".btn").click(function (e) { //get play input and push to userCLickedPattern
     if (start === true) {   
        playSound($(this).attr("id"));
        animatePress($(this).attr("id"))
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        if (userClickedPattern.length === level) {
             checkAnswer(level-1);
        }   
    }   
    
});


$(document).keypress(function() { //game-start function, by pressing any key on keyboard
    if (!start) {
      $("#level-title").text("Level " + level);
      nextSequence();
      start = true;
    }
  });

  $("h1").click(function() { //game-start function, by pressing on h1
    if (!start) {
      $("#level-title").text("Level " + level);
      nextSequence();
      start = true;
    }
  });


   







