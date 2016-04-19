var exec = require('child_process').exec;

var compare = function (file1, file2, callback) {
    var openbrCmd = 'br -algorithm FaceRecognition -compare ./lib/openbr/enrollData/' + file1 + ' ./lib/openbr/enrollData/' + file2;

    exec(openbrCmd, function (error, stdout) {
        stdout ? callback(stdout) : callback(error);
    });
};

var galCompare = function (file, callback) {
    var openbrCmd = 'br -algorithm FaceRecognition -compare all.gal ./lib/openbr/temp/' + file + ' ./lib/openbr/temp/results.csvgit commi';

    exec(openbrCmd, function (error, stdout) {
        stdout ? callback(stdout) : callback(error);
    });
};


var cleanUp = function (filename) {
    exec('rm -f ./lib/openbr/enrollData/' + filename);
};

var enrollToGallery = function(callback){
    exec("br -algorithm FaceRecognition -enrollAll -enroll ./lib/openbr/enrollData 'all.gal'", function (error, stdout) {
        stdout ? callback(stdout) : callback(error);
    });
};

module.exports = {
    compare: compare,
    cleanUp: cleanUp,
    enrollToGallery:enrollToGallery,
    galCompare:galCompare
};