
function SparqlSend(area){

	var area2 = "'"+area+"'";

	var rdfmgr = new RDFmgr("prefecturePigPopulation");
	var prefecture = "select ?num where {?s lodcu:都道府県 "+area2+" ;lodcu:豚頭数 ?num.} LIMIT 100";

	console.log(prefecture);

	console.log(area2);

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