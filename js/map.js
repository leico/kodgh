var difficulty;

function SparqlSend(area){

	var area2 = "'"+area+"'";

	var rdfmgr = new RDFmgr("pigArea");
	var prefecture = "select ?num where {?s lodcu:地方 "+area2+" ;lodcu:豚頭数 ?num.} LIMIT 100";

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
	if(str < 1000){
		difficulty = 1;
	}else if(str >= 1000 && str <=2000){
		difficulty = 2;
	}else if(str >= 2000 && str <=3000){
		difficulty = 3;
	}
	console.log(difficulty);
}

function getErrorMsg(eType,eMsg,eMsg2){
	alert(eMsg+"\n\n"+eMsg2);
}

$(document).on('pageinit', '#wuser', function(e, data){
	document.getElementById("point_get").innerHTML = difficulty;
});