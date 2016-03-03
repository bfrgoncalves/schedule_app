
function readSchedule(scheduleObject, callback){

	var scheduleUtils = schedule_utils();

	var scheduleLocation = scheduleObject.scheduleLocation || 'tests/scheduleTest.txt';
	var sessionsLocation = scheduleObject.sessionsLocation || 'tests/sessionsTest.txt';
	var presentationsLocation = scheduleObject.presentationsLocation || 'tests/presentationsTest.txt';
	var postersLocation = scheduleObject.postersLocation || 'tests/postersTest.txt';

	var sessions = {};
	var allNames = [];
	var allTitles = [];
	var schedule = [];
	var presentations = [];
	var allPosters = {};

	scheduleUtils.getSessions(sessionsLocation, function(results){
		sessions = results;
		scheduleUtils.getPosters(postersLocation, function(results){
			allPosters = results;
			scheduleUtils.getSchedule(scheduleLocation, function(results){
				schedule = results;
				scheduleUtils.getPresentations(sessions, allPosters, presentationsLocation, function(allNames, allTitles, allPresenters){
					callback({sessions:sessions, schedule:schedule, allNames:allNames, allTitles:allTitles, allPosters:allPosters, allPresenters: allPresenters});
				});
			});
		});
	});
}