(function (Crafty) {
  'use strict';

  Crafty.scene('FarmHouse', function () {
    Obsidian.devour('farmHouse', function () {
      new Door(4, 6).setDestination('Village');
      new Door(5, 6).setDestination('Village');

    });
  });
})(Crafty);
