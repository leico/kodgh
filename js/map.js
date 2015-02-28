function SparqlSend(hoge){
	// var prefecture = '"秋田県"';

	var test = "'"+hoge+"'";

	var rdfmgr = new RDFmgr("prefecturePigPopulation");
	var prefecture = "select ?num where {?s lodcu:都道府県 "+test+" ;lodcu:豚頭数 ?num.} LIMIT 100";

	console.log(prefecture);

	console.log(hoge);

	rdfmgr.executeQuery({
		sparql: prefecture,
		success: maketable,
		error: getErrorMsg
	});
}


function maketable(re){
	var str = new String();
	while(re.next()){
		for(var i=0; i < re.getLength();i++){
			str += re.getValue(i);
		}
	}
	console.log(str);
}
function getErrorMsg(eType,eMsg,eMsg2){
	alert(eMsg+"\n\n"+eMsg2);
}