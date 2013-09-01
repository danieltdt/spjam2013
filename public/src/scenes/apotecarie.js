(function (Crafty) {
  'use strict';

  Crafty.scene('Apotecarie', function () {
    Obsidian.devour('apotecarie', function () {
      new Door(7, 8).setDestination('Village');
      new Door(8, 8).setDestination('Village');
    });
  });
})(Crafty);
