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
		con.query('SELECT * FROM rooms', (err, result) => {
			if(err){
				res.writeHead(500, {'Content-Type': 'text/html'});
				throw err;
			}
			else{
				res.writeHead(200, {'Content-Type' : 'application/json'});
				res.write(JSON.stringify(result));
				res.end();
			}
		});
	}
	else if(req.url == '/Messages'){
		con.query('SELECT * FROM ? ORDER BY dt', req.title, (err, result) => {
			if(err){
				res.writeHead(500, {'Content-Type': 'text/html'});
				res.end();
				throw err;
			}
			else{
				res.writeHead(200, {'Content-Type': 'application/json'});
				res.write(JSON.stringify(result));
				res.end();
			}
		});
	}
}


