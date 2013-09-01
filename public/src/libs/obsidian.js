(function (global, $) {
  'use strict';

  var WORLDS = {
    village: {
      json: '/src/levels/village.json',
      bg: '/web/images/village_bg.png',
      song: 'village_song'
    },
    farmHouse: {
      json: '/src/levels/farm_house.json',
      song: 'farm_house_song'
    },
    inn: {
      json: '/src/levels/inn.json',
      song: 'inn_song'
    },
    apotecarie: {
      json: '/src/levels/apotecarie.json',
      song: 'apotecarie_song'
    },
    tubarerna: {
      json: '/src/levels/tubarerna.json',
      song: 'tubarerna_song'
    }
  };

  function Obsidian(world, callback) {
    var currentWorld = WORLDS[world];

    $.ajax({
      url: currentWorld.json
    }).done(function (tiled) {
      if (currentWorld.bg)
        Crafty.e('2D, Canvas, Image').image(currentWorld.bg);

      Crafty.e('TiledMap').setTiledMap(tiled);

      var player = Crafty('PlayerCharacter');
      var map = new MapHandler(player.x, player.y, Config.currentLevel);
      player.bind('Move', function () {
        map.changeLoc(this.x, this.y);
      });

      Crafty.audio.stop();
      if (currentWorld.song)
        Crafty.audio.play(currentWorld.song, -1, 1.0);

      Crafty.viewport.follow(Crafty('PlayerCharacter'), 0, 0);

      callback();
    });
  }

  Obsidian.devour = function (world, callback) {
    return new Obsidian(world, callback);
  };

  global.Obsidian = Obsidian;
})(window, jQuery);
