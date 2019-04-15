let targetCoins = 0;

//Starts game and resets values
$("#start-button").on("click", function () {
    $(".instructions").css("display", "none");
    $(".game-start").css("display", "block");
})


//Block event listeners
$(".block").on("click", function () {
    console.log("works");
})

const gameFunctions = {
    newTargetNumber: function () {
        //pick random number
        //print to html
    },

    newHiddenCoinValues: function () {
        //pick 4 random numbers in for loop
        //store in coins array?
        //print each to the html element
    },
    checkWinOrLose() {
        //check if the user's current coin total is the same as or greater than the targetCoins
        //if else branch, win() or lose()
    },
    win: function() {


    },
    lose: function() {

    }
}

const blocks = {
    coins: [],


}

