(function (Crafty, $) {
  'use strict';

  Crafty.scene('Main', function () {
    $.ajax({
      url: '/src/levels/village.json'
    }).done(function (tiled) {
      Crafty.e('2D, Canvas, Image')
      .image('/web/images/village_bg.png');
      Crafty.e('TiledMap').setTiledMap(tiled);
      var player = Crafty('PlayerCharacter');
      var map = new MapHandler(player.x, player.y, Config.currentLevel);
      player.bind('Move', function () {
        map.changeLoc(this.x, this.y);
      });

      new Bucket(10, 10);
      new Door(36,10).setDestination('House');

      Crafty.viewport.follow(Crafty('PlayerCharacter'), 0, 0);
    });
  });
})(Crafty, jQuery);
