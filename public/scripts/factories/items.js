app.factory("items",["$http",function(t){var e=this;return e.item={name:"",stats:"",description:"",image:""},e.getItem=function(i,a){t.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/item/"+i+"?itemData=all&api_key=eb677857-8e3d-4c41-903d-dd4c11d20838").success(function(t){e.item.name=t.name,e.item.stats=t.plaintext,e.item.description=t.sanitizedDescription,e.item.image="http://ddragon.leagueoflegends.com/cdn/5.20.1/img/item/"+t.image.full,a(e.item)})},e}]);