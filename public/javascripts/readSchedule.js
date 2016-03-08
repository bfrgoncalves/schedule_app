
function readSchedule(scheduleObject, callback){

	var scheduleUtils = schedule_utils();

	var scheduleLocation = scheduleObject.scheduleLocation || 'tests/scheduleTest.txt';
	var sessionsLocation = scheduleObject.sessionsLocation || 'tests/sessionsTest.txt';
	var presentationsLocation = scheduleObject.presentationsLocation || 'tests/presentationsTest.txt';
	var postersLocation = scheduleObject.postersLocation || 'tests/postersTest.txt';
	var announcementsLocation = scheduleObject.announcementsLocation || 'tests/announcementsTest.txt';

	var sessions = {};
	var allNames = [];
	var allTitles = [];
	var schedule = [];
	var announcements = {};
	var presentations = [];
	var allPosters = {};

	scheduleUtils.getSessions(sessionsLocation, function(results){
		sessions = results;
		scheduleUtils.getPosters(postersLocation, function(results){
			allPosters = results;
			scheduleUtils.getSchedule(scheduleLocation, function(results){
				schedule = results;
				scheduleUtils.getAnnouncements(announcementsLocation, function(results){
					announcements = results;
					scheduleUtils.getPresentations(sessions, allPosters, presentationsLocation, function(allNames, allTitles, allPresenters){
						callback({sessions:sessions, schedule:schedule, allNames:allNames, allTitles:allTitles, allPosters:allPosters, allPresenters: allPresenters, announcements: announcements});
					});
				})
			});
		});
	});
}