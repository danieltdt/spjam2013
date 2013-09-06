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
          this._movement = {x: 0, y: 0};
          this.unbind('EnterFrame', step);
          this.enableControl();
        } else {
          var pos = this.at();
          var stepX = path[currentStep][0];
          var stepY = path[currentStep][1];

          if (pos.x > stepX) {
            this._movement.x = Math.floor((this._movement.x + this._speed.x) * 1000) / 1000;
            this._movement.y = 0;
          } else if (pos.x < stepX){
            this._movement.x = Math.floor((this._movement.x + -this._speed.x) * 1000) / 1000;
            this._movement.y = 0;
          } else {
            if (pos.y > stepY) {
              this._movement.x = 0;
              this._movement.y = Math.floor((this._movement.y + -this._speed.y) * 1000) / 1000;
            } else if (pos.y < stepY) {
              this._movement.x = 0;
              this._movement.y = Math.floor((this._movement.y + this._speed.y) * 1000) / 1000;
            } else {
              this._movement = {x: 0, y: 0};
            }
          }

          if (this._movement.x !== 0) {
            this.x += this._movement.x;
            this.trigger('Moved', { x: this.x - this._movement.x, y: this.y });
          }
          if (this._movement.y !== 0) {
            this.y += this._movement.y;
            this.trigger('Moved', { x: this.x, y: this.y - this._movement.y });
          }

          console.log(currentStep);
          console.log('pos %s step %s', JSON.stringify(pos), JSON.stringify(path[currentStep]));
          //console.log('step', path[currentStep]);
          //console.log('speed', this._speed);
          //console.log('movement', this._movement);

          if (pos.x === stepX && pos.y === stepY) currentStep += 1;

          this.trigger('NewDirection', this._movement);
        }
      };
      entity.bind('EnterFrame', step);
    };
  }

  global.DirectedMove = DirectedMove;
})(window);
