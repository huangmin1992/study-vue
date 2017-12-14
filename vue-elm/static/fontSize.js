function calcFontSize(){
	let view_width = window.screen.width;
	let view_height = window.screen.height;
	let font_size = view_width/15;//750设计图
	// let font_size = view_width/16;//640设计图
	let html_body = document.getElementsByTagName('html')[0];

	html_body.style.fontSize = font_size+'px';
}

window.onresize = function(){
	calcFontSize()
}
window.onload = function(){
	calcFontSize()
}