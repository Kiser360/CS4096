app.factory('items',['$http', function($http){
    var self = this;
    self.item = {name: "", stats: "", description: "", image: ""};
    self.allItems = null;

    var requesting = false;
    var toBeCalled = [];
    
    self.getItem = function(id, cb) {
        if (!self.allItems && !requesting) {
            requesting = true;
            $http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?itemListData=all&api_key=eb677857-8e3d-4c41-903d-dd4c11d20838")
                .success(function(data) {
                    self.allItems = data.data;
                    self.item.name = self.allItems[id].name;
                    self.item.stats = self.allItems[id].plaintext;
                    self.item.description = self.allItems[id].sanitizedDescription;
                    self.item.image = ("http://ddragon.leagueoflegends.com/cdn/5.20.1/img/item/" + self.allItems[id].id + ".png");
                    cb(self.item);
                    toBeCalled.forEach(function(item) {
                        self.getItem(item.id, item.cb);
                    });
                    toBeCalled = null;
                });
        }
        else if (!self.allItems && requesting) {
            toBeCalled.push({"id": id, "cb": cb});
        }
        else {
            if (self.allItems[id]) {
                self.item.image = ("http://ddragon.leagueoflegends.com/cdn/5.20.1/img/item/" + self.allItems[id].id + ".png");
                self.item.name = self.allItems[id].name || "Rito Undefined";
                self.item.stats = self.allItems[id].plaintext || "Rito Undefined";
                self.item.description = self.allItems[id].sanitizedDescription || "Rito Undefined";
            }
            else {
                self.item.image = ("http://ddragon.leagueoflegends.com/cdn/5.20.1/img/item/" + 1001 + ".png");
                self.item.name = "Rito Undefined";
                self.item.stats = "Rito Undefined";
                self.item.description = "Rito Undefined";
            }
            cb(self.item);
        }
    };

    return self;
}]);