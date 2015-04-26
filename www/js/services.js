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
    get: function(categoryId) {
      for (var i = 0; i < categories.length; i++) {
        if (categories[i]._id === parseInt(categoryId)) {
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
      category: 'Main',
      imagePath: 'img/australia.png',
      description: 'Traditional outback food',
      ingredient1: '1 Skip',
      ingredient2: 'Salt',
      production: '1. Heat up the barbie',
      author: 'Waltzing Mathilda',
      source: 'NT recipes',
      preparationtime: 10,
      cookingtime: 4,
      serves: 4
  }, {
      _id: '2',
      name: 'Pavlova',
      country: 'Australia',
      category: 'Desert',
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
      category: 'Main',
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
    query: function() {
      return recipes;
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