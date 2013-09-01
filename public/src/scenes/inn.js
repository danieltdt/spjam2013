(function (Crafty) {
  'use strict';

  Crafty.scene('Inn', function () {
    Obsidian.devour('inn', function () {
      new Door(8, 9).setDestination('Village');
      new Door(7, 9).setDestination('Village');
    });
  });
})(Crafty);
