/*global angular, cordova, console */

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
                           'starter.controllers',
                           'starter.services',
                           'restangular',
                           'ngNotify',
                           'ui.bootstrap.datetimepicker'
                          ]).run(function ($ionicPlatform) {

    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })

    .state('main', {
        url: '/main',
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
    })
    
    .state('edit', {
        url: '/edit/:objectId',
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
    })
    
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

})

.run(['Restangular', '$rootScope', '$state', function(Restangular, $rootScope, $state) {
//    Restangular.setBaseUrl("http://localhost:8080/VolunteerApp/"); //THE LOCAL HOST
//    Restangular.setBaseUrl("http://172.27.219.120:8080/VolunteerApp/"); //THE MAC AT CARL'S DESK
//    Restangular.setBaseUrl("http://172.25.80.82:8080/VolunteerApp/"); //CARL'S LAPTOP
//    Restangular.setBaseUrl("http://www.housuggest.org:8888/VolunteerApp/"); //HOUSUGGEST FOR VMA CORE
    Restangular.setBaseUrl("http://localhost:8080/ArtApp/"); //TIM'S LAPTOP
        
    //TO ACCESS RESTANGULAR IN CONTROLLARS WITHOUT INJECTION
    $rootScope.Restangular = function() {
        return Restangular;
    }
}]);