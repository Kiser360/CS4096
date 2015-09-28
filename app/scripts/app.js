var roleHandler = function(e) {
  var newRole = "#" + e.target.id
  document.querySelector(newRole).classList.toggle("selected");
  if (newRole == "#Jungle") {
    document.querySelector("#Support").classList.remove("selected");
  }
  else {
    document.querySelector("#Jungle").classList.remove("selected");
  }
};
document.querySelector("#Jungle").addEventListener("click", roleHandler);
document.querySelector("#Support").addEventListener("click", roleHandler);