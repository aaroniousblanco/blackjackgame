describe('Card', function () {

  it('should instantiate a card with a point and a suit', function() {
    var card = new Card(5, 'diamonds');
    expect(card.point).toEqual(5);
    expect(card.suit).toEqual('diamonds');
  });

  it('image URL works for 2-10', function() {
    var card = new Card(2, 'diamonds');
    expect(card.getImageUrl()).toEqual('2_of_diamonds.png');
    card = new Card(3, 'diamonds');
    expect(card.getImageUrl()).toEqual('3_of_diamonds.png');
    card = new Card(4, 'diamonds');
    expect(card.getImageUrl()).toEqual('4_of_diamonds.png');
    card = new Card(5, 'diamonds');
    expect(card.getImageUrl()).toEqual('5_of_diamonds.png');
    card = new Card(6, 'diamonds');
    expect(card.getImageUrl()).toEqual('6_of_diamonds.png');
    card = new Card(7, 'diamonds');
    expect(card.getImageUrl()).toEqual('7_of_diamonds.png');
    card = new Card(8, 'diamonds');
    expect(card.getImageUrl()).toEqual('8_of_diamonds.png');
    card = new Card(9, 'diamonds');
    expect(card.getImageUrl()).toEqual('9_of_diamonds.png');
    card = new Card(10, 'diamonds');
    expect(card.getImageUrl()).toEqual('10_of_diamonds.png');
  });

  it('image URL works for jack, queen, king and ace', function() {
    var card = new Card(11, 'diamonds');
    expect(card.getImageUrl()).toEqual('jack_of_diamonds.png');
    card = new Card(12, 'diamonds');
    expect(card.getImageUrl()).toEqual('queen_of_diamonds.png');
    card = new Card(13, 'diamonds');
    expect(card.getImageUrl()).toEqual('king_of_diamonds.png');
    card = new Card(1, 'diamonds');
    expect(card.getImageUrl()).toEqual('ace_of_diamonds.png');
  });

  it('image URL works for different suits', function() {
    var card = new Card(11, 'diamonds');
    expect(card.getImageUrl()).toEqual('jack_of_diamonds.png');
    card = new Card(11, 'clubs');
    expect(card.getImageUrl()).toEqual('jack_of_clubs.png');
    card = new Card(11, 'spades');
    expect(card.getImageUrl()).toEqual('jack_of_spades.png');
    card = new Card(11, 'hearts');
    expect(card.getImageUrl()).toEqual('jack_of_hearts.png');
  });

}); //end of Card testing

//begin Hand testing
describe('Hand', function () {

  it('will instantiate a hand with points and an empty array of card objects', function() {
    var myHand = new Hand();
    expect(myHand.cards).toEqual([]);
  });

  it('will get the points and return them for a hand', function() {
    var myHand = new Hand();
    var myCard = new Card(11, "hearts");
    var myCard2 = new Card(1, "ace");
    myHand.addCard(myCard);
    myHand.addCard(myCard2);
    expect(myHand.getPoints()).toEqual(21);
  });

});//end of Hand testing

//begin Deck testing

describe('Deck', function () {

  it('will construct an instance of a Deck object', function() {
    var myDeck = new Deck();
    expect(myDeck.allCards.length).toEqual(52);
  });

  it('will draw a card from the deck', function() {
    var myDeck = new Deck();
    expect(myDeck.draw()).toEqual({ point: 1, suit: 'spades' });
  });

  it('will shuffle the deck', function() {
    var myDeck = new Deck();
    myDeck.shuffle();
    expect(myDeck.allCards[0]).not.toEqual({ point: 1, suit: 'spades' });
  });

  it('will return the number of cards left in the deck', function() {
    var myDeck = new Deck();
    myDeck.draw();
    expect(myDeck.numCardsLeft()).toEqual(51);
  });

});//end of Deck testing
