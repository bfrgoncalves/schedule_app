function parseInformation(sessions, value, method, callback){

	if(method == 'title'){
		searchByTitle(sessions, value, function(results){
			callback(results);
		});

	} 
	if(method == 'name'){
		searchByName(sessions, value, function(results){
			callback(results);
		});
	}

}

function searchByTitle(sessions, value, callback){

	var resultsArray = [];
	for(i in sessions){

		for(j in sessions[i].presentations){
			if(sessions[i].presentations[j].title == value) resultsArray.push({searched: value, presentation: sessions[i].presentations[j], presentationID: j, sessionInfo: [i, sessions[i].subject, sessions[i].time]});
		}
	}
	callback(resultsArray);
}

function searchByName(sessions, value, callback){

	var resultsArray = [];
	for(i in sessions){
		for(j in sessions[i].presentations){
			var authors = sessions[i].presentations[j].authors.split(';');
			for(z in authors){
				if(authors[z].split('_')[0].trim() == value.trim()) resultsArray.push({searched: value, presentation: sessions[i].presentations[j], presentationID: j, sessionInfo: [i, sessions[i].subject, sessions[i].time]});
			}
		}
	}
	callback(resultsArray);
}