// Kody Manastyrski
// Started 08/04/19
// Version 1

const http = require('http');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 8080;

const server = http.createServer((req, resp) => {
	console.log(req.url);
	if(req.url == '/'){
		resp.end('<h1>HOME</h1>');
	}
});

server.listen(port, () => {console.log(`Server running on port ${port}`)});
