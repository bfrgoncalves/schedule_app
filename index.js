$(document).ready(function(){
	
	var scheduleObject = {
		scheduleLocation : 'public/scheduleFiles/scheduleTest.txt',
		sessionsLocation : 'public/scheduleFiles/sessionsTest.txt',
		presentationsLocation : 'public/scheduleFiles/presentationsTest.txt'
	}
	
	readSchedule(scheduleObject, function(scheduleData){
		console.log(scheduleData);
		sessions = scheduleData.sessions;
		allnames = scheduleData.allNames;
		alltitles = scheduleData.allTitles;
		schedule = scheduleData.schedule;

		assignAttributesToSearch(sessions, allnames, 'listviewName');
		assignAttributesToSearch(sessions, alltitles, 'listviewTitle');
		constructSchedule(schedule, sessions);
	});

	$('.buttonHome').click(function(){
		$("[data-role=panel]").panel("close");
		$('#totalContentresults').css({'display':'none'});
		$('#totalContentschedule').css({'display':'block'});
		$('#totalContentsessoinInfo').css({'display':'none'});
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

function assignAttributesToSearch(sessions, arrayOfAttributes, elementID){

	var toAppend = '';

	for(i in arrayOfAttributes){
		toAppend += '<li class="ui-screen-hidden"><a href="#" value="' + arrayOfAttributes[i] + '"</a>'+ arrayOfAttributes[i] +'</li>';
	}

	$('#' + elementID).append(toAppend);


	$('#' + elementID + ' a').click(function(e){
		getInformation(sessions, $(this).attr('value'), elementID);
	});
}

function getInformation(sessions, value, elementID){

	var method = '';

	if(elementID == 'listviewName') method = 'name';
	else if(elementID == 'listviewTitle') method = 'title';

	parseInformation(sessions, value, method, function(results){
		displayResults(results);
	});
}


function displayResults(results){
	var toAppend = '';
	$('#bodytableResults').empty();
	$('#resultsDiv').empty();

	if(results.length > 0){
		toAppend += '<p>Results for: ' + results[0].searched + '</p>';
		$('#resultsDiv').append(toAppend);
		toAppend = '';
		for(i in results){
			console.log(results[i]);
			toAppend += '<tr><td class="firstColumn">Abstract ID:</td><td class="secondColumn"> ' + results[i].presentationID + '</td></tr>';
			toAppend += '<tr><td class="firstColumn">Abstract Title:</td><td class="secondColumn"> ' + results[i].presentation.title + '</td></tr>';
			toAppend += '<tr><td class="firstColumn">Speaker:</td><td class="secondColumn"> ' + results[i].presentation.speaker + '</td></tr>';
				
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
			toAppend += '<tr><td class="firstColumn">Schedule:</td><td class="secondColumn"> ' + results[i].sessionInfo[2] + '</td></tr>';
			toAppend += '<tr></tr>';
		}
	}
	else toAppend += '<tr><td>No results were found.</td></tr>';

	$('#bodytableResults').empty();
	$('#bodytableResults').append(toAppend);
	$("[data-role=panel]").panel("close");
	//$('#resultsDiv').css({'display':'block'});

	$('#totalContentresults').css({'display':'block'});
	$('#totalContentschedule').css({'display':'none'});
	$('#totalContentsessoinInfo').css({'display':'none'});

}