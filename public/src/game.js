(function (window, Crafty) {
  'use strict';

  window.onload = function () {
    Crafty.init(Config.viewportWidth, Config.viewportHeight);

    Crafty.scene('Load');
  };
})(window, Crafty);
