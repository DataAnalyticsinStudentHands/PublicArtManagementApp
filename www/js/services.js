angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Bob Marley' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.factory('LoginFactory', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var validUsers = [
    { username: 'Kool Kid', password: 'vigil' },
    { username: 'Russel', password: 'oh no!' },
    { username: 'Terrier', password: 'bobbeh' },
    { username: 'Timothy Brown', password: 'robert' },
    { username: 'User', password: 'test' }
  ];

  return {
    isValid: function(user) {
      
        for(var i=0;i<validUsers.length;i++){
            
            if(user.username==validUsers[i].username&&
               user.password==validUsers[i].password){
                
                return true;
            }
        }
        
        return false;
    }
  }
})

.factory('ArtObjectFactory', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var artobject = {
    location_lat: 0, location_long: 0,
    artist_name: 'Russel', medium: 'Water Color',
    dimensions: '3x3', location_campus: 'Main',
    indoor: true, type: 'Sculpture',
    shape: 'Mobian', tags: 'Art, Cool, Fun, Public',
    color: 'Brown', art_movement: 'Post-Contemporary',
    description: 'Here is the description.', image: 'image.png'
  };

  return {
    create: function(title) {
      
        artobject.title = title;
        return artobject;
    },
    verifyAll: function(obj){
        
        
    }
  }
})

.factory('UtilFactory', function(){
    
    return {
        
        tagsToStr: function(tagsList){
            
            var outStr = "";
            
            for(var i=0;i<tagsList.length;i++){
                
                outStr += tagsList[i];
                
                if(i!=tagsList.length-1){
                    
                    outStr += ",";
                }
            }
            
            return outStr;
        }
    }
});
