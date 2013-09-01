(function (Crafty, $) {
  'use strict';

  Crafty.scene('FarmHouse', function () {
    $.ajax({
      url: '/src/levels/farm_house.json'
    }).done(function (tiled) {
      Crafty.e('TiledMap').setTiledMap(tiled);
      var player = Crafty('PlayerCharacter');
      var map = new MapHandler(player.x, player.y, Config.currentLevel);
      player.bind('Move', function () {
        map.changeLoc(this.x, this.y);
      });
      
      Crafty.audio.stop();
      Crafty.audio.play('farm_house_song', -1);

      new Door(4,5).setDestination('Village');

      Crafty.viewport.follow(Crafty('PlayerCharacter'), 0, 0);
    });
  });
})(Crafty, jQuery);
