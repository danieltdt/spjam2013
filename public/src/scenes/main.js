(function (Crafty, $) {
  'use strict';

  Crafty.scene('Main', function () {
    $.ajax({
      url: '/src/levels/village.json'
    }).done(function (tiled) {
      Crafty.e('2D, DOM, TiledMap').setTiledMap(tiled);

      Crafty.viewport.centerOn(Crafty('PlayerCharacter'), 0);
    });
  });
})(Crafty, jQuery);
