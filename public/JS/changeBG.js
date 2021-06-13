var background = document.getElementById('background');
console.log("bg: " + background);
var img = document.getElementById('img');
console.log("img: " + img.src);
background.stlye.backgroundImage = "url(" + img.src + ")";