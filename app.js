'use strict';

var nodeStatic = require('node-static');
var file = new nodeStatic.Server('./public');
var port = (process.env.PORT || 3000);

require('http').createServer(function (req, res) {
  console.info('%s - %s', req.method, req.url);

  req.addListener('end', function () {
    file.serve(req, res);
  }).resume();
}).listen(port, function () {
  console.log('Listening at 0.0.0.0:' + port + '...');
});
