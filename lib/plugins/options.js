var options = {};
var args= process.argv;

options.port = 8001;

for (var i = 0; i < args.length; i++) {
    if(process.argv[i] ==='-p'){
        options.port= process.argv[i+1];
    }
}

console.log('App started on port: ' + options.port);

module.exports = options;
