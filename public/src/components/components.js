// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Config.currentLevel.tilewidth,
      h: Config.currentLevel.tileheight
    })
  },

  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Config.currentLevel.tilewidth, y: this.y/Config.currentLevel.tileheight }
    } else {
      this.attr({ x: x * Config.currentLevel.tilewidth, y: y * Config.currentLevel.tileheight });
      return this;
    }
  }
});

// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  },
});

Crafty.c('PlayerCharacter', {
    init: function() {
      this.requires('Actor, Fourway, Color, Collision')
        .fourway(4)
        .color('rgb(20, 75, 40)')
        .collision( new Crafty.polygon([10,50],[40,50],[40,80],[10,80]) )
        .bind('Moved', function(from) {        
          // stop moving when hit obstacle
          if( this.hit('Block') ){
            this.attr({x: from.x, y:from.y});
          }
        });
    }
});

// Crafty.e("2D, DOM, Fourway, SpriteAnimation, Sprite, Ogre, Collision")
//               .attr({x: 50, y: 50, z: 10, isWater: false}) 
//               .animate("walk_left", 0, 1, 3)
//               .animate("walk_right", 0, 2, 3) 
//               .animate("walk_up", 0, 3, 3)  
//               .animate("walk_down", 0, 0, 3)            
//               .fourway(2)                   
//               .collision( new Crafty.polygon([10,50],[40,50],[40,67],[10,67]) )
//               .bind('Moved', function(from) {
            
//                 // stop moving when hit obstacle
//                 if( this.hit('Obstacle') || this.hit('Fence') ){
//               this.attr({x: from.x, y:from.y});
//             }
                
//                 //is in water
//             if(this.isWater == false &&  this.hit("Water") ){             
//               this.crop(0, 0, 50, 55); //Cut off legs
//               this.fourway(1);  //movement is slower
//               this.isWater = true;              
//             }
            
//                 //is in ground
//             if(this.isWater == true && !this.hit("Water") ){              
//               this.crop(0,0, 50, 67);
//               this.fourway(2);  
//               this.isWater = false;               
//             }
                                                
//           })                  
//           .bind("NewDirection",
//             function (direction) {
//                   if (direction.x < 0) {
//                       if (!this.isPlaying("walk_left"))
//                           this.stop().animate("walk_left", 10, -1);
//                   }
//                   if (direction.x > 0) {
//                       if (!this.isPlaying("walk_right"))
//                           this.stop().animate("walk_right", 10, -1);
//                   }
//                   if (direction.y < 0) {
//                       if (!this.isPlaying("walk_up"))
//                           this.stop().animate("walk_up", 10, -1);
//                   }
//                   if (direction.y > 0) {
//                       if (!this.isPlaying("walk_down"))
//                           this.stop().animate("walk_down", 10, -1);
//                   }
//                   if(!direction.x && !direction.y) {
//                       this.stop();
//                   }
//           })              
//         });


// A table is just an Actor with a certain color
Crafty.c('Table', {
  init: function() {
    this.requires('Actor, Color, Collision, Block')
      .color('rgb(195, 33, 72)');
  },
});
