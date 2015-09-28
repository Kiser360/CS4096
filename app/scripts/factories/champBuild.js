app.factory('champBuild',['$http', function($http){
    var self = this;
    self.champ = null;
    self.ready = false;

    $http.get("champs.json").success(function(data){
        self.ready = true;
        self.champ = data;
        self.onReady(data);
    });

    self.getchamp = function() {
        console.log("Did you ask for wukong?");
    };

    self.onReady = function(data) {
        console.log(data.champ);
    };

    return self;
}]);