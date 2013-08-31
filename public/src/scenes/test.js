(function (Crafty, $) {
  'use strict';

  Crafty.scene('test', function () {
    $.ajax({
      url: '/src/levels/testcolisao.json'
    }).done(function (tiled) {
      Crafty.e('2D DOM TiledMap').setTiledMap('Test', tiled);
    });
  });
})(Crafty, jQuery);
