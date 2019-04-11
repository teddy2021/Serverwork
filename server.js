// Kody Manastyrski
// Started 08/04/19
// Version 1

const http = require('http');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 8080;

const server = http.createServer((req, resp) => {
	console.log(req.url);
	/** if(req.url == '/'){
		fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) =>{
			if(err) throw err;
			resp.writeHead(200, {'Content-Type' : "text/html"});
			resp.end(data);
		});
	}
	else if(req.url == '/about'){
		fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, data) =>{
			if(err) throw err;
			resp.writeHead(200, {'Content-Type' : "text/html"});
			resp.end(data);
		});
	}
	else if(req.url == '/api/users'){
		const users = [
			{name: 'bob', age: 5},
			{name: 'cathy', age: 6}
		];
		resp.writeHead(200, { 'Content-Type': 'application/json'});
		resp.end(JSON.stringify(users));
	} **/

	let filePath = path.join(__dirname, 'public', req.url == '/' ? 'index.html' : req.url);
	
	let extname = path.extname(filePath);
	console.log(extname);

	let contentType = 'text/html';

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

	fs.readFile(filePath, (err, data) => {
		   if (err){
			   if(err.code == 'ENOENT'){
				   // page not found
				   fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) => {
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
});
server.listen(port, () => {console.log(`Server running on port ${port}`)});
