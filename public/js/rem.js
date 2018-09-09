
(function(){
	function setRem(){
		var html = document.documentElement;
		var hWidth = window.innerWidth;
		hWidth = hWidth >= 960 ? hWidth : 960;
		html.style.fontSize = hWidth/40 + "px";
	}

	// 设置rem.
	setRem();
	window.addEventListener('resize', setRem, false);
})();
