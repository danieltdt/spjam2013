function Player(x, y) {
  return Crafty.e('PlayerCharacter').at(x, y);
}

function PlayerName(x, y) {
  return Crafty.e('PlayerName').at(x, y);
}

function Hero(x, y) {
  return Crafty.e('HeroCharacter').at(x, y);
}

function HeroName(x, y) {
  return Crafty.e('HeroName').at(x, y);
}

function Bucket(x,y) {
  return Crafty.e('Bucket').at(x,y);
}

function Door(x,y) {
  return Crafty.e('Door').at(x,y);
}

function DialogBox() {
  return Crafty.e('DialogBox');
}

function DialogText(text) {
  return Crafty.e('DialogBox').setText(text);
}