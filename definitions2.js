var universeWidth=8200;
var universeHeight=8200;
var numStars=8500;
var backStarsX=new Array(numStars);
var backStarsY=new Array(numStars);
var backStarsS=new Array(numStars);
var spinArt=false;
var flicker=true;
var twinkRate=10;
var curSystem=0;

var selectedSprite =Sprite("selected");
var selectedSpriteBig =Sprite("selectedbig");

function star(){
	this.x=420;
	this.y=300;
	this.type=0;
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
	
	this.randomizeSystem=function(){
		var obt=Math.random()*180+70;
		var obtw=Math.random()*35+15;
		if((Math.random()*10) <5){
			var qi=Math.floor(Math.random()*40);
			for (var p=0;p<160+qi;p++)
			{
				monsta.startAstroid(40,this,(Math.random()*obtw)+obt,((Math.random()*8)+1)/8,0,true,5+Math.floor(Math.random()*2));
			}
		}
		
		var qip=Math.floor(Math.random()*8);
		
		for (var p=0;p<3+qip;p++)
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
			monsta.startPlanet(40,this,pobt,((Math.random()*8)+1)/8,0,true,null);
		}
		
		for (var gop=0;gop<this.numPlanets;gop++)
		{
			if((Math.random()*10) <5)
			{
				var pip=Math.floor(Math.random()*8);
				for (var po=0;po<pip;po++)
				{
					monsta.startMoon(40,this.planets[gop],Math.random()*35+15,((Math.random()*8)+1)/8,0,true,null);
				}
			}
			
		}

		};
};

//var sun=new star();

var stars=new Array();

var numSystems=4;

function initUniverse()
{
	for (var i=0;i<numStars;i++)
	{
		backStarsX[i]=Math.floor((Math.random()*universeWidth)-universeWidth/2);
		backStarsY[i]=Math.floor((Math.random()*universeHeight)-universeHeight/2);
		backStarsS[i]=Math.floor((Math.random()*2)+1);
	}
	
	stars[0]=new star();
	stars[0].name="Sol";
	stars[0].x=420;
	stars[0].y=300;
	stars[0].randomizeSystem();
	monsta.startTextured(1000000,stars[0].x-48,stars[0].y-48,0,0,0,false,false,"sun"+stars[0].type);
	
	for(var i=1;i<numSystems;i++)
	{
		stars[i]=new star();
		stars[i].name=names[0][Math.floor(Math.random()*10)];
		stars[i].x=Math.floor(Math.random()*6000)-2000;
		stars[i].y=Math.floor(Math.random()*6000)-2000;
		stars[i].type=Math.floor(Math.random()*3);
		stars[i].randomizeSystem();
		monsta.startTextured(1000000,stars[i].x-48,stars[i].y-48,0,0,0,false,false,"sun"+stars[i].type);
	}
	//camera.center(stars[0]);
	camera.x=0-stars[1].x+CANVAS_WIDTH/2;
	camera.y=0-stars[1].y+CANVAS_HEIGHT/2;
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