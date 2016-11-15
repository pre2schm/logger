// Imports
var parseString = require('xml2js').parseString;
var request = require('request');

var devices = [];
var dataStore = [];


function pushDevice(name,ipAddress) {
	var newDevice = {name : name,
					ipAddress : ipAddress};
	devices.push = newDevice;
}

function createDataVar(name, data) {
	var newData = {name : name,
					data: data};
	dataStore.push = newData;

}

var deviceArray =[	{ deviceName : 'CR2HP1' , deviceIP : '10.1.0.171' },
					{ deviceName : 'CR2HP2' , deviceIP : '10.1.0.122' },
					{ deviceName : 'CR2HP3' , deviceIP : '10.1.0.131' },
					{ deviceName : 'CR3HP1' , deviceIP : '10.1.0.138' },
					{ deviceName : 'CR3HP2' , deviceIP : '10.1.0.118' },
					{ deviceName : 'CR3HP3' , deviceIP : '10.1.0.211' },
					{ deviceName : 'CR3HP4' , deviceIP : '10.1.0.214' },
					{ deviceName : 'Building' , deviceIP : '10.1.0.151' },

];

// Device Ip Addresses
var CR2HP1 = '10.1.0.171';
var CR2HP2 = '10.1.0.122';
var CR2HP3 = '10.1.0.131';
var CR3HP1 = '10.1.0.138';
var CR3HP2 = '10.1.0.118';
var CR3HP3 = '10.1.0.211';
var CR3HP4 = '10.1.0.214';
var Building = '10.1.0.151';

// Variables to push data to
var CR2HP1data = 0;
var CR2HP2data = 0;
var CR2HP3data = 0;
var CR3HP1data = 0;
var CR3HP2data = 0;
var CR3HP3data = 0;
var CR3HP4data = 0;
var buildingData = 0;

// Return analog variable from webboard data, a= data set, b= BMS No.
function findAnalog(a,b){
	return a.PCOWEB.PCO[0].ANALOG[0].VARIABLE[b].VALUE[0];
};

// Return digital variable from webboard data, a= data set, b= BMS No.
function findDigital(a,b){
	return a.PCOWEB.PCO[0].DIGITAL[0].VARIABLE[b].VALUE[0];
};

// Return integer variable from webboard data, a= data set, b= BMS No.
function findInteger(a,b){
	return a.PCOWEB.PCO[0].INTEGER[0].VARIABLE[b].VALUE[0];
};


  

// Get data from webboard and add to array
function webboardData(a){

	// return analog BMS variable from dataNew and scale
	function analogRounder(index,scale){
	    var dataRound;
	    dataRound = Math.round(((dataNew.analog[0][index-1])*scale)*10)/10;
	    return dataRound;
	};
	function analogRounderPrevious(index,scale){
	    var dataRound;
	    dataRound = Math.round(((dataNew.analog[1][index-1])*scale)*10)/10;
	    return dataRound;
	};

	function integerRounder(index,scale){
	    var dataRound;
	    dataRound = Math.round(((dataNew.integer[0][index-1])*scale)*10)/10;
	    return dataRound;
	};

	var data = 'loading...';
	var dataNew ={ 	analog: [['1','2'],['11','12']],
					digital: [[1],[2]],
					integer: [[1],[2]],
					defrostElapse: [],
					runDuration: [],
					defrostLength: [],
					dataTime:[],
					condPlateTemps:[],
					condIntTemps:[]
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
	var defrostStart1 = 0;

	var condenserPlateTemp = 0;
    var condenserInterfaceTemp = 0;
    var condPlateTemps =[];
    var condIntTemps =[];
    var current;
    var previousAppState;
    var lowCondIntTemp;
    var lowCondPlateTemp;


// GET data from webboard
	setInterval(function(){
		request('http://admin:fadmin@'+ a + '/config/xml.cgi?A%7C1%7C300%7CD%7C1%7C300%7CI%7C1%7C300', {timeout: 1500}, function (error, response, body) {
        	if(!error){
        		//parse XML to string
        		parseString(body, function (err, result) {

	        	data = result;	        	
	        	analog = [];
	        	digital = [];
	        	integer =[];

	        	// if data array has 10 items then remove the last item
	        	if (dataNew.analog.length === 10){
	        		dataNew.analog.pop();
	        		dataNew.digital.pop();
	        		dataNew.integer.pop();
	        	};

	        	// from results push data into a analog array
	        	for (i = 0; i < 300; i++) { 
	    		analog.push(findAnalog(result,i));
	    		digital.push(findDigital(result,i));
	    		integer.push(findInteger(result,i));
				};

				// add to front of data array 
				dataNew.analog.unshift(analog);
				dataNew.digital.unshift(digital);
				dataNew.integer.unshift(integer);

				// get application state
				appState = analogRounder(133,1);
				previousAppState = analogRounderPrevious(133,1);
				condenserPlateTemp = integerRounder(232,0.1);
        		condenserInterfaceTemp = analogRounder(252,1);
        		condPlateTemps =[];
        		condIntTemps =[];
				
				// calculate defrost elapse time
				if(appState === 0.5){
					defrostTime = (new Date).getTime();
					defrostElapse = 0;
				} else if(defrostTime===0){
					dataNew.defrostElapse = 0;
				}else{
					defrostElapse = (new Date).getTime() - defrostTime;
					dataNew.defrostElapse = defrostElapse;
				}


				if(appState == 0.5 && previousAppState != 0.5 ){
					lowCondPlateTemp = condenserPlateTemp;
					lowCondIntTemp = condenserInterfaceTemp;
				} else if (appState == 0.5 && previousAppState == 0.5){
					if(condenserPlateTemp < lowCondPlateTemp){
						lowCondPlateTemp = condenserPlateTemp;
						lowCondIntTemp = condenserInterfaceTemp;
					}
				} else if (appState != 0.5 && previousAppState == 0.5){
					condPlateTemps.unshift(lowCondPlateTemp);
					condIntTemps.unshift(lowCondIntTemp);
					if(condPlateTemps >9){
						condPlateTemps.pop();
						condIntTemps.pop();
					}

				}

				// calculate run duration
				if(appState === 0){
					offTime = (new Date).getTime();
					runDuration = 0;
				} else if (offTime ===0){
					offTime = (new Date).getTime();
				}else {
					runDuration = (new Date).getTime() - offTime;
					dataNew.runDuration = runDuration;
				}


				// calculate length of defrost
				if(appState === 0.4){
					defrostStart1 = (new Date).getTime();
				} else if(appState === 0.8){
					defrostEnd = (new Date).getTime();
					defrostStart = defrostStart1;
				} else if ( appState === 0.6){

				} else {
					dataNew.defrostLength = defrostEnd - defrostStart;
				}

				// add timestamp to data
				dataNew.dataTime = (new Date).getTime();

				dataNew.condPlateTemps = condPlateTemps;
				dataNew.condIntTemps = condIntTemps;
           
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


var dataArray = [
				CR2HP1data,
				CR2HP2data,
				CR2HP3data,
				CR3HP1data,
				CR3HP2data,
				CR3HP3data,
				CR3HP4data,
				buildingData
				];
var sumData =[];

function digitalRounder(device,index){
	        var dataRound;
	        dataRound = Math.round(((device.digital[0][index-1]))*1)/1;
	        return dataRound;
	      };
function analogRounder2(device,index,scale){
        var dataRound;
        dataRound = Math.round(((device.analog[0][index-1])*scale)*10)/10;
        return dataRound;
      };



setInterval(function(){
	//console.log(dataArray[1].digital[0][53]);
	sumData = {'status' : [] ,
				'flow' : [] ,
				'return' : [],
				'time' : [],
				'state' : [],
				'defrostTime' : [],
				'compSpeed' : [],
				'evapTemp' : [],
				'ambient' : [] };

	for (i = 0; i < dataArray.length; i++) { 

		//console.log(i + 'a : ' + dataArray[i].analog[0].length);	
	
		if(dataArray[i].analog[0].length > 3) {
		
		//console.log(i + ' : ' + dataArray[i].digital[0][52]);
		//sumData.push(dataArray[i].digital[0][52]);
		sumData.status.push(digitalRounder(dataArray[i],53));
		sumData.flow.push(analogRounder2(dataArray[i],47,1));
		sumData.return.push(analogRounder2(dataArray[i],2,1));
		sumData.state.push(analogRounder2(dataArray[i],133,10));
		sumData.compSpeed.push(analogRounder2(dataArray[i],176,10));
		sumData.time.push(dataArray[i].dataTime);
		sumData.defrostTime.push(dataArray[i].defrostLength);
		sumData.evapTemp.push(analogRounder2(dataArray[i],118,0.1));
		sumData.ambient.push(analogRounder2(dataArray[i],173,0.1));

		} else {
		sumData.status.push('-');	
		sumData.flow.push('-');	
		sumData.return.push('-');
		sumData.state.push(0);
		sumData.compSpeed.push('-');	
		sumData.time.push('0');		
		sumData.defrostTime.push('-');
		sumData.evapTemp.push('-');
		sumData.ambient.push('-');		
		}
		
	}
	console.log(sumData);
},10000);

exports.summary = function (req, res) {
  res.json(sumData);
};

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

exports.settings = function (req, res) {
  res.json(deviceArray);
};

exports.settingsPOST = function (req, res) {
  console.log(req.body);
  deviceArray = req.body;
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

module.exports.buildNo = function(req, res) {
 // console.log(req.body)

var buildNo = [];
  for (i = 0; i < req.body.length; i++) { 
  	buildNo.push(req.body[i].id);
  	console.log(buildNo);
  }


}
