angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */

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

.service('DBService', function(Restangular, UtilFactory){
    
    var artObjects = {};
    var tours = {}
    var needUpdate = false;
    
    this.loadObjects = function(){
        
        testProm = Restangular.all('artobjects').getList();
        testProm.then(function(success){
        
            artObjects = success;
            
//            for(var i=0;i<artObjects.length;i++){
//                
//                if(artObjects[i].date_made && artObjects[i].date_made){
//                    
//                    var dob = (new Date(artObjects[i].artist_dob));
//                    var made = (new Date(artObjects[i].date_made));
//                    
//                    artObjects[i].date_made = made.getFullYear()+"/"+made.getMonth()+"/"+made.getDate();
//                    artObjects[i].artist_dob = dob.getFullYear()+"/"+dob.getMonth()+"/"+dob.getDate();
//                }
//            }
            
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
        
        needUpdate = true;
        return Restangular.all('artobjects').all(object.artwork_id).post(object);
    }
    
    this.addObject = function(object){
        
        needUpdate = true;
        return Restangular.all('artobjects').post(object);
    }
    
    this.deleteById = function(id){
        
        Restangular.all('artobjects').all(id).remove();
    }
    
    this.deleteImage = function(id, filename){
        
        Restangular.all('artobjects').all('upload').remove({"id":id,"fileName":filename});
    }
    
    this.needUpdate = function(){
        
        return needUpdate;
    }
    
    this.setNeedUpdate = function(need){
        
        needUpdate = need;
    }
    
    this.loadTours = function(){
        
        testProm = Restangular.all('tours').getList();
        testProm.then(function(success){
        
            tours = success;
            
            tours.forEach(function(curVal, ind, arr){
                
                if(curVal.artwork_included){
                    
                    curVal.artwork_included = curVal.artwork_included.split(",");
                }
            });
            
            needUpdate = false;
        },
        function(error){
            
            console.log('There was an error');
        });
        
        return testProm;
    }
    
    this.getTours = function(){
        
        if(tours.length == 0)
            return null;
        else
            return tours;
    }
    
    this.getTourById = function(id){
        
        temp = tours.filter(function(element) {
            return element.tour_id == id;
        });
        
        return temp[0];
    }
    
    this.updateTourById = function(tourIn){
        
        needUpdate = true;
        
        tourIn.artwork_included = UtilFactory.tagsToStr(tourIn.artwork_included);
        
        return Restangular.all('tours').all(tourIn.tour_id).post(tourIn);
    }
    
    this.addTour = function(tour){
        
        needUpdate = true;
        return Restangular.all('tours').post(tour);
    }
    
    this.deleteTourById = function(id){
        
        Restangular.all('tours').all(id).remove();
    }
});
