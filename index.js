$(document).ready(function(){
	
	var scheduleObject = {
		scheduleLocation : 'public/scheduleFiles/scheduleTest.txt',
		sessionsLocation : 'public/scheduleFiles/sessionsTest.txt',
		presentationsLocation : 'public/scheduleFiles/presentationsTest.txt',
		postersLocation : 'public/scheduleFiles/postersTest.txt',
		announcementsLocation : 'public/scheduleFiles/announcementsTest.txt'
	}
	
	readSchedule(scheduleObject, function(scheduleData){
		console.log(scheduleData);
		sessions = scheduleData.sessions;
		allnames = scheduleData.allNames;
		alltitles = scheduleData.allTitles;
		schedule = scheduleData.schedule;
		allPosters = scheduleData.allPosters;
		allPresenters = scheduleData.allPresenters;
		announcements = scheduleData.announcements;

		assignAttributesToSearch(sessions, allPosters, allnames, 'listviewName');
		assignAttributesToSearch(sessions, allPosters, alltitles, 'listviewTitle');
		constructSchedule(schedule, sessions, allPosters);
		getAnnouncementInformation(announcements);
		//exportPosters(allPosters);
		//getPresenterInfo(allnames, allPosters, sessions)
		//getOralNames(sessions);
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

	$('#buttonBack').click(function(){
		$("[data-role=panel]").panel("close");
		$('#totalContentresults').css({'display':'none'});
		$('#totalContentschedule').css({'display':'none'});
		$('#totalContentsessoinInfo').css({'display':'block'});
		$('.mypage').css({'display':'none'});
		$('#buttonBack').css({'display':'none'});
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
		var titleWithoutItalic = $(this).attr('value').replace(/<i>/g, '');
		titleWithoutItalic = titleWithoutItalic.replace(/<\/i>/g, '');
		getAllInformation(sessions, allPosters, titleWithoutItalic, elementID);
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
			displayResults(totalResults, ['Oral', 'Poster'], false);
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
		displayResults(totalResults, ['Oral'], true);
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


function displayResults(TotalResults, dataInfo, showBack){
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
				toAppend += '<tr><td class="firstColumn">ID:</td><td class="secondColumn"> ' + results[i].presentationID + '</td></tr>';
				toAppend += '<tr><td class="firstColumn">Title:</td><td class="secondColumn"> ' + results[i].presentation.title + '</td></tr>';
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
				toAppend += '<tr><td class="firstColumn">Session:</td><td class="secondColumn"> <b>' + results[i].sessionInfo[1] + '</b>, ' + results[i].sessionInfo[2] + '</td></tr>';

				if(results[i].presentation.time) toAppend += '<tr><td class="firstColumn">Time of Presentation:</td><td class="secondColumn"> ' + results[i].presentation.time + '</td></tr>';
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
	if(showBack == true) $('#buttonBack').css({'display':'block'});
	$('#totalContentschedule').css({'display':'none'});
	$('#totalContentsessoinInfo').css({'display':'none'});

}


function exportPosters(posterInfo){

	var results = '';
	for (i in posterInfo){
		console.log(posterInfo[i].posters);
		for(j in posterInfo[i].posters){
			var affiliations = posterInfo[i].posters[j].affiliations;
			for(x in affiliations){
				affiliations[x] = (parseInt(x) + 1) + '_' + affiliations[x];
			}
			results += 'PO' + j + ' - ' + specialCasesFormat(posterInfo[i].posters[j].title) + '\n' + posterInfo[i].posters[j].authors + '\n' + affiliations.toString() + '\n\n';
		}
	}
	//console.log(stringToMatrix);


	var encodedUriMatrix = 'data:text/csv;charset=utf-8,' + encodeURIComponent(results);
	
	var a = $('<p>Download <a id="linkDownloadMatrix">Distance Matrix</a></p>');

	$('#scheduleInfo').append(a);
	$('#linkDownloadMatrix').attr("href", encodedUriMatrix).attr('download', "posters.txt");
	$('#linkDownloadMatrix').trigger('click');
}

function exportPosters(sessions, posterInfo, allNames){

	var results = '';
	for (i in posterInfo){
		console.log(posterInfo[i].posters);
		for(j in posterInfo[i].posters){
			var affiliations = posterInfo[i].posters[j].affiliations;
			for(x in affiliations){
				affiliations[x] = (parseInt(x) + 1) + '_' + affiliations[x];
			}
			results += 'PO' + j + ' - ' + specialCasesFormat(posterInfo[i].posters[j].title) + '\n' + posterInfo[i].posters[j].authors + '\n' + affiliations.toString() + '\n\n';
		}
	}
	//console.log(stringToMatrix);


	var encodedUriMatrix = 'data:text/csv;charset=utf-8,' + encodeURIComponent(results);
	
	var a = $('<p>Download <a id="linkDownloadMatrix">Distance Matrix</a></p>');

	$('#scheduleInfo').append(a);
	$('#linkDownloadMatrix').attr("href", encodedUriMatrix).attr('download', "posters.txt");
	$('#linkDownloadMatrix').trigger('click');
}

function getOralNames(sessions){
	var names = [];
	var objectOfNames = {};
	var results = '';

	for(z in sessions){
		for(c in sessions[z].presentations){
			var nameSplited = sessions[z].presentations[c].speaker.split(' ');
			var lengthName = nameSplited.length;
			var firstName = sessions[z].presentations[c].speaker.split(' ')[0];
			var lastName = sessions[z].presentations[c].speaker.split(' ')[lengthName-1];

			var newName = firstName + ' ' + lastName;

			if(!objectOfNames.hasOwnProperty(newName)){
				names.push(newName);
				objectOfNames[newName] = true;
			}
		}
	}

	for(v in names){
		results += names[v] + '\n';
		//results += '\n';
	}

	var encodedUriMatrix = 'data:text/csv;charset=utf-8,' + encodeURIComponent(results);
	
	var a = $('<p>Download <a id="linkDownloadMatrix">Distance Matrix</a></p>');

	$('#scheduleInfo').append(a);
	$('#linkDownloadMatrix').attr("href", encodedUriMatrix).attr('download', "posters.txt");
	$('#linkDownloadMatrix').trigger('click');

}

function getPresenterInfo(allNames, allPosters, sessions){

	var objectOfNames = {};
	for(x in allNames){
		if (allNames[x].trim() == '') continue;
		var nameSplited = allNames[x].split(' ');
		var lengthName = nameSplited.length;
		var firstName = allNames[x].split(' ')[0];
		var lastName = allNames[x].split(' ')[lengthName-1];

		var newName = lastName + ', ' + firstName;

		if(!objectOfNames.hasOwnProperty(newName)){
			objectOfNames[newName] = {};
			objectOfNames[newName].posters = [];
			objectOfNames[newName].presentations = [];
		}

		for(z in allPosters){
			for(c in allPosters[z].posters){
				if(allPosters[z].posters[c].authors.indexOf(allNames[x].trim()) > -1){
					console.log(allNames[x]);
					objectOfNames[newName].posters.push(c + ' S' + allPosters[z].posters[c].session_id);
				}
			}
		}

		for(z in sessions){
			for(c in sessions[z].presentations){
				if(sessions[z].presentations[c].authors.indexOf(allNames[x].trim()) > -1){
					objectOfNames[newName].presentations.push(c + ' S' + sessions[z].presentations[c].session_id);
				}
			}
		}

	}

	var results = '';

	for(v in objectOfNames){
		results += v + ', ';
		for(q in objectOfNames[v].presentations){
			results += objectOfNames[v].presentations[q] + ', ';
		}
		for(s in objectOfNames[v].posters){
			results += objectOfNames[v].posters[s] + ', ';
		}
		results = results.substring(0, results.length - 2);
		results += '\n';
	}

	var encodedUriMatrix = 'data:text/csv;charset=utf-8,' + encodeURIComponent(results);
	
	var a = $('<p>Download <a id="linkDownloadMatrix">Distance Matrix</a></p>');

	$('#scheduleInfo').append(a);
	$('#linkDownloadMatrix').attr("href", encodedUriMatrix).attr('download', "posters.txt");
	$('#linkDownloadMatrix').trigger('click');

}