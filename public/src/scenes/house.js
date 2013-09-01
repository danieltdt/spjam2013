(function (Crafty, $) {
  'use strict';

  Crafty.scene('House', function () {
    $.ajax({
      url: '/src/levels/house.json'
    }).done(function (tiled) {
      Crafty.e('TiledMap').setTiledMap(tiled);
      
      new Bucket(2, 2);
      new Door(4,5).setDestination('Main');

      Crafty.viewport.follow(Crafty('PlayerCharacter'), 0, 0);
    });
  });
})(Crafty, jQuery);
