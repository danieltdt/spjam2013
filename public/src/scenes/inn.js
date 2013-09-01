(function (Crafty) {
  'use strict';

  Crafty.scene('Inn', function () {
    Obsidian.devour('inn', function () {
      new Door(8, 9).setDestination('Village');
      new Door(7, 9).setDestination('Village');

      //if Inn Quest is not done and no quest is on going, start Inn Quest actions
      if( Config.completedQuests.indexOf['InnQuest'] < 0 && Config.doingQuest == null ) {
        //player.move([e,w], tiles * [Config.currentLevel.tilewidth])
        //player.move([n,s], tiles * [Config.currentLevel.tileheight])
        // new Hero()
        //hero.moves in([e,w], tiles * [Config.currentLevel.tilewidth])
        //hero.moves in([n,s], tiles * [Config.currentLevel.tileheight])

        // sequencia de dialogo recebendo a quest
        //hero.moves out([e,w], tiles * [Config.currentLevel.tilewidth])
        //hero.moves out([n,s], tiles * [Config.currentLevel.tileheight])

        //Config.doingQuest = 'InnQuest';
      }
      //if Inn Quest is on going but not completed
      else if ( Config.completedQuests.indexOf['InnQuest'] < 0 && Config.doingQuest == 'InnQuest' ) {
        //if Inventario.has QuestItens
          //player.move([e,w], tiles * [Config.currentLevel.tilewidth])
          //player.move([n,s], tiles * [Config.currentLevel.tileheight])
          // new Hero()
          //hero.moves in([e,w], tiles * [Config.currentLevel.tilewidth])
          //hero.moves in([n,s], tiles * [Config.currentLevel.tileheight])

          // sequencia de dialogo
          // troca de itens
          //hero.moves out([e,w], tiles * [Config.currentLevel.tilewidth])
          //hero.moves out([n,s], tiles * [Config.currentLevel.tileheight])

          //Config.completedQuests.push('InnQuest');
          //Config.doingQuest = null;
      }
    });
  });
})(Crafty);
