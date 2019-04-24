const mysql = require('mysql');

// Get

const con = mysql.createConnection({
	host:'localhost',
	user:'serveradmin',
	password: 'Cm%!35Oa3C7^l',
	database:'chat'
});



exports.get = function (req, res){


	if(req.url == '/Pages'){
		console.log('Request for page list');
		con.query('SELECT * FROM rooms', (err, result) => {
			if(err){
				console.log('error while getting page list')
				res.writeHead(500, {'Content-Type': 'text/html'});
				throw err;
			}
			else{
				console.log('successfully retrieved page list');
				res.writeHead(200, {'Content-Type' : 'application/json'});
				res.write(JSON.stringify(result));
				res.end();
			}
		});
	}
	else if(req.url == '/Messages'){
		console.log('Request for message list');
		con.query('SELECT * FROM ? ORDER BY dt', req.title, (err, result) => {
			if(err){
				console.log('error while obtaining message list');
				res.writeHead(500, {'Content-Type': 'text/html'});
				res.end();
				throw err;
			}
			else{
				console.log('successfully obtained message list');
				res.writeHead(200, {'Content-Type': 'application/json'});
				res.write(JSON.stringify(result));
				res.end();
			}
		});
	}
}


