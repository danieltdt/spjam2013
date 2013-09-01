(function (Crafty, $) {
  'use strict';

  Crafty.scene('Village', function () {
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

      Crafty.audio.stop();
      Crafty.audio.play('village_song', -1, 1.0);

      new Door(36,10).setDestination('Apotecarie');
      new Door(21,10).setDestination('Tubarerna');
      new Door(38,23).setDestination('Inn');

      Crafty.e('ShowFPS');

      Crafty.viewport.follow(Crafty('PlayerCharacter'), 0, 0);
    });
  });
})(Crafty, jQuery);
