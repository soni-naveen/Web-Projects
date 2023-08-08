var randomNumber1 = Math.floor(Math.random() * 6 + 1);
var randomDiceNumber1 = "./images/dice" + randomNumber1 + ".png";
var player1 = document.getElementsByClassName("img1")[0].setAttribute("src", randomDiceNumber1);

var randomNumber2 = Math.floor(Math.random() * 6 + 1);
var randomDiceNumber2 = "./images/dice" + randomNumber2 + ".png";
var player2 = document.getElementsByClassName("img2")[0].setAttribute("src", randomDiceNumber2);

if(randomDiceNumber1 > randomDiceNumber2){
    document.getElementsByTagName("h1")[0].innerHTML = "🚩 Player1 Wins!";
}
else if(randomDiceNumber1 < randomDiceNumber2){
    document.getElementsByTagName("h1")[0].innerHTML = "Player2 Wins! 🚩";
}
else{
    document.getElementsByTagName("h1")[0].innerHTML = "Draw!";
}