angular.module('starter.services', ['ngResource'])

.factory('Session', function ($resource) {
    return $resource('http://cookenet.iriscouch.org/countries/:countryId');
})

.factory('PouchDBListener', ['$rootScope', function($rootScope) {
 
    localDB.changes({
        continuous: true,
        onChange: function(change) {
            if (!change.deleted) {
                $rootScope.$apply(function() {
                    localDB.get(change.id, function(err, doc) {
                        $rootScope.$apply(function() {
                            if (err) console.log(err);
                            $rootScope.$broadcast('add', doc);
                        })
                    });
                })
            } else {
                $rootScope.$apply(function() {
                    $rootScope.$broadcast('delete', change.id);
                });
            }
        }
    });
 
    return true;
     
}])

.factory('Settings', function() {
  
  var defaultCountry = "Australia",
      showAllCountry = true;
  
  return {
    all: function() {
      var settingsString = window.localStorage['settings'];
      if(settingsString) {
        return angular.fromJson(settingsString);
      }
      return {defaultCountry: "au", showAllCountry: true };
    },      
    getShowAllCountry: function() {      
      return showAllCountry;
    },
    setShowAllCountry: function(showountry) {      
      showAllCountry = showcountry;
    },
    save: function(settings) {
      window.localStorage['settings'] = angular.toJson(settings);
    }      
  }
})

.factory('Projects', function() {
  return {
    all: function() {
      var projectString = window.localStorage['projects'];
      if(projectString) {
        return angular.fromJson(projectString);
      }
      return [];
    },
    save: function(projects) {
      window.localStorage['projects'] = angular.toJson(projects);
    },
    newProject: function(projectTitle) {
      // Add a new project
      return {
        title: projectTitle,
        tasks: []
      };
    },
    removeProject: function(project) {
      //chats.splice(chats.indexOf(chat), 1);
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveProject']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveProject'] = index;
    }
  }
})

.factory('Countries', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var countries = [{
      _id: 'au',  // http://www.1728.org/countries.htm
      country: 'Australia',            
      imagePath: 'img/australia.png'
  }, {
      _id: 'br',
      country: 'Brazil',
      imagePath: 'img/brazil.png'
  }, {
      _id: 'cn',
      country: 'China',
      imagePath: 'img/china.png'
  }];

  return {
    all: function() {
      return countries;
    },
    query: function(showall) {      
      if (showall) { return all() };
            
      var countriesWithRecipes = [];
      for (var i = 0; i < countries.length; i++) {
        // has country a recipe ? Recipes.forCountry(countries[i].country) 
        if (countries[i]._id === parseInt(countryId)) {
          countriesWithRecipes.push(countries[i]);
        }
      }      
      return countriesWithRecipes;
    },    
    remove: function(country) {
      countries.splice(countries.indexOf(country), 1);
    },
    get: function(countryId) {
      for (var i = 0; i < countries.length; i++) {
        if (countries[i]._id === parseInt(countryId)) {
          return countries[i];
        }
      }
      return null;
    }
  };
})

.factory('Categories', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var categories = [{
      _id: '1',  
      category: 'Entree',            
      order: 10
  }, {
      _id: '2',  
      category: 'Main',            
      order: 20
  }, {
      _id: '3',  
      category: 'Desert',            
      order: 30
  }];

  return {
    all: function() {
      return categories;
    },
    remove: function(category) {
      categories.splice(categories.indexOf(category), 1);
    },
    newCategory: function() {
      // Add a new category
      return {
        _id: String(categories.length + 1),
        category: "",
        order: (categories.length + 1 ) * 10
      };
    },    
    create: function(category) {
      categories.push(category);
    },
    get: function(categoryId) {
      for (var i = 0; i < categories.length; i++) {
        if (categories[i]._id === categoryId) {          
          return categories[i];
        }
      }
      return null;
    }
  };
})

.factory('Recipes', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var recipes = [{
      _id: '1',
      name: 'Kangaroo Steak',
      country: 'Australia',      
      tags: 'Main, Game',
      imagePath: 'img/australia.png',
      description: 'Traditional outback food',
      ingredient1: '1 Skip',
      ingredient2: 'Salt',
      production: '1. Heat up the barbie',
      author: 'Waltzing Mathilda xxxx yyyy  zz yyy dd',
      source: 'NT recipes url url url url fhfhfhfhf hjhjhjhjh bnbnb nn nn sshha',
      preparationtime: 10,
      cookingtime: 4,
      serves: 4
  }, {
      _id: '2',
      name: 'Pavlova',
      country: 'Australia',
      tags: 'Desert',
      imagePath: 'img/australia.png',
      description: 'Egg white',
      ingredient1: '2 eggs',
      ingredient2: 'Cream',
      production: '1. Heat up the oven',
      author: 'Ballerina',
      source: 'Jamie Oliver',
      preparationtime: 15,
      cookingtime: 45,
      serves: 6
  }, {
      _id: '3',
      name: 'Peking Duck',
      country: 'China',
      tags: 'Main',
      imagePath: 'img/china.png',
      description: 'Traditional chinees',
      ingredient1: '1 duck',
      ingredient2: 'Pepper',
      production: '1. Heat up the fry pan',
      author: 'Mao Tse Tung',
      source: 'Wild China',
      preparationtime: 30,
      cookingtime: 60,
      serves: 4
  }];

  return {
    all: function() {
      return recipes;
    },
    query: function(searchKey) {
      
      for (var i = 0; i < recipes.length; i++) {
        if (recipes[i]._id === recipeId) {
          return recipes[i];
        }
      }
      return null;            
    },
    newRecipe: function() {
      // Add a new recipe
      return {
        _id: String(recipes.length + 1),
        name: "",
        imagePath: 'img/australia.png'
      };
    },     
    remove: function(recipe) {
      recipes.splice(recipes.indexOf(recipe), 1);
    },
    get: function(recipeId) {
      for (var i = 0; i < recipes.length; i++) {
        if (recipes[i]._id === recipeId) {
          return recipes[i];
        }
      }
      return null;
    }
  };
})


;