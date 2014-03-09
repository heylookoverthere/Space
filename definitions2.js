var universeWidth=8200;
var universeHeight=8200;
var numStars=8500;
var backStarsX=new Array(numStars);
var backStarsY=new Array(numStars);
var backStarsS=new Array(numStars);
var spinArt=false;
var flicker=true;
var twinkRate=10;

var selectedSprite =Sprite("selected");
var selectedSpriteBig =Sprite("selectedbig");

function star(){
	this.x=420;
	this.y=300;
	this.name="Sol";
	this.planets=new Array();
	this.numPlanets=0;
	this.numAstroids=0;
	this.selected=0;
	
	this.cyclePlanets=function(){
		this.selected++;
		
		if(this.selected>this.numPlanets-1)
		{
			this.selected=0;
		}
	};
	
	this.countMoons=function(){
		var ans=0;
		for(var i=0;i<this.numPlanets;i++)
		{
			 ans+=this.planets[i].numMoons
		}
		return ans;
	};
};

var sun=new star();

function initUniverse()
{
	for (var i=0;i<numStars;i++)
	{
		backStarsX[i]=Math.floor((Math.random()*universeWidth)-universeWidth/2);
		backStarsY[i]=Math.floor((Math.random()*universeHeight)-universeHeight/2);
		backStarsS[i]=Math.floor((Math.random()*2)+1);
	}
	
	var suny=Math.floor(Math.random()*CANVAS_HEIGHT)
	sunx=420;
	suny=300;
	//sunx=CANVAS_WIDTH/2+48;
	//suny=CANVAS_HEIGHT/2+48;
	//monsta.post(1,CANVAS_WIDTH/2,CANVAS_HEIGHT/2,true);
	monsta.startTextured(1000000,sunx-48,suny-48,0,0,0,false,false,"sun");

	var obt=Math.random()*180+70;
	var obtw=Math.random()*35+15;
	for (var p=0;p<160;p++)
	{
		monsta.startAstroid(40,sun,(Math.random()*obtw)+obt,((Math.random()*8)+1)/8,0,true,5+Math.floor(Math.random()*2));
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
		}//decay =(Math.random()*4)/10
		monsta.startPlanet(40,sun,pobt,((Math.random()*8)+1)/8,0,true,null);
	}

};

function drawStarfield(canv,cam){
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
		canv.fillRect(backStarsX[i]+cam.x, backStarsY[i]+cam.y, backStarsS[i]+s, backStarsS[i]+s);
	}
};