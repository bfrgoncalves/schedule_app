function specialCasesFormat(str){

    ignore = ["NGS", "MRSA", "MLST", "SNP", "MLVA", "WGS"],
    
    regex = new RegExp(ignore.join("|"), 'i'),

    result = str.split(' ').map(function(word){
        return (regex.test(word)) ? word : capitalize(word);
    }).join(' ');
	
	function capitalize(s) {
	    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
	}

	return result;
}