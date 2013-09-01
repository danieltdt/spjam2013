(function (Crafty, $) {
  'use strict';

  Crafty.scene('Apotecarie', function () {
    $.ajax({
      url: '/src/levels/apotecarie.json'
    }).done(function (tiled) {
      Crafty.e('TiledMap').setTiledMap(tiled);
      
      Crafty.audio.stop();
      Crafty.audio.play('apotecarie_song', -1);

      new Door(4,5).setDestination('Village');

      Crafty.viewport.follow(Crafty('PlayerCharacter'), 0, 0);
    });
  });
})(Crafty, jQuery);
