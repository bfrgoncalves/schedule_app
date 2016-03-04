function specialCasesFormat(str){

	str = str.replace(/!!!/g, '</i>');
	str = str.replace(/!!/g, '<i>');
	str = str.replace(/___/g, '</b>');
	str = str.replace(/__/g, '<b>');

/*
    ignore = ["NGS", "MRSA", "MLST", "SNP", "MLVA", "WGS"],
    
    regex = new RegExp(ignore.join("|"), 'i'),

    result = str.split(' ').map(function(word){
        return (regex.test(word)) ? word : capitalize(word);
    }).join(' ');
	
	function capitalize(s) {
	    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
	}
*/

	return str;
}