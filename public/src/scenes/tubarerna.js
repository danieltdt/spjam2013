(function (Crafty) {
  'use strict';

  Crafty.scene('Tubarerna', function () {
    Obsidian.devour('tubarerna', function () {
      new Door(8, 11).setDestination('Village');
      new Door(7, 11).setDestination('Village');

      var player = Crafty('PlayerCharacter');

      //if Tubarerna Quest is not done and no quest is on going, start Tubarerna Quest actions
      if( Config.completedQuests.indexOf('TubarernaQuest') < 0 && Config.doingQuest == null ) {
        console.log('entrou');
        player.disableControl();
        player.move('w', 3 * Config.currentLevel.tilewidth);

        player.move('n', 2 * Config.currentLevel.tileheight);
        player.move('w', 1 * Config.currentLevel.tilewidth);
        player.move('n', 3 * Config.currentLevel.tileheight);
        
        var hero = new Hero(7,11);
        hero.move('n', 3 * Config.currentLevel.tileheight);
        hero.move('e', 1 * Config.currentLevel.tilewidth);
        hero.move('n', 4 * Config.currentLevel.tileheight);
        hero.move('w', 3 * Config.currentLevel.tileheight);

        //var dialog = new DialogBox(0, 400);
        //dialog.setText("Onde eu consigo uma torta de maça?");
        // sequencia de dialogo recebendo a quest
        //hero.moves out([e,w], tiles * [Config.currentLevel.tilewidth])
        //hero.moves out([n,s], tiles * [Config.currentLevel.tileheight])

        //Config.doingQuest = 'TubarernaQuest';
      }
      //if Tubarerna Quest is on going but not completed
      else if ( Config.completedQuests.indexOf['TubarernaQuest'] < 0 && Config.doingQuest == 'TubarernaQuest' ) {
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

          //Config.completedQuests.push('TubarernaQuest');
          //Config.doingQuest = null;
      }
    });
  });
})(Crafty);
