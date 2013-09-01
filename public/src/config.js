Config = {
  // Receives configs for current level
  currentLevel: null,
  doingQuest: null,
  completedQuests: [],
  // The total width of the game screen. Since our grid takes up the entire screen
  //  this is just the width of a tile times the width of the grid
  width: function() {
    return this.currentLevel.width * this.currentLevel.tilewidth;
  },

  // The total height of the game screen. Since our grid takes up the entire screen
  //  this is just the height of a tile times the height of the grid
  height: function() {
    return this.currentLevel.height * this.currentLevel.tileheight;
  },

  viewportWidth: 800,
  viewportHeight: 600
}
