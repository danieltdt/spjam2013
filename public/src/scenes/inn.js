(function (Crafty, $) {
  'use strict';

  Crafty.scene('Inn', function () {
    $.ajax({
      url: '/src/levels/inn.json'
    }).done(function (tiled) {
      Crafty.e('TiledMap').setTiledMap(tiled);
      var player = Crafty('PlayerCharacter');
      var map = new MapHandler(player.x, player.y, Config.currentLevel);
      player.bind('Move', function () {
        map.changeLoc(this.x, this.y);
      });
      
      Crafty.audio.stop();
      Crafty.audio.play('inn_song', -1);

      new Door(8,9).setDestination('Village');
      new Door(7,9).setDestination('Village');

      Crafty.viewport.follow(Crafty('PlayerCharacter'), 0, 0);
    });
  });
})(Crafty, jQuery);
