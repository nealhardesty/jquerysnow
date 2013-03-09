snowConfig = {
	numTrees: 15,
	numSnowflakes: 120,
	timerSpeed: 30, // snowflake refresh timer
	flakeVMovement: 8, // snowflake move per refresh
	flakeVMovementVariation: 4, // vary flake movement by up to this amount
	flakeHMovementVariation: 6 // vary flake movement by up to this amount
};

// add another tree
function addTree() {
		var x = Math.floor(Math.random() * (gCanvas.width() - 56));
		var y = Math.floor(Math.random() * (gCanvas.height() - 56));
		$("<div class='tannenbaum'>")
				.hide()
				.css({
					'position': 'absolute',
					'width': 56,
					'height': 56,
					'background-image': "url('img/tannenbaum.gif')",
					'background-repeat': "no-repeat",
					'top': y,
					'left': x,
					'z-index': -2
				}).appendTo(gCanvas)
				.fadeIn('fast');
}

// add a snowflake
function addSnowflake(isstartup) {
		var x = Math.floor(Math.random() * (gCanvas.width() - 9));
		if(isstartup)
			var y = Math.floor(Math.random() * gCanvas.height());
		else
			var y = 0;
		var imgNum = Math.floor(Math.random() * 7);

		var vspeedVariation = (snowConfig.flakeVMovementVariation/2) - 
				Math.floor(Math.random() * snowConfig.flakeVMovementVariation);
		var vspeed = snowConfig.flakeVMovement + vspeedVariation;

		var hspeed = (snowConfig.flakeHMovementVariation/2) - 
				Math.floor(Math.random() * snowConfig.flakeHMovementVariation);

		$("<div class='snowflake'>")
				//.hide()
				.attr("data-vspeed", vspeed)
				.attr("data-hspeed", hspeed)
				.css({
					'position': 'absolute',
					'width': 8,
					'height': 8,
					'background-image': "url('img/snow" + imgNum + ".gif')",
					'background-repeat': "no-repeat",
					'top': y,
					'left': x,
					'z-index': -1
				}).appendTo(gCanvas);

}

function startSnowflakeAnimation() {
	animationIntervalId=setInterval(moveSnowflakes, snowConfig.timerSpeed);

}

function moveSnowflakes() {
	$(".snowflake").each(function() {
		var vspeed = $(this).attr("data-vspeed") * 1;
		var hspeed = $(this).attr("data-hspeed") * 1;
		var newTop = $(this).position().top + vspeed;
		var newLeft = $(this).position().left + hspeed;
		if(newTop > gCanvas.height() - 8 || 
					newLeft < 0 ||
					newLeft > gCanvas.width() - 8) {
			$(this).remove();
			addSnowflake(false);
		} else {
			$(this).css("top", newTop);
			$(this).css("left", newLeft);
		}
	});
}

function reinit() {
	if(typeof(animationIntervalId) != "undefined")
			clearInterval(animationIntervalId);
	$(".snowflake").each(function() {
		$(this).remove();
	});
	$(".tannenbaum").each(function() {
		$(this).remove();
	});
	//var numTrees = Math.floor(gCanvas.width() * snowConfig.numTrees);
	var numTrees = Math.floor(snowConfig.numTrees);
	for(var i=0;i<numTrees;i++) {
		addTree();
	}
	//var numSnowflakes = Math.floor(gCanvas.width() * snowConfig.numSnowflakes);
	var numSnowflakes = Math.floor(snowConfig.numSnowflakes);
	for(var i=0;i<numSnowflakes;i++) {
		addSnowflake(true);
	}
	startSnowflakeAnimation();
}

// load up everything after the document has been loaded
$(document).ready(function() {
	gCanvas=$("div.snow");
	if(gCanvas.length == 0)
		gCanvas = $("body");
	reinit();
	$(window).resize(function() {
		reinit();
	});
});
