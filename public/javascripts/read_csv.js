
function read_csv(fileLocation, callback){

  	parseData(fileLocation, callback);
	
}

function parseData(url, callBack) {
    Papa.parse(url, {
        download: true,
        delimiter: "\t",
        header: true,
        dynamicTyping: true,
        encoding: "UTF-8",
        complete: function(results) {
            callBack(results.data);
        }
    });
}