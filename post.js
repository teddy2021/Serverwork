const mysql = require('mysql');

// Get

const con = mysql.createConnection({
	host:'localhost',
	user:'serveradmin',
	password: 'Cm%!35Oa3C7^l',
	database:'chat'
});



exports.post = function (req, res){

	var status = 200;
	var content = 'text/html';

	if(req.url == '/New'){
		console.log('Starting posting new Room ' + req.room);
		con.query('INSERT INTO rooms (name, url) VALUES(?,?)', 
		[req.room, '/'+req.room],
		(err) => {
			if(err){
				console.log('error while creating entry for room in rooms');
				status = 500;
				throw err;
			}
			else{
				console.log('rooms entry successfully created');
			}
		});
		
		console.log('Creating room table');
		con.query('CREATE TABLE IF NOT EXISTS ' + req.room + ' (user VARCHAR(30), text VARCHAR(200), dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)',
		req.room, 
		(err) =>{
			if(err){
				console.log('error while creating room table');
				status = 500;
				throw err;
			}
			else{
				console.log('room table successfully created');
				status = 200;
			}
		});
	}
	else if(req.url == '/Messages'){

		console.log('Request to post to room: ' + req.room + ' with text ' + req.message);
		con.query('INSERT INTO ' + req.room + ' (user, text) VALUES(?, ?)', 
		[req.user, req.message], 
		(err) => {
			if(err){
				console.log('error while posting message to rooms');
				status = 500;
				throw err;
			}
			else{
				console.log('successfully posted to room');
				status = 200;
			}
		});
	}

	res.writeHead(status, {'Content-Type': content});
}


