angular.module('starter.controllers', [])


.controller('TodoCtrl', function($scope, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate) {

  // A utility function for creating a new project
  // with the given projectTitle
  var createProject = function(projectTitle) {
    var newProject = Projects.newProject(projectTitle);
    $scope.projects.push(newProject);
    Projects.save($scope.projects);
    $scope.selectProject(newProject, $scope.projects.length-1);
  }


  // Load or initialize projects
  $scope.projects = Projects.all();

  // Grab the last active, or the first project
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

  // Called to create a new project
  $scope.newProject = function() {
    var projectTitle = prompt('Project name');
    if(projectTitle) {
      createProject(projectTitle);
    }
  };
  
  // Called to remove a project
  $scope.remove = function(project) {       
    $scope.projects.splice($scope.projects.indexOf(project), 1);
    
    // Inefficient, but save all the projects
    Projects.save($scope.projects);    
  };  

  // Called to select the given project
  $scope.selectProject = function(project, index) {
    $scope.activeProject = project;
    Projects.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
  };



  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  
  $scope.toggleProjects2 = function() {
    $ionicSideMenuDelegate.toggleRight();
  };

  // Try to create the first project, make sure to defer
  // this by using $timeout so everything is initialized
  // properly
  $timeout(function() {
    if($scope.projects.length == 0) {
      while(true) {
        var projectTitle = prompt('Your first project title:');
        if(projectTitle) {
          createProject(projectTitle);
          break;
        }
      }
    }
  });

})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicSideMenuDelegate, Countries) {

  // Load or initialize countries
  //$scope.countrylist = Countries.all();

  // Grab the last active, or the first country
  //$scope.activeCountry = $scope.countrylist[0];

  $scope.toggleProjects2 = function() {
    $ionicSideMenuDelegate.toggleRight();
  }; 
  
  
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
  
  $scope.clearSearch = function() {
    $scope.searchKey = "";
    //$scope.loadData();
  };
  
  // Called to remove a project
  $scope.remove = function(recipe) {       
    $scope.recipelist.splice($scope.recipelist.indexOf(recipe), 1);
   
  };    
  
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