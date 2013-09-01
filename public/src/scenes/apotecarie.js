(function (Crafty, $) {
  'use strict';

  Crafty.scene('Apotecarie', function () {
    $.ajax({
      url: '/src/levels/apotecarie.json'
    }).done(function (tiled) {
      Crafty.e('TiledMap').setTiledMap(tiled);
      var player = Crafty('PlayerCharacter');
      var map = new MapHandler(player.x, player.y, Config.currentLevel);
      player.bind('Move', function () {
        map.changeLoc(this.x, this.y);
      });
      
      Crafty.audio.stop();
      Crafty.audio.play('apotecarie_song', -1);

      new Door(7,8).setDestination('Village');
      new Door(8,8).setDestination('Village');

      Crafty.viewport.follow(Crafty('PlayerCharacter'), 0, 0);
    });
  });
})(Crafty, jQuery);
