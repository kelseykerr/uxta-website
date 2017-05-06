'use strict';

/**
 * @ngdoc overview
 * @name anglerfishApp
 * @description
 * # anglerfishApp
 *
 * Main module of the application.
 */
angular
  .module('nearbySite', [
    'ngAnimate',
    'ngCookies',
    'ui.router',
    'ui.bootstrap',
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
      });
    $locationProvider.html5Mode(true);
  })
  .controller('homeCtrl', function($scope) {
    // Highlight the top nav as scrolling occurs

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
  });;
