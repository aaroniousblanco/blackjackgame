var currentDeck = newDeck();
var players = [];
players[0] = {
  "name": "player",
  "hand": []
};
players[1] = {
  "name": "dealer",
  "hand": []
};


function getCardImageUrl(obj) {
  if (obj.point > 10) {
    if (obj.point === 11) {
      name = "jack";
    } else {
      name = obj.point === 12 ? "queen" : "king";
    }
  } else {
    name = obj.point === 1 ? "ace" : obj.point;
  }
  suit = obj.suit;
  return name + "_of_" + obj.suit + ".png";
}

function calculatePoints(cards) {
  cards.sort(function(a,b) {
    return b.point - a.point;
  });
  var points = cards.reduce(function(a,b) {
    if (b.point >= 10) {
      return a + 10;
    } else if (b.point === 1) {
      return a + 11 > 21 ? a + 1 : a + 11;
    } else {
      return a + b.point;
    }
  },0);
  return points;
}

function newDeck() {
  var arr = [];
  var suits = ['spades','hearts','clubs','diamonds'];
  for (var i = 1; i < 14; i++) {
    for (var j = 0; j < suits.length; j++) {
      arr.push({
        "point":i,
        "suit":suits[j]
      });
    }
  }
  return arr;
}

function reset() {
  $(".hand").empty();
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
  var nextCard = currentDeck.shift();
  toPlayer.hand.push(nextCard);
  $("#" + toPlayer.name + "-hand").append("<img src='" + getCardImageUrl(nextCard) + "'>");
  toPlayer.points = calculatePoints(toPlayer.hand);
  console.log(players);
  $("#" + toPlayer.name + "-points").text(toPlayer.points);
}



$(document).ready(function() {

$("#deal-button").click(function() {
  initialDeal();
}); //deal function

$("#hit-button").click(function() {
  deal(players[0]);
});

}); // end of ready
