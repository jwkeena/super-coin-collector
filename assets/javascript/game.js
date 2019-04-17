//all global variables
let targetCoins = 0;
let currentCoins = 0;
let hiddenCoins = [];
let wins = 0;
let losses = 0;
let isPlaying = false;

//all sound files
const startGameSound = new Audio("https://themushroomkingdom.net/sounds/wav/sm64/sm64_mario_lets_go.wav");
const coinSound1 = new Audio("https://themushroomkingdom.net/sounds/wav/smb/smb_coin.wav"); //why can't local files be found?
const coinSound2 = new Audio("https://themushroomkingdom.net/sounds/wav/smw/smw_coin.wav");
const coinSound3 = new Audio("https://themushroomkingdom.net/sounds/wav/sm64/sm64_coin.wav");
const coinSound4 = new Audio("https://themushroomkingdom.net/sounds/wav/nsmb_coin.wav");
const jumpSound = new Audio("https://themushroomkingdom.net/sounds/wav/smb/smb_jump-small.wav")
const winSound = new Audio("http://soundfxcenter.com/video-games/super-mario-bros/8d82b5_Super_Mario_Bros_Stage_Clear_Sound_Effect.mp3")
const loseSound = new Audio("https://themushroomkingdom.net/sounds/wav/smb/smb_mariodie.wav");
const invincibility = new Audio("http://vgmpf.com/Wiki/images/e/e1/04_-_Super_Mario_Bros._-_NES_-_Invincible_BGM.ogg")

//toggles logo style
let switchLogo = true;
$("#logo").on("dblclick", function () {
    if (switchLogo) {
        $('#logo').attr("src", "assets/images/logo-smm.png");
        $('#logo').css("height", "15vh");
        $('#logo').css("width", "170vh");
        $('#logo').css("margin", "3% 0vh");
        switchLogo = !switchLogo;
    } else {
        $('#logo').attr("src", "assets/images/logo.png");
        $('#logo').css("height", "25vh");
        $('#logo').css("width", "40vh");
        $('#logo').css("margin", "0px 0px 10px 0px");
        switchLogo = !switchLogo;
    }
})

//toggles instructions -- https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_slide_toggle -- also possible: slide effect https://api.jqueryui.com/slide-effect/
$("#sign").click(function() {
    $( "#instructions-panel" ).slideToggle("slow"); 
  });

//mario controls
//x-axis motion
$(document).mousemove(function(e){ //modified from http://jsfiddle.net/BfLAh/1/
    $("#mario").css({left:e.pageX});
});
//starts game, and jumping
$(document).on("click", function () {
    if (isPlaying === false) {
        gameFunctions.newGame();
        startGameSound.play();
    } else {
        $("#mario").effect("bounce", {times: 1, distance: 285}, "fast");
        isJumping = true;
        jumpSound.pause();
        jumpSound.currentTime = 0;
        jumpSound.play();
        changeSprite();
    }
    setTimeout(jumpIsOver, 200);
})

//grabs mouse direction whenever mouse is moved, to determine which direction it's going
//and change sprite accordingly -- https://stackoverflow.com/questions/24294452/detect-mouse-direction-javascript
var mouseDirection = "",
    oldx = 0,
    mousemovemethod = function (e) {
        if (e.pageX < oldx) {
            mouseDirection = "left";
        } else if (e.pageX > oldx) {
            mouseDirection = "right";
        }
        changeSprite();
        oldx = e.pageX;
}
document.addEventListener('mousemove', mousemovemethod);

//controls which of the 4 sprites is being used
let isJumping = false;
function jumpIsOver() {
    isJumping = false;
    changeSprite();
}
function changeSprite() {
    if (isJumping === false && mouseDirection === "left"){
        $("#mario").attr("src", "assets/images/mario-left.png");
    } else if (isJumping === false && mouseDirection === "right"){
        $("#mario").attr("src", "assets/images/mario-right.png");
    } else if (isJumping === true && mouseDirection === "left"){
        $("#mario").attr("src", "assets/images/mario-jumping-left.png");
    } else if (isJumping === true && mouseDirection === "right") {
        $("#mario").attr("src", "assets/images/mario-jumping-right.png");
    }
}

//collision detection
//only checks for collision once per click, after the aprrox time it takes for mario to jump
$(document).on("click", function(){ //modified from http://jsfiddle.net/BfLAh/1/
    setTimeout(collisionCheck, 100);
});

//this code can certainly be refactored into smaller functions!
function collisionCheck() {
    var mario = document.getElementById("mario");
    var block1 = document.getElementById("block1");
    var block2 = document.getElementById("block2");
    var block3= document.getElementById("block3");
    var block4 = document.getElementById("block4");
    var marioBoundingBox = mario.getBoundingClientRect();
    var block1BoundingBox = block1.getBoundingClientRect();
    var block2BoundingBox = block2.getBoundingClientRect();
    var block3BoundingBox = block3.getBoundingClientRect();
    var block4BoundingBox = block4.getBoundingClientRect();
    if (marioBoundingBox.top < block1BoundingBox.bottom 
        && marioBoundingBox.left < block1BoundingBox.right
        && marioBoundingBox.right > block1BoundingBox.left) {
            $("#block1").effect("bounce", {times: 1}, "fast");
            $("#hidden-number1").text(hiddenCoins[0]);
            //clones and replaces the number span so that the animation can restart
            //trick from https://css-tricks.com/restart-css-animation/
                var element = document.getElementById("hidden-number1");
                var newElement = element.cloneNode(true);
                element.parentNode.replaceChild(newElement, element);
            coinSound1.pause();
            coinSound1.currentTime = 0;
            coinSound1.play();  //note the jQuery method: $(coinSound1).trigger("play");
            currentCoins = currentCoins + hiddenCoins[0];
            $("#current-coins").text(currentCoins);
            gameFunctions.checkWinOrLose();
    } else if (marioBoundingBox.top < block2BoundingBox.bottom 
        && marioBoundingBox.left < block2BoundingBox.right
        && marioBoundingBox.right > block2BoundingBox.left) {
            $("#block2").effect("bounce", {times: 1}, "fast");
            $("#hidden-number2").text(hiddenCoins[1]);
            //clones and replaces the number span so that the animation can restart
                var element = document.getElementById("hidden-number2");
                var newElement = element.cloneNode(true);
                element.parentNode.replaceChild(newElement, element);    
            coinSound2.pause();
            coinSound2.currentTime = 0;
            coinSound2.play();
            currentCoins = currentCoins + hiddenCoins[1];
            $("#current-coins").text(currentCoins);
            gameFunctions.checkWinOrLose();
    } else if (marioBoundingBox.top < block3BoundingBox.bottom 
        && marioBoundingBox.left < block3BoundingBox.right
        && marioBoundingBox.right > block3BoundingBox.left) {
            $("#block3").effect("bounce", {times: 1}, "fast");
            $("#hidden-number3").text(hiddenCoins[2]);
        //clones and replaces the number span so that the animation can restart
                var element = document.getElementById("hidden-number3");
                var newElement = element.cloneNode(true);
                element.parentNode.replaceChild(newElement, element);  
            coinSound3.pause();
            coinSound3.currentTime = 0;
            coinSound3.play();
            currentCoins = currentCoins + hiddenCoins[2];
            $("#current-coins").text(currentCoins);
            gameFunctions.checkWinOrLose();
    } else if (marioBoundingBox.top < block4BoundingBox.bottom 
        && marioBoundingBox.left < block4BoundingBox.right
        && marioBoundingBox.right > block4BoundingBox.left) {
            $("#block4").effect("bounce", {times: 1}, "fast");
            $("#hidden-number4").text(hiddenCoins[3]);
        //clones and replaces the number span so that the animation can restart
                var element = document.getElementById("hidden-number4");
                var newElement = element.cloneNode(true);
                element.parentNode.replaceChild(newElement, element);  
            coinSound4.pause();
            coinSound4.currentTime = 0;
            coinSound4.play();
            currentCoins = currentCoins + hiddenCoins[3];
        $("#current-coins").text(currentCoins);
        gameFunctions.checkWinOrLose();
    } else {
        console.log("no collision");
    }
}

// collects all functions that manage the game's logic in one object
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
        this.easterEgg();
        this.newGame();
    },
    lose: function() {
        loseSound.play();
        losses++;
        $("#losses").text(losses);
        alert("You lose! You collected " + currentCoins + " but only needed " + targetCoins + ".");
        this.newGame();
    },
    easterEgg: function() {
        if (wins > 4) {
            $(".star").attr("id", "easterEgg");
        }
    }
}

$(".star").on("click", function () {
    $(".star").css("display", "none");
    $("#mario").addClass("holographic");
    invincibility.play();
})

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