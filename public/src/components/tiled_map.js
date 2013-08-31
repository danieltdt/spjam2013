'use strict';

Crafty.c('TiledMap', {
  setTiledMap: function (name, tiledMap) {
    this._tiled = tiledMap;

    this._tiled.tilesets.forEach(function (tileset) {
      var imageheight = (tileset.imageheight - (2 * tileset.margin));
      var imagewidth = (tileset.imagewidth - (2 * tileset.margin));

      var heightInTiles = Math.floor(imageheight / tileset.tileheight);
      var widthInTiles = Math.floor(imagewidth / tileset.tilewidth);

      var map = {};
      map['Map' + name] = [0, 0, widthInTiles, heightInTiles];

      Crafty.sprite(
        tileset.tilewidth,
        tileset.tileheight,
        tileset.image,
        map,
        tileset.margin,
        tileset.margin
      );
    });
  }
});
