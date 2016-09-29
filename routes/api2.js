
var parseString = require('xml2js').parseString;
var request = require('request');

var CR2HP1 = '10.1.0.171';
var CR2HP2 = '10.1.0.122';
var CR2HP3 = '10.1.0.131';
var CR3HP1 = '10.1.0.138';
var CR3HP2 = '10.1.0.118';
var CR3HP3 = '10.1.0.211';
var CR3HP4 = '10.1.0.214';
var Building = '10.1.0.151';

var CR2HP1data;
var CR2HP2data;
var CR2HP3data;
var CR3HP1data;
var CR3HP2data;
var CR3HP3data;
var CR3HP4data;
var buildingData;

function findAnalog(a,b){
	return a.PCOWEB.PCO[0].ANALOG[0].VARIABLE[b].VALUE[0];
};

function findDigital(a,b){
	return a.PCOWEB.PCO[0].DIGITAL[0].VARIABLE[b].VALUE[0];
};

function findInteger(a,b){
	return a.PCOWEB.PCO[0].INTEGER[0].VARIABLE[b].VALUE[0];
};

function webboardData(a){

	var data = 'loading...';
	var dataNew ={ 	analog: [[1],[2]],
					digital: [[1],[2]],
					integer: [[1],[2]],
					defrostElapse: [],
					runDuration: [],
					defrostLength: []
					};
	var analog =[];
	var digital =[];
	var integer = [];
	var defrostTime = 0;
	var defrostElapse = 0;
	var offTime = 0;
	var runDuration = 0;
	var appState;
	var defrostStart = 0;
	var defrostEnd =0;

	function analogRounder(index,scale){
        var dataRound;
        dataRound = Math.round(((dataNew.analog[0][index-1])*scale)*10)/10;
        return dataRound;
      };

	setInterval(function(){
		request('http://admin:fadmin@'+ a + '/config/xml.cgi?A%7C1%7C200%7CD%7C1%7C200%7CI%7C1%7C200', {timeout: 1500}, function (error, response, body) {
        	if(!error){

        		parseString(body, function (err, result) {

	        	data = result;	        	
	        	analog = [];
	        	digital = [];
	        	integer =[];

	        	if (dataNew.analog.length === 10){
	        		dataNew.analog.pop();
	        		dataNew.digital.pop();
	        		dataNew.integer.pop();
	        	};

	        	for (i = 0; i < 200; i++) { 
	    		analog.push(findAnalog(result,i));
	    		digital.push(findDigital(result,i));
	    		integer.push(findInteger(result,i));
				};

				dataNew.analog.unshift(analog);
				dataNew.digital.unshift(digital);
				dataNew.integer.unshift(integer);

				appState = analogRounder(133,1)
				
				if(appState === 0.5){
					defrostTime = (new Date).getTime();
					defrostElapse = 0;
				} else if(defrostTime===0){
					dataNew.defrostElapse = 0;
				}else{
					defrostElapse = (new Date).getTime() - defrostTime;
					dataNew.defrostElapse = defrostElapse;
				}

				if(appState === 0){
					offTime = (new Date).getTime();
					runDuration = 0;
				} else if (offTime ===0){
					offTime = (new Date).getTime();
				}else {
					runDuration = (new Date).getTime() - offTime;
					dataNew.runDuration = runDuration;
				}

				if(appState === 0.4){
					defrostStart = (new Date).getTime();
				} else if(appState === 0.8){
					defrostEnd = (new Date).getTime();
				} else if ( appState === 0.6){

				} else {
					dataNew.defrostLength = defrostEnd - defrostStart;
				}


           
        });
       }else{

			console.log(a + ':' + error);
       };
   	})
		
},10000);

 return dataNew;
}

CR2HP1data = webboardData(CR2HP1);
CR2HP2data = webboardData(CR2HP2);
CR2HP3data = webboardData(CR2HP3);
CR3HP1data = webboardData(CR3HP1);
CR3HP2data = webboardData(CR3HP2);
CR3HP3data = webboardData(CR3HP3);
CR3HP4data = webboardData(CR3HP4);
buildingData = webboardData(Building);

exports.CR2HP1 = function (req, res) {
  res.json(CR2HP1data);
};

exports.CR2HP2 = function (req, res) {
  res.json(CR2HP2data);
};

exports.CR2HP3 = function (req, res) {
  res.json(CR2HP3data);
};

exports.CR3HP1 = function (req, res) {
  res.json(CR3HP1data);
};

exports.CR3HP2 = function (req, res) {
  res.json(CR3HP2data);
};

exports.CR3HP3 = function (req, res) {
  res.json(CR3HP3data);
};

exports.CR3HP4 = function (req, res) {
  res.json(CR3HP4data);
};

exports.building = function (req, res) {
  res.json(buildingData);
};
