app.controller('home', ['$scope', 'champBuild', function($scope, champBuild){
	$scope.champion = {};
	$scope.suggestions = [
		{"name": "Ahri"},
		{"name": "Aatrox"}
	];

	champBuild.getChampion("Aatrox", function(data){
		$scope.champion = data;
		console.log($scope.champion);
	});

	$scope.sanitizeChampKey = function() {
		debounce(function(){
			var sanitized = $scope.champKeyInput.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
										.replace(/\d*([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '');
			console.log(sanitized);
			champBuild.getChampion(sanitized, function(data) {
				$scope.champion = data;
			});
		}, 1000);
	}

	var timeout;
	var debounce = function(func, duration) {
		clearTimeout(timeout);
		timeout = setTimeout(func, duration);
	};
}]);