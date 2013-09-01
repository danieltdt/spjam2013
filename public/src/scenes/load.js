(function (Crafty, $) {
  'use strict';

  Crafty.scene('Load', function() {
    Crafty.background('#FFF');
    Crafty.e('2D, DOM, Text')
      .attr({
        w: Config.viewportWidth,
        h: 20,
        x: 0,
        y: Config.viewportHeight / 2
      })
      .text('Loading...')
      .css({'text-align': 'center'});

    Crafty.load([
      '/web/images/neusa.png',
      '/web/images/objects.png',
      '/web/images/village.jpg',
      '/web/images/village_bg.png'
    ], function () {
        // Once the images are loaded...

        // Define the individual sprites in the image
        // Each one (spr_tree, etc.) becomes a component
        // These components' names are prefixed with "spr_"
        //  to remind us that they simply cause the entity
        //  to be drawn with a certain sprite
        Crafty.sprite(50, '/web/images/objects.png', {
          spr_bucket:  [0, 0]
        });

        // Define the PC's sprite to be the first sprite in the third row of the
        //  animation sprite map
        Crafty.sprite(50, 100, '/web/images/neusa.png', {
          spr_player:  [0, 0],
        }, 0, 0);

        // Pointless setTimeout
        setTimeout(function () {
          Crafty.scene('Main');
        }, 2000);
      });

  });
})(Crafty, jQuery);

