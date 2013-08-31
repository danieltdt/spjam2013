(function (Crafty, $) {
  'use strict';

  Crafty.scene('test', function () {
    $.ajax({
      url: '/src/levels/testcolisao.json'
    }).done(function (tiled) {
      Crafty.e('2D, DOM, TiledMap').setTiledMap('Test', tiled);
      var p = new Player(10,20);
      var t = new Table(22,15);
    });
  });
})(Crafty, jQuery);
