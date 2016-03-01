function constructSchedule(schedule, sessions){

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
				$('#header' + toCheck[i]).append('<tr><td>Time</td><td>Topics</td></tr>');
				firstTime = false;
			}

			if(schedule[toCheck[i]][j].session_id && schedule[toCheck[i]][j].session_id > 0) toAppend += '<tr><td>'+schedule[toCheck[i]][j].time+'</td><td>'+ schedule[toCheck[i]][j].topics +'\nSession: ' + schedule[toCheck[i]][j].session_id + '</td></tr>';
			else if(j != 'date') toAppend += '<tr><td>'+schedule[toCheck[i]][j].time+'</td><td>'+schedule[toCheck[i]][j].topics+'</td></tr>';
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

	    getSessionInformation(rowData, sessions);
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
		toAppend += '<tr><td>Title</td><td>Speaker</td></tr>';
		$('#headersessionInfoTable').append(toAppend);
		toAppend = '';
		toAppend += '<p>' + sessions[sessionToSearch].subject + '</p>';
		toAppend += '<p>' + sessions[sessionToSearch].time + '</p>';
		$('#sessionInfoSection').append(toAppend);
		toAppend = '';
		for(i in sessions[sessionToSearch].presentations){
			toAppend += '<tr><td>' + sessions[sessionToSearch].presentations[i].title + '</td><td>' + sessions[sessionToSearch].presentations[i].speaker + '</td></tr>';
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