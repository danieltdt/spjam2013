(function (Crafty) {
  'use strict';

  Crafty.scene('test', function () {
    var tiled = {}; //FIXME: Load JSON
    Crafty.e('2D DOM TiledMap').setTiledMap('Test', tiled);
  });
})(Crafty);
