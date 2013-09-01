(function (Crafty) {
  'use strict';

  Crafty.scene('FarmHouse', function () {
    Obsidian.devour('farmHouse', function () {
      new Door(4, 6).setDestination('Village');
      new Door(5, 6).setDestination('Village');

      Crafty.viewport.follow(Crafty('PlayerCharacter'), 0, 0);
    });
  });
})(Crafty);
