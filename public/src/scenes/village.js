(function (Crafty) {
  'use strict';

  Crafty.scene('Village', function () {
    Obsidian.devour('village', function () {
      new Door(4, 26).setDestination('FarmHouse');
      new Door(36, 10).setDestination('Apotecarie');
      new Door(21, 10).setDestination('Tubarerna');
      new Door(38, 23).setDestination('Inn');

      Crafty.viewport.follow(Crafty('PlayerCharacter'), 0, 0);
    });
  });
})(Crafty);
