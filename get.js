const mysql = require('mysql');

const con = mysql.createConnection({
	host:'localhost',
	user:'serveradmin',
	password: 'Cm%!35Oa3C7^l',
	database:'chat'
});



exports.get = function (req, res){
	con.connect((err) => {
		if(err){
			throw err;
		}
		else{
			console.log('Connection established for Gets');
		}
	});


	if(req.url == '/Pages'){
		con.query('SELECT name FROM rooms', (err, result) => {
			if(err){
				res.writeHead(500);
			}
			else{
				res.writeHead(200);
				console.log(result);
				res.end(result);
			}
		});
	}
	
	else if(req.url == '/Messages'){
		con.query('SELECT message FROM ?', req.search('room'), (err, result) => {
			if(err){
				res.writeHead(500);
			}
			else{
				res.writeHead(200);
				console.log(result.toString());
				res.end(result);
			}
		})
	}
}


