(function (global) {
  'use strict';

  // Thanks to Jonas Olmstead
  // (http://tinymmo.blogspot.se/2013/06/tile-maps-of-unusual-size.html)
  function MapHandler(initX, initY, tiledMap) {
    var self = this;

    var visibleTiles = tiledMap.layers.filter(function (layer) {
      return layer.visible && layer.type === 'tilelayer';
    }).map(function (layer) {
      return layer.data;
    });

    var boxStore = {};  // tiles within a map segment
    var tileStore = {}; // cache of re-usable tiles
    var tileSize = {x: tiledMap.tilewidth, y: tiledMap.tileheight};

    var screenTilesX = Math.ceil(Config.viewportWidth / tileSize.x);
    var screenTilesY = Math.ceil(Config.viewportHeight / tileSize.y);

    var boxW = Math.ceil(screenTilesX / 3);
    var boxH = Math.ceil(screenTilesY / 3);

    var _oldBox = -1;

    self.changeLoc = function (newX, newY) {
      var boxX = Math.floor(newX / (tileSize.x * boxW));
      var boxY = Math.floor(newY / (tileSize.y * boxH));

      var curBox = boxX + boxY * Math.ceil(Config.width() / boxW);
      if (curBox !== _oldBox) {
        changeBox(curBox);
      }
    };

    var changeBox = function (curBox) {
      var x, y;
      _oldBox = curBox;

      // clear surrounding out-of-frame boxes
      y = -3;
      for (x = -3; x <= 3; x++) {
        clearBox(curBox + y * Math.ceil(Config.width() / boxW) + x);
      }

      x = -3;
      for (y = -2; y <= 2; y++) {
        clearBox(curBox + y * Math.ceil(Config.width() / boxW) + x);
      }

      x = 3;
      for (y = -2; y <= 2;y++) {
        clearBox(curBox + y * Math.ceil(Config.width() / boxW) + x);
      }

      y = 3;
      for (x = -3; x <= 3; x++) {
        clearBox(curBox + y * Math.ceil(Config.width() / boxW) + x);
      }

      // fill in surrounding boxes
      for (y = -2; y <= 2; y++) {
        for (x = -2; x <= 2; x++) {
          loadBox(curBox + y * Math.ceil(Config.width() / boxW) + x);
        }
      }
    };

    var clearBox = function (boxId) {
      if (!boxStore[boxId] || boxStore[boxId].loaded === false)
        return; // not loaded

      // don't block
      setTimeout(function () {
        // clear old box tiles
        while (boxStore[boxId] && boxStore[boxId].tiles.length) {
          var tile = boxStore[boxId].tiles.pop();
          tile.visible = false;
          tile.attr({ x: -10000, y: -10000 });
          tileStore[tile.gid].push(tile);
        }

        if (boxStore[boxId]) {
          boxStore[boxId].loaded = false;
        }
      }, 10);
    };

    var loadBox = function (curBox) {
      // init box
      if (!boxStore[curBox]) {
        boxStore[curBox] = { loaded: false, tiles: [] };
      }

      if (boxStore[curBox].loaded) return; // already loaded

      var newX = (curBox % Math.ceil(Config.width() / boxW)) * boxW;
      var newY = Math.floor(curBox / Math.ceil(Config.width() / boxW)) * boxH;
      var getTilesGid = function (pos) {
        return visibleTiles.map(function (data) {
          return data[pos];
        });
      };

      var tileGids, tile, tileGid;
      for (var y = newY; y < newY + boxH && y < Config.height() && y >= 0; y++) {
        for (var x = newX; x < newX + boxW && x < Config.width() && x >= 0; x++) {
          tileGids = getTilesGid(x + y * Config.width());

          for (var i = 0; i < tileGids.length; i++) {
            tile = undefined;
            tileGid = tileGids[i];
            if (tileGid === 0) return;

            if (!tileStore[tileGid])
              tileStore[tileGid] = [];

            if (tileStore[tileGid].length) {
              tile = tileStore[tileGid].pop();
              tile.visible = true;
            } else {
              tile = Crafty.e('Tile, Tile' + tileGid);
              tile.gid = tileGid;
            }

            tile.attr({
              x: x * tileSize.x,
              y: y * tileSize.y
            });

            boxStore[curBox].tiles.push(tile);
          }
        }
      }
      boxStore[curBox].loaded = true;
    };
    self.changeLoc(initX, initY);
    return this;
  }

  global.MapHandler = MapHandler;
})(window);
