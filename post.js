const mysql = require('mysql');

const con = mysql.createConnection({
	host: 'localhost',
	user: 'serveradmin',
	password: 'Cm%!35Oa3C7^l',
	database: 'chat'
});


exports.post = function (req, res) {

	con.connect((err) => {
		if(err) throw err;
		console.log("Connection established for Posts");
	});

	console.log(req.url);

	var value = {'room': req.search('room'), 'user': req.search('user'), 
		'text': req.search('text')};

	if(req.url == 'New'){
		con.query('INSERT INTO rooms (name, url) VALUES(?, ?)', value.room, '/' + value.room, (err) =>{
			if(err) res.writeHead(500);
			res.writeHead(200);
		});
	}
	else if(req.url == 'Messages'){
		con.query('INSERT INTO ? (user, message), (?, ?)', values.room, value.user, value.text, (err) => {
			if(err) res.writeHead(500);
			res.writeHead(200);
		});

	}

	con.end((err) => {
		if(err) throw err;
		console.log('Connection Terminated.');
	})

}
