// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Config.currentLevel.tilewidth,
      h: Config.currentLevel.tileheight
    })
  },

  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Config.currentLevel.tilewidth, y: this.y/Config.currentLevel.tileheight }
    } else {
      this.attr({ x: x * Config.currentLevel.tilewidth, y: y * Config.currentLevel.tileheight });
      return this;
    }
  }
});

// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  },
});

Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('Actor, Fourway, Collision, spr_player, SpriteAnimation')
    .animate("walk_left", 0, 2, 1)
    .animate("walk_right", 0, 3, 1)
    .animate("walk_up", 0, 1, 1)
    .animate("walk_down", 0, 0, 1)
    .fourway(2)
    .collision( new Crafty.polygon([5,50],[45,50],[45,95],[5,95]))
    .bind('Moved', function(from) {
      // stop moving when hit obstacle
      if( this.hit('Block') ){
        this.attr({x: from.x, y:from.y});
      }
    });

    var animation_speed = 12;
    this.bind('NewDirection', function(data) {
      this.stop();
      if (data.x > 0) {
        this.animate('walk_right', animation_speed, -1);
      } else if (data.x < 0) {
        this.animate('walk_left', animation_speed, -1);
      } else if (data.y > 0) {
        this.animate('walk_down', animation_speed, -1);
      } else if (data.y < 0) {
        this.animate('walk_up', animation_speed, -1);
      }
    });
  }
});

Crafty.c('TiledMap', {
  setTiledMap: function (tiledMap) {
    this.name = name;

    this._tiled = tiledMap;
    this._setCurrentLevel();

    this._loadTilesets();
    this._createTileEntities();
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

  arrangeTiles: function (tileset){
    var columns = Math.round(
      tileset.imagewidth / (tileset.tilewidth + tileset.margin)
    );
    var rows = Math.round(
      tileset.imageheight / (tileset.tileheight + tileset.margin)
    );
    var tilesMap = {};

    for (var row = 0; row < rows; row++) {
      for (var column = 0; column < columns; column++) {
        var name =
          "Tile" + ((parseInt(tileset.firstgid) + column) + (columns * row));

        tilesMap[name] = [column, row];
      };
    }

    return tilesMap;
  },

  _createTileEntities: function () {
    var self = this;

    self._tiled.layers.filter(function (layer) {
      return layer.type === 'tilelayer';
    }).forEach(function (layer, layerPosition) {
      layer.data.forEach(function (tileGid, i) {
        var column = i % layer.width;
        var row = Math.floor((i / layer.width));

        Crafty.e('2D, Canvas, Tile' + tileGid)
        .attr({
          x: column * self._tiled.tilewidth,
          y: row * self._tiled.tileheight,
          z: layerPosition
        })
      });
    });
  },

  _createObjectEntities: function () {
    var self = this;

    self._tiled.layers.filter(function (layer) {
      return layer.type === 'objectgroup';
    }).forEach(function (layer, layerPosition) {
      layer.objects.forEach(function (object) {
        if (object.type === 'Player') {
          var x = Math.floor(object.x / Config.currentLevel.tilewidth);
          var y = Math.floor(object.y / Config.currentLevel.tileheight);

          try { Crafty('PlayerCharacter').destroy(); } catch (e) { /* don't care */ }

          var p = new Player(x, y);
          p.attr({z: layerPosition});
        }
        var objectType = (object.type || 'Block');
        Crafty.e('2D, Canvas, Collision, ' + objectType)
        .attr({
          x: object.x,
          y: object.y,
          w: object.width,
          h: object.height,
          z: layerPosition
        });
      });
    });
  },

  _setCurrentLevel: function () {
    Config.currentLevel = this._tiled;
  },
});

/** Halp!
// Crafty.e("2D, DOM, Fourway, SpriteAnimation, Sprite, Ogre, Collision")
//               .attr({x: 50, y: 50, z: 10, isWater: false})
//               .animate("walk_left", 0, 1, 3)
//               .animate("walk_right", 0, 2, 3)
//               .animate("walk_up", 0, 3, 3)
//               .animate("walk_down", 0, 0, 3)
//               .fourway(2)
//               .collision( new Crafty.polygon([10,50],[40,50],[40,67],[10,67]) )
//               .bind('Moved', function(from) {

//                 // stop moving when hit obstacle
//                 if( this.hit('Obstacle') || this.hit('Fence') ){
//               this.attr({x: from.x, y:from.y});
//             }

//                 //is in water
//             if(this.isWater == false &&  this.hit("Water") ){
//               this.crop(0, 0, 50, 55); //Cut off legs
//               this.fourway(1);  //movement is slower
//               this.isWater = true;
//             }

//                 //is in ground
//             if(this.isWater == true && !this.hit("Water") ){
//               this.crop(0,0, 50, 67);
//               this.fourway(2);
//               this.isWater = false;
//             }

//           })
//           .bind("NewDirection",
//             function (direction) {
//                   if (direction.x < 0) {
//                       if (!this.isPlaying("walk_left"))
//                           this.stop().animate("walk_left", 10, -1);
//                   }
//                   if (direction.x > 0) {
//                       if (!this.isPlaying("walk_right"))
//                           this.stop().animate("walk_right", 10, -1);
//                   }
//                   if (direction.y < 0) {
//                       if (!this.isPlaying("walk_up"))
//                           this.stop().animate("walk_up", 10, -1);
//                   }
//                   if (direction.y > 0) {
//                       if (!this.isPlaying("walk_down"))
//                           this.stop().animate("walk_down", 10, -1);
//                   }
//                   if(!direction.x && !direction.y) {
//                       this.stop();
//                   }
//           })
//         });
*/
