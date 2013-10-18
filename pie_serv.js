var http = require('http'),
    url = require('url'),
    jsdom = require('jsdom'),
    child_proc = require('child_process'),
    w = 400,
    h = 400,
    scripts = ["file://"+__dirname+"/d3.min.js",
               "file://"+__dirname+"/d3.layout.min.js",
               "file://"+__dirname+"/pie.js"],
    htmlStub = '<!DOCTYPE html><div id="pie" style="width:'+w+'px;height:'+h+'px;"></div>';
 
http.createServer(function (req, res) {
  var convert = require('child_process').spawn("convert", ["svg:", "png:-"]),
    svgsrc = '<svg><rect height="100" width="100" style="fill:red;"/></svg>';

    convert.stdout.on('data', 
      function (data) {
        process.stdout.write(data);
      }
    );

  convert.stdin.write(svgsrc);
  convert.stdin.end();
}).listen(8888, "127.0.0.1");
 
console.log('Pie SVG server running at http://127.0.0.1:8888/');
console.log('ex. http://127.0.0.1:8888/?values=.4,.3,.2,.1');