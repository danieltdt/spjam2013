'use strict';

// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
  init: function () {
    this.attr({
      w: Config.currentLevel.tilewidth,
      h: Config.currentLevel.tileheight
    });
  },

  // Locate this entity at the given position on the grid
  at: function (x, y) {
    if (x === undefined && y === undefined) {
      return {
        x: this.x / Config.currentLevel.tilewidth,
        y: this.y / Config.currentLevel.tileheight
      };
    } else {
      this.attr({
        x: x * Config.currentLevel.tilewidth,
        y: y * Config.currentLevel.tileheight
      });
      return this;
    }
  }
});

Crafty.c('ShowFPS', {
  init: function () {
    var fpsElement = document.getElementById('fps-counter');
    Crafty.stage.elem.appendChild(fpsElement);

    this.requires('FPS')
    .bind('MessureFPS', function (fps) {
      fpsElement.innerHTML = fps.value;
    });

  }
});

// An 'Actor' is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function () {
    this.requires('2D, Canvas, Grid');
  },
});

Crafty.c('Bucket', {
  init: function() {
    this.requires('Actor, Collision, Block, spr_bucket')
    .collision();
  },
});

Crafty.c('Door', {
  init: function() {
    var self = this;
    self.requires('Actor, Collision')
    .collision()
    .onHit('PlayerCharacter', function() {
      Crafty.scene(self._destination);
    });
  },
  setDestination: function(dest) {
    this._destination = dest;
  }
});

Crafty.c('PlayerCharacter', {
  init: function () {
    this.requires('Actor, Fourway, Collision, spr_player, SpriteAnimation')
    .animate('walk_left', 0, 2, 4)
    .animate('walk_right', 0, 3, 4)
    .animate('walk_up', 0, 1, 4)
    .animate('walk_down', 0, 0, 4)
    .fourway(2)
    .collision(new Crafty.polygon([0, 50], [50, 50], [50, 100], [0, 100]));

    //this._globalZ = 1000;

    new PlayerName(this.x, this.y);

    this.bind('Moved', function (from) {
      // stop moving when hit obstacle
      if (this.hit('Block')) {
        this.x = from.x;
        this.y = from.y;
      } else {
        //moves name together
        Crafty('PlayerName').trigger('Move');
      }
    });

    var animationSpeed = 12;
    this.bind('NewDirection', function (data) {
      this.stop();
      if (data.x > 0) {
        this.animate('walk_right', animationSpeed, -1);
      } else if (data.x < 0) {
        this.animate('walk_left', animationSpeed, -1);
      } else if (data.y > 0) {
        this.animate('walk_down', animationSpeed, -1);
      } else if (data.y < 0) {
        this.animate('walk_up', animationSpeed, -1);
      }
    });
  }
});

Crafty.c('PlayerName', {
  init: function() {
    this.requires("2D, Grid, DOM, Text")
    .attr({
      w: 50,
      h: 20
    })
    .text("Neusa P. da Cunha")
    .css({ "text-align": "center" });

    this.bind('Move', function() {
      this.attr({ x: Crafty('PlayerCharacter').x,
                y: Crafty('PlayerCharacter').y - 30 });
    });
  }
});


Crafty.c('Tile', {
  init: function () {
    this.requires('2D, Canvas');
  },
  setGid: function (gid) {
    this.gid = gid;

    return this;
  }
});

Crafty.c('Event', {
  init: function () {
    this.requires('Block');
  }
});

Crafty.c('TiledMap', {
  setTiledMap: function (tiledMap) {
    this._tiled = tiledMap;
    this._setCurrentLevel();

    this._loadTilesets();
    this._defineLayersZ();
    this._createObjectEntities();
  },

  _loadTilesets: function () {
    var self = this;

    self._tiled.tilesets.forEach(function (tileset) {
      Crafty.sprite(
        tileset.tilewidth,
        tileset.tileheight,
        tileset.image,
        self.arrangeTiles(tileset),
        tileset.spacing,
        tileset.spacing
      );
    });
  },

  arrangeTiles: function (tileset) {
    var columns = Math.round(
      tileset.imagewidth / (tileset.tilewidth + tileset.margin)
    );
    var rows = Math.round(
      tileset.imageheight / (tileset.tileheight + tileset.margin)
    );
    var tilesMap = {};

    for (var row = 0; row < rows; row++) {
      for (var column = 0; column < columns; column++) {
        var tileNumber =
          ((parseInt(tileset.firstgid, 10) + column) + (columns * row));

        tilesMap['Tile' + tileNumber] = [column, row];
      }
    }

    return tilesMap;
  },

  _defineLayersZ: function () {
    this._tiled.layers.forEach(function (layer, i) {
      layer.z = i;
    });
  },

  _createObjectEntities: function () {
    var self = this;

    self._tiled.layers.filter(function (layer) {
      return layer.type === 'objectgroup';
    }).forEach(function (layer) {
      layer.objects.forEach(function (object) {
        if (object.type === 'Player') {
          var x = Math.floor(object.x / Config.currentLevel.tilewidth);
          var y = Math.floor(object.y / Config.currentLevel.tileheight);

          try {
            Crafty('PlayerCharacter').destroy();
          } catch (e) { /*don't care */ }

          var p = new Player(x, y);
          p.attr({z: layer.z});
        }
        var objectType = (object.type || 'Block');
        Crafty.e('2D, Canvas, Collision, ' + objectType)
        .attr({
          x: object.x,
          y: object.y,
          w: object.width,
          h: object.height,
          z: layer.z
        })
        .collision();
      });
    });
  },

  _setCurrentLevel: function () {
    Config.currentLevel = this._tiled;
  },
});

/** Halp!
// Crafty.e('2D, DOM, Fourway, SpriteAnimation, Sprite, Ogre, Collision')
//               .attr({x: 50, y: 50, z: 10, isWater: false})
//               .animate('walk_left', 0, 1, 3)
//               .animate('walk_right', 0, 2, 3)
//               .animate('walk_up', 0, 3, 3)
//               .animate('walk_down', 0, 0, 3)
//               .fourway(2)
//               .collision( new Crafty.polygon([10,50],[40,50],[40,67],[10,67]))
//               .bind('Moved', function(from) {

//                 // stop moving when hit obstacle
//                 if( this.hit('Obstacle') || this.hit('Fence') ){
//               this.attr({x: from.x, y:from.y});
//             }

//                 //is in water
//             if(this.isWater == false &&  this.hit('Water') ){
//               this.crop(0, 0, 50, 55); //Cut off legs
//               this.fourway(1);  //movement is slower
//               this.isWater = true;
//             }

//                 //is in ground
//             if(this.isWater == true && !this.hit('Water') ){
//               this.crop(0,0, 50, 67);
//               this.fourway(2);
//               this.isWater = false;
//             }

//           })
//           .bind('NewDirection',
//             function (direction) {
//                   if (direction.x < 0) {
//                       if (!this.isPlaying('walk_left'))
//                           this.stop().animate('walk_left', 10, -1);
//                   }
//                   if (direction.x > 0) {
//                       if (!this.isPlaying('walk_right'))
//                           this.stop().animate('walk_right', 10, -1);
//                   }
//                   if (direction.y < 0) {
//                       if (!this.isPlaying('walk_up'))
//                           this.stop().animate('walk_up', 10, -1);
//                   }
//                   if (direction.y > 0) {
//                       if (!this.isPlaying('walk_down'))
//                           this.stop().animate('walk_down', 10, -1);
//                   }
//                   if(!direction.x && !direction.y) {
//                       this.stop();
//                   }
//           })
//         });
*/
