app.controller("home",["$scope","champBuild",function(o,n){o.champion={},n.getChampion("Lulu",function(n){o.champion=n,console.log(o.champion)})}]);