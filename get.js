const mysql = require('mysql');

const con = mysql.createConnection({
	host:'localhost',
	user:'serveradmin',
	password: 'Cm%!35Oa3C7^l',
	database:'chat'
});

function get(req, res){
	var values = {
		room: req.search('room')
	}
	if(req.url == 'Pages'){
		con.query('SELECT name FROM rooms', (err, result) => {
			if(err){
				res.writeHead(500);
			}
			else{
				res.writeHead(200);
				console.log(result);
				res.end(result);
			}
		})
	}
}
