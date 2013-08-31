(function (Crafty, $) {
  'use strict';

  Crafty.scene('Load', function() {
    Crafty.background('green');
    Crafty.e("2D, DOM, Text").attr({ w:800, h: 20, x: 0, y: 600/2 })
      .text("Loading...")
      .css({ "text-align": "center" });

    Crafty.load(['/web/images/player.png', '/web/images/objects.png'], function(){
        // Once the images are loaded...
     
        // Define the individual sprites in the image
        // Each one (spr_tree, etc.) becomes a component
        // These components' names are prefixed with "spr_"
        //  to remind us that they simply cause the entity
        //  to be drawn with a certain sprite
        Crafty.sprite(32, '/web/images/objects.png', {
          spr_table:  [2, 0]
        });
     
        // Define the PC's sprite to be the first sprite in the third row of the
        //  animation sprite map
        Crafty.sprite(50, 100, '/web/images/neusa.png', {
          spr_player:  [0, 0],
        }, 0, 0);
     
        Crafty.scene("Main");
      });

  });

  Crafty.scene('Main', function () {
    $.ajax({
      url: '/src/levels/testcolisao.json'
    }).done(function (tiled) {
      Crafty.e('2D, DOM, TiledMap').setTiledMap(tiled);
      new Table(22, 15);
    });
  });

})(Crafty, jQuery);
