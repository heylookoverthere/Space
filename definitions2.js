//518 424 5687


var cuntx=-149550;
var cunty=-149680;
var universeWidth=600000;
var universeHeight=600000;
var numStars=950000;
var backStarsX=new Array(numStars);
var backStarsY=new Array(numStars);
var backStarsS=new Array(numStars);
var spinArt=false;
var flicker=true;
var twinkRate=10;
var curSystem=0;
var numShips=9;
var numNebulas=10;
var Earth=null;
//var things=new Array();
var numCivilizations=10;
var civilizations=new Array();
for(var i=0;i<numCivilizations;i++)
{
	civilizations[i]=new civilization();
}

var ships=new Array();
var stations=new Array(); //todo add to civilization
ships[0]=new starShip();
ships[1]=new starShip();
ships[2]=new starShip();
ships[3]=new starShip();
ships[4]=new starShip();
ships[5]=new starShip();
ships[6]=new starShip();
ships[7]=new starShip();
ships[8]=new starShip();

var curShip=0;
var planetTypes = ["Class M","Class L","Class N","Class F","Class J","Class T","Demon Class"];

var numSystems=20;
var starsDrawn=0;

var civs=new Array();
civs.push(new civilization());
var others=new civilization();
others.name="others";
//homeworld
civs.push(others);

var borg=new civilization();
borg.name="The Borg";
//homeworld
borg.autoHostile.push(civs[0]);//borg hate everybody.
borg.autoHostile.push(civs[1]);
civs.push(borg);

var selectedSprite =Sprite("selected");
var selectedSpriteBig =Sprite("selectedbig");

var shipSelSpriteB =Sprite("shipselectedbig");
var shipSelSprite =Sprite("shipselected");

var starNames=new Array(40);
starNames= ["Eridani","Cygnus","Ceti-Alpha","Omicron Ceti","Monac","Bringold","Alnitak", "Deneb", "Acamar","Rigel","Polaris","Praxillus","Proxima Centauri", "Omicron Persei","Canopus", "Romii", "Sirius","Tahal", "Mintaka", "Vega", "Wolf", "Tau-Ceti","Eminiar","Canaris","Hydra", "Questar", "Arneb", "Amargosa", "Altiar","Draconis","Theloni","Gezid","Indi","Canaris","Sigma", "Cassius","Melona","Minara","Cat's Anus"];
var starNamesUsed=new Array();

var planetNames=new Array(40);
planetNames= ["Vulcan","Andoria","Arkaria","Benzar","Halii","Tellar","Teneebla","Trill","Draylax", "Coridan", "Aurelia","Ocampa","Talax","Enara Prime","Hoth","Endor","Tatooine","Carcosa","Sobaras"];

function getQuadrant(thingy){
	var quad="Theta";
	if(thingy.x<universeWidth/2)
	{
		if(thingy.y<universeHeight/2)
		{
			quad="Alpha";
		}else
		{
			quad="Delta";
		}
	}else
	{
		if(thingy.y<universeHeight/2)
		{
			quad="Beta";
		}else
		{
			quad="Gamma"
		}
	}
	return quad;
}

function romanize(num) {
	var str=" ";
	if(num==0)
	{
		str=" Prime";
	}else if(num==1)
	{
		str=" I ";
	}else if(num==2)
	{
		str=" II ";
	}else if(num==3)
	{
		str=" III ";
	}else if(num==4)
	{
		str=" IV ";
	}else if(num==5)
	{
		str=" V ";
	}else if(num==6)
	{
		str=" VI ";
	}else if(num==7)
	{
		str=" VII ";
	}else if(num==8)
	{
		str=" VIII ";
	}else if(num==9)
	{
		str=" IX ";
	}else if(num==10)
	{
		str=" X ";
	}else if(num==11)
	{
		str=" XI ";
	}else if(num==12)
	{
		str=" XII ";
	}else if(num==13)
	{
		str=" XIII ";
	}else
	{
		str=" Omega ";
	}
	
	return str;
};



function planetInfo(){
	this.pop=Math.random()*6+5;
	this.scanned=false;
	this.richness=Math.random()*6+5;
	this.fertility=Math.random()*6+5;
	this.inhabited=false;
};

function cloud(dense){
	this.type=Math.floor(Math.random()*6);
	this.xoffset=Math.random()*dense;
	this.yoffset=Math.random()*dense;
	this.heading=Math.random()*360;
	this.size=Math.random()*2+1;
	this.alpha=0.5;
	this.sprite=Sprite("neb"+this.type);
};

function nebula(){
	this.x=Math.random()*universeWidth;
	this.y=Math.random()*universeHeight;
	this.numClouds=Math.random()*34;
	this.clouds=new Array();
	for(var i=0;i<this.numClouds;i++)
	{
		this.clouds[i]=new cloud(120);
	}
	
	this.draw=function(can,cam){
		for(var i=0;i<this.numClouds;i++)
		{
			can.save();
			can.translate((this.x+this.clouds[i].xoffset+cam.x)*cam.zoom,(this.y+this.clouds[i].yoffset+cam.y)*cam.zoom);
			can.rotate(this.clouds[i].heading*(Math.PI/180));
			can.scale(this.clouds[i].size*cam.zoom,this.clouds[i].size*cam.zoom);
			canvas.globalAlpha=.2;
			this.clouds[i].sprite.draw(can, -64,-64);
			can.restore();
		}
		
	};
};
//16.075
function star(){
	this.x=420;
	this.y=300;
	this.type=0;
	this.race=0;
	this.width=96;
	this.size=1;
	this.height=96;
	this.alive=true;
	this.cloaked=false;
	this.shields=0;
	this.shieldSprite=Sprite("shields");
	this.sprite=Sprite("sun"+Math.floor(Math.random()*3));
	this.name="Sol";
	var nami=Math.floor(Math.random()*starNames.length);
	while(true) {
        if(starNamesUsed[nami]) 
        {
            nami=Math.floor(Math.random()*starNames.length);
        }else {break;}
    }
	this.name=starNames[nami];
	starNamesUsed[nami]=true;
	this.planets=new Array();
	this.planetDetails=new Array();
	this.numPlanets=0;
	this.numAstroids=0;
	this.selected=0;
	this.discovered=false;
	
	this.cyclePlanets=function(){
		this.selected++;

		if(this.selected>this.numPlanets-1)
		{
			this.selected=0;
		}
	};
	
	this.scanAllPlanets=function(){
		for(var i=0;i<this.numPlanets;i++)
		{
			this.planetDetails[i].scanned=true;
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
	this.draw=function(can,cam){
		if(this.alive)
		{
			can.save();
			can.translate((this.x+cam.x)*cam.zoom,(this.y+cam.y)*cam.zoom);
			can.rotate((this.heading-90)* (Math.PI / 180));//todo negatives.
			can.scale(this.size*cam.zoom,this.size*cam.zoom);
			if(this.cloaked)
			{
				canvas.globalAlpha=0.30;
			}
			this.sprite.draw(can, -this.width/2,-this.height/2);
			if(this.shields>0)
			{
				canvas.globalAlpha=this.shields/100;
				if(this.width<32)
				{
					this.shieldSprite.draw(can, -this.width,-this.height);
				}else
				{
					this.shieldSprite.draw(can, -this.width/2-14,-this.height/2-12);
				}
			}
			can.restore();
			
			//this.sprite.draw(can, this.x-cam.x-this.width/2,this.y-cam.y-this.height/2);
		}
	};
};

//var sun=new star();

setupOurs=function(sun)
{
	var obt=440;
	var obtw=Math.random()*35+15;
	var qi=Math.floor(Math.random()*40);
	for (var p=0;p<160+qi;p++)
	{
		monsta.startAstroid(40,sun,(Math.random()*obtw)+obt,((Math.random()*8)+1)/8,0,true,5+Math.floor(Math.random()*2));
	}

	var qip=Math.floor(Math.random()*8);
	var ptypes=new Array();
	ptypes[0]=2;
	ptypes[1]=2;
	ptypes[2]=0;
	ptypes[3]=2;
	ptypes[4]=4;
	ptypes[5]=5;
	ptypes[6]=4;
	ptypes[7]=4;
	ptypes[8]=3;
	
	var pmoons=new Array();
	pmoons[0]=0;
	pmoons[1]=0;
	pmoons[2]=1;
	pmoons[3]=2;
	pmoons[4]=63;
	pmoons[5]=31;
	pmoons[6]=32;
	pmoons[7]=18;
	pmoons[8]=3;
	for (var p=0;p<9;p++)
	{
		var pobt=(Math.random()*44)+(p+1)*130+40;
		
		monsta.startPlanet(40,sun,pobt,((Math.random()*8)+1)/16,0,true,ptypes[p]);
	}
	
	for (var gop=0;gop<sun.numPlanets;gop++)
	{
			for (var po=0;po<pmoons[gop];po++)
			{
				monsta.startMoon(40,sun.planets[gop],Math.random()*35+15,((Math.random()*8)+1)/8,0,true,null);
			}
	}
	sun.planets[0].name="Mercury";
	sun.planets[1].name="Venus";
	sun.planets[2].name="Earth";
	sun.planets[3].name="Mars";
	sun.planets[4].name="Jupiter";
	sun.planets[5].name="Saturn";
	sun.planets[6].name="Uranus";
	sun.planets[7].name="Neptune";
	sun.planets[8].name="Pluto";
	
	sun.planets[0].size=1;
	sun.planets[1].size=1;
	sun.planets[2].size=2;
	sun.planets[3].size=2;
	sun.planets[4].size=5;
	sun.planets[5].size=4;
	sun.planets[6].size=3;
	sun.planets[7].size=3;
	sun.planets[8].size=.75;
	
	sun.selected=2;
	sun.discovered=true;
	Earth=sun.planets[2];
	Earth.orbitSpeed=2/16;
	Earth.orbitTrack=0;
	sun.planetDetails[2].inhabited=true;
	sun.planetDetails[2].pop=6;
};

var stars=new Array();
var nebulas=new Array();

function initUniverse()
{
	for (var i=0;i<numStars;i++)
	{
		backStarsX[i]=Math.floor((Math.random()*universeWidth));
		backStarsY[i]=Math.floor((Math.random()*universeHeight));
		backStarsS[i]=Math.floor((Math.random()*2)+1);
	}
	
	stars[0]=new star();
	stars[0].name="Sol";
	stars[0].x=universeWidth/4;
	stars[0].y=universeHeight/4;
	camera.x=universeWidth/4;
	camera.y=universeHeight/4;
	setupOurs(stars[0]);
	//monsta.startTextured(1000000,stars[0].x-48,stars[0].y-48,0,0,0,false,false,"sun"+stars[0].type);
	
		for(var i=0;i<numNebulas;i++)
		{
			nebulas[i]=new nebula();
			//stars[i].name=names[0][Math.floor(Math.random()*10)];
			nebulas[i].x=Math.floor(Math.random()*universeWidth);
			nebulas[i].y=Math.floor(Math.random()*universeHeight);
		}
	
	for(var i=1;i<numSystems;i++)
	{
		stars[i]=new star();
		//stars[i].name=names[0][Math.floor(Math.random()*10)];
		stars[i].x=Math.floor(Math.random()*universeWidth);
		stars[i].y=Math.floor(Math.random()*universeHeight);
		stars[i].type=Math.floor(Math.random()*3);
		stars[i].randomizeSystem();
		//monsta.startTextured(1000000,stars[i].x-48,stars[i].y-48,0,0,0,false,false,"sun"+stars[i].type);
	}
	//camera.center(stars[0]);
	camera.x=0-stars[0].x+CANVAS_WIDTH/2;
	camera.y=0-stars[0].y+CANVAS_HEIGHT/2;
	
};

function killShip(targ)
{
	for(var i=0;i<ships.length;i++)
	{
		if (targ==ships[i])
		{
			ships.splice(i,1);
			i--;
			targ.alive=false;
			console.log("The " +targ.name+" was destroyed. "+ targ.crew.length+ " crew were lost. ");
			monsta.explosionTextured(200,targ.x,targ.y,1,"explosion0");
			if(curShip==i)
			{
				curShip=0;
				//after delay
				
			}
		}
	}
	camera.center(ships[curShip]);
};


function initShips(){
	for(var i=0;i<numShips;i++){
		ships[i].crewVessel();
		ships[i].homeworld=Earth;
		ships[i].civ=civs[1];
	}
	
	ships[curShip].orbit(stars[curSystem].planets[stars[curSystem].selected]);	
	ships[0].christen();
	ships[0].prefix="U.S.S.";
	ships[0].width=16;
	ships[0].civ=civs[0];
	ships[0].height=16;
	ships[0].civ=civs[0];
	ships[0].shieldSprite=Sprite("shields");
	console.log(ships[0].prefix+ships[curShip].name+" is now orbiting " +stars[curSystem].planets[stars[curSystem].selected].name);
	ships[curShip].acceleration=1;

	
	ships[1].orbit(stars[0].planets[3]);
	ships[1].prefix="U.S.S.";
	console.log(ships[1].prefix+" "+ships[1].name+" is now orbiting " +stars[0].planets[3].name);
	ships[1].class="Galaxy Class";
	ships[1].race=0;
	ships[1].christen();
	ships[1].civ=civs[0];
	ships[1].sprite=Sprite("ship2");
	ships[1].maxSpeed=9;
	ships[1].maxShields=70;
	ships[1].shields=70;
	
	/*ships[2].x=Math.random()*universeWidth/2;
	ships[2].y=Math.random()*universeHeight/2;
	ships[2].prefix="";
	ships[2].class="Cardassian Station";
	ships[2].race=0;
	ships[2].name="Deep Space Nine";
	ships[2].sprite=Sprite("ds9");
	ships[2].maxSpeed=0;
	ships[2].speed=0;
	ships[2].heading=90;
	ships[2].desiredHeading=90;
	ships[2].maxShields=70;
	ships[2].shields=0;*/
	
	ships[2].x=Math.random()*universeWidth/2;
	ships[2].y=Math.random()*universeHeight/2;
	ships[2].prefix="";
	ships[2].class="Galaxy Class";
	ships[2].race=0;
	ships[2].name="Enterprise";
	ships[2].sprite=Sprite("ship2");
	ships[2].maxSpeed=9;
	ships[2].maxShields=70;
	ships[2].shields=70;
	ships[2].civ=civs[0];
	
	
	for(var p=3;p<numShips-3;p++)
	{
		if(Math.random()*20<5)
		{
			var blah=0;//Math.floor(Math.random()*numSystems);
			var gah=Math.floor(Math.random()*stars[blah].numPlanets);
			//civs[1].homeworld=stars[blah].planets[gah];
			
			ships[p].orbit(stars[blah].planets[Math.floor(Math.random()*stars[blah].planets.length)]);
			ships[p].class="Bird of Prey";
			ships[p].prefix="I.K.S";
			ships[p].race=5;
			ships[p].christen();
			//console.log(ships[p].prefix+ " "+ships[p].name+" is now orbiting " +stars[blah].planets[gah].name);
			ships[p].sprite=Sprite("ship4");
			ships[p].maxSpeed=7;
		}else
		{
			ships[p].x=Math.random()*universeWidth/2;
			ships[p].y=Math.random()*universeHeight/2;
			ships[p].class="Bird of Prey";
			ships[p].prefix="I.K.S";
			ships[p].sprite=Sprite("ship4");
			ships[p].race=5;
			ships[p].christen();
			ships[p].maxSpeed=7;
			ships[p].speed=6;
		}
    }
	

		
		ships[6].x=Math.random()*universeWidth/4;
		ships[6].y=Math.random()*universeHeight/4+universeHeight/2;
		ships[6].prefix="Cube";
		ships[6].race=9;
		ships[6].civ=civs[2];
		ships[6].christen();
		ships[6].hp=1000;
		ships[6].maxHp=1000;
		ships[6].shields=100;
		
		ships[6].oxygen=10000;
		ships[6].class="Cube";
		ships[6].sprite=Sprite("ship3");
		ships[6].maxSpeed=10;
		ships[6].desiredSpeed=10;
		//ships[6].adjustHeading(270);
		ships[6].speed=9;
		ships[6].orderOrbit(Earth);
		Cube=ships[6];
		
		ships[7].x=Math.random()*universeWidth/4;
		ships[7].y=Math.random()*universeHeight/4;
		ships[7].prefix="Vulcan";
		ships[7].class="Capitol Ship";
		ships[7].race=1;
		ships[7].christen();
		ships[7].sprite=Sprite("ship5");
		ships[7].maxSpeed=7;
		ships[7].speed=3;
		
		ships[8].x=Math.random()*universeWidth/2;
		ships[8].y=Math.random()*universeHeight/4;
		ships[8].prefix="IRW";
		ships[8].class="Warbird";
		ships[8].race=4;
		ships[8].christen();
		ships[8].sprite=Sprite("ship6");
		ships[8].maxSpeed=7;
		ships[8].speed=3;
	crewPool.push(new dude());
};

function drawStarfield(canv,cam){
	if(spinArt) {return;}
	//fill
	canv.fillStyle="#00001E";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	canv.fillStyle="#FFFFB2";//"#FFFF00";
	starsDrawn=0;
	for(var i=0;i<numStars;i++)
	{
		if(((backStarsX[i]+cam.x)*camera.zoom>0) && ((backStarsX[i]+cam.x)*camera.zoom<CANVAS_WIDTH)&& ((backStarsY[i]+cam.y)*camera.zoom>0) && ((backStarsY[i]+cam.y)*camera.zoom<CANVAS_HEIGHT))
		//if((backStarsX[i]>cam.x) &&(backStarsX[i]<cam.x+CANVAS_WIDTH) && (backStarsY[i]>cam.y) && (backStarsY[i]<cam.y+CANVAS_HEIGHT))
		{
			starsDrawn++;
			//console.log("yar");
			var s=0;
			if(flicker) {
				if((Math.random()*2000)<twinkRate){
					s=Math.random()*2;
				}
			}
			canv.fillRect((backStarsX[i]+cam.x)*camera.zoom, (backStarsY[i]+cam.y)*camera.zoom, backStarsS[i]+s, backStarsS[i]+s);
			//canv.fillRect((backStarsX[i]+cam.x), (backStarsY[i]+cam.y), backStarsS[i]+s, backStarsS[i]+s);
		}
	}
};