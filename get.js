const mysql = require('mysql');

// Get

const con = mysql.createConnection({
	host:'localhost',
	user:'serveradmin',
	password: 'Cm%!35Oa3C7^l',
	database:'chat'
});



exports.get = function (req, res){

	console.log(req.url);
	console.log(req.params);

	if(req.url == '/Pages'){
		con.query('SELECT name FROM rooms', (err, result, fields) => {
			if(err){
				res.writeHead(500);
			}
			else{
				res.writeHead(200);
				for(var i = 0; i < result.lengt; i += 1){
					console.log(result[i].name);
				}
			}
		});
	}
	
	else if(req.url == '/Messages'){
		con.query('SELECT message FROM ?', req.ttl, (err, result) => {
			if(err){
				res.writeHead(500);
			}
			else{
				res.writeHead(200);
				for(var i = 0; i < result.length; i += 1){
					console.log(result[i].text);
				}
			}
		})
	}
}


