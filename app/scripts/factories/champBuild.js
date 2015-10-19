app.factory('champBuild',['$http', 'items', function($http, $items){
    var self = this;
    self.champ = {name: "", description: "", items: ""}

    self.getChampion = function(name, cb) {
        if (!self.champ.name || self.champ.name != name) {
            $http.get("champs.json").success(function(data){
                self.champ = data;

                $items.getItem('1001', function(itemData) {
                    console.log(itemData);
                });

                cb(data);
            });
        }
        else {
            cb(self.champ);
        }
    };

    return self;
}]);