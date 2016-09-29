'use strict';

/* Controllers */
 

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    // $http({
    //   method: 'GET',
    //   url: '/api/name'
    // }).
    // success(function (data, status, headers, config) {
    //   $scope.name = data.name;
    //   //$scope.gasTemp = 4;
    // }).
    // error(function (data, status, headers, config) {
    //   $scope.name = 'Error!';
    // });

  }).
  controller('CR2HP1', function ($scope,$http, $timeout) {
    // write Ctrl here

    $scope.intervalFunction = function(){
      $timeout(function() {
        $scope.data();
        $scope.intervalFunction();
      }, 10000);
    };
   
    $scope.data = function(){
      $http({
        method: 'GET',
        url: '/api2/CR2HP1'
      }).
    success(function (data, status, headers, config) {
      
      function analogRounder(index,scale){
        var dataRound;
        dataRound = Math.round(((data.analog[0][index-1])*scale)*10)/10;
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
        $scope.evapTemp = analogRounder(118,1);
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
  controller('CR2HP2', function ($scope,$http, $timeout) {
    // write Ctrl here

    $scope.intervalFunction = function(){
      $timeout(function() {
        $scope.data();
        $scope.intervalFunction();
      }, 10000);
    };
   
    $scope.data = function(){
      $http({
        method: 'GET',
        url: '/api2/CR2HP2'
      }).
    success(function (data, status, headers, config) {
      
      function analogRounder(index,scale){
        var dataRound;
        dataRound = Math.round(((data.analog[0][index-1])*scale)*10)/10;
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
        $scope.evapTemp = analogRounder(118,1);
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
  controller('CR2HP3', function ($scope,$http, $timeout) {
    // write Ctrl here

    $scope.intervalFunction = function(){
      $timeout(function() {
        $scope.data();
        $scope.intervalFunction();
      }, 10000);
    };
   
    $scope.data = function(){
      $http({
        method: 'GET',
        url: '/api2/CR2HP3'
      }).
    success(function (data, status, headers, config) {
      
      function analogRounder(index,scale){
        var dataRound;
        dataRound = Math.round(((data.analog[0][index-1])*scale)*10)/10;
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
        $scope.evapTemp = analogRounder(118,1);
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
  controller('CR3HP1', function ($scope,$http, $timeout) {
    // write Ctrl here

    $scope.intervalFunction = function(){
      $timeout(function() {
        $scope.data();
        $scope.intervalFunction();
      }, 10000);
    };
   
    $scope.data = function(){
      $http({
        method: 'GET',
        url: '/api2/CR3HP1'
      }).
    success(function (data, status, headers, config) {
      
      function analogRounder(index,scale){
        var dataRound;
        dataRound = Math.round(((data.analog[0][index-1])*scale)*10)/10;
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
        $scope.evapTemp = analogRounder(118,1);
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
  controller('CR3HP2', function ($scope,$http, $timeout) {
    // write Ctrl here

    $scope.intervalFunction = function(){
      $timeout(function() {
        $scope.data();
        $scope.intervalFunction();
      }, 10000);
    };
   
    $scope.data = function(){
      $http({
        method: 'GET',
        url: '/api2/CR3HP2'
      }).
    success(function (data, status, headers, config) {
      
      function analogRounder(index,scale){
        var dataRound;
        dataRound = Math.round(((data.analog[0][index-1])*scale)*10)/10;
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
        $scope.evapTemp = analogRounder(118,1);
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
  controller('CR3HP3', function ($scope,$http, $timeout) {
    // write Ctrl here

    $scope.intervalFunction = function(){
      $timeout(function() {
        $scope.data();
        $scope.intervalFunction();
      }, 10000);
    };
   
    $scope.data = function(){
      $http({
        method: 'GET',
        url: '/api2/CR3HP3'
      }).
    success(function (data, status, headers, config) {
      
      function analogRounder(index,scale){
        var dataRound;
        dataRound = Math.round(((data.analog[0][index-1])*scale)*10)/10;
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
        $scope.evapTemp = analogRounder(118,1);
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
  controller('CR3HP4', function ($scope,$http, $timeout) {
    // write Ctrl here

    $scope.intervalFunction = function(){
      $timeout(function() {
        $scope.data();
        $scope.intervalFunction();
      }, 10000);
    };
   
    $scope.data = function(){
      $http({
        method: 'GET',
        url: '/api2/CR3HP4'
      }).
    success(function (data, status, headers, config) {
      
      function analogRounder(index,scale){
        var dataRound;
        dataRound = Math.round(((data.analog[0][index-1])*scale)*10)/10;
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
        $scope.evapTemp = analogRounder(118,1);
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

  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });
