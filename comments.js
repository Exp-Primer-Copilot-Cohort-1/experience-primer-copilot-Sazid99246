// Create web server
// 
// 1. Load http module
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = require('./comments');

// 2. Create server
http.createServer(function(req, res) {
	var pathname = url.parse(req.url).pathname;
	console.log("Request for " + pathname + " received.");
	if (pathname === '/') {
		pathname = '/index.html';
	}
	if (pathname === '/getComments') {
		comments.getComments(function(data) {
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			res.write(JSON.stringify(data));
			res.end();
		});
	} else {
		fs.readFile(pathname.substr(1), function(err, data) {
			if (err) {
				console.log(err);
				res.writeHead(404, {
					'Content-Type': 'text/html'
				});
			} else {
				res.writeHead(200, {
					'Content-Type': 'text/html'
				});
				res.write(data.toString());
			}
			res.end();
		});
	}
}).listen(8080);
console.log('Server running at http://