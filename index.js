$(document).ready(function(){
	
	var scheduleObject = {
		scheduleLocation : 'public/scheduleFiles/scheduleTest.txt',
		sessionsLocation : 'public/scheduleFiles/sessionsTest.txt',
		presentationsLocation : 'public/scheduleFiles/presentationsTest.txt',
		postersLocation : 'public/scheduleFiles/postersTest.txt'
	}
	
	readSchedule(scheduleObject, function(scheduleData){
		//console.log(scheduleData);
		sessions = scheduleData.sessions;
		allnames = scheduleData.allNames;
		alltitles = scheduleData.allTitles;
		schedule = scheduleData.schedule;
		allPosters = scheduleData.allPosters;

		assignAttributesToSearch(sessions, allPosters, allnames, 'listviewName');
		assignAttributesToSearch(sessions, allPosters, alltitles, 'listviewTitle');
		constructSchedule(schedule, sessions, allPosters);
	});

	$('.buttonHome').click(function(){
		$("[data-role=panel]").panel("close");
		$('#totalContentresults').css({'display':'none'});
		$('#totalContentschedule').css({'display':'block'});
		$('#totalContentsessoinInfo').css({'display':'none'});
		$('.mypage').css({'display':'none'});
	});

	$('#buttonSchedule').click(function(){
		$("[data-role=panel]").panel("close");
		$('#totalContentresults').css({'display':'none'});
		$('#totalContentschedule').css({'display':'block'});
		$('#totalContentsessoinInfo').css({'display':'none'});
		$('.mypage').css({'display':'none'});
	});

	$('#autocomplete-input-name').click(function(){
		$('#autocomplete-input-title').val("");
		$('#autocomplete-input-title').trigger("keyup");
	});

	$('#autocomplete-input-title').click(function(){
		$('#autocomplete-input-name').val("");
		$('#autocomplete-input-name').trigger("keyup");
	});

});

function assignAttributesToSearch(sessions, allPosters, arrayOfAttributes, elementID){

	var toAppend = '';

	for(i in arrayOfAttributes){
		toAppend += '<li class="ui-screen-hidden"><a href="#" value="' + arrayOfAttributes[i] + '"</a>'+ arrayOfAttributes[i] +'</li>';
	}

	$('#' + elementID).append(toAppend);


	$('#' + elementID + ' a').click(function(e){
		getAllInformation(sessions, allPosters, $(this).attr('value'), elementID);
		//getPosterInformation(sessions, allPosters, $(this).attr('value'), elementID);
	});
}

function getAllInformation(sessions, allPosters, value, elementID){

	var method = '';

	if(elementID == 'listviewName') method = 'name';
	else if(elementID == 'listviewTitle') method = 'title';

	var totalResults = [];

	parseInformation(sessions, value, method, function(results){
		totalResults.push(results);
		getPosterInformation(allPosters, sessions, value, elementID, function(resultsPoster){
			totalResults.push(resultsPoster);
			displayResults(totalResults, ['Oral', 'Poster']);
		});
	});
}

function getInformation(sessions, value, elementID){
	var method = '';

	if(elementID == 'listviewName') method = 'name';
	else if(elementID == 'listviewTitle') method = 'title';

	parseInformation(sessions, value, method, function(results){
		var totalResults = [];
		totalResults.push(results);
		displayResults(totalResults, ['Oral']);
	});
}

function getPosterInformation(allPosters, sessions, value, elementID, callback){

	var method = '';

	if(elementID == 'listviewName') method = 'name';
	else if(elementID == 'listviewTitle') method = 'title';

	parsePosterInformation(allPosters, sessions, value, method, function(results){
		callback(results);
	});
}


function displayResults(TotalResults, dataInfo){
	var toAppend = '';
	$('#bodytableResultsPoster').empty();
	$('#bodytableResultsOral').empty();
	$('#infoOral').empty();
	$('#infoPoster').empty();
	$('#resultsDiv').empty();

	if(TotalResults[0].length > 0 || (TotalResults.length > 1 && TotalResults[1].length > 0)){
		if (TotalResults[0].length > 0) toAppend += '<p>Results for: ' + TotalResults[0][0].searched + '</p>';
		else toAppend += '<p>Results for: ' + TotalResults[1][0].searched + '</p>';
		$('#resultsDiv').append(toAppend);
		for(d in TotalResults){
			toAppend = '';
			var results = TotalResults[d];

			for(i in results){
				toAppend += '<tr><td class="firstColumn divider"> </td><td class="secondColumn divider"> </td></tr>';
				toAppend += '<tr><td class="firstColumn">Abstract ID:</td><td class="secondColumn"> ' + results[i].presentationID + '</td></tr>';
				toAppend += '<tr><td class="firstColumn">Abstract Title:</td><td class="secondColumn"> ' + results[i].presentation.title + '</td></tr>';
				toAppend += '<tr><td class="firstColumn">Presenter:</td><td class="secondColumn"> ' + results[i].presentation.speaker + '</td></tr>';
					
				var authors = results[i].presentation.authors.split(';');
				var newAuthors = [];
				for(x in authors){
					var formatedAuthor = authors[x].split('_')[0] + '<sup>' + authors[x].split('_')[1] + '</sup>';
					newAuthors.push(formatedAuthor);
				}
				toAppend += '<tr><td class="firstColumn">Authors:</td><td class="secondColumn"> ' + newAuthors.toString() + '</td></tr>';
				
				var affiliations = results[i].presentation.affiliations;
				for(p in affiliations){
					affiliations[p] = '(' + (parseInt(p)+parseInt(1)) + ')' + affiliations[p];
				}
				toAppend += '<tr><td class="firstColumn">Affiliation:</td><td class="secondColumn"> ' + affiliations.toString() + '</td></tr>';
				toAppend += '<tr><td class="firstColumn">Session:</td><td class="secondColumn"> ' + results[i].sessionInfo[1] + '</td></tr>';
				//toAppend += '<tr><td class="firstColumn">Schedule:</td><td class="secondColumn"> ' + results[i].sessionInfo[2] + '</td></tr>';
				toAppend += '<tr></tr>';
			}

			$('#bodytableResults' + dataInfo[d]).empty();
			$('#bodytableResults' + dataInfo[d]).append(toAppend);
			$('#info' + dataInfo[d]).empty();
			if(TotalResults[d].length > 0) $('#info' + dataInfo[d]).append('<label><b>Results for ' + dataInfo[d] + ' Presentations</b></label>');
		}
	}
	else{
		toAppend += '<tr><td>No results were found.</td></tr>';
		$('#bodytableResultsPoster').empty();
		$('#bodytableResultsOral').empty();
		$('#infoOral').empty();
		$('#infoPoster').empty();
		$('#bodytableResultsOral').append(toAppend);
	}
	$("[data-role=panel]").panel("close");
	//$('#resultsDiv').css({'display':'block'});

	$('#totalContentresults').css({'display':'block'});
	$('#totalContentschedule').css({'display':'none'});
	$('#totalContentsessoinInfo').css({'display':'none'});

}