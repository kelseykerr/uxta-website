'use strict';

angular
  .module('uxtaSite', [
    'ngAnimate',
    'ngCookies',
    'ui.router',
    /*'ui.bootstrap',*/
    'ngTouch',
    'duScroll'
  ])

  .config(function($stateProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/views/home.html',
        controller: 'homeCtrl'
      })
      .state('privacy', {
        url: '/privacy',
        templateUrl: '/views/privacy.html',
        controller: 'homeCtrl'
      })
      .state('faq', {
        url: '/faq',
        templateUrl: '/views/faq.html',
        controller: 'homeCtrl'
      })
      .state('terms', {
        url: '/terms',
        templateUrl: '/views/tos.html',
        controller: 'homeCtrl'
      });
    $locationProvider.html5Mode(true);
  })
  .controller('homeCtrl', function($scope, $http) {
    // Highlight the top nav as scrolling occurs
    $scope.inventory = {
      items: [],

      zip: '',

      notAvailable: false,

      noResults: false,

      getPhotoUrl: function(photo) {
        if (photo.photos === undefined || photo.photos.length < 1) {
          return "img/nearby_pin_blue.png";
        } else {
          return "https://s3.amazonaws.com/nearbyappphotos/" + photo.photos[0];
        }
      },

      loadItems: function() {
        $http.get('https://server.thenearbyapp.com/api/requests/public?zip=' + $scope.inventory.zip)
          .then(function(res) {
            $scope.inventory.notAvailable = false;
            $scope.inventory.items = res.data;
            if ($scope.inventory.items.length == 0) {
              $scope.inventory.notResults = true;
            } else {
              $scope.inventory.notResults = true;
            }
          }, function(err) {
            $scope.inventory.items = [];
            console.log(err);
            if (err.status == 403) {
              $scope.inventory.notAvailable = true;
              $scope.inventory.notResults = false;
            } else {
              $scope.inventory.notResults = true;
              $scope.inventory.notAvailable = false;
            }
          });
      },

      init: function() {}
    };

  })
  .controller('navCtrl', function($scope, $anchorScroll) {
    $scope.nav = {
      goToTop: function() {
        $anchorScroll();
      }
    }
  })
  .directive("navScroll", function($window) {
    return function(scope, element, attrs) {
      angular.element($window).bind("scroll", function() {
        if (!scope.scrollPosition) {
          scope.scrollPosition = 0
        }
        if (this.pageYOffset > 5) {
          scope.shouldBeAffixed = true;
        } else {
          scope.shouldBeAffixed = false;
        }
        scope.scrollPosition = this.pageYOffset;
        scope.$apply();
      });
    };
  });
