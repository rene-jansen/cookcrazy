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

.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout, $ionicSideMenuDelegate, Countries, Settings) {

  // Load or initialize countries
  //$scope.countrylist = Countries.all();

  // Grab the last active, or the first country
  $scope.activeCountry = "Australia";

  
  $rootScope.$on('searchKeyChange', function(event, searchKey) {
      $scope.searchKey = searchKey;
    console.log('searchKey: ', searchKey);
      //$scope.loadData();
  });
  
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
  

  // Create the Settings modal that we will use later
  $ionicModal.fromTemplateUrl('templates/settings.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.settingsmodal = modal;
  });

  $scope.countrylist = Countries.all();
    
  $scope.settings = Settings.all();  
  
  // Triggered in the login modal to close it
  $scope.closeSettings = function() {    
    Settings.save($scope.settings);        
    $scope.settingsmodal.hide();
  };

  // Open the Settings modal
  $scope.showSettings = function() {        
    $scope.settingsmodal.show();
  };  
  
})

.controller('CountrylistCtrl', function($scope, $rootScope, $state, Countries, Settings) {
  $scope.settings = Settings.all(); 
  
  //filter if 'Show all Countries' is not set
  $scope.countrylist = Countries.all();    
})

.controller('CategorylistCtrl', function($scope, $rootScope, $ionicModal, Categories) {
  
  $scope.categorylist = Categories.all();
  
  // Called to remove a category
  $scope.remove = function(category) {       
    $scope.categorylist.splice($scope.categorylist.indexOf(category), 1);   
  };  
  
  // Form data for the Category modal
  $scope.categoryData = Categories.newCategory();
  
  // Create the Category modal that we will use later
  $ionicModal.fromTemplateUrl('templates/createCategory.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.categorymodal = modal;
  });

  // Triggered in the Category modal to close it
  $scope.closeCategory = function() {
    $scope.categorymodal.hide();
  };

  // Open the Category modal
  $scope.createCategory = function() {    
    $scope.categorymodal.show();
  };      
  
  // Perform the create action when the user accepts (=submits) the create Category form
  $scope.acceptCategory = function() {
    console.log('Accepting', $scope.categoryData);
    
    //Categories.create($scope.categoryData);
    $scope.categorylist.push($scope.categoryData);
    //$scope.categorylist = Categories.all();
    
    $scope.closeCategory();
    
    // refresh with possible new one
    $scope.categoryData = Categories.newCategory();
  };  
})

.controller('CategoryCtrl', function($scope, $stateParams, $ionicModal, Categories) {  
  
  console.log($stateParams.categoryId);
  $scope.category = Categories.get($stateParams.categoryId);  
  
  console.log($scope.category.category);
  
  // Create the Category modal that we will use later
  $ionicModal.fromTemplateUrl('templates/updateCategory.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.categorymodal = modal;
  });

  // Triggered in the Category modal to close it
  $scope.closeCategory = function() {
    $scope.categorymodal.hide();
  };

  // Open the Category modal
  $scope.updateCategory = function() {    
    $scope.categorymodal.show();
  };      
  
  // Perform the create action when the user accepts (=submits) the create Category form
  $scope.acceptCategory = function() {
    console.log('Accepting', $scope.category);
    
    //Categories.create($scope.categoryData);
    //$scope.categorylist.push($scope.categoryData);
    //$scope.categorylist = Categories.all();
    
    $scope.closeCategory();
    
  };    
  
})

.controller('RecipelistCtrl', function($scope, $rootScope, $ionicModal, Recipes) {
  
  $scope.recipelist = Recipes.all();
  
  $scope.clearSearch = function() {
    $scope.searchKey = "";
    //$scope.loadData();
  };
  
  // Called to remove a recipe
  $scope.remove = function(recipe) {       
    $scope.recipelist.splice($scope.recipelist.indexOf(recipe), 1);
   
  };    
  
  // Form data for the Category modal
  $scope.recipeData = Recipes.newRecipe();
  
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/createRecipe.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.recipemodal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeRecipe = function() {
    $scope.recipemodal.hide();
  };

  // Open the login modal
  $scope.createRecipe = function() {
    $scope.recipemodal.show();
  };    
  
  // Perform the create action when the user accepts (=submits) the create Category form
  $scope.acceptRecipe = function() {
    console.log('Accepting', $scope.recipeData);
    
    //Categories.create($scope.categoryData);
    $scope.recipelist.push($scope.recipeData);
    //$scope.recipelist = Categories.all();
    
    $scope.closeRecipe();
    
    // refresh with possible new one
    $scope.recipeData = Recipes.newRecipe();
  };    
})

.controller('RecipeCtrl', function($scope, $stateParams, $state, $rootScope, $ionicModal, Recipes, Categories) {  
  
  $scope.recipe = Recipes.get($stateParams.recipeId);
  $scope.tags =  $scope.recipe.tags === undefined ? '': $scope.recipe.tags.split(',');
  
  $scope.tgs = $scope.tags[0];
  $scope.optionaltags = $scope.recipe.tags === undefined ? '': $scope.recipe.tags.split(',');
  
  $scope.abc = $scope.optionaltags.shift();
  console.log('1st?', $scope.abc);
  console.log('Optional: ', $scope.optionaltags.toString());
  
  $scope.categorylist = Categories.all();
  
  
  
  
  $scope.setSearchKey = function(searchKey) {
    $rootScope.$emit('searchKeyChange', searchKey);
    $state.go('app.recipes');
  };  
  
  // Create the Recipe modal that we will use later
  $ionicModal.fromTemplateUrl('templates/updateRecipe.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.recipemodal = modal;
  });

  // Triggered in the Recipe modal to close it
  $scope.closeRecipe = function() {
    $scope.recipemodal.hide();
  };

  // Open the Recipe modal
  $scope.updateRecipe = function() {    
    $scope.recipemodal.show();
  };      
  
  // Perform the create action when the user accepts (=submits) the create Category form
  $scope.acceptRecipe = function() {
    
    console.log('Accepting', $scope.recipe);
    
    console.log('Optional: ', $scope.optionaltags);
    console.log('Mand.: ', $scope.tgs);
    console.log('All.: ', $scope.tgs + ", " + $scope.optionaltags);
    
    //Categories.create($scope.categoryData);
    //$scope.categorylist.push($scope.categoryData);
    //$scope.categorylist = Categories.all();
    
    $scope.closeRecipe();
    
  };    
  
    
  $scope.autoExpand = function(e) {
        var element = typeof e === 'object' ? e.target : document.getElementById(e);
    		var scrollHeight = element.scrollHeight -60; // replace 60 by the sum of padding-top and padding-bottom
        element.style.height =  scrollHeight + "px";    
    };
  
  
})


/*

.directive('textarea', function() {
  return {
    restrict: 'E',
    controller: function($scope, $element) {
      $element.css('overflow-y','hidden');
      $element.css('resize','none');
      resetHeight();
      adjustHeight();

      function resetHeight() {
        $element.css('height', 0 + 'px');
      }

      function adjustHeight() {
        var height = angular.element($element)[0]
          .scrollHeight + 1;
        $element.css('height', height + 'px');
        $element.css('max-height', height + 'px');
      }

      function keyPress(event) {
        // this handles backspace and delete
        if (_.contains([8, 46], event.keyCode)) {
          resetHeight();
        }
        adjustHeight();
      }

      $element.bind('keyup change blur', keyPress);

    }
  };
})

.directive('textarea', function() {
  return {
    restrict: 'E',
    link: function(scope, element, attr){
        var update = function(){
            element.css("height", "auto");
            var height = element[0].scrollHeight; 
            element.css("height", element[0].scrollHeight + "px");
        };
        scope.$watch(attr.ngModel, function(){
            update();
        });
    }
  };
})


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