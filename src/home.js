const css = require('./sample.scss')
window.onload = function() {
	var element = document.getElementById('home');
	element.innerHTML = "Text is replaced by javascript, is compiled by webpack.";
};