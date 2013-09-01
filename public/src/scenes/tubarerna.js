(function (Crafty) {
  'use strict';

  Crafty.scene('Tubarerna', function () {
    Obsidian.devour('tubarerna', function () {
      new Door(8, 11).setDestination('Village');
      new Door(7, 11).setDestination('Village');
    });
  });
})(Crafty);
