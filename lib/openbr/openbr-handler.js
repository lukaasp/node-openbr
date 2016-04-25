var exec = require('child_process').exec;
var Converter = require("csvtojson").Converter;

var compare = function (file1, file2, callback) {
    var openbrCmd = 'br -algorithm FaceRecognition -compare ./lib/openbr/enrollData/' + file1 + ' ./lib/openbr/enrollData/' + file2;

    exec(openbrCmd, function (error, stdout) {
        stdout ? callback(stdout) : callback(error);
    });
};

var galCompare = function (file, callback) {
    var openbrCmd = 'br -algorithm FaceRecognition -compare all.gal ./lib/openbr/temp/' + file + ' ./lib/openbr/temp/results.csv';

    exec(openbrCmd, function (error) {
        if(!error){
            new Converter({}).fromFile("./lib/openbr/temp/results.csv",function(err,jsonArray){
                if(err) callback(err);
                var parsedResults = [];

                // if-else: CSVtoJSON returns different JSON when on OSX compared to Ubuntu for unknown reason
                if(Object.keys(jsonArray[0]).length ===2){
                    for (var key in jsonArray[0]) {
                        if (key !== 'File') {
                            var results = jsonArray[0][key];

                            for (var k in results){
                                parsedResults.push({name:k.split('/').pop(),score:results[k].jpg});
                            }
                            callback(parsedResults);
                        }
                    }
                }else{
                    for (var x in jsonArray[0]) {
                        if (x !== 'File') {
                            parsedResults.push({name:x.split('/').pop(),score:jsonArray[0][x].jpg});
                        }
                    }
                    callback(parsedResults);
                }
            });
        }
    });
};

var cleanUp = function (filename) {
    exec('rm -f ./lib/openbr/temp/' + filename);
};

var enrollToGallery = function(){
    exec("br -algorithm FaceRecognition -enrollAll -enroll ./lib/openbr/enrollData 'all.gal'", function (error, stdout) {
        error ? console.log(error) : console.log('All in gallery');
    });
};

module.exports = {
    compare: compare,
    cleanUp: cleanUp,
    enrollToGallery:enrollToGallery,
    galCompare:galCompare
};