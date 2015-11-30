app.factory('champBuild',['$http', 'items', 'champInfo', function($http, $items, champInfo){
    var self = this;
    self.champ = {name: "", title: "", items: ""}

    self.getChampion = function(name, cb) {
        if (!self.champ.name || self.champ.name != name) {
            $http.get("http://lolstuff.elasticbeanstalk.com/lolstuff/build/" + name).success(function(data){
                champInfo.getChampInfo(data.champ_id, function(data) {
                    self.champ.name = data.name;
                    self.champ.title = data.title;
                    self.champ.image = data.splash;
                });
                

                self.champ.items = [];

                for (var i = 0; i < 6; i++) {
                    $items.getItem(data.items[i], function(itemData) {
                        self.champ.items.push(clone(itemData));
                        if (self.champ.items.length >= 6) {
                            cb(self.champ);
                        }
                    });
                }
            });
        }
        else {
            cb(self.champ);
        }
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