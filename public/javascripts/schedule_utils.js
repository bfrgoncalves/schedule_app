
function schedule_utils(){
	return {
		getSessions: getSessions,
		getSchedule: getSchedule,
		getPresentations: getPresentations
	}
}

function getSessions(sessionsLocation, callback){

	var sessions = {};

	read_csv(sessionsLocation, function(results){
		for(i in results){
			sessions[results[i].id] = {};
			sessions[results[i].id].subject = results[i].subject;
			sessions[results[i].id].time = results[i].time;
		}
		callback(sessions);
	});
}

function getSchedule(scheduleLocation, callback){

	var schedule = {};

	read_csv(scheduleLocation, function(results){
		var prevDay = -1;
		for(i in results){
			if(prevDay != results[i].day){
				schedule[results[i].day] = [];
				prevDay = results[i].day;
			}
			schedule[results[i].day].push({time:results[i].time, topics: results[i].topics, session_id: results[i].session_id});
		}
		callback(schedule);
	});
}

function getPresentations(sessions, presentationsLocation, callback){

	var presentations = {};
	var allNames = [];
	var allTitles = [];

	read_csv(presentationsLocation, function(results){
		var prevSessionID = -1, countSessions = 0;;
		currentSessionID = results[0].session_ID;

		for(i in results){
			if(currentSessionID != results[i].session_ID){
				sessions[currentSessionID].presentations = presentations;
				presentations = {};
				currentSessionID = results[i].session_ID;
			}
			presentations[results[i].id] = {};
			presentations[results[i].id].session_id = results[i].session_ID;
			presentations[results[i].id].title = results[i].title;
			presentations[results[i].id].speaker = results[i].speaker;
			presentations[results[i].id].authors = results[i].authors;
			presentations[results[i].id].affiliations = results[i].affiliations.split(';');
		}

		sessions[currentSessionID].presentations = presentations;

		for (i in sessions){
			for(j in sessions[i].presentations){
				var arrayOfAuthors = sessions[i].presentations[j].authors.split(';');
				for(x in arrayOfAuthors){
					var nameToCheck = arrayOfAuthors[x].split('_')[0];
					if(allNames.indexOf(nameToCheck) < 0) allNames.push(nameToCheck.trim());
				}
				allTitles.push(sessions[i].presentations[j].title.trim());
			}
		}

		callback(allNames, allTitles);
	});
}