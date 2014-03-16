//Mouse stuff.
$(document).bind("contextmenu",function(e){
	
	if(mode==0)
	{
		mX = e.pageX - canvasElement.get(0).offsetLeft;
		mY = e.pageY - canvasElement.get(0).offsetTop;

		/*for (var p=0;p<4;p++)
		{
					monsta.startOrbit(40,sunx,suny,(Math.random()*240)+170,((Math.random()*8)+1)/8,(Math.random()*4)/100,true,null);
		}/*
		obt=Math.random()*240+170;
		for (var p=0;p<160;p++)
		{
					monsta.startOrbit(40,sunx,suny,(Math.random()*50)+170,((Math.random()*8)+1)/8,true,5+Math.floor(Math.random()*1));
		}*/
		monsta.startMoon(40,stars[curSystem].planets[stars[curSystem].selected],Math.random()*35+15,((Math.random()*8)+1)/8,0,true,null);
	}
    return false;
});

function truncate(a)
{
	Math.floor(a * 100) / 100;
	return a;
}

function truncator(numToTruncate, intDecimalPlaces) {    
    var numPower = Math.pow(10, intDecimalPlaces); // "numPowerConverter" might be better
    return ~~(numToTruncate * numPower)/numPower;
}

function mouseWheel(e){
	var delta = 0;
	if (e.wheelDelta)
	{
			delta = e.wheelDelta/120;
	} else if (event.detail) 
	{ /** Mozilla case. */
			delta = -e.detail/3;
	}
	mX = e.pageX - canvasElement.get(0).offsetLeft;
	mY = e.pageY - canvasElement.get(0).offsetTop;
	if ((delta>0) && (camera.zoomFactor<9)){
		camera.zoomFactor++;
		//camera.x-=450*Math.pow(2, camera.zoom-1);camera.y-=320*Math.pow(2, camera.zoom-1)
	}else if (delta<0){
		if(camera.zoomFactor<1)
		{
			camera.zoomFactor=0;
		}else
		{
			camera.zoomFactor--;
		}
	}
	camera.zoom=zooms[camera.zoomFactor];
	camera.zoomMove=zoomMoves[camera.zoomFactor];
	camera.center(stars[0]);
	if (e.preventDefault)
			e.preventDefault();
	e.returnValue = false;
};

function mouseClick(e) {  //represents the mouse
	e.preventDefault();    
	mX = e.pageX - canvasElement.get(0).offsetLeft;
	mY = e.pageY - canvasElement.get(0).offsetTop;
	var tm=new Date();
	var mili=tm.getTime();
	tx=Math.floor(mX/16) * Math.pow(2, camera.zoom-1);
	ty=Math.floor(mY/16) * Math.pow(2, camera.zoom-1);
	
	
		switch (e.which)
		{
			case 1:
				//screenfull.request(canvasElement);
				var mTY=mY+Math.abs(camera.y);
				var mTX=mX+Math.abs(camera.x);
				var mouseHeading=Math.atan2(mTY-ships[curShip].y, mTX-ships[curShip].x)* (180 / Math.PI);
				if (mouseHeading < 0.0)
					mouseHeading += 360.0;
				else if (mouseHeading > 360.0)
					mouseHeading -= 360;
				ships[curShip].adjustHeading(Math.abs(mouseHeading));
			    break;
			case 2:
				alert('Middle mouse button pressed');
				break;
			case 3:
				alert('Right mouse button pressed');
				break;
			default:
				alert('You have a strange mouse');
		}
};

mouseXY= function(e) {
    if (!e) var e = event;
    mX = e.pageX - canvasElement.get(0).offsetLeft;
    mY = e.pageY - canvasElement.get(0).offsetTop;
    
};

function drawmousetext(can,targ,cam) { //draws unit status info
	if((!targ.alive) || (!targ.deployed)) {return;}
    can.font = "14pt Calibri";
    can.textAlign = "center";
    can.textBaseline = "middle";
    can.fillStyle = "blue";
    if(targ.team==1) {  canvas.fillStyle = "red";}

    tempstr = targ.name;
    can.fillText(tempstr, (targ.x-cam.x)*16/cam.zoom+(targ.width/2), (targ.y-cam.y)*16/cam.zoom+targ.height+8);
    
    can.fillStyle = "#5F9EA0";
};

isOver= function(targ,cam){ //is the mouse over the player/object 
    if((mX>(targ.x-cam.x)*16/cam.zoom) && (mX<((targ.x-cam.x)*16+targ.width*cam.zoom)/cam.zoom) &&(mY>((targ.y-cam.y)*16)/cam.zoom) &&(mY<((targ.y-cam.y)*16+targ.height)/cam.zoom)) {return true;}
    return false;
};