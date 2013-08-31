'use strict';

Crafty.c('TiledMap', {
  setTiledMap: function (name, tiledMap) {
    this.name = name;

    this._tiled = tiledMap;
    this._dimensions = [this._tiled.width, this._tiled.height];

    this._loadTilesets();
    this._loadObjects();
  },

  _loadTilesets: function () {
    var self = this;

    self._tiled.tilesets.forEach(function (tileset) {
      var imageheight = (tileset.imageheight - (2 * tileset.margin));
      var imagewidth = (tileset.imagewidth - (2 * tileset.margin));

      var heightInTiles = Math.floor(imageheight / tileset.tileheight);
      var widthInTiles = Math.floor(imagewidth / tileset.tilewidth);

      var map = {};
      map['Map' + self.name] = [0, 0, widthInTiles, heightInTiles];

      Crafty.sprite(
        tileset.tilewidth,
        tileset.tileheight,
        tileset.image,
        map,
        tileset.margin,
        tileset.margin
      );
    });
  },

  _loadObjects: function () {
    var self = this;

    self._tiled.layers.filter(function (layer) {
      return layer.type === 'objectgroup';
    }).forEach(function (layer, layerPosition) {
      if (layer.name === 'collision') {
        layer.objects.forEach(function (object) {
          var objectType = (object.type || 'block');
          Crafty.e('2D, Collision, ' + objectType)
          .attr({
            x: object.x,
            y: object.y,
            w: object.width,
            h: object.height,
            z: layerPosition
          });
        });
      }
    });
  },
});
