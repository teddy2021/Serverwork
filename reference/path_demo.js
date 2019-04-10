const path = require('path');
const fs = require('fs');
const os = require('os');
const url = require('url');
const EventEmitter = require('events');

// ====path====
// base file name
console.log(path.basename(__filename));

// directory name
console.log(path.dirname(__filename));

// file extension
console.log(path.extname(__filename));

// create path object
console.log(path.parse(__filename));

// concatenate paths
console.log(path.join(__dirname, "test", "hello.html"));


//===file system====
// create folder
/**
fs.mkdir(path.join(__dirname,'dog'),{},err => {
	if(err) throw err;
	console.log('made directory dog');
	}
);

var file = path.join(__dirname, '/dog', 'hello.txt');

// create and write file
fs.writeFile(
	file,
	"Hello, I'm new here.",
	err => {
		if (err) throw err;
		console.log("Created file hello.txt");
	}
);

// append to file
fs.appendFile(
	file,
	"I am learning node.js",
	err => {
		if (err) throw err;
		console.log("Appended to hello.txt");
	}
);

//read file
fs.readFile(
	file,
	'utf8',
	(err, data) => {
		if(err) throw err;
		console.log(data);
	}
);

// rename file
var newfile = path.join(__dirname, '/dog', 'helloworld.txt');
fs.rename(file, newfile, err => {
		if(err) throw err;
		console.log('hello.txt renamed to helloworld.txt');
	}
);

**/
//===os===
// platform
console.log(os.platform());

// CPU architecture
console.log(os.arch());

// CPU core info
console.log(os.cpus());

// Free memory
console.log(os.freemem());

// Total memory
console.log(os.totalmem());

// Home dir
console.log(os.homedir());

// Uptime
console.log(os.uptime());

//===url===

var addr = 'https://facebook.com/home.html?user=1&size=cat';

const myUrl = new url.URL(addr);

// Serialised url
console.log(myUrl.href);
console.log(myUrl.toString());

// host/root dom
console.log(myUrl.host);

// hostname
console.log(myUrl.hostname);

// pathname
console.log(myUrl.pathname);

// Serialised query
console.log(myUrl.search);

// Params object
console.log(myUrl.searchparams);

// Add param
myUrl.searchParams.append('abc', '123');

console.log(myUrl.searchparams);

//===event===
class Emitter extends EventEmitter{}

const emitter = new Emitter();

emitter.on('event', () => console.log('Event Fired.'));

emitter.emit('event');
