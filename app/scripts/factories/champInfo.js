app.factory('champInfo',['$http', function($http){
    var self = this;
    self.champ = {}
    
    self.getChampInfo = function(id, cb) {
        $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + id + "?champData=all&api_key=eb677857-8e3d-4c41-903d-dd4c11d20838")
            .success(function(data) {
                self.champ.name = data.name;
                self.champ.title = data.title;
                self.champ.lore = data.lore;
                self.champ.blurb = data.blurb;
                self.champ.image = ("http://ddragon.leagueoflegends.com/cdn/5.22.1/img/champion/" + data.image.full);
                cb(self.champ);
            });
    };

    return self;
}]);