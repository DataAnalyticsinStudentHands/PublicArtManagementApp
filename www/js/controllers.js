angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, UtilFactory, $ionicPopup, $timeout, ArtObjectFactory, ngNotify, $filter, $stateParams, DBService) {
    
    $scope.artOb = {};
    
    $scope.curSelection = {};
    
    $scope.chosenTags = [];
    
    $scope.tagsList = [

        '--',
        'Faculty',
        'Alumni',
        'Orientation',
        'Central'
    ];
    
    
    $scope.movementsList = [
        
        '--',
        'Abstract',
        'Contemporary',
        'Optical',
        'Minimalism',
        'Photography',
        'Land'
    ];
    
    
    
    $scope.campusList = [
        
        '--',
        'Main',
        'Downtown',
        'Victoria',
        'Clear Lake'
    ];
    
    
    // Set default to "--", may be overwritten below
    $scope.curSelection.movement = $scope.movementsList[0];
    $scope.curSelection.campus = $scope.campusList[0];
    
    // Add strings to lists if editing, that is, if not new object
    if($stateParams.objectId!=-1){
        
        $scope.artOb = DBService.getById($stateParams.objectId);
        
        if(!UtilFactory.strPresent($scope.movementsList,$scope.artOb.art_movement)){
           
            $scope.movementsList.push($scope.artOb.art_movement);
        }
        
        if(!UtilFactory.strPresent($scope.campusList,$scope.artOb.location_campus)){
           
            $scope.campusList.push($scope.artOb.location_campus);
        }
        
        $scope.curSelection.movement = $scope.artOb.art_movement;
        $scope.curSelection.campus = $scope.artOb.location_campus;
        if($scope.artOb.tags){
            
            $scope.chosenTags = $scope.artOb.tags.split(",");
        }
    }
    
    /*** Populate tagsList here, [Custom] must be last ***/
    $scope.tagsList.push('[Custom]');
    
    /*** Populate movementsList here, [Custom] must be last ***/
    $scope.movementsList.push('[Custom]');
    
    /*** Populate campusList here, [Custom] must be last ***/
    $scope.campusList.push('[Custom]');    
    
    
    $scope.addTag = function (tag) {

        //DON'T FORGET TO ADD VALIDATION
        if (tag != '--') {

            if (tag == '[Custom]') {
                
                popup('Enter Tag','',function (res) {

                    
                    if(res){
                        
                        var present = false;
                
                        for(var i=0;i<$scope.chosenTags.length;i++){
                    
                            if($scope.chosenTags[i].toLowerCase()==res.toLowerCase()){
                        
                                present = true;
                            }
                        }
                
                        if(!present){
                    
                            $scope.chosenTags.push(res);
                        }
                    }
                });


                /**********************/
                /*** END POPUP CODE ***/
                /**********************/
            } else {
                
                // Checks for tag in chosenTags, not case sensitive
                if(tag){
                
                    if(!inArray(tag,$scope.chosenTags)){
                    
                        $scope.chosenTags.push(tag);
                    }
                }
            }
        }
    }
    
    $scope.tagClick = function(index){
        
        $scope.chosenTags.splice(index,1);
    }
    
    $scope.movementChange = function(selection){        
        
        
        if(selection=="[Custom]"){
            
            $scope.curSelection.movement = '--';
            
            /*******************************
            ******  POPUP STUFF!!!!!!!  ****
            *******************************/
        
            
            popup('Enter Art Movement','',function (res) {

                    
                if(res){
                
                    if(!inArray(res,$scope.movementsList)){
                    
                        // If we already have a custom tag, remove it
                        if($scope.movementsList[$scope.movementsList.length-1]!='[Custom]'){
                                
                            $scope.movementsList.pop();
                        }
                                
                        $scope.movementsList.push(res);
                        $scope.curSelection.movement = res;
                    }
                }
            });
        
            /*******************************
            ******  POPUP STUFF END!!!  ****
            *******************************/
            
            
        }
    }
    
    $scope.campusChange = function(selection){
        
        if(selection=="[Custom]"){
            
            $scope.curSelection.campus = '--';
            
            /*******************************
            ******  POPUP STUFF!!!!!!!  ****
            *******************************/
        
            
            popup('Enter Campus','',function (res) {

                    
                if(res){
                
                    if(!inArray(res,$scope.campusList)){
                    
                        // If we already have a custom tag, remove it
                        if($scope.campusList[$scope.campusList.length-1]!='[Custom]'){
                                
                            $scope.campusList.pop();
                        }
                                
                        $scope.campusList.push(res);
                        $scope.curSelection.campus = res;
                    }
                }
            });
        
            /*******************************
            ******  POPUP STUFF END!!!  ****
            *******************************/
        }
    }
    
    
    /******************************
    *****  CONTROL FUNCTIONS  *****
    ******************************/
    
    var popup = function(inTitle,subtitle,promise){
        
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="data.popVar">',
            title: inTitle,
            subTitle: subtitle,
            scope: $scope,
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: '<b>Ok</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                                
                        if (!$scope.data.popVar) {
                            //don't allow the user to close unless he enters input
                            e.preventDefault();
                        } else {
                            return $scope.data.popVar;
                        }
                    }
                }
            ]
        });

        myPopup.then(promise);
    }
    
    var inArray = function(target, array){
                
        for(var i=0;i<array.length;i++){
                    
            if(array[i].toLowerCase()==target.toLowerCase()){
                        
                return true;
            }
        }
        
        return false;
    }
    
    $scope.openDatePicker = function (title, target) {
        $scope.data = {};

        var datePopup = $ionicPopup.show({
            template: '<datetimepicker data-ng-model="data.newDate" data-datetimepicker-config="{ startView:\'year\', minView:\'day\' }"></datetimepicker>',
            title: title,
            scope: $scope,
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        var test = $filter('date')($scope.data.newDate, 'yyyy/MM/dd');
                        //$scope.myapplication[acType] = test;
                        $scope.artOb[target] = test;
                    }
                }
            ]
        });
    };
    
})

    
.controller('FriendsCtrl', function ($scope, Friends) {
    $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function ($scope) {})

.controller('LoginCtrl', function ($scope, $state, $timeout, LoginFactory, DBService) {


    $scope.signIn = function (user) {

        //if(LoginFactory.isValid(user)){
        
        $state.go('main');
        
        //}
    }

})

.controller('MainCtrl', function($scope, DBService){
    
    var obs = DBService.getObjects();
    
    if(obs.length!=null && obs.length!=0){
        
        $scope.artObjects = DBService.getObjects();
    }
    else{
        
        DBService.loadObjects().then(function(success){
            
            $scope.artObjects = success;
        },
        function(fail){
            
            
        });
    }
})

.controller('EditCtrl', function($scope,$state,$stateParams, DBService){
    
    $scope.object = DBService.getById($stateParams.objectId);
    
})

// Nested in DashCtrl
.controller('NewArtCtrl', function($scope,$state,$ionicPopup,$filter,UtilFactory,ngNotify){
    
    $scope.createArtObject = function (artOb) {
    
        var errorStack = [];
        
        if (artOb) {

            artOb.location_lat = 0;
            artOb.location_long = 0;
            artOb.image = 'image.png';
            
            /*** UtilFactory.tagsToStr($scope.chosenTags) will stringify chosenTags ***/
            artOb.tags = UtilFactory.tagsToStr($scope.chosenTags);
            //console.log(artOb.tags);
            
            artOb.art_movement = $scope.curSelection.movement;
            
            artOb.location_campus = $scope.curSelection.campus;
        }
        
        
        
        /********************
            VALIDATE HERE
        ********************/
        
        
        if(artOb.art_movement=="--" || artOb.location_campus=="--" || artOb.tags==""){
            
            if(artOb.art_movement=="--"||artOb.location_campus=="--")
                errorStack.push("Required drop-down fields blank");
            
            if(artOb.tags=="")
                errorStack.push("No tags selected");
            
            $scope.selectValid = false;
            $scope.selectInvalid = true;
        }
        else{
            
            $scope.selectValid = true;
            $scope.selectInvalid = false;
        }
        
        
        // RESTAngular Stuff, disabled until validation complete
        /*
        var testProm = $scope.Restangular().all('artobjects').getList('',{Authorization:'Basic VXNlcjp0ZXN0'});
        testProm.then(function(success){
        
            console.log(success);
        },
        function(error){
            
            console.log('There was an error');
        });
        */
        
        // If date pattern matches OR date is empty, pattern error will be false
        if($scope.new_art_form.$valid && $scope.selectValid && !$scope.new_art_form.artist_dob.$error.pattern &&
           !$scope.new_art_form.date_made.$error.pattern){
            
            $scope.data = {}

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<ul class="list"><li class="item item-text-wrap" ng-repeat="(key,value) in artOb.plain()"><span class="input-label">{{key}}:</span><div>{{value}}</div></li></ul>',
                title: "<b>Review Submission</b>",
                subTitle: "",
                scope: $scope,
                buttons: [
                    {
                        text: 'Cancel'
                    },
                    {
                        text: '<b>Submit</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                                
                            console.log($scope.artOb);
                        }
                    }
                ]
            });

            myPopup.then(function(){
            
                if($scope.artOb.id){
                    
                    $scope.Restangular().one('artobjects',$scope.artOb.id).post($scope.artOb,'',{Authorization:'Basic VXNlcjp0ZXN0'});
                }
                else{
                    
                    $scope.Restangular().all('artobjects').post($scope.artOb,'',{Authorization:'Basic VXNlcjp0ZXN0'});
                }
                
                $state.go('main');
            });
        }
        else{
            
            // Alert user via popup about empty fields
            // Or improper date format
            var reqError = $scope.new_art_form.$error.required;
            var dateError = $scope.new_art_form.$error.pattern;
            
            if(reqError){
                
                errorStack.push("Required textfields left blank");
            }
            
            if(dateError){
                
                errorStack.push("Date not in yyyy/mm/dd format");
            }
            
            console.log(errorStack[0]);
            ngNotify.set(errorStack[0], {
                position: 'bottom',
                type: 'error'
            });
        }
    }
});