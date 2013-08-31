'use strict';

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
          new Player(x, y);
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
