'use strict';

var nodeStatic = require('node-static');
var file = new nodeStatic.Server('./public');

require('http').createServer(function (req, res) {
  req.addListener('end', function () {
    file.serve(req, res);
  }).resume();
}).listen(3000);
