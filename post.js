const mysql = require('mysql');

// Post

const con = mysql.createConnection({
	host: 'localhost',
	user: 'serveradmin',
	password: 'Cm%!35Oa3C7^l',
	database: 'chat'
});


exports.post = function (req, res) {


	console.log(req.url);


	if(req.url == 'New'){
		var value = {room: req.room};
		con.query('INSERT INTO rooms (name, url) VALUES(?, ?)', value.room, '/' + value.room, (err) =>{
			if(err) res.writeHead(500);
			res.writeHead(200);
		});
	}
	else if(req.url == 'Messages'){
		var value = {room: req.room, user: req.user, 
			text: req.text};
		con.query('INSERT INTO ? (user, message), (?, ?)', value.room, value.user, value.text, (err) => {
			if(err) res.writeHead(500);
			res.writeHead(200);
		});

	}

	con.end((err) => {
		if(err) throw err;
		console.log('Connection Terminated.');
	})
}
