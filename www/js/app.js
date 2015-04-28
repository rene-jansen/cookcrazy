// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

/*
.constant("locl", "countries")
.constant("localDB", new PouchDB("countries"))
.constant("remoteDB", new PouchDB("https://cookenut:cNoTZVePNp@cookenet.iriscouch.com/countries"))
.constant("recipeDB", new PouchDB("recipes"))
.constant("recipeRemoteDB", new PouchDB("https://cookenut:cNoTZVePNp@cookenet.iriscouch.com/recipes"))
.constant("categoryDB", new PouchDB("categories"))
.constant("categoryRemoteDB", new PouchDB("https://cookenut:cNoTZVePNp@cookenet.iriscouch.com/categories"))
*/

.run(function($ionicPlatform, $rootScope /*, localDB, remoteDB, recipeDB, recipeRemoteDB, categoryDB, categoryRemoteDB */ ) {
  
  $rootScope.server = "http://belgianbeerexplorer.coenraets.org";
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    /*
    recipeDB.destroy();
    
    recipeRemoteDB.put(
      {
                _id: new Date().toISOString(),
                name: 'Kangaroo Steak',
                country: 'Australia',
                category: 'Main',
                imagePath: 'img/australia.png',
                description: 'Traditional outback food',
                ingredient1: '1 Skip',
                ingredient2: 'Salt Pepper',
                production: '1. Heat up the barbie',
                author: 'Waltzing Mathilda',
                source: 'NT recipes',
                preparationtime: 10,
                cookingtime: 4,
                serves: 4
            }
    
    );
    */
  /*  
    localDB.sync(remoteDB, {live: true});
    recipeDB.sync(recipeRemoteDB, {live: true});
    categoryDB.sync(categoryRemoteDB, {live: true});
    
    */
  });
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.countries', {
    url: "/countries",
    views: {
      'menuContent': {
        templateUrl: "templates/countries.html",
        controller: 'CountrylistCtrl'
      }
    }
  })

  .state('app.categories', {
    url: "/categories",
    views: {
      'menuContent': {
        templateUrl: "templates/categories.html",
        controller: 'CategorylistCtrl'
      }
    }
  })
  
  .state('app.recipes', {
    url: "/recipes",
    views: {
      'menuContent': {
        templateUrl: "templates/recipes.html",
        controller: 'RecipelistCtrl'
      }
    }
  })

  .state('app.single', {
    url: "/recipe/:recipeId",
    views: {
      'menuContent': {
        templateUrl: "templates/recipe.html",
        controller: 'RecipeCtrl'
      }
    }
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/recipes');
});
