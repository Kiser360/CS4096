app.factory('champInfo',['$http', function($http){
    var self = this;
    self.allChamps = {};
    self.champInfo = {name: "", title: "", lore: "", blurb: "", image: ""}
    
    self.getChampInfo = function(id, cb) {
        $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + id + "?champData=all&api_key=eb677857-8e3d-4c41-903d-dd4c11d20838")
            .success(function(data) {
                self.champInfo.name = data.name;
                self.champInfo.title = data.title;
                self.champInfo.lore = data.lore;
                self.champInfo.blurb = data.blurb;
                self.champInfo.image = ("http://ddragon.leagueoflegends.com/cdn/5.22.1/img/champion/" + data.image.full);
                self.champInfo.splash = ("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + data.key + "_0.jpg");
                cb(self.champInfo);
            });
    };

    $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=eb677857-8e3d-4c41-903d-dd4c11d20838")
        .success(function(data) {
            self.allChamps = data.data;
        });

    return self;
}]);