
var exec = require('child_process').exec;

var compare = function(file1, file2, callback){
    var openbrCmd = 'br -algorithm FaceRecognition -compare ./lib/openbr/enrollData/' + file1 + ' ./lib/openbr/enrollData/' + file2;

    exec(openbrCmd, function (error, stdout) {
        stdout ? callback(stdout):callback(error);
    });
};

var cleanUp= function(filename){
    exec('rm -f ./lib/openbr/enrollData/'+filename);
};

module.exports  = {
    compare: compare,
    cleanUp: cleanUp
};