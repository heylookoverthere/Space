var universeWidth=120000;
var universeHeight=120000;
var numStars=1000;
var backStarsX=new Array(numStars);
var backStarsY=new Array(numStars);


function initUniverse()
{
	for (var i=0;i<numStars;i++)
	{
		backStarsX=Math.random()*universeWidth;
		backStarsY=Math.random()*universeHeight;
	}
	
	var suny=Math.floor(Math.random()*CANVAS_HEIGHT)
	sunx=420;
	suny=300;
	//sunx=CANVAS_WIDTH/2+48;
	//suny=CANVAS_HEIGHT/2+48;
	//monsta.post(1,CANVAS_WIDTH/2,CANVAS_HEIGHT/2,true);
	monsta.startTextured(1000000,sunx-48,suny-48,0,0,0,false,false,"sun");

	var obt=Math.random()*270+70;
	var obtw=Math.random()*35+15;
	for (var p=0;p<160;p++)
	{
		monsta.startOrbit(40,sunx,suny,(Math.random()*obtw)+obt,((Math.random()*8)+1)/8,true,5+Math.floor(Math.random()*2));
	}
	console.log(obt);
	for (var p=0;p<5;p++)
	{
		var pobt=(Math.random()*240)+170;
		if(Math.abs(pobt-obt<70) )
		{
			if(obt<230)
			{
				pobt=obt-70;
			}else
			{
				pobt=obt+70;
			}
		}
		monsta.startOrbit(40,sunx,suny,pobt,((Math.random()*8)+1)/8,true,null);
	}

};

function drawStarfield(canv){
	//fill
	canv.fillStyle="#151B54";
	canv.fill();
	canv.fillStyle="white";
	for(var i=0;i<numStars;i++)
	{
		canv.fillRect(backStarsX, backStarsY, 1, 1 );
	}
};