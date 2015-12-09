app.factory('summonerStats',['$http', function($http){
    var self = this;
    self.summonerStats = {name: "", profileIconId: "", level: "", currentChamp: {}}

    self.getSummoner = function(id, cid, cb) {
    	$http.get("https://na.api.pvp.net/api/lol/na/v1.4/summoner/" + id + "?api_key=8cbd3f69-8650-4ffb-b38b-9bbc1e5ca552")
    		.success(function(data) {
    			self.summonerStats.name = data[id].name;
    			self.summonerStats.profileIconId = data[id].profileIconId;
    			self.summonerStats.level = data[id].level;
    		});
    	$http.get("https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/" + id + "/ranked?season=SEASON2015&api_key=8cbd3f69-8650-4ffb-b38b-9bbc1e5ca552")
    		.success(function(data) {
    			for (var i =0; i < data.champions.length; i++) {
                    if (data.champions[i].id == cid)
                        self.summonerStats.currentChamp(clone(data.champions[i]));
                }
    			
    		});
        $http.get("https://na.api.pvp.net/api/lol/na/v2.5/league/by-summoner/" + id + "/entry?api_key=8cbd3f69-8650-4ffb-b38b-9bbc1e5ca552")
            .success(function(data) {
                self.summonerStats.tier = data[id][0].tier;
                self.summonerStats.division = data[id][0].entries[0].division;
            });
        $http.get("http://lolstuff.elasticbeanstalk.com/lolstuff/current/" + sumID).success(function(data){  
            var fer = 0;
            var cun = 0;
            var res = 0;
            for (var j =0; j < data.participants[i].masteries[j]; j++) {
                if (data.participants[i].masteries[j].masteryId < 6200)
                    fer += data.participants[i].masteries[j].rank;
                else if (data.participants[i].masteries[j].masteryId < 6300)
                    res += data.participants[i].masteries[j].rank;
                else
                    cun += data.participants[i].masteries[j].rank;
            }
            });  
    };

    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    };

    return self;

}]);