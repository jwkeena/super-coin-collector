let targetCoins = 0;
let currentCoins = 0;
let hiddenCoins = [];
let wins = 0;
let losses = 0;
let isPlaying = false;

//all sound files
const startGameSound = new Audio("https://themushroomkingdom.net/sounds/wav/sm64/sm64_enter_course.wav");
const coinSound1 = new Audio("https://themushroomkingdom.net/sounds/wav/smb/smb_coin.wav"); //why can't local files be found?
const coinSound2 = new Audio("https://themushroomkingdom.net/sounds/wav/smw/smw_coin.wav");
const coinSound3 = new Audio("https://themushroomkingdom.net/sounds/wav/sm64/sm64_coin.wav");
const coinSound4 = new Audio("https://themushroomkingdom.net/sounds/wav/nsmb_coin.wav");
const winSound = new Audio("http://soundfxcenter.com/video-games/super-mario-bros/8d82b5_Super_Mario_Bros_Stage_Clear_Sound_Effect.mp3")
const loseSound = new Audio("https://themushroomkingdom.net/sounds/wav/smb/smb_mariodie.wav");

//toggles logo style
let switchLogo = true;
$("#logo").on("click", function () {
    if (switchLogo) {
        $('#logo').attr("src", "assets/images/logo-smm.png");
        $('#logo').css("height", "60px");
        $('#logo').css("width", "700px");
        $('#logo').css("margin", "3% 0px");
        switchLogo = !switchLogo;
    } else {
        $('#logo').attr("src", "assets/images/logo.png");
        $('#logo').css("height", "250px");
        $('#logo').css("width", "400px");
        $('#logo').css("margin", "10px");
        switchLogo = !switchLogo;
    }
})

//toggles instructions -- https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_slide_toggle -- also possible: slide effect https://api.jqueryui.com/slide-effect/
$("#sign").click(function() {
    $( "#instructions-panel" ).slideToggle( "slow" ); 
  });

//individual block event listeners (works, but not DRY)
//should rewrite the entire code block as a function with arguments in gameFunctions
$("#block1").click(function() {
    if (isPlaying === false) {
        gameFunctions.newGame();
        startGameSound.play();
    } else {
        $("#block1").effect( "bounce", {times: 1}, "fast");
        coinSound1.pause();
        coinSound1.currentTime = 0;
        coinSound1.play();  //note the jQuery method: $(coinSound1).trigger("play");
        currentCoins = currentCoins + hiddenCoins[0];
        $("#current-coins").text(currentCoins);
        gameFunctions.checkWinOrLose();
    }
  });

$("#block2").click(function() {
    if (isPlaying === false) {
        gameFunctions.newGame();
    } else {
        $("#block2").effect( "bounce", {times: 1}, "fast");
        coinSound2.pause();
        coinSound2.currentTime = 0;
        coinSound2.play();
        currentCoins = currentCoins + hiddenCoins[1];
        $("#current-coins").text(currentCoins);
        gameFunctions.checkWinOrLose();
        }    
    });

$("#block3").click(function() {
    if (isPlaying === false) {
        gameFunctions.newGame();
    } else {
    $("#block3").effect( "bounce", {times: 1}, "fast");
        coinSound3.pause();
        coinSound3.currentTime = 0;
        coinSound3.play();
        currentCoins = currentCoins + hiddenCoins[2];
        $("#current-coins").text(currentCoins);
        gameFunctions.checkWinOrLose();
        }
    });

$("#block4").click(function() {
    if (isPlaying === false) {
        gameFunctions.newGame();
    } else {
    $("#block4").effect( "bounce", {times: 1}, "fast");
        coinSound4.pause();
        coinSound4.currentTime = 0;
        coinSound4.play();
        currentCoins = currentCoins + hiddenCoins[3];
        $("#current-coins").text(currentCoins);
        gameFunctions.checkWinOrLose();
    }
    });

// collects all functions that manage the game in one object
const gameFunctions = {
    newGame: function () {
        isPlaying = true;
        this.resetVariables();
        this.newTargetNumber();
        this.newHiddenCoinValues();
    },
    resetVariables: function() {
        targetCoins = 0;
        currentCoins = 0;
        hiddenCoins = [];
        $("#coin-target").text(0);
        $("#current-coins").text(0);
    },
    newTargetNumber: function () {
        let newTarget = Math.floor(Math.random()*121 + 19);
        targetCoins = newTarget;
        $("#coin-target").text(newTarget);
        //print to html
    },
    newHiddenCoinValues: function () {
        for (i = 1; i < 5; i++) {
            newCoinNumber = Math.floor(Math.random()*13 + 1);
            hiddenCoins.push(newCoinNumber);
        }
    },
    checkWinOrLose() {
        if (currentCoins === targetCoins) {
            gameFunctions.win();
        } else if (currentCoins > targetCoins) {
            gameFunctions.lose();
        } else {
            return;
        }
    },
    win: function() {
        winSound.play();
        wins++;
        $("#wins").text(wins);
        alert("You win! You collected exactly " + targetCoins + " coins!"); //replace later with the custom gif
        this.newGame();
    },
    lose: function() {
        loseSound.play();
        losses++;
        $("#losses").text(losses);
        alert("You lose! You collected " + currentCoins + " but only needed " + targetCoins + ".");
        this.newGame();
    }
}


// failed DRY block bounce event listener solutions

// trying to add event listeners to multiple elements via a loop (doesn't work)
// for (i = 1; i < 5; i ++) {
//     let newId = "#button" + i;
//     console.log(newId);
//     $(newId).click(function () {
//         console.log("works");
//         $(newId).effect("bounce", "slow")
//     })
// }

// Block class event listeners (works, but only for the whole div)
// $(".block").on("click", function () {
//     console.log("works");
// })


// trying to dynamically select which button is picked so that it bounces (doesn't work)
// $(".block").on("click", function() {
//     var buttonPicked = $(".block").attr("id");
//     console.log(buttonPicked);
//    $(buttonPicked).effect("bounce", "slow")
// })