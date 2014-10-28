var fs = require('fs')

var gruntfilePath = __dirname + '/../../Gruntfile.js'

if (!fs.existsSync(gruntfilePath)){
	fs.createReadStream(__dirname + '/Gruntfile.js').pipe(fs.createWriteStream(gruntfilePath));
}