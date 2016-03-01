
function read_csv(fileLocation, callback){

  	parseData(fileLocation, callback);
	
}

function parseData(url, callBack) {
    Papa.parse(url, {
        download: true,
        delimiter: "\t",
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            callBack(results.data);
        }
    });
}