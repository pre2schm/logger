'use strict';

/* Controllers */
 

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {



    // $http({
    //   method: 'GET',
    //   url: '/api/summary'
    // }).
    // success(function (data, status, headers, config) {
    //   $scope.name = data.name;
    //   //$scope.gasTemp = 4;
    // }).
    // error(function (data, status, headers, config) {
    //   $scope.name = 'Error!';
    // });

  }).
  controller('templateCtrl', function ($scope, $http, $timeout, $routeParams) {
    // write Ctrl here
 
    $scope.clickOn = 0;
    $scope.clickOnFunction = function(){
      $scope.clickOn++;
      $http({
        method: 'POST',
        url: '/api2/unitOn',
        data: { device: $scope.num }
      })
    }

    $scope.clickOff = 0;
    $scope.clickOffFunction = function(){
      $scope.clickOff++;
      $http({
        method: 'POST',
        url: '/api2/unitOff',
        data: { device: $scope.num }
      })
    }

    $scope.num = $routeParams.num;
    $scope.intervalFunction = function(){
      $timeout(function() {
        $scope.data();
        $scope.intervalFunction();
      }, 10000);
    };
   
    $scope.data = function(){
      $http({
        method: 'GET',
        url: '/api2/' + $scope.num
      }).
    success(function (data, status, headers, config) {
      
      function analogRounder(index,scale){
        var dataRound;
        dataRound = Math.round(((data.analog[0][index-1])*scale)*10)/10;
        return dataRound;
      };
      function integerRounder(index,scale){
        var dataRound;
        dataRound = Math.round(((data.integer[0][index-1])*scale)*10)/10;
        return dataRound;
      };

        $scope.flowTemp = data.analog[0][46];
        $scope.returnTemp = data.analog[0][1];
        $scope.gasTemp = analogRounder(113,0.1);
        $scope.shA = analogRounder(175,0.1);
        $scope.compSpeed = analogRounder(176,10);
        $scope.ambient = analogRounder(173,0.1);        
        $scope.highPress = analogRounder(116,0.1);
        $scope.lowPress = analogRounder(117,0.1);
        $scope.capacity = analogRounder(144,10);
        $scope.evapTemp = analogRounder(243,1);
        $scope.fan = analogRounder(142,10);
        $scope.condTemp = analogRounder(119,0.1);
        $scope.maxCap = analogRounder(179,10);
        $scope.minCap = analogRounder(180,10);
        $scope.COP = analogRounder(138,0.01);
        $scope.power = analogRounder(134,10);        
        $scope.suctTemp = analogRounder(121,0.1);
        $scope.valveOpen = analogRounder(174,0.1);
        $scope.runTime = Math.round(data.runDuration/60000*1)/1;
        $scope.defrostElapse = Math.round(data.defrostElapse/60000*1)/1;
        $scope.defrostDuration = Math.round(data.defrostLength/60000*1)/1;
        $scope.condenserPlateTemp = integerRounder(232,0.1);
        $scope.condenserInterfaceTemp = analogRounder(252,1);
        $scope.defrostPlateSP = analogRounder(255,1);
        $scope.defrostInterfaceSP = analogRounder(253,1);
        $scope.interfaceAlarm = data.digital[0][178];

        
        
        $scope.minInterfaceTemp = data.condIntTemps[0];
        $scope.minPlateTemp = data.condPlateTemps[0];

        
        if ($scope.runTime > 1440){
          var days = Math.floor($scope.runTime/1440);
          var hours = Math.floor(($scope.runTime - (days * 1440))/60);
          var mins = $scope.runTime - (hours * 60) - (days * 1440);
          days
          
          $scope.runTime = days + 'days ' + hours + ' hours ' + mins;
        } else if ($scope.runTime > 60){
          var hours = Math.floor($scope.runTime/60);
          var mins = $scope.runTime - (hours * 60);
          $scope.runTime = hours + ' hours ' + mins;
        }
        
        $scope.timediff = (new Date).getTime() - data.dataTime;
        if($scope.timediff > 60000){
          $scope.state = "Not Connected";
          $scope.var = 0;
        } else {
          $scope.state = "Connected";
          $scope.var = 1;
        }


        var defrostNo = analogRounder(178,10);

        if(defrostNo === 0){
          $scope.defrost = "No Reason";
        }else if(defrostNo === 1){
          $scope.defrost = "External Demand";
        }else if(defrostNo === 2){
          $scope.defrost = "Timer Interval";
        }else if(defrostNo === 3){
          $scope.defrost = "Digital Input 1";
        }else if(defrostNo === 4){
          $scope.defrost = "Absolute Trigger";
        }else if(defrostNo === 5){
          $scope.defrost = "Defrost Delta Variation";
        }else if(defrostNo === 6){
          $scope.defrost = "LOP Recovery";
        }

       

        var compState = analogRounder(133,10);

        if(compState === 0){
          $scope.comp = "OFF";
        } else if (compState === 1){
          $scope.comp = "Cooling";
        } else if (compState === 2){
          $scope.comp = "Heating";
        } else if (compState === 3){
          $scope.comp = "Alarm";
        } else if (compState === 4){
          $scope.comp = "Transition to Defrost";
        } else if (compState === 5){
          $scope.comp = "Defrost";
        } else if (compState === 6){
          $scope.comp = "Waiting";
        } else if (compState === 7){
          $scope.comp = "Standby";
        } else if (compState === 8){
          $scope.comp = "Transition to Heating";
        } else if (compState === 9){
          $scope.comp = "Stopping";
        } else if (compState === 10){
          $scope.comp = "Manual";
        } else {
          $scope.comp = compState;
        }

      }).
        error(function (data, status, headers, config) {
          $scope.name = 'Error!';
      });
    }
      $scope.data(); 
      $scope.intervalFunction();



  }).

  controller('summary', function ($scope, $http, $timeout) {
    // write Ctrl here
 $scope.devices2 = [

        {device: 'CR2HP1', status: '', flow : '', return : '', state : '', compSpeed : '', defrostTime : '', connected : '', var2 : '', id : '', evapTemp : '', ambient : ''},
        {device: 'CR2HP2', status: '', flow : '', return : '', state : '', compSpeed : '', defrostTime : '', connected : '', var2 : '', id : '', evapTemp : '', ambient : ''},
        {device: 'CR2HP3', status: '', flow : '', return : '', state : '', compSpeed : '', defrostTime : '', connected : '', var2 : '', id : '', evapTemp : '', ambient : ''},
        {device: 'CR3HP1', status: '', flow : '', return : '', state : '', compSpeed : '', defrostTime : '', connected : '', var2 : '', id : '', evapTemp : '', ambient : ''},
        {device: 'CR3HP2', status: '', flow : '', return : '', state : '', compSpeed : '', defrostTime : '', connected : '', var2 : '', id : '', evapTemp : '', ambient : ''},
        {device: 'CR3HP3', status: '', flow : '', return : '', state : '', compSpeed : '', defrostTime : '', connected : '', var2 : '', id : '', evapTemp : '', ambient : ''},
        {device: 'CR3HP4', status: '', flow : '', return : '', state : '', compSpeed : '', defrostTime : '', connected : '', var2 : '', id : '', evapTemp : '', ambient : ''},
        {device: 'Building', status: '', flow : '', return : '', state : '', compSpeed : '', defrostTime : '', connected : '', var2 : '', id : '', evapTemp : '', ambient : ''},

      ];  

$scope.goGet = function(){

  $http({
        method: 'GET',
        url: '/api2/summary'
      }).
      success(function (data2, status, headers, config) {
      
      
          

        $scope.lengthy = $scope.devices2.length 
        
        //Loop through devices in Array
        for (var i = 0; i < $scope.lengthy; i++) { 
            $scope.devices2[i].flow = data2.flow[i];
            $scope.devices2[i].return = data2.return[i];
            $scope.devices2[i].compSpeed = data2.compSpeed[i];
            $scope.devices2[i].defrostTime = Math.round(data2.defrostTime[i]/60000)/1;
            $scope.devices2[i].evapTemp = data2.evapTemp[i];
            $scope.devices2[i].ambient = data2.ambient[i];
            $scope.currentTime = (new Date).getTime()

            if($scope.currentTime - data2.time[i] > 60000){
              $scope.devices2[i].connected = '-';
              $scope.devices2[i].var2 = 0;
            } else {
              $scope.devices2[i].connected ='Connected';
              $scope.devices2[i].var2 = 1;
            }


            //Status Display
             if(data2.status[i] === 1){
              $scope.devices2[i].status = 'ON';
             }else if(data2.status[i] === 0){
              $scope.devices2[i].status = 'OFF';
             }else{
              $scope.devices2[i].status = '-';
             }

            $scope.stateArray = ['OFF', 'Cooling', 'Heating', 'Alarm', 'Transition to Defrost', 'Defrost', 'Waiting', 'Standby', 'Transition to Heating', 'Stopping', 'Manual'];
            //stateNumber = data2.state[i];
            $scope.devices2[i].state = $scope.stateArray[data2.state[i]];

            

          };
        }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });
}



$scope.getter = function(){
  $timeout(function() {
    $scope.goGet();
    $scope.getter();
  
  }, 10000);
}

$scope.goGet();
$scope.getter();

$scope.postBuildNo = function(){
      $http({
        method: 'POST',
        url: '/api2/buildNo',
        data: $scope.devices2
      })
    }

}).
  controller('settings', function ($scope, $http) {
  
  $scope.deviceSettings = [];
  $scope.deviceName1;
  $scope.deviceIP1;

  $scope.getDeviceSettings = function (){
    $http({
      method: 'GET',
      url: '/api2/settings'
    }).
    success(function (data3, status, headers, config) {

    $scope.deviceSettings = data3;

    })
  }

  $scope.postDeviceSettings = function (){
    $http({
      method: 'POST',
      url: '/api2/settingsPOST',
      data: $scope.deviceSettings
    })
  }


  $scope.addDevice = function() {
   
  $scope.deviceSettings.push({ deviceName : $scope.deviceName1 , deviceIP : $scope.deviceIP1});

  $scope.deviceName1 = '';
  $scope.deviceIP1 = '';
  $scope.postDeviceSettings();
  }

  $scope.removeDevice = function(index) {
    $scope.deviceSettings.splice(index,1);
    $scope.postDeviceSettings();
  }

 $scope.getDeviceSettings();

  });
