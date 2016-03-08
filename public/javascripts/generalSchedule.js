function constructSchedule(schedule, sessions, allPosters){

	var days = [];
	var prevDay = '';
	for(i in sessions){
			var currentDay = sessions[i].time.split(',').slice(0,sessions[i].time.split(',').length-1).toString();
			if(currentDay != prevDay){
				days.push(currentDay);
				prevDay = currentDay;
			}
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
		$('#AbstractsInfoSection').empty();
		var toAppend = '';
		toAppend += '<tr><td class="timeColumn">Time</td><td class="secondColumn">Title</td><td class="firstColumn">Speaker</td></tr>';
		$('#headersessionInfoTable').append(toAppend);
		toAppend = '';
		$('#AbstractsInfoSection').append('<a id="anchorAbstractInfo" href="#abstracts-page" class="ui-btn ui-icon-info ui-btn-icon-left ui-shadow ui-corner-all">Abstracts available here</a>');
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

	$('#anchorAbstractInfo').click(function(){

		var htmlAbstractName = 'OP_S' + sessionToSearch + '.html';
		showSessionAbstracts("public/abstracts/Webpages/" + htmlAbstractName);

	});

}

function getIndustryInformation(rowData, sessions){
	
	var sessionToSearch = 'IP1';

	$('#headersessionInfoTable').empty();
	$('#bodysessionInfoTable').empty();
	$('#sessionInfoSection').empty();
	$('#AbstractsInfoSection').empty();
	var toAppend = '';
	toAppend += '<tr><td class="secondColumn">Title</td><td class="firstColumn">Speaker</td></tr>';
	$('#headersessionInfoTable').append(toAppend);

	$('#AbstractsInfoSection').append('<a id="anchorAbstractIndustryInfo" href="#abstracts-page" class="ui-btn ui-icon-info ui-btn-icon-left ui-shadow ui-corner-all">Abstracts available here</a>');
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

	$('#anchorAbstractIndustryInfo').click(function(){

		var htmlAbstractName = 'OP_I' + sessionToSearch.split('IP')[1] + '.html';
		showSessionAbstracts("public/abstracts/Webpages/" + htmlAbstractName);

	});

}

function getDiscussionInformation(rowData, allPosters, sessions){

	if(rowData[1].indexOf('Discussion session: Genomic Epidemiology') > -1) var sessionToSearch = 'DS1';
	else if(rowData[1].indexOf('Discussion session: Need for universal nomenclatures') > -1) var sessionToSearch = 'DS2';
	
	$('#headersessionInfoTable').empty();
	$('#bodysessionInfoTable').empty();
	$('#sessionInfoSection').empty();
	$('#AbstractsInfoSection').empty();

	var toAppend = '';
	toAppend = '';
	toAppend += '<p>Discussion session: ' + sessionToSearch + '</p>';
	$('#sessionInfoSection').append(toAppend);
	toAppend = '';

	if(sessionToSearch=='DS1'){

		$('#AbstractsInfoSection').append('<a id="anchorAbstractDiscussionInfo" href="#abstracts-page" class="ui-btn ui-icon-info ui-btn-icon-left ui-shadow ui-corner-all">Abstracts available here</a>');

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

		$('#anchorAbstractDiscussionInfo').click(function(){

			var htmlAbstractName = 'OP_' + sessionToSearch + '.html';
			showSessionAbstracts("public/abstracts/Webpages/" + htmlAbstractName);

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
	$('#AbstractsInfoSection').empty();
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
			toAppend += '<tr toclick="no"><td class="breakLine divider" style="text-align: center;"><h4><b>Session '+allPosters[sessionToSearch].posters[i].session_id +'</b></h4></td><td class="breakLine divider"><h4><b>' + sessions[allPosters[sessionToSearch].posters[i].session_id].subject + ' </b></h4></td><td class="breakLine divider">&nbsp;</td></tr>';
			toAppend += '<tr toclick="no"><td style="text-align: center;">&nbsp;</td><td><a href="#abstracts-page" Session="'+allPosters[sessionToSearch].posters[i].session_id+'" class="ui-btn ui-icon-info ui-btn-icon-left ui-shadow ui-corner-all anchorPosterAbstractInfo">Abstracts</a></td><td>&nbsp;</td></tr>';
			
			currentIssue = allPosters[sessionToSearch].posters[i].session_id;
		}
		toAppend += '<tr><td class="firstPosterColumn" style="text-align: center;">' + i + '</td><td class="secondPosterColumn">' + allPosters[sessionToSearch].posters[i].title + '</td><td class="thirdPosterColumn">'+allPosters[sessionToSearch].posters[i].speaker+'</td></tr>';
	}
	$('#bodysessionInfoTable').append(toAppend);

	$('#totalContentresults').css({'display':'none'});
	$('#totalContentschedule').css({'display':'none'});
	$('#totalContentsessoinInfo').css({'display':'block'});

	$('#sessionInfoTable tbody tr').click(function(){

		if($(this).attr("toclick") != "no"){

			var rowData = $(this).children("td").map(function() {
		        return $(this).text();
		    }).get();

		    getPosterInformation(allPosters, sessions, rowData[1], 'listviewTitle', function(results){
		    	var totalResults = [];
				totalResults.push(results);
		    	displayResults(totalResults, ['Poster'], true);
		    });
		}
	});

	$('.anchorPosterAbstractInfo').click(function(){

		var sessionToUse = $(this).attr("Session");

		var htmlAbstractName = 'PO_S' + sessionToUse + '.html';
		showSessionAbstracts("public/abstracts/Webpages/" + htmlAbstractName);

	});

}

function getAnnouncementInformation(announcements){
	$('#headertableAnnouncements').empty();
	$('#bodytableAnnouncements').empty();
	var toAppend = '';

	$('#headertableAnnouncements').append('<tr style="text-align:center;"><td class="timeColumn"><b>Day</b></td><td class="firstColumn"><b>Time</b></td><td class="secondColumn" style="text-align:left;"><b>Announcement</b></td></tr>');

	for(var i=announcements.length-1; i>-1; i--){

		for(var j=announcements[i].length-1; j>-1; j--){
			toAppend += '<tr style="text-align:center;"><td class="timeColumn">' + announcements[i][j].day + '</td><td class="firstColumn">' + announcements[i][j].time + '</td><td class="secondColumn" style="text-align:left;">' + announcements[i][j].announcement + '</td><td></tr>';
		}

	}

	$('#bodytableAnnouncements').append(toAppend);
}





