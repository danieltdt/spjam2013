(function (Crafty) {
  'use strict';

  var start = function (e) {
    if (e.key === Crafty.keys.SPACE) Crafty.scene('Village');
  };

  Crafty.scene('Load', function () {
    Crafty.background('#000');

    Crafty.e('2D, DOM, Image').image('/web/images/inicial.jpg');

    var loading = Crafty.e('2D, DOM, Text')
      .attr({
        w: Config.viewportWidth,
        h: 20,
        x: 0,
        y: 10
      })
      .text('Carregando...')
      .css({'text-align': 'center'})
      .textFont({size: '23px', weight: 'bold'});

    Crafty.audio.add({
      village_song: '/web/audio/village.mp3',
      apotecarie_song: '/web/audio/apotecarie.mp3',
      inn_song: '/web/audio/inn.mp3',
      tubarerna_song: '/web/audio/tubarerna.mp3',
      farm_house_song: '/web/audio/farm_house.mp3'
    });

    Crafty.load([
      '/web/images/apotecarie.png',
      '/web/images/cama_ocupada.png',
      '/web/images/cantos_de_parede_porta_inn.png',
      '/web/images/estante_3.png',
      '/web/images/fazenda.png',
      '/web/images/parede_e_piso.png',
      '/web/images/village_bg.png',
      '/web/images/cama_ocupada_2.png',
      '/web/images/cama.png',
      '/web/images/estante_4.png',
      '/web/images/inn.png',
      '/web/images/tiles_sheet.jpg',
      '/web/images/cama_ocupada_3.png',
      '/web/images/cama_quebrada.png',
      '/web/images/estante_2.png',
      '/web/images/estante.png',
      '/web/images/objetos.png',
      '/web/images/tubarerna.png',
      '/web/images/wanted_poster.png',
      '/web/images/dialog_box.png',
      '/web/images/chars/neusa.png',
      '/web/images/chars/hero.png'
    ], function () {
      Crafty.sprite(50, '/web/images/objetos.png', {
        spr_bucket:  [0, 0]
      });

      Crafty.sprite(50, 100, '/web/images/chars/neusa.png', {
        spr_player:  [0, 0],
      }, 0, 0);

      Crafty.sprite(50, 100, '/web/images/chars/hero.png', {
        spr_hero:  [0, 0],
      }, 0, 0);
    });

    this.bind('KeyDown', start);

    loading.destroy();
  }, function () {
    this.unbind('KeyDown', start);
  });
})(Crafty, jQuery);

