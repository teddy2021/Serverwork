// Kody Manastyrski
// Started 08/04/19
// Version 1

const http = require('http');
const path = require('path');
const fs = require('fs');

const getter = require('./get.js');
const poster = require('./post.js');
const port = process.env.PORT || 8080;

const server = http.createServer((req, resp) => {

	console.log(req.url);
	var method = req.method;
	// obtain the path to requested file
	let filePath = path.join(__dirname, 'public', req.url == '/' ? 'hub.html' : req.url);
	
	// obtain file extension;
	let extname = path.extname(filePath);

	// default response type
	let contentType = 'text/html';

	// check extension and change where necessary
	switch(extname){
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.json':
			contentType = 'application/json';
			break;
		case '.png':
			contentType = 'image/png';
			break;
		case '.jpg':
			contentType = 'image/jpg';
			break;
	}
	console.log(method)
	if(method == 'GET'){
	// try to read the file
		if(req.url == '/Pages' || req.url == '/Messages'){

			getter.get(req, resp);
		}
		else{
		fs.readFile(filePath, (err, data) => {
			if (err){
				if(err.code == 'ENOENT'){
					fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) =>{
						resp.writeHead(200, { 'Content-Type' : 'text/html'});
						resp.end(data, 'utf8');
					})
				}
				else{
					resp.writeHead(500);
					resp.end(`Server Error: ${err.code}`);
				}
			}
			else{
				resp.writeHead(200, {'Content-Type': contentType});
				resp.end(data, 'utf8');
			}
		});
		}
	}
	else if(method == 'POST'){
		poster.post(req, resp);
	}
});
server.listen(port, () => {console.log(`Server running on port ${port}`)});
