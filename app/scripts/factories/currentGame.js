app.factory('currentGame', ['$http', 'summonerStats', function($http, summonerStats){
    var self = this;
    self.currentGame = {teamOne: [], teamTwo: []};

    self.getGame  = function(sumID, cb) {
    	$http.get("http://lolstuff.elasticbeanstalk.com/lolstuff/current/" + sumID).success(function(data){
    		console.log("Hello World!");
            for (var i = 0; i < 1; i++) {
                summonerStats.getSummoner(data.participants[i].summonerId, data.participants[i].champId, function(otherData) {
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
                    otherData.masteries = (fer + '/' + cun + '/' + res);
                    if (data.participants.teamId == 100)
                        self.currentGame.teamOne.push(clone(otherData));
                    else
                        self.currentGame.teamTwo.push(clone(otherData));
                });
            }
            console.log(self.currentGame);
            cb(self.currentGame);   
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

    var timeout;
    var debounce = function(func, duration) {
        clearTimeout(timeout);
        timeout = setTimeout(func, duration);
    };

    return self;
}]);