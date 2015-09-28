app.controller('home', ['$scope', 'champBuild', function($scope, champBuild){
	if (!champBuild.ready) {
		champBuild.onReady = function(data) {
			console.log(champBuild.champ.name + " : Wasn't Ready");
		}
	}
	else {
		console.log(champBuild.champ.name + " : Was Ready");
	}
	console.log(champBuild);
}]);