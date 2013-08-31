'use strict';

var nodeStatic = require('node-static');
var file = new nodeStatic.Server('./public');

require('http').createServer(function (req, res) {
  console.info('%s - %s', req.method, req.url);

  req.addListener('end', function () {
    file.serve(req, res);
  }).resume();
}).listen(3000, function () {
  console.log('Listening at 3000...');
});
