var universeWidth=1200;
var universeHeight=1200;
var numStars=1500;
var backStarsX=new Array(numStars);
var backStarsY=new Array(numStars);
var backStarsS=new Array(numStars);
var spinArt=false;
var flicker=true;
var twinkRate=2001;


function initUniverse()
{
	for (var i=0;i<numStars;i++)
	{
		backStarsX[i]=Math.floor((Math.random()*universeWidth));
		backStarsY[i]=Math.floor((Math.random()*universeHeight));
		backStarsS[i]=Math.floor((Math.random()*2)+1);
	}
	
	var suny=Math.floor(Math.random()*CANVAS_HEIGHT)
	sunx=420;
	suny=300;
	//sunx=CANVAS_WIDTH/2+48;
	//suny=CANVAS_HEIGHT/2+48;
	//monsta.post(1,CANVAS_WIDTH/2,CANVAS_HEIGHT/2,true);
	monsta.startTextured(1000000,sunx-48,suny-48,0,0,0,false,false,"sun");

	var obt=Math.random()*210+70;
	var obtw=Math.random()*35+15;
	for (var p=0;p<160;p++)
	{
		monsta.startOrbit(40,sunx,suny,(Math.random()*obtw)+obt,((Math.random()*8)+1)/8,true,5+Math.floor(Math.random()*2));
	}
	
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
	if(spinArt) {return;}
	//fill
	canv.fillStyle="#00001E";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	canv.fillStyle="#FFFFB2";//"#FFFF00";
	for(var i=0;i<numStars;i++)
	{
		//console.log("yar");
		var s=0;
		if(flicker) {
			if((Math.random()*2000)<twinkRate){
				s=Math.random()*2;
			}
		}
		canv.fillRect(backStarsX[i], backStarsY[i], backStarsS[i]+s, backStarsS[i]+s);
	}
};