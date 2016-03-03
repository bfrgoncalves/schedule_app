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

			if(schedule[toCheck[i]][j].session_id && schedule[toCheck[i]][j].session_id > 0) toAppend += '<tr><td class="firstColumn">'+schedule[toCheck[i]][j].time+'</td><td class="secondColumn">'+ schedule[toCheck[i]][j].topics +'\nSession: ' + schedule[toCheck[i]][j].session_id + '</td></tr>';
			else if(j != 'date') toAppend += '<tr><td class="firstColumn">'+schedule[toCheck[i]][j].time+'</td><td class="secondColumn">'+schedule[toCheck[i]][j].topics+'</td></tr>';
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

		if(rowData[1].indexOf('(PS') > -1){
			getPosterSessionInformation(rowData, allPosters, sessions);
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
	}

	$('#sessionInfoTable tbody tr').click(function(){
		var rowData = $(this).children("td").map(function() {
	        return $(this).text();
	    }).get();

	    getInformation(sessions, rowData[0], 'listviewTitle');
	});

}

function getPosterSessionInformation(rowData, allPosters, sessions){

	var sessionToSearch = rowData[1].split('(')[1].split(')')[0];

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
			toAppend += '<tr><td class="breakLine divider"><label><b> Session '+allPosters[sessionToSearch].posters[i].session_id +'</b></label></td><td class="breakLine divider"><label><b>' + sessions[allPosters[sessionToSearch].posters[i].session_id].subject + '</b></label></td><td class="breakLine divider"></td></tr>';
			currentIssue = allPosters[sessionToSearch].posters[i].session_id;
		}
		toAppend += '<tr><td class="firstPosterColumn">' + i + '</td><td class="secondPosterColumn">' + allPosters[sessionToSearch].posters[i].title + '</td><td class="thirdPosterColumn">'+allPosters[sessionToSearch].posters[i].speaker+'</td></tr>';
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
	    	displayResults(totalResults, ['Poster']);
	    });
	});

}