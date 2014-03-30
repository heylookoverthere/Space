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
		//monsta.startMoon(40,stars[curSystem].planets[stars[curSystem].selected],Math.random()*35+15,((Math.random()*8)+1)/8,0,true,null);
		for(var i=0;i<ships.length;i++)
		{
			if((isOver(ships[i],camera)) && (ships[i].alive))
			{
				selectedShip=ships[i];
				camera.follow(ships[i]);
			}
		}
	}
    return false;
});


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
		camera.x+=zoomAdjX[camera.zoomFactor];
		camera.y+=zoomAdjY[camera.zoomFactor];
		camera.zoomFactor++;

	}else if (delta<0){
		if(camera.zoomFactor<1)
		{
			camera.zoomFactor=0;
		}else
		{
			camera.zoomFactor--;
			//camera.x+=zoomAdjX[camera.zoomFactor];
			//camera.y+=zoomAdjY[camera.zoomFactor];
			camera.adjForZoom();
		}
	}
	camera.zoom=zooms[camera.zoomFactor];
	camera.zoomMove=zoomMoves[camera.zoomFactor];
	//camera.adjForZoom(stars[0]);
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
				if((selectedShip) && (!selectedShip.adrift))
				{
					/*var mTY=mY+Math.abs(camera.y);
					var mTX=mX+Math.abs(camera.x);
					var mouseHeading=Math.atan2(mTY-selectedShip.y, mTX-selectedShip.x)* (180 / Math.PI);
					if (mouseHeading < 0.0)
						mouseHeading += 360.0;
					else if (mouseHeading > 360.0)
						mouseHeading -= 360;
					selectedShip.adjustHeading(Math.abs(mouseHeading));*/
					for(var i=0;i<ships.length;i++)
					{
						if((isOver(ships[i],camera)) && (ships[i].alive))
						{
							selectedShip.destination=ships[i];
							console.log(selectedShip.name+ " was sent after "+ships[i].name);
						}
					}
					for(var k=0;k<civs.length;k++)
					{
						for(var i=0;i<civs[k].worlds.length;i++)
						{
							if(isOver(civs[k].worlds[i],camera))
							{
								selectedShip.desiredOrbitTarg=civs[k].worlds[i];
								if (selectedShip.autoHostile(civs[k]))
								{
									selectedShip.attackPlanet(civs[k].worlds[i]);
									console.log(selectedShip.name+ " sent to attack"+civs[k].worlds[i].name);
									return;
								}else
								{
									console.log(selectedShip.name+ " sent to "+civs[k].worlds[i].name);
									return;
								}
							}
						}
					}
					for(var k=0;k<stars.length;k++)
					{
						for(var i=0;i<stars[k].planets.length;i++)
						{
							if(isOver(stars[k].planets[i],camera))
							{
								selectedShip.desiredOrbitTarg=stars[k].planets[i];
								console.log(selectedShip.name+ " sent to "+stars[k].planets[i].name);
							}
						}
					}
				}
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
	if(!targ.alive) {return;}
	can.save();
    can.font = "12pt Calibri";
    can.textAlign = "center";
    can.textBaseline = "middle";
    if(targ.civ)
	{

		if(targ.civ==civs[0]) 
		{  
			can.fillStyle = "blue";
		}else
		{
			canvas.fillStyle = "green";
			if(targ.civ.autoHostile.indexOf(civs[0])>-1)
			{
				canvas.fillStyle = "red";
			}
		}
	}else
	{
		canvas.fillStyle="white";
	}
    tempstr = targ.name;
    can.fillText(tempstr, (targ.x+cam.x)*cam.zoom, (targ.y+cam.y)*cam.zoom+targ.height+8);
    
    can.restore();
};

isOver= function(targ,cam){ //is the mouse over the player/object 
    if((mX>((targ.x-targ.width/2)+cam.x)*cam.zoom) && (mX<(((targ.x-targ.width/2)+cam.x)+targ.width*cam.zoom)*cam.zoom) &&(mY>(((targ.y-targ.height/2)+cam.y))*cam.zoom) &&(mY<(((targ.y-targ.height/2)+cam.y)+targ.height)*cam.zoom)) {return true;}
    return false;
};