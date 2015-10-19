app.factory('items',['$http', function($http){
    var self = this;
    
    self.getItem = function(id, cb) {
        $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/item/1001?itemData=all&api_key=eb677857-8e3d-4c41-903d-dd4c11d20838")
            .success(function(data) {
                cb(data);
            });
    };

    return self;
}]);