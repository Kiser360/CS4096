app.factory('items',['$http', function($http){
    var self = this;
    self.item = {name: "", stats: "", description: "", image: ""}
    
    self.getItem = function(id, cb) {
        $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/item/" + id + "?itemData=all&api_key=eb677857-8e3d-4c41-903d-dd4c11d20838")
            .success(function(data) {
                self.item.name = data.name;
                self.item.stats = data.plaintext;
                self.item.description = data.sanitizedDescription;
                self.item.image = ("http://ddragon.leagueoflegends.com/cdn/5.20.1/img/item/" + data.image.full);
                cb(self.item);
            });
    };

    return self;
}]);