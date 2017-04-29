var canvasWidth = 1024;
var canvasHeight = 768;

var radius = 8;

var marginTop = 60;
var marginLeft = 30;

var curTime = new Date(new Date().toLocaleDateString())


var curShowTimeSeconds = 0;


var balls = [];
var colors = ["#33b5e5","#0099cc","#aa66cc","#9933cc","#99cc00","#669900","#ffbb33","#ff8800","#ff4444","#cc0000"];

canvasWidth = document.body.clientWidth;
canvasHeight = document.body.clientHeight;

marginLeft = Math.round(canvasWidth/10);

radius = Math.round(canvasWidth*4/5/108)-1;

marginTop = Math.round(canvasHeight/5);

var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

curShowTimeSeconds = getCurrentShowTimeSeconds();


setInterval(
	function () {

		render(context);
		update();

	}
,50)	



function getCurrentShowTimeSeconds () {
	var endTime = new Date();
	var ret = endTime.getTime()-curTime.getTime();
	ret = Math.round(ret/1000);

	return ret >= 0 ? ret : 0;


}

function update () {
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();

	var nextHours = parseInt(nextShowTimeSeconds/3600);
	var nextMinutes = parseInt((nextShowTimeSeconds - nextHours*3600)/60);
	var nextSeconds = nextShowTimeSeconds%60;

	var curHours = parseInt(curShowTimeSeconds / 3600);
	var curMinutes = parseInt((curShowTimeSeconds - curHours*3600)/60);
	var curSeconds = curShowTimeSeconds%60;

	if (nextSeconds != curSeconds) {
		if(parseInt(curHours/10) != parseInt(nextHours/10)){
			addBalls(marginLeft + 0, marginTop, parseInt(curHours/10));
		}
		if(parseInt(curHours%10) != parseInt(nextHours%10)){
			addBalls(marginLeft + 15*(radius+1), marginTop, parseInt(curHours%10));
		}
		if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
			addBalls(marginLeft + 39*(radius+1), marginTop, parseInt(curMinutes/10));
		}
		if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
			addBalls(marginLeft + 54*(radius+1), marginTop, parseInt(curMinutes%10));
		}
		if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
			addBalls(marginLeft + 78*(radius+1), marginTop, parseInt(curSeconds/10));
		}
		if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
			addBalls(marginLeft + 93*(radius+1), marginTop, parseInt(curSeconds%10));
		}



		curShowTimeSeconds = nextShowTimeSeconds;

	}

	updateBalls();
}

function updateBalls() {
	for(var i = 0; i< balls.length; i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if (balls[i].y >= canvasHeight - radius){
			balls[i].y = canvasHeight - radius;
			balls[i].vy = - balls[i].vy*0.75;
		}
	}

	var cnt = 0;
	for (var i = 0; i<balls.length; i++){
		if (balls [i].x + radius > 0 && balls[i].x - radius < canvasWidth){
			balls[cnt++] = balls[i];
		}
	}

	while (balls.length > Math.min(1000,cnt)){
		balls.pop();
	}

}




function addBalls(x, y, num){
	for(var i = 0; i < digit[num].length; i++){
		for(var j = 0; j < digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
				var aBall = {
					x: x+j*2*(radius+1)+(radius+1),
					y: y+i*2*(radius+1)+(radius+1),
					g: 1.5+Math.random(),
					vx: Math.pow(-1, Math.ceil(Math.random()*1000))*4,
					vy: -5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
				
			}
		}
	}
}



function render (cxt) {

	cxt.clearRect (0,0,canvasWidth,canvasHeight);

	var hours = parseInt(curShowTimeSeconds / 3600);
	var minutes = parseInt((curShowTimeSeconds - hours*3600)/60);
	var seconds = curShowTimeSeconds%60;

	renderDigit(marginLeft,marginTop,parseInt(hours/10),cxt);
	renderDigit(marginLeft + 15*(radius+1),marginTop,parseInt(hours%10),cxt);
	renderDigit(marginLeft + 30*(radius+1),marginTop,10,cxt);
	renderDigit(marginLeft + 39*(radius+1),marginTop,parseInt(minutes/10),cxt);
	renderDigit(marginLeft + 54*(radius+1),marginTop,parseInt(minutes%10),cxt);
	renderDigit(marginLeft + 69*(radius+1),marginTop,10,cxt);
	renderDigit(marginLeft + 78*(radius+1),marginTop,parseInt(seconds/10),cxt);
	renderDigit(marginLeft + 93*(radius+1),marginTop,parseInt(seconds%10),cxt);

	for(var i = 0; i < balls.length; i++){
		cxt.fillStyle=balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, radius, 0, 2*Math.PI, true);
		cxt.closePath();
		cxt.fill();
	}


}



function renderDigit (x, y, num, cxt){
	cxt.fillStyle = "#c1c1c1";

	for (var i = 0; i < digit[num].length; i++){
		for (var j = 0; j < digit[i].length; j++){
			if (digit[num][i][j] == 1){
				cxt.beginPath();
				cxt.arc(x+j*2*(radius+1)+(radius+1), y+i*2*(radius+1)+(radius+1), radius, 0, 2*Math.PI);
				cxt.closePath();

				cxt.fill();
			}
		}
	}
}



