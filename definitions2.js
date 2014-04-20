
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
var numNebulas=50;
var Earth=null;
var selectedShip=null;
var Cube=null;
var drawMap=false;
//var things=new Array();
var numCivilizations=18;
var civs=new Array();
for(var i=0;i<numCivilizations;i++)
{
	civs[i]=new civilization();
	civs[i].civID=i;
	civs[i].name=races[i];
}

function clearTails()
{
	for(var i=0;i<ships.length;i++)
	{
		ships[i].tail=new Array();
	}
}

function elipseString(str,limit){
	if(str.length>limit)
	{
		var pr="";
		for(var i=0;i<limit-3;i++)
		{
			pr+=str[i];
		}
		pr+="...";
		return pr;
	}else
	{
		return str;
	}
}

for(var j=0;j<civs.length;j++)
{
	if(j!=civIDs.Borg)
	{
		civs[civIDs.Borg].autoHostile.push(civs[j]);
	}
	if(j!=civIDs.Breen)
	{
		//civs[civIDs.Breen].autoHostile.push(civs[j]);
	}
	if(j!=civIDs.Hirogen)
	{
		//civs[civIDs.Hirogen].autoHostile.push(civs[j]);
	}
	if(j!=civIDs.Dominion)
	{
		//civs[civIDs.Dominion].autoHostile.push(civs[j]);
	}
	//civs[j].autoHostile.push(civs[civIDs.Borg]);
	
}
civs[0].autoHostile.push(civs[civIDs.Borg]);
civs[civIDs.Klingon].autoHostile.push(civs[civIDs.Romulan]);
civs[civIDs.Romulan].autoHostile.push(civs[civIDs.Klingon]);
civs[civIDs.Cardassian].autoHostile.push(civs[civIDs.Bajoran]);
civs[civIDs.Borg].numShipsStart=1;
civs[civIDs.Human].numShipsStart=2;
civs[civIDs.Klingon].numShipsStart=6;
civs[civIDs.Klingon].targetPods=true;
civs[civIDs.Romulan].numShipsStart=1;
civs[civIDs.Ferengi].numShipsStart=4;
civs[civIDs.Vulcan].numShipsStart=4;
civs[civIDs.Cardassian].numShipsStart=6;
civs[civIDs.Dominion].numShipsStart=4;
civs[civIDs.Dominion].money=9000;
civs[civIDs.Hirogen].numShipsStart=5;

civs[civIDs.Vidiian].numShipsStart=5;
civs[civIDs.Andorian].numShipsStart=6;
civs[civIDs.Telaxian].numShipsStart=1;
civs[civIDs.Tellarite].numShipsStart=4;
civs[civIDs.Bajoran].numShipsStart=2;
civs[civIDs.Breen].numShipsStart=5;
civs[civIDs.Breen].money=5000;
civs[civIDs.Breen].hostileOnIncursion=true;
civs[civIDs.Romulan].hostileOnIncursion=true;
civs[civIDs.Borg].hostileOnContact=true;
civs[civIDs.Dominion].hostileOnContact=true;
civs[civIDs.Hirogen].hostileOnContact=true;
civs[civIDs.Pakled].numShipsStart=2;
civs[civIDs.Orion].numShipsStart=4;
civs[civIDs.Klingon].mode=AIModes.Agressive;

civs[civIDs.Human].color="#0033CC";//"#0066FF";
civs[civIDs.Vulcan].color="#CC9900";
civs[civIDs.Andorian].color="#00FFFF";//"#0066CC";
civs[civIDs.Tellarite].color="#990000";
civs[civIDs.Romulan].color="#336600";
civs[civIDs.Klingon].color="#CC0000";
civs[civIDs.Betazoid].color="#FF9999";
civs[civIDs.Vidiian].color="#CCFF99";
civs[civIDs.Cardassian].color="#660033";
civs[civIDs.Borg].color="#194719";//"#003300"
civs[civIDs.Orion].color="#00CC00";
civs[civIDs.Telaxian].color="#FF9966";
civs[civIDs.Ferengi].color="#CC3300";
civs[civIDs.Pakled].color="#800000";
civs[civIDs.Bajoran].color="#FF00FF";
civs[civIDs.Breen].color="#003366";
civs[civIDs.Hirogen].color="#FFFF66";
civs[civIDs.Dominion].color="#666699";

civs[0].AI=false;
civs[0].player=true;
civs[civIDs.Borg].AI=true; //for now.
civs[civIDs.Borg].allied=false; //for now.
//civs[civIDs.Romulan].mode=AIModes.Defense;
civs[civIDs.Dominion].mode=AIModes.Agressive;

var ships=new Array();
//var stations=new Array(); //todo add to civilization

var curShip=0;
var planetTypes = ["Class M","Class L","Class N","Class F","Class J","Class T","Demon Class"];

function hdgDiff (h1, h2) { // angle between two headings
   var diff = fmod(h1 - h2 + 3600, 360);
   return diff <= 180 ? diff : 360 - diff;
}

function isTurnCCW(hdg, newHdg) { // should a new heading turn left ie. CCW?
   var diff = newHdg - hdg;        // CCW = counter-clockwise ie. left
   return diff > 0 ? diff > 180 : diff >= -180;
}

function drawLittleMap(can, cam)
{
	var mapFactor=1000;
	can.fillStyle="black";
	var mapedgex=140;
	var mapedgey=20;
	can.fillRect(mapedgex,mapedgey,universeWidth/mapFactor,universeHeight/mapFactor);
	can.fillStyle="white";
	canvas.font = "8pt Calibri";
	
	var hostileMapMode=false;
	for(var i=0;i<stars.length;i++)
	{
		var xp=stars[i].x/mapFactor-1;
		var yp=stars[i].y/mapFactor-1;
		can.fillRect(mapedgex+xp,mapedgey+yp,4,4);
		if(stars[i].civs.length>0)
		{
			can.fillStyle=stars[i].civs[0].color;
		}
		can.fillText(stars[i].name,mapedgex+xp+6,mapedgey+yp);
		can.fillStyle="white";
		
	}
	for(var i=0;i<nebulas.length;i++)
	{
		can.fillStyle="pink";
		var xp=nebulas[i].x/mapFactor-1;
		var yp=nebulas[i].y/mapFactor-1;
		can.globalAlpha=.50;
		can.fillRect(mapedgex+xp,mapedgey+yp,6,6);
		can.fillStyle="blue";
		can.fillRect(mapedgex+xp-3,mapedgey+yp+2,6,6);
		can.fillStyle="green";
		can.fillRect(mapedgex+xp+3,mapedgey+yp+2,6,6);
		if((mX>mapedgex+xp) && (mX<mapedgex+xp+6) &&(mY>mapedgey+yp) &&(mY<mapedgey+yp+6))
		{
			can.fillText(nebulas[i].name,mapedgex+xp+6,mapedgey+yp);
		}
		can.fillStyle="white";
		can.globalAlpha=1;
		
	}
	for(var i=0;i<ships.length;i++)
	{
		var xp=ships[i].x/mapFactor;
		var yp=ships[i].y/mapFactor;
		can.fillStyle=ships[i].civ.color;
		if(hostileMapMode)
		{
			if(ships[i].civ.name=="Humanity")
			{
				can.fillStyle="green";
			}else if(civs[0].autoHostile.indexOf(ships[i].civ)>-1)
			{
				can.fillStyle="red";
			}else if(ships[i].civ.allied)
			{
				can.fillStyle="blue";
			}else
			{
				can.fillStyle="yellow";
			}
		}
		can.fillRect(mapedgex+xp,mapedgey+yp,2,2);
		for(var p=0;p<ships[i].tail.length;p++)
		{
			var txp=ships[i].tail[p].x/mapFactor;
			var typ=ships[i].tail[p].y/mapFactor;
			can.globalAlpha=.30;
			can.fillRect(mapedgex+txp,mapedgey+typ,2,2);
		}
		can.globalAlpha=1;
		if((mX>mapedgex+xp) && (mX<mapedgex+xp+2) &&(mY>mapedgey+yp) &&(mY<mapedgey+yp+2))
		{
			can.fillText(ships[i].name,mapedgex+xp+6,mapedgey+yp);
		}
		
		can.fillStyle="white";
		
	}
	
	//nebulas, escape pods? 
	can.strokeStyle="yellow";
	can.lineWidth =1;
	var point1={};
	var point2={};
	//point1.x=-(cam.x+cam.width/2)/mapFactor;
	//point1.y=-(cam.y+cam.height/2)/mapFactor;
	point1.x=-cam.x/mapFactor;
	point1.y=-cam.y/mapFactor;
	point2.x=(0-(cam.x+cam.width)/(mapFactor*cam.zoom));
	point2.y=(0-(cam.y+cam.height)/(mapFactor*cam.zoom));
	//console.log(point1,point2);
	can.beginPath();
	
	can.moveTo(mapedgex+point1.x,mapedgey+point1.y);
	can.lineTo(mapedgex+point1.x+cam.width/(mapFactor*cam.zoom),mapedgey+point1.y);
	can.lineTo(mapedgex+point1.x+cam.width/(mapFactor*cam.zoom),mapedgey+point1.y+cam.height/(mapFactor*cam.zoom));
	can.lineTo(mapedgex+point1.x,mapedgey+point1.y+cam.height/(mapFactor*cam.zoom));
	can.lineTo(mapedgex+point1.x,mapedgey+point1.y);

    can.stroke();
	can.closePath();	
	//can.fillRect(mapedgex+point1.x,mapedgey+point1.y,cam.width/(mapFactor*cam.zoom),cam.height/(mapFactor*cam.zoom));
};

function honorDead(iv)
{
	if(!iv.deadShips) {return};
	for(var i=0;i<iv.deadShips.length;i++){
		console.log(iv.deadShips[i].prefix+iv.deadShips[i].name);
		for(var j=0;j<iv.deadShips[i].crew.length;j++){
			console.log("    "+iv.deadShips[i].crew[j].title+" "+iv.deadShips[i].crew[j].name);
		}
	}
}

function timesavertwo()
{
	for(var i=0;i<10;i++)
	{
		civs[0].produceShip(1);
	}
};

function whoseleft()
{
	for(var i=0;i<civs.length;i++)
	{
		if(civs[i].alive)
		{
			console.log(civs[i].name+ " "+civs[i].worlds.length+" worlds and "+civs[i].ships.length+" ships.");
		}
	}
};

function howsitgoing(iv)
{
	console.log("Ships: "+iv.ships.length);
	console.log("Ships Lost: "+iv.deadShips.length);
	var totalcrew=0;
	var totalbattles=0;
	var totalkills=0;
	for(var i=0;i<iv.ships.length;i++)
	{
		totalcrew+=iv.ships[i].crew.length;
		totalbattles+=iv.ships[i].battles;
		totalkills+=iv.ships[i].kills;
	}
	console.log("Crew: "+totalcrew);
	console.log("Worlds: "+iv.worlds.length);
	console.log("Money: "+iv.money);
	console.log("Production Rate: "+iv.getProductionRate());
	console.log("Resaerch Rate: "+iv.getResearchRate());
	console.log("Number of Kills: "+totalkills);
	if(iv.productionQueue.length>0)
	{
		if(iv.productionQueue[0].building)
		{
			console.log("Currently producing a "+ iv.productionQueue[0].name+ " on " +iv.productionQueue[0].world.name);	
		}else //ship
		{
			console.log("Currently producing the "+ iv.productionQueue[0].prefix+" "+iv.productionQueue[0].name);
		}
	}else
	{
		console.log("Not currently producing anything");
	}
	var ted="";
	console.log("Warring With: "+ted);
	for(var i=0;i<iv.autoHostile.length;i++)
	{
		//ted.concat(",");
		//ted.concat(iv.autoHostile[i].name);
		console.log("    "+iv.autoHostile[i].name);
	}
	
}

Upgrades={};
Upgrades.Shields=0;
Upgrades.MaxShields=1;
Upgrades.AddPhaser=2;
Upgrades.PhaserPower=3;
Upgrades.MaxTorpedos=4;
Upgrades.MaxMines=5;
Upgrades.MaxSpeed=6;
Upgrades.MaxCrew=7;
Upgrades.SensorRange=8;
Upgrades.WeaponsRange=9;

statusModes={};
statusModes.Overview=0;
statusModes.CivView=1;
statusModes.WarView=3;


function statusBox()
{
	this.civ=civs[0];
	this.civTrack=0;
	this.visible=false;
	this.mode=statusModes.CivView;
	this.x=140;
	this.y=20;
	this.worldTrack=0;
	this.shipTrack=0;
	this.collumTrack=0;
	this.productionBar=new progressBar();
	this.researchBar=new progressBar();
	this.productionBar.x=550;
	this.productionBar.label="Production:";
	this.productionBar.y=50;

	this.researchBar.x=550;
	this.researchBar.label="Research:  ";
	this.researchBar.y=70;
	
	this.scale=1;
	this.height=550
	this.width=650;
	this.backColor="blue";
	this.borderSize=4;
	this.cycleCiv=function()
	{
		this.civTrack++;
		if(this.civTrack>17)
		{
			this.civTrack=0;
		}
		this.worldTrack=0;
		this.shipTrack=0;
		this.collumTrack=0;
		this.civ=civs[this.civTrack];
	};
	this.update=function()
	{
		if(leftkey.check())
		{
			if(this.collumTrack>0)
			{
				this.collumTrack--;
			}
		}
		if(rightkey.check())
		{
			if(this.collumTrack<2)
			{
				this.collumTrack++;
			}
		}
		if(upkey.check())
		{
			if((this.collumTrack==1) && (this.worldTrack>0))
			{
				this.worldTrack--;
			}else if((this.collumTrack==2) && (this.shipTrack>0))
			{
				this.shipTrack--;
			}
		}
		if(downkey.check())
		{
			if((this.collumTrack==1) && (this.worldTrack<this.civ.worlds.length-1) && (this.worldTrack<24))
			{
				this.worldTrack++;
			}else if((this.collumTrack==2) && (this.shipTrack<this.civ.ships.length-1)&& (this.shipTrack<24))
			{
				this.shipTrack++;
			}
		}
		if(startkey.check())
		{
			if(this.collumTrack==2)
			{
				selectedShip=this.civ.ships[this.shipTrack];
				camera.follow(selectedShip);
				this.visible=false;
				this.worldTrack=0;
				this.shipTrack=0;
				this.collumTrack=0;
			}else if(this.collumTrack==1)
			{
				camera.follow(this.civ.worlds[this.worldTrack]);
				this.visible=false;
				this.worldTrack=0;
				this.shipTrack=0;
				this.collumTrack=0;
			}
		}
	}
	this.draw=function(can,cam)
	{
		if(!this.visible)
		{
			return;
		}
		can.save();
		can.font = "12pt Calibri";
		can.fillStyle="white";
		can.fillStyle=this.civ.color;
		can.fillRect(this.x,this.y,this.width+this.borderSize,this.height+this.borderSize);
		can.fillStyle=this.backColor;
		can.globalAlpha=.80;
		can.fillRect(this.x+this.borderSize,this.y+this.borderSize,this.width-this.borderSize,this.height-this.borderSize);
		can.fillStyle="white";
		if(this.mode==statusModes.Overview)
		{
		
		}else if(this.mode==statusModes.CivView)
		{
			//can.fillStyle=this.civ.color;
			can.fillText(this.civ.name,this.x+10,this.y+2+16);
			//can.fillStyle="white";
			can.fillText("Money: " +this.civ.money,this.x+10,this.y+2+32);
			var pump="dunno";
			if(this.civ.mode==AIModes.Agressive)
			{
				if(this.civ.autoHostile.length>0)
				{
					pump="Agressive";
				}else
				{
					pump="Agressive, but with no enemies";
				}
			}else if(this.civ.mode==AIModes.Defense)
			{
				pump="Defending";
			}else if(this.civ.mode==AIModes.Explore)
			{
				pump="Exploring";
			}
			if(this.civ.fallingBack)
			{
				pump="Preparing for Borg invasion";
			}
			if(this.civ.homeworld.civ!=this.civ)//revenge at all costs against enemyciv.
			{
				pump="Seeking revenge against "+this.civ.homeworld.civ.name + " at all costs";
			}
			if(!this.civ.AI)
			{
				pump="Manual Control";
			}
			can.fillText("AI Mode: "+pump,this.x+10,this.y+2+48);
			if(this.civ.allied)
			{
				can.fillText("Allied with humans.",this.x+10,this.y+2+64);
			}
			
			if(this.civ.autoHostile.length>0)
			{
				var george="";
				if(this.civ.autoHostile.length>15)
				{
					george=" Just about Everybody.";
				}else
				{
				
					for(var i=0;i<this.civ.autoHostile.length;i++)
					{
						george+=this.civ.autoHostile[i].name+ " ";
					}
					george=elipseString(george,88);
				}
				can.fillText("At War With: "+george,this.x+10,this.y+2+78);
			}

			can.fillText("Worlds: "+this.civ.worlds.length,this.x+10,this.y+2+112);
			var kim=this.civ.worlds.length;
			var elipsis=false;
			if(kim>25)
			{
				kim=25;
				elipsis=true;
			}else
			{
				elipsis=false;
			}
			for(var i=0;i<kim;i++)
			{
				var mike="";
				if(this.civ.worlds[i]==this.civ.homeworld)
				{
					mike=" (Homeworld)";
				}
				if((this.collumTrack==1) && (i==this.worldTrack))
				{
					can.fillStyle="green";
				}
				var reek=this.civ.worlds[i].name+mike+", "+this.civ.worlds[i].sun.name+" system"
				reek=elipseString(reek,50);
				can.fillText(reek,this.x+10,this.y+2+128+i*16);
				can.fillStyle="white";
			}
			if(elipsis)
			{
				can.fillText("....",this.x+10,this.y+2+128+kim*16);
			}
			can.fillText("Ships: "+this.civ.ships.length,this.x+350,this.y+2+112);
			kim=this.civ.ships.length;
			elipsis=false;
			if(kim>25)
			{
				kim=25;
				elipsis=true;
			}else
			{
				elipsis=false;
			}
			for(var i=0;i<kim;i++)
			{
				if((this.collumTrack==2) && (i==this.shipTrack))
				{
					can.fillStyle="green";
				}
				can.fillText(this.civ.ships[i].name+", "+this.civ.ships[i].actionText,this.x+350,this.y+2+128+i*16);
				can.fillStyle="white";
			}
			if(elipsis)
			{
				can.fillText("....",this.x+350,this.y+2+128+kim*16);
			}
		}else if(this.mode==statusModes.WarView)
		{
		
		}
		
		if(this.civ.productionQueue.length>0)
		{
			if((this.civ.productionQueue[0]) &&(this.civ.productionQueue[0].building))
			{
				reek="Producing a "+ this.civ.productionQueue[0].name+ " on " +this.civ.productionQueue[0].world.name;
				reek=elipseString(reek,44);
				can.fillText(reek,this.x+350,this.y+90);	
			}else if(this.civ.productionQueue[0])
			{
				can.fillText("Producing: "+this.civ.productionQueue[0].name,this.x+400,this.y+90);
			}
		}
		
		this.productionBar.val=this.civ.productionTick;
		this.productionBar.maxVal=this.civ.nextProduction;
		this.productionBar.draw(canvas,camera);
	
		this.researchBar.val=this.civ.researchTick;
		this.researchBar.maxVal=this.civ.nextResearch;
		this.researchBar.draw(canvas,camera);
		if(!this.civ.alive)
		{
			can.strokeStyle="red";
			can.lineWidth =10;

			//console.log(point1,point2);
			can.beginPath();
			
			can.moveTo(this.x,this.y);
			can.lineTo(this.x+this.width,this.y+this.height);
			can.moveTo(this.x+this.width,this.y);
			can.lineTo(this.x,this.y+this.height);


			can.stroke();
			can.closePath();	
		}
		can.restore();
	};
};

var roland=new statusBox();
var textBoxes=new Array();
var buttons=new Array();

function button(pt)
{
	this.x=0;
	this.y=0;
	if(pt){
	this.parent=pt;
	}
	this.hasFocus=false;
	this.visible=false;
	this.object=null;
	this.width=64;
	this.height=32;
	this.blinkRate=30;
	this.blink=false;
	this.choice=null;
	this.text="Go!";
	this.blinkTrack=0;
	this.backColor="green";
	this.borderSize=2;
	this.doThings=function()
	{
		
	};
	this.update=function()
	{
		
		if(this.hasFocus)
		{
			//holdInput=true;
			
			if(startkey.check())
			{
				this.doThings();
				//somehow order ship to move there.
			}
	}	

	};
	this.draw=function(can,cam)
	{
		can.fillStyle="white";
		if(this.hasFocus)
		{
			can.fillStyle="yellow";
		}
		can.fillRect(this.x,this.y,this.width+this.borderSize,this.height+this.borderSize);
		can.fillStyle=this.backColor;
		can.fillRect(this.x+this.borderSize,this.y+this.borderSize,this.width-this.borderSize,this.height-this.borderSize);
		can.fillStyle="white";
		can.fillText(this.text,this.x+this.width/2-(6*this.text.length),this.y+this.height/2)
	};
	
}

function textBox(pt)
{
	this.x=0;
	this.y=0;
	if(pt){
	this.parent=pt;
	}
	this.hasFocus=false;
	this.visible=false;
	this.width=80;
	this.height=16;
	this.blinkRate=30;
	this.blink=false;
	this.finalText=null;
	this.listTrack=0;
	this.list=null;//civs[0].knownWorlds;
	this.choice=null;
	this.text="";
	this.blinkTrack=0;
	this.backColor="blue";
	this.borderSize=2;
	this.update=function()
	{
		if(this.hasFocus)
		{
			this.blinkTrack++;
			if(this.blinkTrack>this.blinkRate)
			{
				this.blink=!this.blink;
				this.blinkTrack=0;
			}
			
			if((this.type==0) &&(startkey.check()))
			{
				this.finalText=this.text;
				this.hasFocus=false;
			}
		}
		
		if(this.type==1) //dropdown basically.
		{
			if(this.hasFocus)
			{
				//holdInput=true;
				
				if(startkey.check())
				{
					holdInput=false;
					this.hasFocus=false;
					this.choice=this.list[this.listTrack];
					//somehow order ship to move there.
				}
				
				if(upkey.check())
				{
					if(this.listTrack>0)
					{
						this.listTrack--;
					}
				}else if(downkey.check())
				{
					if(this.listTrack<this.list.length-1)
					{
						this.listTrack++;
					}
				}
				if(this.list)
				{
					this.text=this.list[this.listTrack].name;
					this.width=(this.text.length+2)*6+6;
				}
			}
		}
	};
	this.draw=function(can,cam)
	{
		can.fillStyle="white";
		if(this.hasFocus)
		{
			can.fillStyle="yellow";
		}
		can.fillRect(this.x,this.y,this.width+this.borderSize,this.height+this.borderSize);
		can.fillStyle=this.backColor;
		can.fillRect(this.x+this.borderSize,this.y+this.borderSize,this.width-this.borderSize,this.height-this.borderSize);
		can.fillStyle="white";
		var darry="";
		if(this.blink)
		{
			darry="|";
		}
		can.fillText(this.text+darry,this.x+2,this.y+14)
	};
	
}

clearFocus=function()
{
	for(var i=0;i<textBoxes.length;i++)
	{
		textBoxes[i].hasFocus=false;
	}
}

function screenBox(obj)
{
	this.object=obj;
	this.x=0;
	this.y=0;
	this.scale=1;
	this.height=150
	this.width=60;
	this.page=0;
	this.pages=7;
	
	this.type=0;
	this.backColor="blue";
	this.borderSize=4;
	if((this.object.ship) && (this.object.civ) &&(this.object.civ.name=="Humanity"))
	{

		this.headingBox=new textBox(this);
		this.systemBox=new textBox(this);
		this.systemBox.type=1;
		this.systemBox.hasFocus=true;
		this.systemBox.width=150;
		this.planetBox=new textBox(this);
		this.planetBox.type=1;
		//this.planetBox.hasFocus=true;
		this.planetBox.width=150;
		//this.planetBox.list=civs[0].knownWorlds;
		this.systemBox.list=stars;
		this.planetBox.list=this.systemBox.list[this.systemBox.listTrack].planets;
		textBoxes.push(this.headingBox);
		textBoxes.push(this.systemBox);
		textBoxes.push(this.planetBox);
		this.goPlanetButton=new button(this);
		this.goPlanetButton.x=this.x+10+120;
		this.goPlanetButton.y=this.y+145;
		this.goPlanetButton.object=this.object;
		this.goPlanetButton.parent=this;
		this.goPlanetButton.doThings=function()
		{
			
			if(!this.parent.planetBox) {return};
			var sally=this.parent.planetBox.list[this.parent.planetBox.listTrack];
			if(!sally) {return;}
			this.object.orderOrbit(sally);
			console.log(this.object.name+" heading to "+sally.name);
		};
		buttons.push(this.goPlanetButton);
	}
	this.update=function()
	{
	  //clicky buttons!!
	  /*if((debugkey.check()) && (selectedShip==this.object))
	  {
		this.turnPage();
		console.log(this.object.name);
	  }*/
	if((this.headingBox) && (this.systemBox) &&(this.planetBox))
	{
		this.headingBox.update();
		var emily=this.systemBox.listTrack;
		this.systemBox.update();
		if(this.systemBox.listTrack!=emily)
		{
			this.planetBox.list=this.systemBox.list[this.systemBox.listTrack].planets;	
			this.planetBox.listTrack=0;
		}
		this.planetBox.update();
	}
	  /*if((this.planetBox.hasFocus) && (this.page==2))//todo...
		{
				holdInput=true;
		}*/

	};
	this.turnPage=function(back)
	{
		if(!back)
		{
			this.page++
			if(this.page>this.pages-1)
			{
				//this.page=this.pages-1;
				this.page=0;
			}
		}else
		{
			this.page--;
			if(this.page<0)
			{
				//this.page=0;
				this.page=this.pages-1;
			}
		}
	}
	this.draw=function(can,cam)
	{
		can.save();
		can.font = "12pt Calibri";
		can.fillStyle="white";
		can.globalAlpha=.65;
		can.fillRect(this.x,this.y,this.width+this.borderSize,this.height+this.borderSize);
		can.fillStyle=this.backColor;

		can.fillRect(this.x+this.borderSize,this.y+this.borderSize,this.width-this.borderSize,this.height-this.borderSize);
		can.fillStyle="white";
		if(this.object.ship)
		{
			if(this.page==0)
			{
				can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				can.fillText(this.object.civ.name+ " Lanch Date: " +this.object.launchDate,this.x+10,this.y+2+32);
				var reek=elipseString(this.object.actionText,60);
				can.fillText(reek,this.x+10,this.y+2+48);
				can.fillText("HP: "+this.object.hp+"/"+this.object.maxHp,this.x+10,this.y+2+64);
				can.fillText("Shields: "+this.object.shields+"/"+this.object.maxShields,this.x+10,this.y+2+80);
				
				can.fillText("Phasers:"+this.object.phaserBanks.length+" Torpedos: "+this.object.numTorpedos+" Mines: "+this.object.numMines,this.x+10,this.y+2+96);
				if(this.object.torpedoTarget)
				{
					can.fillText("Targeting: "+this.object.torpedoTarget.name,this.x+10,this.y+2+108);
				}else
				{
					can.fillText("No Weapons Lock",this.x+10,this.y+2+108);
				}
			}else if(this.page==1)
			{
				can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				can.fillText("Crew: ",this.x+10,this.y+2+32);
				for(var i=0;i<this.object.crew.length;i++)
				{
					can.fillText(this.object.crew[i].title+" "+this.object.crew[i].name+" Lvl: "+this.object.crew[i].level,this.x+10,this.y+2+64+i*16);
				}
			}else if(this.page==2)//navigation
			{
				can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				can.fillText("Navigation: ",this.x+10,this.y+2+32);
				can.fillText("Heading: "+this.object.heading,this.x+10,this.y+2+48);
				var destext="Nowhere";
				var destdist=0;
				if(this.object.destination) 
				{
					destext="Starship "+this.object.destination.name;
					destdist=Math.floor(distance(this.object,this.object.destination));
				}
				if(this.object.desiredOrbitTarg) 
				{
					destext=this.object.desiredOrbitTarg.name+","+this.object.desiredOrbitTarg.sun.name+ " system";
					destext=elipseString(destext,27);
					destdist=Math.floor(distance(this.object,this.object.desiredOrbitTarg));
				}
				can.fillText("Destination: "+destext,this.x+10,this.y+2+64);
				can.fillText("Distance: "+destdist+" AU",this.x+10,this.y+2+80);
				can.fillText("Speed: "+this.object.speed+"/"+this.object.maxSpeed,this.x+10,this.y+2+96);
				
				can.fillStyle="white"
				can.fillText("Enter Heading:",this.x+10,this.y+2+122);
				this.headingBox.x=this.x+10+110;
				this.headingBox.y=this.y+112;
				this.headingBox.draw(can,camera);
				
				can.fillText("Enter System:",this.x+10,this.y+2+144);
				this.systemBox.x=this.x+10+90;
				this.systemBox.y=this.y+132;
				this.systemBox.draw(can,camera);
				
				can.fillText("Enter Planet:",this.x+10,this.y+2+160);
				this.planetBox.x=this.x+10+90;
				this.planetBox.y=this.y+152;
				this.planetBox.draw(can,camera);
				
				this.goPlanetButton.x=this.x+10+160;
				this.goPlanetButton.y=this.y+175;
				this.goPlanetButton.draw(can,camera);
				
			}else if(this.page==3)//combat //somehow add list of nearby hostile ships.
			{
				can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				can.fillText("Combat: ",this.x+10,this.y+2+32);
				can.fillText(this.object.nearbyHostiles.length+" enemy ships in sensor range.",this.x+10,this.y+2+48);
				if(this.object.torpedoTarget)
				{
					can.fillText("Targeting: "+this.object.torpedoTarget.name,this.x+10,this.y+2+64);
					can.fillText(this.object.torpedoTarget.civ.name+" "+this.object.torpedoTarget.class.name +" Starship",this.x+10,this.y+2+80); //todo class!
					can.fillText("Target HP: "+this.object.torpedoTarget.hp+"/"+this.object.torpedoTarget.maxHp,this.x+10,this.y+2+96);
					can.fillText("Target Shields: "+this.object.torpedoTarget.shields+"/"+this.object.torpedoTarget.maxShields,this.x+10,this.y+2+112);
					can.fillText("Target Crew: "+this.object.torpedoTarget.crew.length,this.x+10,this.y+2+124);
					//todo, list whats systems are offline
			
				}else
				{
					can.fillText("No Weapons Lock",this.x+10,this.y+2+64);
				}
			}else if(this.page==4)//Systems
			{
				can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				can.fillText("Ships Systems: ",this.x+10,this.y+2+32);
			}else if(this.page==5)
			{
				can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				can.fillText("Damage Control: ",this.x+10,this.y+2+32);
			}else if(this.page==6)
			{
				can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
				can.fillText("Orders & Policies: ",this.x+10,this.y+2+32);
			}
		}else if(this.object.planet)
		{
			can.fillText(this.object.name,this.x+10,this.y+2+16);
			if(!this.object.civ)
			{
				can.fillText("Unclaimed planet",this.x+10,this.y+2+32);
			}
			else if(this.object==this.object.civ.homeworld)
			{
				can.fillText(this.object.civ.name+" Homeworld",this.x+10,this.y+2+32);
			}else
			{
				can.fillText(this.object.civ.name+" Colony",this.x+10,this.y+2+32);
			}
			can.fillText(this.object.sun.name+" system",this.x+10,this.y+2+48);
			can.fillText("HP: "+this.object.hp+"/"+this.object.maxHp,this.x+10,this.y+2+65);
			can.fillText("Shields: "+this.object.shields+"/"+this.object.maxShields,this.x+10,this.y+2+80);
			
			can.fillText("Production: "+this.object.getProduction()+" Research: "+this.object.getResearch(),this.x+10,this.y+2+96);
			
			can.fillText("Buildings: ",this.x+10,this.y+2+112);
			for(var i=0;i<this.object.buildings.length;i++)
			{
				can.fillText(this.object.buildings[i].name,this.x+10,this.y+2+128+i*16);
			}
		}else if(this.object.platform)
		{
			can.fillText(this.object.name,this.x+10,this.y+2+16);
			can.fillText(this.object.civ.name,this.x+10,this.y+2+32);
			can.fillText("HP: "+this.object.hp+"/"+this.object.maxHp,this.x+10,this.y+2+48);
			can.fillText("Shields: "+this.object.shields+"/"+this.object.maxShields,this.x+10,this.y+2+64);
			
			can.fillText("Torpedos: "+this.object.numTorpedos+" Mines: "+this.object.numMines,this.x+10,this.y+2+80);
			if(this.object.torpedoTarget)
			{
				can.fillText("Targeting: "+this.object.torpedoTarget.name,this.x+10,this.y+2+96);
			}else
			{
				can.fillText("No Weapons Lock",this.x+10,this.y+2+96);
			}
		}
		can.restore();
	};
};

function fuckoff()
{
	selectedShip.items.push(new shopItem(Item.RedShirt));
	selectedShip.items.push(new shopItem(Item.HandPhaser));
	var goat=new buyScreen(selectedShip,true);
	goat.setup();
	goat.defaultItemList();
	civs[0].messages.push(goat);
}

function progressBar()
{
	this.x=0;
	this.y=0;
	this.maxVal=100;
	this.scale=1;
	this.height=15;
	this.val=100;
	this.color="green";
	this.backColor="black";
	this.label="Wangs: ";
	this.draw=function(can,cam)
	{
		can.save();
		can.font = "12pt Calibri";
		this.fillStyle="white";
		var xoff=7*this.label.length;
		can.fillRect(this.x+xoff,this.y,104,this.height+4);
		can.fillText(this.label,this.x,this.y+13)
		
		can.fillStyle=this.backColor;
		can.fillRect(this.x+xoff+2,this.y+2,100,this.height);
		can.fillStyle=this.color;
		var percent=this.val/this.maxVal*100;
		can.fillRect(this.x+xoff+3,this.y+3,percent,this.height-2);
		can.restore();
	};
};

function newShip(iv,startworld,capt)
{
	if(!startworld)
	{
		startworld=iv.homeworld;
	}
	if(iv.civID==civIDs.Human)
		{
			var james=new starShip(iv.CivID);
			james.homeworld=Earth;
			james.civ=iv;
			james.class=shipClasses[0][0];
			james.classify();
			var bah=Math.floor(Math.random()*7);
			james.x=startworld.x
			james.y=startworld.y;
			james.orbit(startworld);
			james.prefix="U.S.S.";
			james.civ=iv;
			james.christen();
			//console.log(james.prefix+" "+james.name+" is now orbiting " +stars[0].planets[bah].name);
			james.class.name="Galaxy Class";
			james.civID=0;
			james.sprite=Sprite("ship2");
			james.maxSpeed=9;
			james.activeShields=true;
			james.hasShields=true;
			james.maxShields=70;
			james.shields=70;
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			if(j>0)
			{
				james.windows.push(new shipWindow());
				james.windows[0].x=-1;
				james.windows[0].y=8;
				james.windows.push(new shipWindow());
				james.windows[1].x=-2;
				james.windows[1].y=11;
				james.windows.push(new shipWindow());
				james.windows[2].x=2;
				james.windows[2].y=9;
			}
			james.crewVessel(capt);
			james.civ=iv;
			return james;
		}else if(iv.civID==civIDs.Vulcan)
		{
			var james=new starShip(iv.CivID);
			james.homeworld=iv.homeworld;
			james.class=shipClasses[civIDs.Vulcan][0];
			james.civ=iv;
			james.classify();
			james.x=startworld.x
			james.y=startworld.y;
			james.prefix="Vulcan";
			james.class.name="Capitol Ship";
			james.civID=1;
			james.christen();
			james.sprite=Sprite("ship5");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=4;
			
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Klingon)
		{
			var james=new starShip(iv.CivID);
				james.class=shipClasses[civIDs.Klingon][0];
				james.civ=iv;
				james.classify();
				james.x=startworld.x
				james.y=startworld.y;
				james.homeworld=iv.homeworld;
				james.orbit(startworld);
				james.class.name="Bird of Prey";
				james.prefix="I.K.S";
				james.sprite=Sprite("ship4");
				james.civ=iv;
				james.civID=5;
				james.christen();
				james.maxSpeed=7;
				james.addPhaser();
				//james.homing=false;
				james.speed=6;
				james.cruisingSpeed=6;
				james.crewVessel(capt);
				james.alive=true;
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				return james;
		}else if(iv.civID==civIDs.Dominion)
		{
			var james=new starShip(iv.CivID);
				james.class=shipClasses[civIDs.Dominion][0];
				james.civ=iv;
				james.classify();
				james.x=startworld.x
				james.y=startworld.y;
				james.homeworld=iv.homeworld;
				james.orbit(startworld);
				james.class.name="Dominion Battle Cruiser";
				james.prefix="Dominion";
				james.sprite=Sprite("ship9");
				james.civ=iv;
				james.civID=civIDs.Dominion;
				james.christen();
				james.maxSpeed=7;
				james.addPhaser();
				//james.homing=false;
				james.speed=6;
				james.cruisingSpeed=6;
				james.crewVessel(capt);
				james.alive=true;
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				return james;
		}else if(iv.civID==civIDs.Cardassian)
		{
			var james=new starShip(iv.CivID);
			james.class=shipClasses[civIDs.Cardassian][0];
			james.civ=iv;
			james.classify();
			james.x=startworld.x
			james.y=startworld.y;
			james.homeworld=iv.homeworld;
			james.orbit(startworld);
			james.class.name="Galor-Class";
			james.prefix="C.U.";
			james.sprite=Sprite("ship8");
			james.civ=iv;
			james.civID=civIDs.Cardassian;
			james.christen();
			james.maxSpeed=7;
			james.addPhaser();
			//james.homing=false;
			james.speed=6;
			james.cruisingSpeed=6;
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
			
		}else if(iv.civID==civIDs.Romulan)
		{
			var james=new starShip(iv.CivID);
			james.class=shipClasses[civIDs.Romulan][0];
			james.civ=iv;
			james.classify();
			james.x=startworld.x
			james.y=startworld.y;
			james.homeworld=iv.homeworld;
			james.prefix="IRW";
			james.class.name="Warbird";
			james.civID=4;
			james.christen();
			james.sprite=Sprite("ship6");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;

			
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Hirogen)
		{
			var james=new starShip(iv.CivID);
			james.class=shipClasses[civIDs.Hirogen][0];
			james.civ=iv;
			james.classify();
			james.x=startworld.x
			james.y=startworld.y;
			james.homeworld=iv.homeworld;
			james.prefix="Hunter";
			james.class.name="Hunter";
			james.civID=civIDs.Hirogen;
			james.christen();
			james.sprite=Sprite("ship10");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
			
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Andorian)
		{
			var james=new starShip(iv.CivID);
			james.civ=iv;
			james.class=shipClasses[civIDs.Andorian][0];
			james.classify();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			
			james.prefix="I.G.";
			james.class.name="Andorian";
			james.civID=civIDs.Andorian;
			james.christen();
			james.sprite=Sprite("ship15");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
			james.civ=civs[civIDs.Andorian];
			
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Tellarite)
		{
			var james=new starShip(iv.CivID);
			james.homeworld=iv.homeworld;
			james.class=shipClasses[civIDs.Tellarite][0];
			james.civ=civs[civIDs.Tellarite];
			james.classify();
			james.x=startworld.x
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			
			james.prefix="";
			james.class.name="Tellarite";
			james.civID=civIDs.Tellarite;
			james.christen();
			james.sprite=Sprite("ship16");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
			
			
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Breen)
		{
			var james=new starShip(iv.CivID);
			james.class=shipClasses[civIDs.Breen][0];
			james.civ=iv;
			james.classify();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			
			james.prefix="B.C.W";
			james.class.name="Breen Warship";
			james.civID=civIDs.Breen;
			james.christen();
			james.sprite=Sprite("ship14");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
			james.civ=civs[civIDs.Breen];
			
			james.crewVessel(capt);
			james.civ=iv;
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Telaxian)
		{
			var james=new starShip(iv.CivID);
			james.class=shipClasses[civIDs.Telaxian][0];
			james.civ=iv;
			james.classify();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			
			james.prefix="Telaxian";
			james.class.name="Telaxian";
			james.civID=civIDs.Telaxian;
			james.christen();
			james.sprite=Sprite("ship12");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
			
			
			james.crewVessel(capt);
			james.civ=iv
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Vidiian)
		{
			var james=new starShip(iv.CivID);
			james.class=shipClasses[civIDs.Vidiian][0];
			james.civ=civs[civIDs.Vidiian];
			james.classify();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			
			james.prefix="Vidiian";
			james.class.name="Vidiian Cruiser";
			james.civID=civIDs.Vidiian;
			james.christen();
			james.sprite=Sprite("ship13");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
			
			
			james.crewVessel(capt);
			james.civ=iv;
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Pakled)
		{
			var james=new starShip(iv.CivID);
			james.class=shipClasses[civIDs.Pakled][0];
			james.civ=iv;
			james.classify();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			
			james.prefix="";
			james.class.name="Pakled Cruiser";
			james.civID=civIDs.Pakled;
			james.christen();
			james.sprite=Sprite("ship17");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
			
			james.crewVessel(capt);
			
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Bajoran)
		{
			var james=new starShip(iv.CivID);
			james.class=shipClasses[civIDs.Bajoran][0];
			james.civ=civs[civIDs.Bajoran];
			james.classify();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			james.prefix="";
			james.class.name="Bajoran Cruiser";
			james.civID=civIDs.Bajoran;
			james.christen();
			james.sprite=Sprite("ship11");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
	
			
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Ferengi)
		{
			var james=new starShip(iv.CivID);
			james.class=shipClasses[civIDs.Ferengi][0];
			james.civ=civs[civIDs.Ferengi];
			james.classify();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			james.prefix="FAS";
			james.class.name="Merchant";
			james.civID=civIDs.Ferengi;
			james.christen();
			james.sprite=Sprite("ship7");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
			
						
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Orion)
		{
			var james=new starShip(iv.CivID);
			james.class=shipClasses[civIDs.Orion][0];
			james.civ=civs[civIDs.Orion];
			james.classify();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			james.prefix="Pirate";
			james.class.name="Cruiser";
			james.civID=civIDs.Orion;
			james.christen();
			james.sprite=Sprite("ship18");
			james.maxSpeed=7;
			james.speed=3;
			james.cruisingSpeed=5;
			
						
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.civID==civIDs.Borg)
		{
			var james=new starShip(iv.CivID);
			james.class=shipClasses[civIDs.Borg][0];
			james.civ=iv;
			james.classify();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.prefix="Cube";
			james.civID=9;
			james.civ=iv;
			james.christen();
			james.hp=1500;
			james.maxHp=1500;
			james.shields=100;
			
			james.oxygen=10000;
			james.class.name="Cube";
			james.sprite=Sprite("ship3");
			james.maxSpeed=10;
			james.cruisingSpeed=5;
			//james.adjustHeading(270);
			james.speed=5;
			james.desiredSpeed=james.cruisingSpeed;
			james.autoFireRate=20;
			james.addPhaser();
			
			//james.planetTarget=Earth;
			//james.orderOrbit(james.planetTarget);
			james.crewVessel(capt);
			
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}
		
};

function addShip(hip,iv)
{
	iv.ships.push(hip);
	ships=new Array();
	for(var i=0;i<civs.length;i++)
	{
		//ships.concat(civs[i].ships);
		for(var j=0;j<civs[i].ships.length;j++)
		{
			
			ships.push(civs[i].ships[j]);
		}
	}
		//selectedShip=ships[0];
};
var numSystems=80;
var starsDrawn=0;


var selectedSprite =Sprite("selected");
var selectedSpriteBig =Sprite("selectedbig");

var shipSelSpriteB =Sprite("shipselectedbig");
var shipSelSprite =Sprite("shipselected");

var biblam="Marklar";
if(!clean)
{
	biblam="Cat's Anus";
}
var starNames=new Array(90);
starNames= ["Eridani","Cygnus","Ceti-Alpha","Omicron Ceti","Monac","Bringold","Alnitak", "Deneb", "Acamar","Rigel","Polaris","Praxillus","Proxima Centauri", "Omicron Persei","Canopus", "Romii", "Sirius","Tahal", "Mintaka", "Vega", "Wolf", "Tau-Ceti","Eminiar","Canaris","Hydra", "Questar", "Arneb", "Amargosa", "Altiar","Draconis","Theloni","Gezid","Indi","Canaris","Sigma", "Cassius","Melona","Minara",biblam,"Detroit","Chicago","Miami","Albany","Providence","Augusta","Washington","Lexington","Moscow","Yemen","Tokyo","St. Petersburg","Berlin","New York","Patterson","Springfield","Great Neck","Manhaset","Port Washington","Honalulu","Vermont","New Hampshire","Kentucky","North Carolina","South Carolina","Florida","Texas","Huston","Oregon","Idaho","Kansas","Georgia","Arkansas","Louisiana","Ukraine","England","France","Goat land","Canada","Perth","India","Indiana","Oklahoma","Arizona","Nevada","Californa"];
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
	this.update=function()
	{
	//todo
	};
	
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
	this.name="Some Nebula";
	this.x=Math.random()*universeWidth;
	this.y=Math.random()*universeHeight;
	this.numClouds=Math.random()*100;
	this.clouds=new Array();
	for(var i=0;i<this.numClouds;i++)
	{
		this.clouds[i]=new cloud(220);
	}
	
	this.draw=function(can,cam){
		for(var i=0;i<this.numClouds;i++)
		{
			if(cam.isNear(this))
			{
				can.save();
				can.translate((this.x+this.clouds[i].xoffset+cam.x)*cam.zoom,(this.y+this.clouds[i].yoffset+cam.y)*cam.zoom);
				can.rotate(this.clouds[i].heading*(Math.PI/180));
				can.scale(this.clouds[i].size*cam.zoom,this.clouds[i].size*cam.zoom);
				canvas.globalAlpha=.2;
				this.clouds[i].sprite.draw(can, -64,-64);
				can.restore();
			}
		}
		
	};
};
//16.075
function star(){
	this.x=420;
	this.y=300;
	this.type=0;
	this.civID=0;
	this.width=96;
	this.size=1;
	this.height=96;
	this.alive=true;
	this.civs=new Array();
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
			monsta.startPlanet(40,this,pobt,((Math.random()*4)+1)/8,0,true,null);
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
			if((this.shields>0) && (this.activeShields))
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
		
		monsta.startPlanet(40,sun,pobt,((Math.random()*4)+1)/16,0,true,ptypes[p]);
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
	sun.planets[2].evented=true;
};



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
	stars[0].civs.push(civs[0]);
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
		var eli=false;
		while(eli)
		{
			for(var p=0;p<i;p++)
			{
				if((!eli) && (i!=p) && (distance(stars[i],stars[p])<10000))
				{
					eli=true;
				}
			}
			if(eli)
			{
				stars[i].x=Math.floor(Math.random()*universeWidth);
				stars[i].y=Math.floor(Math.random()*universeHeight);
			}
		}
		/*
		var eli=false;
		for(var p=0;p<i;p++)
		{
			if((!eli) && (i!=p) && (distance(stars[i],stars[p])<500))
			{
				eli=true;
			}
		}
		if(eli)
		{
			stars[i].x=Math.floor(Math.random()*universeWidth);
			stars[i].y=Math.floor(Math.random()*universeHeight);
		}*/
		stars[i].type=Math.floor(Math.random()*3);
		//monsta.startTextured(1000000,stars[i].x-48,stars[i].y-48,0,0,0,false,false,"sun"+stars[i].type);
	}
	for(var i=0;i<civs.length;i++)
	{
		if(i>0)
		{
			var patty=Math.floor(Math.random()*(numSystems-1))+1;
			while(stars[patty].civs.length>0)
			{
				patty=Math.floor(Math.random()*(numSystems-1))+1;
			}
			civs[i].star=patty
			stars[civs[i].star].civs.push(civs[i]);
			if(i==civIDs.Vulcan) 
			{
				stars[civs[i].star].x=56000;
				stars[civs[i].star].y=65000;
			}
			if(i==civIDs.Klingon) 
			{
				stars[civs[i].star].x=283900;
				stars[civs[i].star].y=41900;
			}
			if(i==civIDs.Romulan) 
			{
				stars[civs[i].star].x=356300;
				stars[civs[i].star].y=137400;
			}
			if(i==civIDs.Ferengi) 
			{
				stars[civs[i].star].x=246000;
				stars[civs[i].star].y=157200;
			}
			if(i==civIDs.Cardassian) 
			{
				stars[civs[i].star].x=230400;
				stars[civs[i].star].y=169500;
			}
			if(i==civIDs.Bajoran) 
			{
				stars[civs[i].star].x=240400;
				stars[civs[i].star].y=159500;
			}
			if(i==civIDs.Borg) 
			{
				stars[civs[i].star].x=83100;
				stars[civs[i].star].y=576900;
			}if(i==civIDs.Breen) 
			{
				stars[civs[i].star].x=515200;
				stars[civs[i].star].y=137400;
			}if(i==civIDs.Dominion) 
			{
				stars[civs[i].star].x=468300;
				stars[civs[i].star].y=530800;
			}
			if(i==civIDs.Hirogen) 
			{
				stars[civs[i].star].x=52600;
				stars[civs[i].star].y=544000;
			}if(i==civIDs.Andorian) 
			{
				stars[civs[i].star].x=39500;
				stars[civs[i].star].y=120900;
			}if(i==civIDs.Tellarite) 
			{
				stars[civs[i].star].x=51800;
				stars[civs[i].star].y=30400;
			}if(i==civIDs.Telaxian) 
			{
				stars[civs[i].star].x=190900;
				stars[civs[i].star].y=508600;
			}
			if(i==civIDs.Vidiian) 
			{
				stars[civs[i].star].x=107800;
				stars[civs[i].star].y=472400;
			}//todo Pakled Homeworld
		}
	}
	for(var i=1;i<numSystems;i++)
	{
		stars[i].randomizeSystem();
		//monsta.startTextured(1000000,stars[i].x-48,stars[i].y-48,0,0,0,false,false,"sun"+stars[i].type);
	}
	//camera.center(stars[0]);
	camera.x=0-stars[0].x+CANVAS_WIDTH/2;
	camera.y=0-stars[0].y+CANVAS_HEIGHT/2;
	
	for(var i=0;i<civs.length;i++)
	{
		civs[i].knowAllWorlds();
	}
	
};

function killShip(targ,attacker)
{
	targ.civ.deadShips.push(targ);
	if(targ.tractorClient)
	{
		targ.tractorClient.tractorHost=null;
	}
	if(targ.tractorHost)
	{
		targ.tractorHost.tractorClient=null;
	}
	for(var i=0;i<ships.length;i++)
	{
		if (targ==ships[i])
		{
			ships.splice(i,1);
			i--;
			targ.alive=false;
			console.log("The "+targ.prefix+ " " +targ.name+" was destroyed. "+ targ.crew.length+ " crew were lost. ");
			monsta.explosionTextured(200,targ.x,targ.y,1,"explosion0");
			if(targ==selectedShip)
			{
				camera.unFollow();
				if(civs[0].ships.length>1)
				{
					civs[0].cycleShips(camera);
				}else if(ships.length>1)
				{
					curShip++;
					if(curShip>ships.length-1) {
						curShip=0;
					}
					selectedShip=ships[curShip];
					camera.center(selectedShip);
					camera.follow(selectedShip);
				}else
				{
					selectedShip=null;
					//console.log("no more ships exist!");
					camera.follow(civs[0].homeworld);
				}
				//after delay
				
			}
		}
	}
	if(attacker)
	{
		attacker.grantXp(15);
		attacker.kills++;
		attacker.enterLog("Today we destroyed the "+targ.prefix+" "+targ.name);
	}
	if(selectedShip==targ)
	{
		camera.unFollow();
		civs[0].cycleShips();
	}
};

function newPlatform(wrld)
{
	var iv=wrld.civ;
	var jilly=new starShip(iv);
	jilly.homeworld=iv.homeworld;
	jilly.x=jilly.homeworld.x;
	jilly.y=jilly.homeworld.y;
	jilly.orbit(wrld);
	jilly.numTorpedos=200;
	jilly.platform=true;
	jilly.ship=false;
	jilly.addPhaser();
	jilly.addPhaser();
	jilly.civID=iv.ID;
	jilly.prefix="";
	//jilly.christen();
	jilly.name="Defense Platform";
	jilly.class="orbitalDefense";
	jilly.sprite=Sprite("platform");
	jilly.maxSpeed=0;
	jilly.activeShields=true;
	jilly.maxShields=0;
	jilly.shields=0;
	jilly.alive=true;
	jilly.civ=iv;
	return jilly;
};

function newInitShips()
{
	for(var i=0;i<civs.length;i++)
	{
		if(i>0)
		{
			var blah=civs[i].star;
			var gah=Math.floor(Math.random()*stars[blah].numPlanets);
			civs[i].homeworld=stars[blah].planets[gah];
			stars[blah].planets[gah].civID=i;
			stars[blah].planets[gah].civ=civs[i];
			stars[blah].planets[gah].colonized=true;
			civs[i].worlds.push(stars[blah].planets[gah]);
			stars[blah].planets[gah].colonized=true;
			
			if(i==civIDs.Vulcan) 
			{
				stars[blah].planets[gah].name="Vulcan"; 
				stars[blah].planets[gah].civ=civs[civIDs.Vulcan];
				stars[blah].x=56000;
				stars[blah].y=65000;
			}
			if(i==civIDs.Klingon) 
			{
				stars[blah].planets[gah].name="Qo'nos"; 
				stars[blah].planets[gah].civ=civs[civIDs.Klingon];
				stars[blah].x=283900;
				stars[blah].y=41900;
			}
			if(i==civIDs.Romulan) 
			{
				stars[blah].planets[gah].name="Romulus"; 
				stars[blah].planets[gah].civ=civs[civIDs.Romulan];
				stars[blah].x=356300;
				stars[blah].y=137400;
			}
			if(i==civIDs.Ferengi) 
			{
				stars[blah].planets[gah].name="Ferenginar"; 
				stars[blah].planets[gah].civ=civs[civIDs.Ferengi];
				stars[blah].x=246000;
				stars[blah].y=157200;
			}
			if(i==civIDs.Cardassian) 
			{
				stars[blah].planets[gah].name="Cardassia"; 
				stars[blah].planets[gah].civ=civs[civIDs.Cardassian];
				stars[blah].x=230400;
				stars[blah].y=169500;
			}
			if(i==civIDs.Bajoran) 
			{
				stars[blah].planets[gah].name="Bajor"; 
				stars[blah].planets[gah].civ=civs[civIDs.Bajoran];
				stars[blah].x=240400;
				stars[blah].y=159500;
			}
			if(i==civIDs.Borg) 
			{
				stars[blah].planets[gah].name="Borg Homeworld"; 
				stars[blah].planets[gah].civ=civs[civIDs.Borg];
				stars[blah].x=83100;
				stars[blah].y=576900;
			}if(i==civIDs.Breen) 
			{
				stars[blah].planets[gah].name="Breen"; 
				stars[blah].planets[gah].civ=civs[civIDs.Breen];
				stars[blah].x=515200;
				stars[blah].y=137400;
			}if(i==civIDs.Dominion) 
			{
				stars[blah].planets[gah].name="Founder Planet"; 
				stars[blah].planets[gah].civ=civs[civIDs.Dominion];
				stars[blah].x=468300;
				stars[blah].y=530800;
			}
			if(i==civIDs.Hirogen) 
			{
				stars[blah].planets[gah].name="Hiros"; 
				stars[blah].planets[gah].civ=civs[civIDs.Hirogen];
				stars[blah].x=52600;
				stars[blah].y=544000;
			}if(i==civIDs.Andorian) 
			{
				stars[blah].planets[gah].name="Andor"; 
				stars[blah].planets[gah].civ=civs[civIDs.Andorian];
				stars[blah].x=39500;
				stars[blah].y=120900;
			}if(i==civIDs.Tellarite) 
			{
				stars[blah].planets[gah].name="Tellar"; 
				stars[blah].planets[gah].civ=civs[civIDs.Tellarite];
				stars[blah].x=51800;
				stars[blah].y=30400;
			}if(i==civIDs.Telaxian) 
			{
				stars[blah].planets[gah].name="Tellax"; 
				stars[blah].planets[gah].civ=civs[civIDs.Telaxian];
				stars[blah].x=190900;
				stars[blah].y=508600;
			}
		}else
		{
			civs[i].homeworld=stars[0].planets[2];
			stars[0].planets[2].civ=civs[0];
			civs[i].worlds.push(stars[0].planets[2]);
			stars[0].planets[2].colonized=true;
		}
		civs[i].homeworld.hasShipyard=true;
		civs[i].homeworld.buildings.push(new building(Buildings.Shipyard,civs[i].homeworld));
		for(var j=0;j<civs[i].numShipsStart;j++)
		{
			if(i==civIDs.Human)
			{
				var james=new starShip(i);
				james.class=shipClasses[civIDs.Human][0];
				james.civ=civs[0];
				james.classify();
				james.homeworld=Earth;
				var bah=Math.floor(Math.random()*7);
				james.orbit(stars[0].planets[bah]);
				james.prefix="U.S.S.";
				james.christen();
				console.log(james.prefix+" "+james.name+" is now orbiting " +stars[0].planets[bah].name);
				james.class.name="Galaxy Class";
				james.civID=0;
				
				james.sprite=Sprite("ship2");
				james.maxSpeed=9;
				james.activeShields=true;
				james.crusingSpeed=7;
				james.desiredSpeed=james.cruisingSpeed;
				james.hasShields=true;
				james.maxShields=70;
				james.shields=70;
				james.alive=true;
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				if(j>0)
				{
					james.windows.push(new shipWindow());
					james.windows[0].x=-1;
					james.windows[0].y=8;
					james.windows.push(new shipWindow());
					james.windows[1].x=-2;
					james.windows[1].y=11;
					james.windows.push(new shipWindow());
					james.windows[2].x=2;
					james.windows[2].y=9;
				}
				james.crewVessel();
				james.civ=civs[i];
				civs[i].ships.push(james);
			}else if(i==civIDs.Vulcan)
			{
				var james=new starShip(i);
				james.class=shipClasses[civIDs.Vulcan][0];
				james.civ=civs[i];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.sun.x;
				james.y=james.homeworld.sun.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				james.prefix="Vulcan";
				james.class.name="Capitol Ship";
				james.civID=1;
				james.christen();
				james.sprite=Sprite("ship5");
				james.maxSpeed=7;
				james.speed=3;
				james.cruisingSpeed=4;
				james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Vulcan];
				james.crewVessel();
				
				james.alive=true;
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				civs[i].ships.push(james);
			}else if(i==civIDs.Klingon)
			{
				var james=new starShip(i);
				james.class=shipClasses[civIDs.Klingon][0];
				james.civ=civs[i];
				james.classify();
				if(Math.random()*20<5)
				{
					var blah=Math.floor(Math.random()*(numSystems-1))+1;
					var gah=Math.floor(Math.random()*stars[blah].numPlanets);
					james.homeworld=civs[i].homeworld;
					james.x=james.homeworld.x;
					james.y=james.homeworld.y;
					james.desiredHeading=Math.floor(Math.random()*359);
					
					if(!civs[i].worlds.colonized)
					{
						james.orbit(stars[blah].planets[gah]);
						civs[i].worlds.push(stars[blah].planets[gah]);
						stars[blah].planets[gah].civ=civs[i];
					}
					james.civID=5;
					james.civ=civs[civIDs.Klingon];
					james.homeworld=civs[i].homeworld;
					james.class.name="Bird of Prey";
					james.prefix="I.K.S";
					james.christen();
					//james.homeworld=civs[i].homeworld;
					//console.log(james.prefix+ " "+james.name+" is now orbiting " +stars[blah].planets[gah].name);
					james.sprite=Sprite("ship4");
					james.addPhaser();
					//james.homing=false;
					james.maxSpeed=7;
					james.cruisingSpeed=6;
					james.desiredSpeed=james.cruisingSpeed;
					james.crewVessel();

					james.alive=true;
					james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
					civs[i].ships.push(james);
					
				}else
				{
					james.homeworld=civs[i].homeworld;
					james.x=james.homeworld.x;
					james.y=james.homeworld.y;
					james.desiredHeading=Math.floor(Math.random()*359);
				
					james.class.name="Bird of Prey";
					james.prefix="I.K.S";
					james.sprite=Sprite("ship4");
					james.civ=civs[civIDs.Klingon];
					james.civID=5;
					james.christen();
					james.maxSpeed=7;
					james.addPhaser();
					//james.homing=false;
					james.speed=6;
					james.cruisingSpeed=6;
					james.desiredSpeed=james.cruisingSpeed;
					james.crewVessel();
					james.alive=true;
					james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
					civs[i].ships.push(james);
				}
			}else if(i==civIDs.Dominion)
			{
				var james=new starShip(i);
				james.class=shipClasses[civIDs.Dominion][0];
				james.civ=civs[i];
				james.classify();
				if(false)//Math.random()*20<5)
				{
					var blah=Math.floor(Math.random()*(numSystems-1))+1;
					var gah=Math.floor(Math.random()*stars[blah].numPlanets);
					james.homeworld=civs[i].homeworld;
					james.x=james.homeworld.x;
					james.y=james.homeworld.y;
					james.desiredHeading=Math.floor(Math.random()*359);
					if(!civs[i].worlds.colonized)
					{
						james.orbit(stars[blah].planets[gah]);
						civs[i].worlds.push(stars[blah].planets[gah]);
						stars[blah].planets[gah].civ=civs[i];
					}
					james.civID=civIDs.Dominion;
					james.civ=civs[civIDs.Dominion];
				
					james.class.name="Dominion Battle Cruiser";
					james.prefix="Dominion";
					james.christen();
					//james.homeworld=civs[i].homeworld;
					//console.log(james.prefix+ " "+james.name+" is now orbiting " +stars[blah].planets[gah].name);
					james.sprite=Sprite("ship9");
					james.addPhaser();
					//james.homing=false;
					james.maxSpeed=7;
					james.cruisingSpeed=6;
					james.desiredSpeed=james.cruisingSpeed;
					james.crewVessel();

					james.alive=true;
					james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
					civs[i].ships.push(james);
					
				}else
				{
					james.homeworld=civs[i].homeworld;
					james.x=james.homeworld.x;
					james.y=james.homeworld.y;
					james.desiredHeading=Math.floor(Math.random()*359);
					
					james.class.name="Dominion Battle Cruiser";
					james.prefix="Dominion";
					james.sprite=Sprite("ship9");
					james.civ=civs[civIDs.Dominion];
					james.civID=civIDs.Dominion;
					james.christen();
					james.maxSpeed=7;
					james.addPhaser();
					//james.homing=false;
					james.speed=6;
					james.cruisingSpeed=6;
					james.desiredSpeed=james.cruisingSpeed;
					james.crewVessel();
					james.alive=true;
					james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
					civs[i].ships.push(james);
				}
			}else if(i==civIDs.Cardassian)
			{
				var james=new starShip(i);
				james.class=shipClasses[civIDs.Cardassian][0];
				james.civ=civs[i];
				james.classify();
				if(Math.random()*20<5)
				{
					var blah=Math.floor(Math.random()*(numSystems-1))+1;
					var gah=Math.floor(Math.random()*stars[blah].numPlanets);
					james.homeworld=civs[i].homeworld;
					james.x=james.homeworld.x;
					james.y=james.homeworld.y;
					james.desiredHeading=Math.floor(Math.random()*359);
					
					if(!civs[i].worlds.colonized)
					{
						james.orbit(stars[blah].planets[gah]);
						civs[i].worlds.push(stars[blah].planets[gah]);
						stars[blah].planets[gah].civ=civs[i];
					}
					james.civID=civIDs.Cardassian;
					james.civ=civs[i];
					james.class.name="Galor-Class";
					james.prefix="C.U.";
					james.christen();
					//james.homeworld=iv.homeworld;
					//console.log(james.prefix+ " "+james.name+" is now orbiting " +stars[blah].planets[gah].name);
					james.sprite=Sprite("ship8");
					james.addPhaser();
					//james.homing=false;
					james.maxSpeed=7;
					james.cruisingSpeed=6;
					james.desiredSpeed=james.cruisingSpeed;
					james.crewVessel();
					james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
					james.alive=true;
					civs[i].ships.push(james);
					
				}else
				{
					james.homeworld=civs[i].homeworld;
					james.x=james.homeworld.x;
					james.y=james.homeworld.y;
					james.desiredHeading=Math.floor(Math.random()*359);
				
					james.class.name="Galor-Class";
					james.prefix="C.U.";
					james.sprite=Sprite("ship8");
					james.civ=civs[i];
					james.civID=civIDs.Cardassian;
					james.christen();
					james.maxSpeed=7;
					james.addPhaser();
					//james.homing=false;
					james.speed=6;
					james.cruisingSpeed=6;
					james.desiredSpeed=james.cruisingSpeed;
					james.crewVessel();
					james.alive=true;
					james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
					civs[i].ships.push(james);
				}
		}else if(i==civIDs.Romulan)
			{
				var james=new starShip(i);
				james.class=shipClasses[civIDs.Romulan][0];
				james.civ=civs[i];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="IRW";
				james.class.name="Warbird";
				james.civID=4;
				james.christen();
				james.sprite=Sprite("ship6");
				james.maxSpeed=7;
				james.speed=3;
				james.cruisingSpeed=5;
				james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Romulan];
				
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				civs[i].ships.push(james);
			}else if(i==civIDs.Andorian)
			{
				var james=new starShip(i);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Andorian][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="I.G.";
				james.class.name="Andorian";
				james.civID=civIDs.Andorian;
				james.christen();
				james.sprite=Sprite("ship15");
				james.maxSpeed=7;
				james.speed=3;
				james.cruisingSpeed=5;
				james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Andorian];
				
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				civs[i].ships.push(james);
			}else if(i==civIDs.Tellarite)
			{
				var james=new starShip(i);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Tellarite][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="Tellarite";
				james.class.name="Tellarite";
				james.civID=civIDs.Tellarite;
				james.christen();
				james.sprite=Sprite("ship16");
				james.maxSpeed=7;
				james.speed=3;
				james.cruisingSpeed=5;
				james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Tellarite];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==civIDs.Breen)
			{
				var james=new starShip(i);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Breen][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="B.C.W";
				james.class.name="Breen Warship";
				james.civID=civIDs.Breen;
				james.christen();
				james.sprite=Sprite("ship14");
				james.maxSpeed=7;
				james.speed=3;
				james.cruisingSpeed=5;
				james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Breen];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==civIDs.Telaxian)
			{
				var james=new starShip(i);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Telaxian][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="Telaxian";
				james.class.name="Telaxian";
				james.civID=civIDs.Telaxian;
				james.christen();
				james.sprite=Sprite("ship12");
				james.maxSpeed=7;
				james.speed=3;
				james.cruisingSpeed=5;
				james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Telaxian];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==civIDs.Vidiian)
			{
				var james=new starShip(i);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Vidiian][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="Vidiian";
				james.class.name="Vidiian Cruiser";
				james.civID=civIDs.Vidiian;
				james.christen();
				james.sprite=Sprite("ship13");
				james.maxSpeed=7;
				james.speed=3;
				james.cruisingSpeed=5;
				james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Vidiian];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==civIDs.Pakled)
			{
				var james=new starShip(i);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Pakled][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="Pakled";
				james.class.name="Pakled Cruiser";
				james.civID=civIDs.Pakled;
				james.christen();
				james.sprite=Sprite("ship17");
				james.maxSpeed=7;
				james.speed=3;
				james.cruisingSpeed=5;
				james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Pakled];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.civ=civs[i];
				james.crewVessel();
				
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==civIDs.Hirogen)
			{
				var james=new starShip(i);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Hirogen][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				james.prefix="Hunter";
				james.class.name="Hunter";
				james.civID=civIDs.Hirogen;
				james.christen();
				james.sprite=Sprite("ship10");
				james.maxSpeed=7;
				james.speed=3;
				james.cruisingSpeed=5;
				james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Hirogen];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==civIDs.Bajoran)
			{
				var james=new starShip(i);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Bajoran][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				james.prefix="Bajoran";
				james.class.name="Bajoran Cruiser";
				james.civID=civIDs.Bajoran;
				james.christen();
				james.sprite=Sprite("ship11");
				james.maxSpeed=7;
				james.speed=3;
				james.cruisingSpeed=5;
				james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Bajoran];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==civIDs.Ferengi)
			{
				var james=new starShip(i);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Ferengi][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				james.prefix="FAS";
				james.class.name="Merchant";
				james.civID=civIDs.Ferengi;
				james.christen();
				james.sprite=Sprite("ship7");
				james.maxSpeed=7;
				james.speed=3;
				james.cruisingSpeed=5;
				james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Ferengi];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==civIDs.Orion)
			{
				var james=new starShip(i);
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Orion][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				james.prefix="Pirate";
				james.class.name="Cruiser";
				james.civID=civIDs.Orion;
				james.christen();
				james.sprite=Sprite("ship18");
				james.maxSpeed=7;
				james.speed=3;
				james.cruisingSpeed=5;
				james.desiredSpeed=james.cruisingSpeed;
				james.civ=civs[civIDs.Orion];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==civIDs.Borg)
			{
				var james=new starShip(i);
				james.civ=civs[i];
				james.civ=civs[i];
				james.class=shipClasses[civIDs.Borg][0];
				james.classify();
				james.homeworld=civs[i].homeworld;
				james.x=Math.random()*universeWidth;
				james.y=universeHeight;//todo
				james.desiredHeading=Math.floor(Math.random()*359);
				james.prefix="Borg ";
				james.civID=9;
				james.civ=civs[civIDs.Borg];
				james.christen();
				james.hp=1500;
				james.maxHp=1500;
				james.activeShields=true;
				james.hasShields=true;
				james.maxShields=100;
				james.shields=100;
				james.oxygen=10000;
				james.class.name="Cube";
				james.sprite=Sprite("ship3");
				james.maxSpeed=10;
				james.cruisingSpeed=5;
				james.desiredSpeed=james.cruisingSpeed;
				//james.adjustHeading(270);
				james.speed=5;
				james.autoFireRate=20;
				james.addPhaser();
				james.planetTarget=Earth;//civs[borgTrack].homeworld;
				james.orderOrbit(james.planetTarget);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				civs[i].ships.push(james);
				Cube=james;
			}
		}
	}
	
	
	civs[0].ships[0].width=16;
	civs[0].ships[0].height=16;
	civs[0].ships[0].numTorpedos=0;
	civs[0].ships[0].shieldSprite=Sprite("shields");
	civs[0].ships[0].class="Shuttlecraft";
	civs[0].ships[0].shields=0;
	civs[0].ships[0].sprite=Sprite("ship1");
	civs[0].ships[0].maxSpeed=7;
	civs[0].ships[0].maxShields=0;

	ships=new Array();
	for(var i=0;i<civs.length;i++)
	{
		//ships.concat(civs[i].ships);
		for(var j=0;j<civs[i].ships.length;j++)
		{
			
			ships.push(civs[i].ships[j]);
		}
	}
	selectedShip=ships[0];
	var kirk=new dude();
	var picard=new dude();
	var sisko=new dude();
	var janeway=new dude();
	kirk.name="Kirk";
	picard.name="Picard";
	sisko.name="Sisko";
	janeway.name="Janeway";
	
	kirk.civ=civs[0];
	picard.civ=civs[0];
	sisko.civ=civs[0];
	janeway.civ=civs[0];
	
	kirk.title="Commander";
	picard.title="Commander";
	sisko.title="Commander";
	janeway.title="Comander";
	
	kirk.rank=4;
	picard.rank=4;
	sisko.rank=4;
	janeway.rank=4;
	civs[0].crewPool.push(kirk);
	civs[0].captainQueue.push(kirk);
	civs[0].crewPool.push(picard);
	civs[0].captainQueue.push(picard);
	civs[0].crewPool.push(sisko);
	civs[0].captainQueue.push(sisko);	
	//civs[0].crewPool.push(janeway);
	//civs[0].captainQueue.push(janeway);
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