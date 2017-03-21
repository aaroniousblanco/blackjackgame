//Object definitions and methods start here ++++++++++++++++++++++++++++++++

function Card(point, suit) {
  this.point = point;
  this.suit = suit;
}

Card.prototype.getImageUrl = function () {
  if (this.point > 10) {
    if (this.point === 11) {
      name = "jack";
    } else {
      name = this.point === 12 ? "queen" : "king";
    }
  } else {
    name = this.point === 1 ? "ace" : this.point;
  }
  suit = this.suit;
  return "images/" + name + "_of_" + this.suit + ".png";
};

function Hand() { //hand constructor
  this.cards = [];
}

Hand.prototype.addCard = function (card) { //addCard method for Hand objects
  this.cards.push(card);
};

Hand.prototype.getPoints = function () { //getPoints method for Hand objects
  this.cards.sort(function(a,b) {
    return b.point - a.point;
  });
  var points = this.cards.reduce(function(a,b) {
    if (b.point >= 10) {
      return a + 10;
    } else if (b.point === 1) {
      return a + 11 > 21 ? a + 1 : a + 11;
    } else {
      return a + b.point;
    }
  },0);
  return points;
};

function Deck() { //constructs a new deck object
  var arr = [];
  var suits = ['spades','hearts','clubs','diamonds'];
  for (var d = 0; d < 1; d++) {
    for (var i = 1; i < 14; i++) {
      for (var j = 0; j < suits.length; j++) {
        arr.push(new Card(i, suits[j]));
      }
    }
  }
  this.allCards = arr;
}

Deck.prototype.draw = function () { //draws a card from the Deck object
  newCard = this.allCards.shift();
  return newCard;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

Deck.prototype.shuffle = function () { //shuffles an instance of a Deck object
  for (var i = 0; i < 1000; i++) {
    var randomIdx1 = getRandomInt(0, this.allCards.length - 1);
    var randomIdx2 = getRandomInt(0, this.allCards.length - 1);
    var card1 = this.allCards[randomIdx1];
    var card2 = this.allCards[randomIdx2];
    this.allCards[randomIdx1] = card2;
    this.allCards[randomIdx2] = card1;
  }
  return this.allCards;
};

Deck.prototype.numCardsLeft = function () { // returns the number of cards left
  return this.allCards.length;
};
//Object definitions and methods end here

// global variables start here
var currentDeck = new Deck();
currentDeck.shuffle();
var players = [];
players[0] = {
  "name": "player",
  "hand": new Hand() //added Hand method here
};
players[1] = {
  "name": "dealer",
  "hand": new Hand() //added Hand method here
};
var busted = false;
var stand = false;

function reset() {
  $(".hand").empty();
  $("#messages").text("");
  busted = false;
  stand = false;
  for (var i = 0; i < players.length; i++) {
    players[i].hand = new Hand(); //added Hand method here
  }
}

function initialDeal() {
  reset();
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < players.length; j++) {
      deal(players[j]);
    }
  }
}

function deal(toPlayer) {
  if (currentDeck.allCards.length === 0) {
    currentDeck = new Deck(); //added Deck() method here
  }
  var nextCard = currentDeck.draw();
  console.log(nextCard);
  toPlayer.hand.addCard(nextCard);
  console.log(nextCard);
  $("#" + toPlayer.name + "-hand").append("<img src='" + nextCard.getImageUrl() + "'>");
  toPlayer.points = toPlayer.hand.getPoints();
  $("#" + toPlayer.name + "-points").text(toPlayer.points);
  bust(toPlayer);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function dealerLogic() {
  setTimeout(function() {
    if (players[1].points < 17) {
      deal(players[1]);
      dealerLogic();
    } else {
      if (players[1].points <= 21) {
        var difference = players[1].points - players[0].points;
        if (difference === 0) {
          $("#messages").text("It's a push. Click DEAL to play again.");
        } else if (difference < 0) {
          $("#messages").text("You win! Click DEAL to play again.");
        } else {
          $("#messages").text("You lose! Click DEAL to play again.");
        }
      } else {
        bust(players[1]);
      }
    }
  },500);
}

function bust(toPlayer) {
  if (toPlayer.points > 21) {
    busted = true;
    if (toPlayer.name === "player") {
      $("#messages").text("You busted! Dealer wins. Click DEAL to play again.");
    } else {
      $("#messages").text("Dealer busted. You win! Click DEAL to play again.");
    }
  }
}

//jQuery below!!!!+++++++++++++++++++++++++++++++++
$(document).ready(function() {

$("#deal-button").click(function() {
  initialDeal();
}); //deal function

$("#hit-button").click(function() {
  if (!busted && !stand) {
    deal(players[0]);
  }
});

$("#stand-button").click(function() {
  stand = true;
  dealerLogic();
});


$("input").click(function() {
  num_decks = $(this).val();
});

}); // end of ready
