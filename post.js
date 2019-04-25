const mysql = require('mysql');

// Get

const con = mysql.createConnection({
	host:'localhost',
	user:'serveradmin',
	password: 'Cm%!35Oa3C7^l',
	database:'chat'
});



exports.post = function (req, res){

	var values;
	var status = 200;
	var content = 'text/html';

	var body = '';
	req.on('data', chunk => {
		body += chunk;
	});

	req.on('end', ()=>{
		values = JSON.parse(body);
		console.log(values.room);

		if(req.url == '/New'){
			console.log('Starting posting new Room ' + values.room);
			con.query('INSERT INTO rooms (name, url) VALUES(?,?)', [values.room, '/' + values.room],
			(err) => {
				if(err){
					console.log('error while creating entry for room in rooms');
					status = 500;
				}
				else{
					console.log('rooms entry successfully created');
				}
			});
			
			console.log('Creating room table');
			con.query('CREATE TABLE IF NOT EXISTS ' + values.room + ' (user VARCHAR(30), text VARCHAR(200), dt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)',
			req.room, 
			(err) =>{
				if(err){
					console.log('error while creating room table');
					status = 500;
				}
				else{
					console.log('room table successfully created');
					status = 200;
				}
			});
		}
		else if(req.url == '/Messages'){

			console.log('Request to post to room: ' + values.room + ' with text ' + values.message);
			con.query('INSERT INTO ' + values.room + ' (user, text) VALUES(?, ?)', 
			[values.user, values.message], 
			(err) => {
				if(err){
					console.log('error while posting message to rooms');
					status = 500;
				}
				else{
					console.log('successfully posted to room');
					status = 200;
				}
			});
		}
	});
	res.writeHead(status, {'Content-Type': content});
}


