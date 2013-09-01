(function (Crafty, $) {
  'use strict';

  Crafty.scene('Main', function () {
    $.ajax({
      url: '/src/levels/village.json'
    }).done(function (tiled) {
      Crafty.e('2D, Canvas, Image')
      .image('/web/images/village_bg.png');
      Crafty.e('TiledMap').setTiledMap(tiled);

      new Bucket(10, 10);
      new Door(36,11);

      //Crafty.viewport.centerOn(Crafty('PlayerCharacter'), 0);
      Crafty.viewport.follow(Crafty('PlayerCharacter'), 0, 0);
    });
  });
})(Crafty, jQuery);
