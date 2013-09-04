(function (global) {
  'use strict';

  function DirectedMove(tiledMap) {
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
        // if currentStep >= path.length
        //   unbind this function
        //   enable controls (optional)
        // else
        //   move entity to path[currentStep]
        //   increment currentStep
      };
    };
  }

  global.DirectedMove = DirectedMove;
})(window);
