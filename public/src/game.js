(function (window, Crafty) {
  'use strict';

  window.onload = function () {
    Crafty.init(Config.viewportWidth, Config.viewportHeight);

    Crafty.viewport.clampToEntities = false;
    Crafty.e('ShowFPS');

    Crafty.scene('Load');
  };
})(window, Crafty);
