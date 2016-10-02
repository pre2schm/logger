
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
					defrostLength: [],
					dataTime:[]
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
	var dataTime = 0;
	var defrostStart1 = 0

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
					defrostStart1 = (new Date).getTime();
				} else if(appState === 0.8){
					defrostEnd = (new Date).getTime();
					defrostStart = defrostStart1;
				} else if ( appState === 0.6){

				} else {
					dataNew.defrostLength = defrostEnd - defrostStart;
				}

				dataNew.dataTime = (new Date).getTime();
           
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


// var dataArray = [
// 				'CR2HP1data',
// 				'CR2HP2data',
// 				'CR2HP3data',
// 				'CR3HP1data',
// 				'CR3HP2data',
// 				'CR3HP3data',
// 				'CR3HP4data',
// 				'buildingData'
// 				];
// var sumData =[];

// function summaryData(dataArray2){
	
// 			for (i = 0; i < dataArray2.length; i++) { 
// 				var thing = this[dataArray2[i]];

// 				if(dataArray2[i]>10){
// 					var data = digitalRounder(dataArray2[i].device, 53);
// 		    		sumData.push = {device : data};
// 					}
// 				};
// return sumData;
// }
				

	// function digitalRounder(device,index){
	//         var dataRound;
	//         dataRound = Math.round(((device.digital[0][index-1]))*1)/1;
	//         return dataRound;
	//       };

// setInterval(function(){
// 	sumData =[];
// 	for (i=0; i < dataArray.length; i++){
// 		console.log(dataArray[i].device + ' : ' + digitalRounder(dataArray[i].device, 53));
// 	}
	
// 	//console.log("digital:" + summaryData(dataArray));
// },10000);



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

module.exports.unitOn = function(req, res) {
  console.log(req.body);
  var device = req.body.device;
  var ip;

  if (device === 'CR2HP1'){
  	call(CR2HP1);
  } else if (device ==='CR2HP2'){
  	call(CR2HP2);
  } else if (device ==='CR2HP3'){
  	call(CR2HP3);
  } else if (device ==='CR3HP1'){
  	call(CR3HP1);
  } else if (device ==='CR3HP2'){
  	call(CR3HP2);
  } else if (device ==='CR3HP3'){
  	call(CR3HP3);
  } else if (device ==='CR3HP4'){
  	call(CR3HP4);
  } else if (device ==='Building'){
  	call(Building);
  }

  console.log(device);

  function call(ip) {
  	request('http://admin:fadmin@'+ ip + '/config/query.cgi?var|D|53|1|', function (error, response, body){
  	if (!error && response.statusCode == 200) {
    console.log('sent') 
  			}else{
  				console.log(error);
  			}
		})
	}
}

  module.exports.unitOff = function(req, res) {
  console.log(req.body);
  var device = req.body.device;
  var ip;

  if (device === 'CR2HP1'){
  	call(CR2HP1);
  } else if (device ==='CR2HP2'){
  	call(CR2HP2);
  } else if (device ==='CR2HP3'){
  	call(CR2HP3);
  } else if (device ==='CR3HP1'){
  	call(CR3HP1);
  } else if (device ==='CR3HP2'){
  	call(CR3HP2);
  } else if (device ==='CR3HP3'){
  	call(CR3HP3);
  } else if (device ==='CR3HP4'){
  	call(CR3HP4);
  } else if (device ==='Building'){
  	call(Building);
  }

  console.log(device);

  function call(ip) {
  	request('http://admin:fadmin@'+ ip + '/config/query.cgi?var|D|53|0|', function (error, response, body){
  	if (!error && response.statusCode == 200) {
    console.log('sent') 
  			}else{
  				console.log(error);
  			}
		})
	}
  }

