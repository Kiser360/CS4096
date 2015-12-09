app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.controller('home', ['$scope', 'champBuild', 'champInfo', "currentGame", function($scope, champBuild, champInfo, currentGame){
	angular.element(document).ready(function(){
		console.log("Document Ready");

		// Animate the logo for sweet awesomeness effect
		document.querySelector("#logo span:first-child").classList.add("expand");
		document.querySelector("#logo span:last-child").classList.add("expand");
	});

	$scope.champion = {
		name: "Get Started",
		items: [
			{name: "What we do", description: "Prepare to improve your game by using builds that have been tried and proven from LoL's best matches. All builds created by analyzing data from real, high-level matches so you know the build only suggests items used by the best players."},
			{name: "Instructions", description: "Its as simple as searching a summoner name to view builds for a match in progress, or search and select a champion to view a suggested build."}
		]
	};
	$scope.suggestions = [
	];
	$scope.inProgress = false;

	$scope.summoner = {
		champ: "Aatrox"
	};

	currentGame.getGame("35301382", function(data) {
		console.log(data);
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
		console.log("Clicked a suggestion: " + champKey);
		$scope.inProgress = false;
		$scope.suggestions = [];
		$scope.champKeyInput = '';
		champBuild.getChampion(champKey, function(data) {
			$scope.champion = data;
		});
	};

	$scope.loadPlayerInfo = function(playerId) {
		console.log("Clicked a person Yo");
		$scope.summoner.champ = playerId;
		document.querySelector("#playerDesc").classList.add("visible");
	}

	$scope.clearSuggestions = function() {
		setTimeout(function(){
			console.log("Clearing Suggestions");
			$scope.suggestions = [];
			$scope.$apply();
		}, 200);
	}

	$scope.searchInProgress = function() {
		$scope.inProgress = true;
		$scope.clearSuggestions();
		currentGame.getGame("35301382", function(data) {
		});
		champBuild.getChampion("Lulu", function(data) {
			$scope.champion = data;
		});
	}

	var timeout;
	var debounce = function(func, duration) {
		clearTimeout(timeout);
		timeout = setTimeout(func, duration);
	};
	var findSuggestions = function(key) {
		$scope.suggestions = [];
		if (key.length === 0) return;
		var allChamps = champInfo.getAllChamps();
		allChamps.forEach(function(champKey) {
			if (champKey.search(key) !== -1 || champKey.search(key.toLowerCase()) !== -1) {
				$scope.suggestions.push({"name": champKey, "key": champKey});
			}
		});
	}
}]);