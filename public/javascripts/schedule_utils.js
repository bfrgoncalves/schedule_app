
function schedule_utils(){
	return {
		getSessions: getSessions,
		getSchedule: getSchedule,
		getPresentations: getPresentations,
		getPosters: getPosters,
		getAnnouncements: getAnnouncements
	}
}

function getSessions(sessionsLocation, callback){

	var sessions = {};

	read_csv(sessionsLocation, function(results){
		for(i in results){
			sessions[results[i].id] = {};
			sessions[results[i].id].subject = specialCasesFormat(results[i].subject);
			sessions[results[i].id].time = results[i].time;
		}
		callback(sessions);
	});
}

function getPosters(postersLocation, callback){

	var all_posters = {};
	var sessionPosters = {};

	read_csv(postersLocation, function(results){
		var prevPosterSession = -1, countSessions = 0;
		var currentPosterSession = results[0].poster_session;
		for(i in results){
			if(currentPosterSession != results[i].poster_session){
				all_posters[currentPosterSession] = {};
				all_posters[currentPosterSession].posters = sessionPosters;
				sessionPosters = {};
				currentPosterSession = results[i].poster_session;
			}

			sessionPosters[results[i].id] = {};
			sessionPosters[results[i].id].session_id = results[i].session_ID;
			sessionPosters[results[i].id].title = specialCasesFormat(results[i].title);
			sessionPosters[results[i].id].speaker = results[i].presenter;
			sessionPosters[results[i].id].authors = results[i].authors;
			sessionPosters[results[i].id].affiliations = results[i].affiliations.split(';');
		}
		all_posters[currentPosterSession] = {};
		all_posters[currentPosterSession].posters = sessionPosters;

		callback(all_posters);
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

function getAnnouncements(announcementsLocation, callback){

	var announcements = [];
	var day = -1

	read_csv(announcementsLocation, function(results){
		var prevDay = -1;
		for(i in results){
			if(prevDay != results[i].day){
				announcements.push([]);
				day++;
				prevDay = results[i].day;
			}
			announcements[day].push({day: results[i].day, time:results[i].time, announcement: results[i].announcement});
		}
		callback(announcements);
	});
}

function getPresentations(sessions, allPosters, presentationsLocation, callback){

	var presentations = {};
	var allNames = [];
	var allTitles = [];
	var allPresenters = [];

	read_csv(presentationsLocation, function(results){
		var prevSessionID = -1, countSessions = 0;
		var currentSessionID = results[0].session_ID;

		for(i in results){
			if(currentSessionID != results[i].session_ID){
				sessions[currentSessionID].presentations = presentations;
				presentations = {};
				currentSessionID = results[i].session_ID;
			}
			presentations[results[i].id] = {};
			presentations[results[i].id].session_id = results[i].session_ID;
			presentations[results[i].id].title = specialCasesFormat(results[i].title);
			presentations[results[i].id].speaker = results[i].speaker;
			presentations[results[i].id].authors = results[i].authors;
			presentations[results[i].id].affiliations = results[i].affiliations.split(';');
			presentations[results[i].id].time = results[i].time;
		}

		sessions[currentSessionID].presentations = presentations;

		for (i in sessions){
			for(j in sessions[i].presentations){
				var arrayOfAuthors = sessions[i].presentations[j].authors.split(';');
				for(x in arrayOfAuthors){
					var nameToCheck = arrayOfAuthors[x].split('_')[0].trim();
					if(allNames.indexOf(nameToCheck) < 0) allNames.push(nameToCheck.trim());
				}
				var nameToCheck = sessions[i].presentations[j].speaker.trim();
				if(allPresenters.indexOf(nameToCheck) < 0) allPresenters.push(nameToCheck.trim());

				allTitles.push(sessions[i].presentations[j].title.trim());
			}
		}

		for (i in allPosters){
			for(j in allPosters[i].posters){
				var arrayOfAuthors = allPosters[i].posters[j].authors.split(';');
				for(x in arrayOfAuthors){
					var nameToCheck = arrayOfAuthors[x].split('_')[0].trim();
					if(allNames.indexOf(nameToCheck) < 0) allNames.push(nameToCheck.trim());
				}
				var nameToCheck = allPosters[i].posters[j].speaker.trim();
				if(allPresenters.indexOf(nameToCheck) < 0) allPresenters.push(nameToCheck.trim());

				allTitles.push(allPosters[i].posters[j].title.trim());
			}
		}

		callback(allNames, allTitles, allPresenters);
	});
}
