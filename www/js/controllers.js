angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, UtilFactory, $ionicPopup, $timeout, $filter, $stateParams, DBService) { //ngNotify,
    
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
                        var test = $filter('date')($scope.data.newDate, 'yyyy-MM-dd');
                        //$scope.myapplication[acType] = test;
                        $scope.artOb[target] = test;
                    }
                }
            ]
        });
    };
    
})

.controller('LoginCtrl', function ($scope, $state, $timeout, $ionicLoading, Auth, DBService) {


    if($scope.isAuthenticated() === true) {
         //IF SUCCESSFULLY AUTH-ED USER IS TRYING TO GO TO LOGIN PAGE => SEND TO HOME PAGE OF APP
         $state.go('main');
    }
    else{
        
        Auth.clearCredentials();
    }
    
    $scope.user = {};
     $scope.salt = "nfp89gpe"; //PENDING - NEED TO GET ACTUAL SALT
     $scope.submit = function(name,pass) {
         console.log("SUBMIT");
         if ($scope.user.username && $scope.user.password) {
             document.activeElement.blur();
             $timeout(function() {
                 $ionicLoading.show();
                 $scope.passWordHashed = new String(CryptoJS.SHA512($scope.user.password + $scope.user.username + $scope.salt));
                 Auth.setCredentials($scope.user.username, $scope.passWordHashed);
                 $scope.user.username = '';
                 $scope.user.password = '';
                 $scope.loginResultPromise = $scope.Restangular().all("users").getList();//.all("myUser")
                 $scope.loginResultPromise.then(function(result) {
                    $scope.loginResult = result;
                    $scope.loginMsg = "You have logged in successfully!";
                    Auth.confirmCredentials();
                    //$state.go("main", {}, {reload: true});
                     $state.go("main");
                    //ngNotify.set($scope.loginMsg, 'success');
                    $ionicLoading.hide();
                 }, function(error) {
                    $scope.loginMsg = "Incorrect username or password.";
                    //ngNotify.set($scope.loginMsg, {position: 'top', type: 'error'});
                    Auth.clearCredentials();
                    $ionicLoading.hide();
                 });
             }, 500);
         } else {
             $scope.loginMsg = "Please enter a username and password.";
             //ngNotify.set($scope.loginMsg, {position: 'top', type: 'error'});
         }
     };

})

.controller('MainCtrl', function($scope, Auth, $state, $ionicPopup, DBService){
    
    $scope.showDel = false;
    $scope.showOps = false;
    $scope.opIndex = -1;
    
    var obs = DBService.getObjects();
    
    if(obs.length!=null && obs.length!=0 && !DBService.needUpdate){
        
        $scope.artObjects = DBService.getObjects();
    }
    else{
        
        DBService.loadObjects().then(function(success){
            
            $scope.artObjects = success;
            DBService.setNeedUpdate(false);
        },
        function(fail){
            
            
        });
    }
    
    $scope.confirmDelete = function(inTitle,id,index){
        
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.confirm({
            template: 'Delete \"'+inTitle+'?\"',
            title: 'Confirm Deletion'
        });

        myPopup.then(function(res){
            
            if(res){
                
                //testProm = $scope.Restangular().all('artobjects').all(id).remove('',{Authorization:'Basic QWRtaW46dGVzdA=='});
                
                DBService.deleteById(id);
                
                $scope.artObjects.splice(index,1);
            }
            else{
                
                console.log(inTitle+" not deleted!");
            }
        });
    }
    
    $scope.logOut = function(){
        
        Auth.clearCredentials();
        $state.go('login');
    }
    
    $scope.toggleOps = function(newInd){
        
        if(newInd == $scope.opIndex){
            
            $scope.showOps = !$scope.showOps;
        }
        else{
            
            $scope.showOps = true;
            $scope.opIndex = newInd;
        }
    }
})

.controller('MainCtrl', function($scope, Auth, $state, $ionicPopup, DBService){
    
    $scope.showDel = false;
    $scope.showOps = false;
    $scope.opIndex = -1;
    
    var obs = DBService.getObjects();
    
    if(obs.length!=null && obs.length!=0 && !DBService.needUpdate){
        
        $scope.artObjects = DBService.getObjects();
    }
    else{
        
        DBService.loadObjects().then(function(success){
            
            $scope.artObjects = success;
            DBService.setNeedUpdate(false);
        },
        function(fail){
            
            
        });
    }
    
    $scope.confirmDelete = function(inTitle,id,index){
        
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.confirm({
            template: 'Delete \"'+inTitle+'?\"',
            title: 'Confirm Deletion'
        });

        myPopup.then(function(res){
            
            if(res){
                
                //testProm = $scope.Restangular().all('artobjects').all(id).remove('',{Authorization:'Basic QWRtaW46dGVzdA=='});
                
                DBService.deleteById(id);
                
                $scope.artObjects.splice(index,1);
            }
            else{
                
                console.log(inTitle+" not deleted!");
            }
        });
    }
    
    $scope.logOut = function(){
        
        Auth.clearCredentials();
        $state.go('login');
    }
    
    $scope.toggleOps = function(newInd){
        
        if(newInd == $scope.opIndex){
            
            $scope.showOps = !$scope.showOps;
        }
        else{
            
            $scope.showOps = true;
            $scope.opIndex = newInd;
        }
    }
})

.controller('ImageCtrl', function($scope, $state, DBService){
    
    
})

// Nested in DashCtrl
.controller('NewArtCtrl', function($scope,$state,$ionicPopup,$filter,UtilFactory,DBService){ //,ngNotify
    
    $scope.createArtObject = function (artOb) {
    
        var errorStack = [];
        
        if (artOb) {

            artOb.image = 'image.png';
            
            /*** UtilFactory.tagsToStr($scope.chosenTags) will stringify chosenTags ***/
            artOb.tags = UtilFactory.tagsToStr($scope.chosenTags);
            
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
        
        if(artOb.plain){
            
            artOb = artOb.plain();
            $scope.artOb = $scope.artOb.plain();
        }
        
        
        // If date pattern matches OR date is empty, pattern error will be false
        if($scope.new_art_form.$valid && $scope.selectValid && !$scope.new_art_form.artist_dob.$error.pattern &&
           !$scope.new_art_form.date_made.$error.pattern){
            
            $scope.data = {}

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<ul class="list"><li class="item item-text-wrap" ng-repeat="(key,value) in artOb"><span class="input-label">{{key}}:</span><div>{{value}}</div></li></ul>',
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
                            return true;
                        }
                    }
                ]
            });

            myPopup.then(function(success){
            
                if(success){
                    if($scope.artOb.artwork_id){
                    
//$scope.Restangular().all('artobjects').all($scope.artOb.artwork_id).post($scope.artOb,'',{Authorization:'Basic QWRtaW46dGVzdA=='});
                        DBService.updateById($scope.artOb);
                        $state.go('main');
                    }
                    else{
                    
                        //$scope.Restangular().all('artobjects').post($scope.artOb,'',{Authorization:'Basic QWRtaW46dGVzdA=='});
                            DBService.addObject($scope.artOb).then(function(res){
                        
                        
                                $state.go('main');
                            });
                    
                            //Update client-side list
                    }
                }
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
                
                errorStack.push("Date or Lat/Long format error");
            }
            
            console.log(errorStack[0]);
            
            //DON'T FORGET TO RE-ENABLE NOTIFY
            /*ngNotify.set(errorStack[0], {
                position: 'bottom',
                type: 'error'
            });*/
        }
    }
});