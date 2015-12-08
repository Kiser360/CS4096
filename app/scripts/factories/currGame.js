app.factory('currGame', ['$http', function($http){
	var self = this;

	self.getGame = function(summonerName, cb){
		$http.get("https://script.google.com/macros/s/AKfycbx3veZNTf8yMH9IdnvABAQuWj_twSDl7GoVNAuZh_AmxJDjTe8Q/exec")
			.success(function(data) {
				cb(data);
			})
			.error(function(data) {
				console.log(JSON.stringify(data));
				cb({data: "error"});
			});
	};

	return self;
}]);