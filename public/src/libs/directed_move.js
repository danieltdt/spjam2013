(function (global) {
  'use strict';

  function DirectedMove() {
    var tilesMap = Config.currentLevel;
    this.finder = new PF.DijkstraFinder();

    this.move = function (entity, destination, disableControls) {
      var position = entity.at();

      var path = this.finder.findPath(
        position.x,
        position.y,
        destination.x,
        destination.y,
        Config.currentLevel.PFGrid
      );

      if (disableControls) entity.disableControl();

      var currentStep = 0;
      var step = function () {
        if (currentStep >= path.length) {
          this.unbind(step);
          this.enableControl();
        } else {
          var pos = this.at();
          var xAxis = pos.x - path[currentStep][0];
          var yAxis = pos.y - path[currentStep][1];

          if (xAxis === 0) {
            // nothing
          } else if (xAxis < 0) {
            this.x += -10;
          } else {
            this.x += 10;
          }

          if (yAxis === 0) {
            // nothing
          } else if (yAxis < 0) {
            this.y += -10;
          } else {
            this.y += 10;
          }

          if (yAxis === 0 && xAxis === 0)
            currentStep += 1;
        }
      };
      entity.bind('EnterFrame', step);
    };
  }

  global.DirectedMove = DirectedMove;
})(window);
