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
    var tileSizeInPx = {width: tiledMap.tilewidth, height: tiledMap.tileheight};

    var screenWidth = Math.ceil(Config.viewportWidth / tileSizeInPx.width);
    var screenHeight = Math.ceil(Config.viewportHeight / tileSizeInPx.height);

    var boxWidth = Math.ceil(screenWidth / 3);
    var boxHeight = Math.ceil(screenHeight / 3);
    var boxesPerRow = Math.ceil(Config.width() / boxWidth);

    this.currentBoxLinearPosition = -1;

    self.changeLoc = function (newX, newY) {
      var boxSizeInPx = {
        x: (tileSizeInPx.width * boxWidth),
        y: (tileSizeInPx.height * boxHeight)
      };

      // Box changed?
      var boxColumn = Math.floor(newX / boxSizeInPx.x);
      var boxRow = Math.floor(newY / boxSizeInPx.y);
      var newBoxLinearPosition = boxColumn + boxRow * boxesPerRow;
      if (newBoxLinearPosition !== this.currentBoxLinearPosition) {
        this.currentBoxLinearPosition = newBoxLinearPosition;
        changeBox(newBoxLinearPosition);
      }
    };

    var changeBox = function (boxLinearPosition) {
      var column, row;

      // clear surrounding out-of-frame boxes
      row = -4;
      for (column = -4; column <= 4; column++) {
        clearBox(boxLinearPosition + row * boxesPerRow + column);
      }

      column = -4;
      for (row = -3; row <= 3; row++) {
        clearBox(boxLinearPosition + row * boxesPerRow + column);
      }

      column = 4;
      for (row = -3; row <= 3; row++) {
        clearBox(boxLinearPosition + row * boxesPerRow + column);
      }

      row = 4;
      for (column = -4; column <= 4; column++) {
        clearBox(boxLinearPosition + row * boxesPerRow + column);
      }

      // fill in surrounding boxes
      for (row = -3; row <= 3; row++) {
        for (column = -3; column <= 3; column++) {
          loadBox(boxLinearPosition + row * boxesPerRow + column);
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

      var tileColumn = (curBox % boxesPerRow) * boxWidth;
      var tileRow = Math.floor(curBox / boxesPerRow) * boxHeight;

      var getTilesGid = function (pos) {
        return visibleTiles.map(function (data) {
          return data[pos];
        });
      };

      var tileGids, tileGid, tile;
      for (var row = tileRow; row < tileRow + boxHeight && row < tiledMap.height && row >= 0; row++) {
        for (var column = tileColumn; column < tileColumn + boxWidth && column < tiledMap.width && column >= 0; column++) {
          tileGids = getTilesGid(column + row * tiledMap.width);

          for (var i = 0; i < tileGids.length; i++) {
            tile = undefined;
            tileGid = tileGids[i];

            if (tileGid) {
              if (!tileStore[tileGid])
                tileStore[tileGid] = [];

              if (tileStore[tileGid].length) {
                tile = tileStore[tileGid].pop();
                tile.visible = true;
              } else {
                tile = Crafty.e('Tile, Tile' + tileGid).setGid(tileGid);
              }

              tile.attr({
                x: column * tileSizeInPx.width,
                y: row * tileSizeInPx.height
              });

              boxStore[curBox].tiles.push(tile);
            }
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
