function namesAndTitles(callback){
	var sessions = {};
	var allNames = [];
	var allTitles = [];
	var schedule = {};

	getSessions(sessions, function(){
		getSchedule(schedule, function(){
			getInfo(sessions, allNames, allTitles, function(){
				callback({sessions:sessions, schedule:schedule, allNames:allNames, allTitles:allTitles});
			});
		})
	});

}

function getSchedule(schedule, callback){

	schedule['1'] = [];
	schedule['1'].push({time:'12:00-14:00', topics:'Registration'});
	schedule['1'].push({time:'14:00-15:30', topics:'Plenary session: Bioinformatics Tools for Genomic Epidemiology', session: '1'});
	schedule['1'].push({time:'15:30-16:15', topics:'Opening Session'});
	schedule['1'].push({time:'16:15-17:00', topics:'Keynote: Origins of diversity in microbial genomes\nSpeaker: Edward J Feil'});
	schedule['1'].push({time:'17:00-17:30', topics:'Coffee break'});
	schedule['1'].push({time:'17:30-18:15', topics:'Keynote: Real world epidemiology meets the genome information\nSpeaker: Jennifer Gardy'});
	schedule['1'].push({time:'18:15-19:00', topics:'Keynote: Signals of time and descent in microbial genomes\nSpeaker: Caroline Colijn'});
	schedule['1'].push({time:'18:15-19:00', topics:'Opening Reception'});
	schedule['1'].date = 'Wednesday, 9 Mar 2016';

	schedule['2'] = [];
	schedule['2'].push({time:'8:30-10:00', topics:'Plenary session: Genomics and adaptation to the host and man-made environments', session: '2'});
	schedule['2'].push({time:'10:00-10:30', topics:'Coffee break'});
	schedule['2'].push({time:'10:30-12:00', topics:'Plenary session: Epidemiology and Public Health – Outbreaks', session: '3'});
	schedule['2'].push({time:'12:00-14:30', topics:'Lunch and Poster Session I'});
	schedule['2'].push({time:'14:30-15:30', topics:'Industry Session: Sponsored Talks by Applied Maths and Biomérieux'});
	schedule['2'].push({time:'15:30-17:00', topics:'Plenary session: Food , Zoonotic and Environmental Microbial Risks', session: '4'});
	schedule['2'].push({time:'17:00-17:30', topics:'Coffee break'});
	schedule['2'].push({time:'17:30-19:00', topics:'Plenary session: Novel Diagnostics and Typing methodologies', session: '5'});
	schedule['2'].date = 'Thursday, 10 Mar 2016';

	schedule['3'] = [];
	schedule['3'].push({time:'8:30-10:00', topics:'Plenary session: Microbial Population Genomics', session: '6'});
	schedule['3'].push({time:'10:00-10:30', topics:'Coffee break'});
	schedule['3'].push({time:'10:30-12:00', topics:'Plenary session: Antimicrobial resistance and Mobile Genetic Elements', session: '7'});
	schedule['3'].push({time:'12:00-13:30', topics:'Lunch and Poster Session I'});
	schedule['3'].push({time:'13:30-14:30', topics:'Discussion session: Genomic Epidemiology Ontologies'});
	schedule['3'].push({time:'14:30-15:30', topics:'Discussion session: Need for universal nomenclatures for strain/lineage identification'});
	schedule['3'].push({time:'15:30-17:00', topics:'Plenary session: Epidemiology and Public Health : Surveillance', session: '8'});
	schedule['3'].push({time:'17:00-17:30', topics:'Coffee break'});
	schedule['3'].push({time:'17:30-19:00', topics:'Plenary session: Late Breaker Abstracts session', session: '9'});
	schedule['3'].date = 'Friday, 11 Mar 2016';

	schedule['4'] = [];
	schedule['4'].push({time:'8:30-10:00', topics:'Plenary session: Molecular epidemiology and Public Health', session: '10'});
	schedule['4'].push({time:'10:00-10:30', topics:'Coffee break'});
	schedule['4'].push({time:'10:30-11:15', topics:'Keynote: Rapid evolutionary forces: the importance of mobile genetic elements\nSpeaker: Fernando de la Cruz'});
	schedule['4'].push({time:'11:15-12:00', topics:'Keynote: Disruptive technologies in infectious disease epidemiology: the future\nSpeaker: Nick Loman'});
	schedule['4'].push({time:'12:00-12:30', topics:'Closing Session'});
	schedule['4'].push({time:'12:30-13:30', topics:'Beer Break sponsored by Applied Maths'});
	schedule['4'].date = 'Saturday, 12 Mar 2016';

	callback();
}

function getSessions(sessions, callback){

	sessions['1'] = {};
	sessions['1'].subject = 'BIOINFORMATICS TOOLS FOR GENOMIC EPIDEMIOLOGY';
	sessions['1'].time = 'Wednesday,09th March 2016,14:00-15:30';
	sessions['1'].presentations = {};
	sessions['2'] = {};
	sessions['2'].subject = 'GENOMICS OF ADAPTATION TO THE HOST AND MAN-MADE ENVIRONMENTS';
	sessions['2'].time = 'Thursday,10th March 2016,08:30-10:00';
	sessions['2'].presentations = {};
	sessions['3'] = {};
	sessions['3'].subject = 'EPIDEMIOLOGY AND PUBLIC HEALTH - OUTBREAKS';
	sessions['3'].time = 'Thursday,10th March 2016,10:30-12:00';
	sessions['3'].presentations = {};
	sessions['4'] = {};
	sessions['4'].subject = 'FOOD, ZOONOTIC AND ENVIRONMENTAL MICROBIAL RISKS';
	sessions['4'].time = 'Thursday,10th March 2016,15:30-17:00';
	sessions['4'].presentations = {};
	sessions['5'] = {};
	sessions['5'].subject = 'NOVEL TYPING AND DIAGNOSTIC METHODOLOGIES';
	sessions['5'].time = 'Thursday,10th March 2016,17:30-19:00';
	sessions['5'].presentations = {};
	sessions['6'] = {};
	sessions['6'].subject = 'MICROBIAL POPULATION GENOMICS';
	sessions['6'].time = 'Friday,11th March 2016,08:30-10:00';
	sessions['6'].presentations = {};
	sessions['7'] = {};
	sessions['7'].subject = 'ANTIMICROBIAL RESISTANCE AND MOBILE GENETICS ELEMENTS';
	sessions['7'].time = 'Friday,11th March 2016,10:30-12:00';
	sessions['7'].presentations = {};
	sessions['8'] = {};
	sessions['8'].subject = 'EPIDEMIOLOGY AND PUBLIC HEALTH - SURVEILLANCE';
	sessions['8'].time = 'Friday,11th March 2016,15:30-17:00';
	sessions['8'].presentations = {};
	sessions['9'] = {};
	sessions['9'].subject = 'LATE BREAKER SESSION';
	sessions['9'].time = 'Friday,11th March 2016,17:30-19:00';
	sessions['9'].presentations = {};
	sessions['10'] = {};
	sessions['10'].subject = 'MOLECULAR EPIDEMIOLOGY AND PUBLIC HEALTH';
	sessions['10'].time = 'Saturday,12th March 2016,08:30-10:00';
	sessions['10'].presentations = {};

	callback();

}

function getInfo(sessions, allNames, allTitles, callback){

	var objectOfPresentation = {};

	objectOfPresentation['54'] = {};
	objectOfPresentation['54'].title = 'NULLARBOR: READS TO REPORTS, RAPIDLY';
	objectOfPresentation['54'].speaker = 'Torsten Seemann';
	objectOfPresentation['54'].authors = 'Torsten Seemann_1; Dieter Bulach_1; Jason Kwong_1; Anders Goncalves Da Silva_1; Benjamin Howden_1';
	objectOfPresentation['54'].affiliations = ['University of Melbourne'];

	objectOfPresentation['128'] = {};
	objectOfPresentation['128'].title = 'SCALABLE AND USER-FRIENDLY WORKFLOWS FOR MOLECULAR EPIDEMIOLOGY USING ENTEROBASE';
	objectOfPresentation['128'].speaker = 'Martin Sergeant';
	objectOfPresentation['128'].authors = 'Martin Sergeant_1; Nabil-Fareed Alikhan_1; Zhemin Zhou_1; Mark Achtman_1';
	objectOfPresentation['128'].affiliations = ['University of Warwick'];

	objectOfPresentation['75'] = {};
	objectOfPresentation['75'].title = 'SUCCESSES AND CHALLENGES IN HIGH THROUGHPUT WHOLE GENOME SEQUENCING OF VIRUSES';
	objectOfPresentation['75'].speaker = 'Dan Frampton';
	objectOfPresentation['75'].authors = 'Dan Frampton_1; Tiziano Gallo Cassarino_1; Zisis Kozlakidis_1; Anne Hoppe_1; Deenan Pillay_2; Paul Kellam_3';
	objectOfPresentation['75'].affiliations = ['Division of Infection and Immunity, UCL','Wellcome Trust Africa Centre for Health and Population Studies','Wellcome Trust Sanger Institute'];

	objectOfPresentation['135'] = {};
	objectOfPresentation['135'].title = 'HOW TO COMPARE AND CLUSTER EVERY KNOWN GENOME IN ABOUT AN HOUR';
	objectOfPresentation['135'].speaker = 'Adam M. Phillippy';
	objectOfPresentation['135'].authors = 'Adam M. Phillippy_1; Brian D. Ondov_2; Todd J. Treangen_2; Sergey Koren_1';
	objectOfPresentation['135'].affiliations = ['National Human Genome Research Institute, National Institutes of Health','National Biodefense Analysis and Countermeasures Center'];

	objectOfPresentation['90'] = {};
	objectOfPresentation['90'].title = 'THE EPIQUANT FRAMEWORK FOR ASSESSING EPIDEMIOLOGIC AND GENETIC CONCORDANCE: TOWARDS IMPROVED USE OF GENOMIC DATA IN EPIDEMIOLOGICAL APPLICATIONS.';
	objectOfPresentation['90'].speaker = 'Eduardo N. Taboada';
	objectOfPresentation['90'].authors = 'Benjamin Hetman_1; Steven K. Mutschall_2; Victor P. J. Gannon_2; James E. Thomas_1; Eduardo N. Taboada_2';
	objectOfPresentation['90'].affiliations = ['Department of Biological Sciences, University of Lethbridge','National Microbiology Laboratory at Lethbridge, Public Health Agency of Canada'];

	objectOfPresentation['231'] = {};
	objectOfPresentation['231'].title = 'CLIMB: DEVELOPING A NATIONAL CLOUD INFRASTRUCTURE FOR MICROBIAL BIOINFORMATICS.';
	objectOfPresentation['231'].speaker = 'Nick Loman';
	objectOfPresentation['231'].authors = 'Nick Loman_1; Simon Thompson_1; Matthew Ismail_2; Sam Sheppard_3; Thomas Connor_4; Mark Pallen_2';
	objectOfPresentation['231'].affiliations = ['University of Birmingham', 'University of Warwick', 'University of Swansea', 'University of Cardiff'];

	sessions['1'].presentations = objectOfPresentation;

	for (i in sessions){
		for(j in sessions[i].presentations){
			var arrayOfAuthors = sessions[i].presentations[j].authors.split(';');
			for(x in arrayOfAuthors){
				var nameToCheck = arrayOfAuthors[x].split('_')[0];
				if(allNames.indexOf(nameToCheck) < 0) allNames.push(nameToCheck.trim());
			}
			allTitles.push(sessions[i].presentations[j].title.trim());
		}
	}
	callback();
}