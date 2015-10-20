app.factory('champBuild',['$http', 'items', function($http, $items){
    var self = this;
    self.champ = {name: "", description: "", items: ""}

    self.getChampion = function(name, cb) {
        if (!self.champ.name || self.champ.name != name) {
            $http.get("champs.json").success(function(data){
                self.champ.name = data.name;
                self.champ.description = data.description;
                self.champ.items = [];

                for (var i = 0; i < 6; i++) {
                    $items.getItem('1001', function(itemData) {
                        self.champ.items.push(itemData);
                        console.log(itemData);
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

    return self;
}]);