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
        },
        strPresent: function(list,key){
                
            for(var i=0;i<list.length;i++){
                    
                if(list[i].toLowerCase()==key.toLowerCase()){
                        
                    return true;
                }
            }
            
            return false;
        }
    }
})

.service('DBService', function(Restangular){
    
    var artObjects = {};
    var needUpdate = false;
    
    this.loadObjects = function(){
        
        testProm = Restangular.all('artobjects').getList('',{Authorization:'Basic QWRtaW46dGVzdA=='});
        testProm.then(function(success){
        
            artObjects = success;
            
            for(var i=0;i<artObjects.length;i++){
                
                if(artObjects[i].date_made && artObjects[i].date_made){
                    
                    var dob = (new Date(artObjects[i].artist_dob));
                    var made = (new Date(artObjects[i].date_made));
                    
                    artObjects[i].date_made = made.getFullYear()+"/"+made.getMonth()+"/"+made.getDate();
                    artObjects[i].artist_dob = dob.getFullYear()+"/"+dob.getMonth()+"/"+dob.getDate();
                }
            }
            
            needUpdate = false;
        },
        function(error){
            
            console.log('There was an error');
        });
        
        return testProm;
    }
    
    this.getObjects = function(){
        
        if(artObjects.length == 0)
            return null;
        else
            return artObjects;
    }
    
    this.getById = function(id){
        
        temp = artObjects.filter(function(element) {
            return element.artwork_id == id;
        });
        
        return temp[0];
    }
    
    this.updateById = function(object){
        
        Restangular.all('artobjects').all(object.artwork_id).post(object,'',{Authorization:'Basic QWRtaW46dGVzdA=='});
    }
    
    this.addObject = function(object){
        
        needUpdate = true;
        return Restangular.all('artobjects').post(object,'',{Authorization:'Basic QWRtaW46dGVzdA=='});
    }
    
    this.deleteById = function(id){
        
        Restangular.all('artobjects').all(id).remove('',{Authorization:'Basic QWRtaW46dGVzdA=='});
    }
    
    this.needUpdate = function(){
        
        return needUpdate;
    }
    
    this.setNeedUpdate = function(need){
        
        needUpdate = need;
    }
});
