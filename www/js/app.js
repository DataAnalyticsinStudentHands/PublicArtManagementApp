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
                           'databaseServicesModule',
                           'ui.bootstrap.datetimepicker',
                           'angularFileUpload'
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
        controller: 'LoginCtrl',
        authenticate: false
    })
    
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })
    
    .state('tab.artwork', {
        url: '/artwork',
        views: {
            'tab-artwork': {
                templateUrl: 'templates/artwork.html',
                controller: 'ArtworkCtrl'
            }
        }
    })
    
    .state('tab.tours', {
        url: '/tours',
        views: {
            'tab-tours': {
                templateUrl: 'templates/tours.html',
                controller: 'ToursCtrl'
            }
        }
    })
    
    .state('tab.artwork-edit', {
        url: '/edit/:objectId',
        views: {
            'tab-artwork': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })
    
    .state('tab.artwork-imedit', {
        url: '/imedit/:objectId',
        views: {
            'tab-artwork': {
                templateUrl: 'templates/imedit.html',
                controller: 'ImageCtrl'
            }
        }
    })
    
    .state('tab.tour-build', {
        url: '/artincedit/:tourId',
        views: {
            'tab-tours': {
                templateUrl: 'templates/artincedit.html',
                controller: 'ArtIncCtrl'
            }
        }
    })
    
    .state('tab.tour-edit', {
        url: '/touredit/:tourId',
        views: {
            'tab-tours': {
                templateUrl: 'templates/touredit.html',
                controller: 'TourEditCtrl'
            }
        }
    })
    
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

})

.run(['Restangular', '$rootScope', '$state', 'Auth', function(Restangular, $rootScope, $state, Auth) {

    Restangular.setBaseUrl("http://localhost:8080/ArtApp/"); //Local Host
    //Restangular.setBaseUrl("http://www.housuggest.org:8080/ArtApp/"); //DASH Server
    
    //TO ACCESS RESTANGULAR IN CONTROLLERS WITHOUT INJECTION
    $rootScope.Restangular = function() {
        return Restangular;
    }
    
    $rootScope.isAuthenticated = function() {
        return Auth.hasCredentials();
    }
    
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams)     {
      //console.log("$stateChangeStart");
      //console.log($rootScope.isAuthenticated());
      if (toState.authenticate && !$rootScope.isAuthenticated()){
        //console.log("non-authed");
        // User isn’t authenticated
        $state.go("login");
        //What?
        event.preventDefault(); 
      } //else console.log("authed");
    });
}]);