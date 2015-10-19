app.controller('home', ['$scope', 'champBuild', function($scope, champBuild){
	$scope.champion = {};

	champBuild.getChampion("Lulu", function(data){
		$scope.champion = data;
		console.log($scope.champion);
	});
}]);