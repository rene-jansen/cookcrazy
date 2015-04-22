angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('CountrylistCtrl', function($scope, $rootScope, Countries) {
  $scope.countrylist = Countries.all();
})

.controller('CategorylistCtrl', function($scope, $rootScope, Categories) {
  $scope.categorylist = Categories.all();
})

.controller('RecipelistCtrl', function($scope, $rootScope, Recipes) {
  $scope.recipelist = Recipes.all();
})

.controller('RecipeCtrl', function($scope, $stateParams, Recipes) {
  $scope.recipe = Recipes.get($stateParams.recipeId);
})

/*
.controller('RecipeListCtrl', function($scope, $rootScope, recipeDB) {
  $scope.recipelist = [];
  
  recipeDB.allDocs({include_docs: true}, function(err, response) {
    $scope.$apply(function() {
      response.rows.forEach(function(row) {
        $scope.recipelist.push(row.doc);
      });
    });
  });   
})

.controller('RecipeCtrl', function($scope, $stateParams, recipeDB) {
  recipeDB.get($stateParams.recipeId).then(function (doc) {    
    $scope.recipe = doc;
  });
})

.controller('CountrylistCtrl', function($scope, $rootScope, localDB) {
  $scope.countrylist = [];
  
  localDB.allDocs({include_docs: true}, function(err, response) {
    $scope.$apply(function() {
      response.rows.forEach(function(row) {
        $scope.countrylist.push(row.doc);
      });
    });
  });    
})

.controller('CategorylistCtrl', function($scope, $rootScope, categoryDB) {
  $scope.categorylist = [];
  
  categoryDB.allDocs({include_docs: true}, function(err, response) {
    $scope.$apply(function() {
      response.rows.forEach(function(row) {
        $scope.categorylist.push(row.doc);
      });
    });
  });    
})
*/

;