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
  init: function () {
    this.requires('Actor, Collision, Block, spr_bucket')
    .collision();
  },
});

Crafty.c('Door', {
  init: function () {
    var self = this;
    self.requires('Actor, Collision')
    .collision()
    .onHit('PlayerCharacter', function () {
      self.trigger('DoorHit');
      Crafty.scene(self._destination);
    });
  },
  setDestination: function (dest) {
    this._destination = dest;

    return this;
  }
});

Crafty.c('PlayerCharacter', {
  init: function () {
    this.requires('Actor, Fourway, Collision, spr_player, SpriteAnimation')
    .animate('walk_left', 0, 2, 4)
    .animate('walk_right', 0, 3, 4)
    .animate('walk_up', 0, 1, 4)
    .animate('walk_down', 0, 0, 4)
    .fourway(6)
    .collision(new Crafty.polygon([8, 50], [45, 50], [45, 100], [8, 100]));

    this._globalZ = -1;

    new PlayerName(this.x, this.y);

    this.bind('Moved', function (from) {
      // stop moving when hit obstacle
      if (this.hit('Block')) {
        this.x = from.x;
        this.y = from.y;
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

Crafty.c('HeroCharacter', {
  init: function () {
    this.requires('Actor, Fourway, Collision, spr_hero, SpriteAnimation')
    .animate('walk_left', 0, 2, 4)
    .animate('walk_right', 0, 3, 4)
    .animate('walk_up', 0, 1, 4)
    .animate('walk_down', 0, 0, 4)
    .fourway(3)
    .collision(new Crafty.polygon([8, 50], [45, 50], [45, 100], [8, 100]));

    this.disableControl();

    new HeroName(this.x, this.y);

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

Crafty.c('DialogBox', {
  init: function () {
    this.requires('2D, DOM, Image')
    .attr({w: Crafty.viewport.width, h: 150})
    .image('/web/images/dialog_box.png');
  },
  setText: function (text) {
    new DialogText(text);
  }
});

Crafty.c('DialogText', {
  init: function () {
    var box = Crafty('DialogBox');
    this.requires('2D, Grid, DOM, Text')
    .attr({
      w: Crafty.viewport.width,
      h: 100
    })
    .css({left: '10px', top: '20px'})
    .textFont({size: '13px', weight: 'bold'});

    box.attach(this);
  },
  setText: function (text) {
    this.text(text);
  }
});

Crafty.c('HeroName', {
  init: function () {
    var hero = Crafty('HeroCharacter');
    this.requires('2D, Grid, DOM, Text')
    .attr({
      w: 150,
      h: 20
    })
    .text('&lt;xXx Dark BR LOL xXx&gt;')
    .css({left: '-40px', top: '-20px'})
    .textFont({size: '13px', weight: 'bold'});

    hero.attach(this);
  }
});

Crafty.c('PlayerName', {
  init: function () {
    var player = Crafty('PlayerCharacter');
    this.requires('2D, Grid, DOM, Text')
    .attr({
      w: 150,
      h: 20
    })
    .text('&lt;Neusa P. da Cunha&gt;')
    .css({left: '-40px', top: '-20px'})
    .textFont({size: '13px', weight: 'bold'});

    player.attach(this);
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

    self._tiled.PFGrid = new PF.Grid(self._tiled.width + 1, self._tiled.height + 1);

    self._tiled.layers.filter(function (layer) {
      return layer.type === 'objectgroup';
    }).forEach(function (layer) {
      layer.objects.forEach(function (object) {
        var tileX = Math.floor(object.x / Config.currentLevel.tilewidth);
        var tileY = Math.floor(object.y / Config.currentLevel.tileheight);

        if (object.type === 'Player') {
          try {
            Crafty('PlayerCharacter').destroy();
          } catch (e) { /*don't care */ }

          var p = new Player(tileX, tileY);
          p.attr({z: layer.z});
        } else {
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

          // Fill the object with of un-walkable tiles
          var beginX, endX, beginY, endY;
          beginX = (tileX <= 0 ? 0 : tileX);
          endX = Math.floor(
            (object.x + object.width) / Config.currentLevel.tilewidth
          );

          beginY = (tileY <= 0 ? 0 : tileY);
          endY = Math.floor(
            (object.y + object.height) / Config.currentLevel.tileheight
          );

          for (var x = beginX; x <= endX; x++)
            for (var y = beginY; y <= endY; y++) {
              self._tiled.PFGrid.setWalkableAt(x, y, false);
            }
        }
      });
    });
  },

  _setCurrentLevel: function () {
    Config.currentLevel = this._tiled;
  },
});
