
function readSchedule(scheduleObject, callback){

	var scheduleUtils = schedule_utils();

	var scheduleLocation = scheduleObject.scheduleLocation || 'tests/scheduleTest.txt';
	var sessionsLocation = scheduleObject.sessionsLocation || 'tests/sessionsTest.txt';
	var presentationsLocation = scheduleObject.presentationsLocation || 'tests/presentationsTest.txt';

	var sessions = {};
	var allNames = [];
	var allTitles = [];
	var schedule = [];
	var presentations = [];

	scheduleUtils.getSessions(sessionsLocation, function(results){
		sessions = results;
		scheduleUtils.getSchedule(scheduleLocation, function(results){
			schedule = results;
			scheduleUtils.getPresentations(sessions, presentationsLocation, function(allNames, allTitles){
				callback({sessions:sessions, schedule:schedule, allNames:allNames, allTitles:allTitles});
			});
		});
	});
}