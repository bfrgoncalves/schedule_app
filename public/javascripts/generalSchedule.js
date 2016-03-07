function constructSchedule(schedule, sessions, allPosters){

	var days = [];
	var prevDay = '';
	for(i in sessions){
			var currentDay = sessions[i].time.split(',').slice(0,sessions[i].time.split(',').length-1).toString();
			if(currentDay != prevDay){
				days.push(currentDay);
				prevDay = currentDay;
			}
			//days.push(sessions[i].time.split(',').slice(0,sessions[i].time.split(',').length-1));
		//var currentDay = schedule[i].time.split(',').slice(0,schedule[i].time.split(',').length-1);
	}

	var toCheck = [];
	days.map(function(d,i){
		toCheck.push(String(i+1));
	});

	for(i in toCheck){
		var toAppend = '';
		var firstTime = true;
		for(j in schedule[toCheck[i]]){
			if(firstTime == true){
				$('#header' + toCheck[i]).append('<tr><td class="firstColumn"><b>Time</b></td><td class="secondColumn"><b>Topics</b></td></tr>');
				firstTime = false;
			}
			if(schedule[toCheck[i]][j].session_id && parseInt(schedule[toCheck[i]][j].session_id) > 0){
				toAppend += '<tr><td class="firstColumn">'+schedule[toCheck[i]][j].time+'</td><td class="secondColumn">'+ specialCasesFormat(schedule[toCheck[i]][j].topics) +'\nSession: ' + schedule[toCheck[i]][j].session_id + '</td></tr>';
			}
			else if(schedule[toCheck[i]][j].topics.indexOf('Poster Session') > -1) toAppend += '<tr><td class="firstColumn">'+schedule[toCheck[i]][j].time+'</td><td class="secondColumn">'+specialCasesFormat(schedule[toCheck[i]][j].topics)+'</td></tr>';
			else if(j != 'date') toAppend += '<tr><td class="firstColumn">'+schedule[toCheck[i]][j].time+'</td><td class="secondColumn">'+specialCasesFormat(schedule[toCheck[i]][j].topics)+'</td></tr>';
		}
		toAppend = toAppend.replace(/\n/g, '<br>');
		toAppend = toAppend.replace(/\\n/g, '<br>');

		$('#date' + toCheck[i]).append('<h4>' + days[i] + '</h4>');	
		$('#body' + toCheck[i]).append(toAppend);
	}

	$('.scheduletable tbody tr').click(function(){
		var rowData = $(this).children("td").map(function() {
	        return $(this).text();
	    }).get();

		if(rowData[1].indexOf('Poster Session') > -1){
			getPosterSessionInformation(rowData, allPosters, sessions);
		}
		else if(rowData[1].indexOf('Discussion session') > -1){
			getDiscussionInformation(rowData, allPosters, sessions);
		}
		else if(rowData[1].indexOf('Industry Session') > -1){
			getIndustryInformation(rowData, sessions);
		}
		else getSessionInformation(rowData, sessions);
	});
}

function getSessionInformation(rowData, sessions){
	
	var sessionToSearch = undefined;
	if(rowData[1].split('Session: ')[1] != undefined) sessionToSearch = rowData[1].split('Session: ')[1].trim();

	if(sessionToSearch != undefined){
		$('#headersessionInfoTable').empty();
		$('#bodysessionInfoTable').empty();
		$('#sessionInfoSection').empty();
		var toAppend = '';
		toAppend += '<tr><td class="timeColumn">Time</td><td class="secondColumn">Title</td><td class="firstColumn">Speaker</td></tr>';
		$('#headersessionInfoTable').append(toAppend);
		toAppend = '';
		console.log(sessionToSearch);
		toAppend += '<p>' + sessions[sessionToSearch].subject + '</p>';
		toAppend += '<p>' + sessions[sessionToSearch].time + '</p>';
		$('#sessionInfoSection').append(toAppend);
		toAppend = '';
		for(i in sessions[sessionToSearch].presentations){
			toAppend += '<tr><td class="timeColumn"><b>' + sessions[sessionToSearch].presentations[i].time + '</b></td><td class="secondColumn">' + sessions[sessionToSearch].presentations[i].title + '</td><td class="firstColumn">' + sessions[sessionToSearch].presentations[i].speaker + '</td></tr>';
		}
		$('#bodysessionInfoTable').append(toAppend);

		$('#totalContentresults').css({'display':'none'});
		$('#totalContentschedule').css({'display':'none'});
		$('#totalContentsessoinInfo').css({'display':'block'});
	}

	$('#sessionInfoTable tbody tr').click(function(){
		var rowData = $(this).children("td").map(function() {
	        return $(this).text();
	    }).get();

	    getInformation(sessions, rowData[1], 'listviewTitle');
	});

}

function getIndustryInformation(rowData, sessions){
	
	var sessionToSearch = 'IP1';

	$('#headersessionInfoTable').empty();
	$('#bodysessionInfoTable').empty();
	$('#sessionInfoSection').empty();
	var toAppend = '';
	toAppend += '<tr><td class="secondColumn">Title</td><td class="firstColumn">Speaker</td></tr>';
	$('#headersessionInfoTable').append(toAppend);
	toAppend = '';
	toAppend += '<p>' + sessions[sessionToSearch].subject + '</p>';
	toAppend += '<p>' + sessions[sessionToSearch].time + '</p>';
	$('#sessionInfoSection').append(toAppend);
	toAppend = '';
	for(i in sessions[sessionToSearch].presentations){
		toAppend += '<tr><td class="secondColumn">' + sessions[sessionToSearch].presentations[i].title + '</td><td class="firstColumn">' + sessions[sessionToSearch].presentations[i].speaker + '</td></tr>';
	}
	$('#bodysessionInfoTable').append(toAppend);

	$('#totalContentresults').css({'display':'none'});
	$('#totalContentschedule').css({'display':'none'});
	$('#totalContentsessoinInfo').css({'display':'block'});

	$('#sessionInfoTable tbody tr').click(function(){
		var rowData = $(this).children("td").map(function() {
	        return $(this).text();
	    }).get();

	    getInformation(sessions, rowData[0], 'listviewTitle');
	});

}

function getDiscussionInformation(rowData, allPosters, sessions){

	if(rowData[1].indexOf('Discussion session: Genomic Epidemiology') > -1) var sessionToSearch = 'DS1';
	else if(rowData[1].indexOf('Discussion session: Need for universal nomenclatures') > -1) var sessionToSearch = 'DS2';
	
	$('#headersessionInfoTable').empty();
	$('#bodysessionInfoTable').empty();
	$('#sessionInfoSection').empty();

	var toAppend = '';
	toAppend = '';
	toAppend += '<p>Discussion session: ' + sessionToSearch + '</p>';
	$('#sessionInfoSection').append(toAppend);
	toAppend = '';

	if(sessionToSearch=='DS1'){

		var currentIssue = -1;
		for(i in allPosters[sessionToSearch].posters){
			if (currentIssue != allPosters[sessionToSearch].posters[i].session_id){
				toAppend += '<tr><td class="breakLine divider" style="text-align: center;"><h4><b>Session '+allPosters[sessionToSearch].posters[i].session_id +'</b></h4></td><td class="breakLine divider"><h4><b>' + sessions[allPosters[sessionToSearch].posters[i].session_id].subject + '</b></h4></td><td class="breakLine divider">&nbsp;</td></tr>';
				currentIssue = allPosters[sessionToSearch].posters[i].session_id;
			}
			toAppend += '<tr><td class="firstPosterColumn" style="text-align: center;">' + i + '</td><td class="secondPosterColumn">' + allPosters[sessionToSearch].posters[i].title + '</td><td class="thirdPosterColumn">'+allPosters[sessionToSearch].posters[i].speaker+'</td></tr>';
		}
		$('#bodysessionInfoTable').append(toAppend);

		$('#sessionInfoTable tbody tr').click(function(){
			var rowData = $(this).children("td").map(function() {
		        return $(this).text();
		    }).get();

		    getPosterInformation(allPosters, sessions, rowData[1], 'listviewTitle', function(results){
		    	var totalResults = [];
				totalResults.push(results);
		    	displayResults(totalResults, ['Poster'], true);
		    });
		});
	}
	else if(sessionToSearch=='DS2'){
		for(i in sessions[sessionToSearch].presentations){
			toAppend += '<tr><td><label><b>' + sessions[sessionToSearch].presentations[i].title + '</b></label></td></tr>';
			toAppend += '<td><b>Speakers Panel:</b> ' + sessions[sessionToSearch].presentations[i].authors.replace(/;/g, ',') + '</td>';
		}
		$('#bodysessionInfoTable').append(toAppend);
	}

	$('#totalContentresults').css({'display':'none'});
	$('#totalContentschedule').css({'display':'none'});
	$('#totalContentsessoinInfo').css({'display':'block'});

}

function getPosterSessionInformation(rowData, allPosters, sessions){

	if((rowData[1].indexOf('Poster Session II') > -1)) var sessionToSearch = 'PS2';
	else if(rowData[1].indexOf('Poster Session I') > -1) var sessionToSearch = 'PS1';

	$('#headersessionInfoTable').empty();
	$('#bodysessionInfoTable').empty();
	$('#sessionInfoSection').empty();
	var toAppend = '';
	toAppend += '<tr><td class="firstPosterColumn">Poster ID</td><td class="secondPosterColumn">Title</td><td class="thirdPosterColumn">Presenter</td></tr>';
	$('#headersessionInfoTable').append(toAppend);
	toAppend = '';
	toAppend += '<p>Poster Session: ' + sessionToSearch + '</p>';
	$('#sessionInfoSection').append(toAppend);
	toAppend = '';
	var currentIssue = -1;
	for(i in allPosters[sessionToSearch].posters){
		if (currentIssue != allPosters[sessionToSearch].posters[i].session_id){
			toAppend += '<tr><td class="breakLine divider" style="text-align: center;"><h4><b>Session '+allPosters[sessionToSearch].posters[i].session_id +'</b></h4></td><td class="breakLine divider"><h4><b>' + sessions[allPosters[sessionToSearch].posters[i].session_id].subject + '</b></h4></td><td class="breakLine divider">&nbsp;</td></tr>';
			currentIssue = allPosters[sessionToSearch].posters[i].session_id;
		}
		toAppend += '<tr><td class="firstPosterColumn" style="text-align: center;">' + i + '</td><td class="secondPosterColumn">' + allPosters[sessionToSearch].posters[i].title + '</td><td class="thirdPosterColumn">'+allPosters[sessionToSearch].posters[i].speaker+'</td></tr>';
	}
	$('#bodysessionInfoTable').append(toAppend);

	$('#totalContentresults').css({'display':'none'});
	$('#totalContentschedule').css({'display':'none'});
	$('#totalContentsessoinInfo').css({'display':'block'});

	$('#sessionInfoTable tbody tr').click(function(){
		var rowData = $(this).children("td").map(function() {
	        return $(this).text();
	    }).get();

	    getPosterInformation(allPosters, sessions, rowData[1], 'listviewTitle', function(results){
	    	var totalResults = [];
			totalResults.push(results);
	    	displayResults(totalResults, ['Poster'], true);
	    });
	});

}