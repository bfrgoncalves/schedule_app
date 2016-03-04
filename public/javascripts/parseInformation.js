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

function parsePosterInformation(allPosters, sessions, value, method, callback){

	if(method == 'title'){
		searchPosterByTitle(allPosters, sessions, value, function(results){
			callback(results);
		});

	} 
	if(method == 'name'){
		searchPosterByName(allPosters, sessions, value, function(results){
			callback(results);
		});
	}

}

function searchPosterByTitle(allPosters, sessions, value, callback){

	var resultsArray = [];
	for(i in allPosters){

		for(j in allPosters[i].posters){
			var titleWithoutItalic = allPosters[i].posters[j].title.replace(/<i>/g, '');
			titleWithoutItalic = titleWithoutItalic.replace(/<\/i>/g, '');
			if(titleWithoutItalic == value) resultsArray.push({searched: value, presentation: allPosters[i].posters[j], presentationID: j, sessionInfo: [ allPosters[i].posters[j].session_id, sessions[allPosters[i].posters[j].session_id].subject, '']});
		}
	}
	callback(resultsArray);
}

function searchPosterByName(allPosters, sessions, value, callback){

	var resultsArray = [];
	for(i in allPosters){
		for(j in allPosters[i].posters){
			var authors = allPosters[i].posters[j].authors.split(';');
			for(z in authors){
				if(authors[z].split('_')[0].trim() == value.trim()) resultsArray.push({searched: value, presentation: allPosters[i].posters[j], presentationID: j, sessionInfo: [allPosters[i].posters[j].session_id, sessions[allPosters[i].posters[j].session_id].subject, '']});
			}
		}
	}
	callback(resultsArray);
}

function searchByTitle(sessions, value, callback){

	var resultsArray = [];
	for(i in sessions){

		for(j in sessions[i].presentations){
			var titleWithoutItalic = sessions[i].presentations[j].title.replace(/<i>/g, '');
			titleWithoutItalic = titleWithoutItalic.replace(/<\/i>/g, '');
			if(titleWithoutItalic == value) resultsArray.push({searched: value, presentation: sessions[i].presentations[j], presentationID: j, sessionInfo: [i, sessions[i].subject, sessions[i].time]});
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