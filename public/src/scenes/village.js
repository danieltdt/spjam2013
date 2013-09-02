(function (Crafty) {
  'use strict';

  Crafty.scene('Village', function () {
    var self = this;

    Obsidian.devour('village', function () {
      if (self._lastPoint) Crafty('PlayerCharacter').attr(self._lastPoint);

      var saveLastPoint = function () {
        var player = Crafty('PlayerCharacter');

        self._lastPoint = {
          x: player.x,
          y: player.y
        };
      };

      new Door(4, 26).setDestination('FarmHouse').bind('DoorHit', saveLastPoint);
      new Door(36, 10).setDestination('Apotecarie').bind('DoorHit', saveLastPoint);
      new Door(21, 10).setDestination('Tubarerna').bind('DoorHit', saveLastPoint);
      new Door(38, 23).setDestination('Inn').bind('DoorHit', saveLastPoint);
    });
  });
})(Crafty);
