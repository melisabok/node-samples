var http = require('http'),
url = require('url'),
jsdom = require('jsdom'),
child_proc = require('child_process'),
scripts = ["file://"+__dirname+"/d3.min.js",
           "file://"+__dirname+"/d3.layout.min.js",
           "file://"+__dirname+"/chart.js",
           "http://canvg.googlecode.com/svn/trunk/canvg.js"],
htmlStub = '<html><body><div id="pie" style="width:'+400+'px;height:'+400+'px;"></div><canvas id="svg-canvas"></canvas></body></html>'
;

http.createServer(function (req, res) {

	res.writeHead(200, {'Content-Type': 'image/png'});
	var convert = require('child_process').spawn("convert", ["svg:", "png:-"]);

	convert.stdout.on('data', function (data) {
    	res.write(data);
  	});
  
  	convert.on('exit', function(code) {
    	res.end();
  	});

	jsdom.env({features:{QuerySelector:true}, html:htmlStub, scripts:scripts, done:function(errors, window) {
	    //var svgsrc = window.insertPie("#pie", 400, 400, [0.25,0.25,0.5]).innerHTML;
	    var svgsrc = window.buildD3().innerHTML;

    	convert.stdin.write(svgsrc);
    	convert.stdin.end();
	}});

}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/')
