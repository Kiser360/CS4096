app.controller('home', ['$scope', 'champBuild', function($scope, champBuild){
	$scope.champion = {};
	$scope.suggestions = [
		// {"name": "Ahri"},
		// {"name": "Aatrox"}
	];

	var allChamps = [
		"Fizz",
		"Lux",
		"Ahri",
		"Aatrox",
		"Hecarim"
	]

	champBuild.getChampion("Aatrox", function(data){
		$scope.champion = data;
	});

	$scope.sanitizeChampKey = function() {
		// Have to debounce otherwise tons of $apply() errors for being called before it finishes the loop
		debounce(function(){
			var sanitized = $scope.champKeyInput.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
										.replace(/\d*([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '');
			findSuggestions(sanitized);
			$scope.$apply();
		}, 50);
	};

	$scope.suggestionClickHandler = function(champKey) {
		$scope.suggestions = [];
		$scope.champKeyInput = '';
		champBuild.getChampion(champKey, function(data) {
			$scope.champion = data;
		});
	};

	var timeout;
	var debounce = function(func, duration) {
		clearTimeout(timeout);
		timeout = setTimeout(func, duration);
	};
	var findSuggestions = function(key) {
		$scope.suggestions = [];
		if (key.length === 0) return;
		allChamps.forEach(function(champKey) {
			if (champKey.indexOf(key) !== -1) {
				$scope.suggestions.push({"name": champKey, "key": champKey});
			}
		});
	}
}]);