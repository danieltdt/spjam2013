(function (Crafty) {
  'use strict';

  Crafty.scene('Apotecarie', function () {
    Obsidian.devour('apotecarie', function () {
      new Door(7, 8).setDestination('Village');
      new Door(8, 8).setDestination('Village');

      //if Apotecarie Quest is not done and no quest is on going, start Apotecarie Quest actions
      if( Config.completedQuests.indexOf['ApotecarieQuest'] < 0 && Config.doingQuest == null ) {
        //player.move([e,w], tiles * [Config.currentLevel.tilewidth])
        //player.move([n,s], tiles * [Config.currentLevel.tileheight])
        // new Hero()
        //hero.moves in([e,w], tiles * [Config.currentLevel.tilewidth])
        //hero.moves in([n,s], tiles * [Config.currentLevel.tileheight])

        // sequencia de dialogo recebendo a quest
        //hero.moves out([e,w], tiles * [Config.currentLevel.tilewidth])
        //hero.moves out([n,s], tiles * [Config.currentLevel.tileheight])

        //Config.doingQuest = 'ApotecarieQuest';
      }
      //if Apotecarie Quest is on going but not completed
      else if ( Config.completedQuests.indexOf['ApotecarieQuest'] < 0 && Config.doingQuest == 'ApotecarieQuest' ) {
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

          //Config.completedQuests.push('ApotecarieQuest');
          //Config.doingQuest = null;
      }
    });
  });
})(Crafty);
