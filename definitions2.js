
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
var numNebulas=80;
var Earth=null;
var selectedShip=null;
var Cube=null;
//var things=new Array();
var numCivilizations=18;
var civs=new Array();
for(var i=0;i<numCivilizations;i++)
{
	civs[i]=new civilization();
	civs[i].race=i;
	civs[i].name=races[i];
	
}

for(var j=0;j<civs.length;j++)
{
	if(j!=raceIDs.Borg)
	{
		civs[raceIDs.Borg].autoHostile.push(civs[j]);
	}
	if(j!=raceIDs.Breen)
	{
		civs[raceIDs.Breen].autoHostile.push(civs[j]);
	}
	if(j!=raceIDs.Hirogen)
	{
		civs[raceIDs.Hirogen].autoHostile.push(civs[j]);
	}
	if(j!=raceIDs.Dominion)
	{
		civs[raceIDs.Dominion].autoHostile.push(civs[j]);
	}
	//civs[j].autoHostile.push(civs[raceIDs.Borg]);
	
}
civs[0].autoHostile.push(civs[raceIDs.Borg]);
civs[raceIDs.Klingon].autoHostile.push(civs[raceIDs.Romulan]);
civs[raceIDs.Romulan].autoHostile.push(civs[raceIDs.Klingon]);
civs[raceIDs.Cardassian].autoHostile.push(civs[raceIDs.Bajoran]);
civs[raceIDs.Borg].numShipsStart=1;
civs[raceIDs.Human].numShipsStart=2;
civs[raceIDs.Klingon].numShipsStart=6;
civs[raceIDs.Klingon].targetPods=true;
civs[raceIDs.Romulan].numShipsStart=1;
civs[raceIDs.Ferengi].numShipsStart=4;
civs[raceIDs.Vulcan].numShipsStart=4;
civs[raceIDs.Cardassian].numShipsStart=6;
civs[raceIDs.Dominion].numShipsStart=30;
civs[raceIDs.Hirogen].numShipsStart=5;

civs[raceIDs.Vidiian].numShipsStart=5;
civs[raceIDs.Andorian].numShipsStart=6;
civs[raceIDs.Telaxian].numShipsStart=1;
civs[raceIDs.Tellarite].numShipsStart=4;
civs[raceIDs.Bajoran].numShipsStart=2;
civs[raceIDs.Breen].numShipsStart=20;
civs[raceIDs.Pakled].numShipsStart=2;
civs[raceIDs.Orion].numShipsStart=4;
civs[raceIDs.Klingon].mode=AIModes.Agressive;

civs[0].AI=false;
civs[0].player=true;
civs[raceIDs.Borg].AI=false; //for now.
civs[raceIDs.Romulan].mode=AIModes.Defense;
civs[raceIDs.Dominion].mode=AIModes.Defense;

var ships=new Array();
var stations=new Array(); //todo add to civilization

var curShip=0;
var planetTypes = ["Class M","Class L","Class N","Class F","Class J","Class T","Demon Class"];

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


function screenBox(obj)
{
	this.object=obj;
	this.x=0;
	this.y=0;
	this.scale=1;
	this.height=150
	this.width=100;
	this.backColor="blue";
	this.borderSize=4;
	this.draw=function(can,cam)
	{
		can.save();
		can.font = "12pt Calibri";
		can.fillStyle="white";
		can.fillRect(this.x,this.y,this.width+this.borderSize,this.height+this.borderSize);
		can.fillStyle=this.backColor;
		can.globalAlpha=.80;
		can.fillRect(this.x+this.borderSize,this.y+this.borderSize,this.width-this.borderSize,this.height-this.borderSize);
		can.fillStyle="white";
		if(this.object.ship)
		{
			can.fillText(this.object.prefix+" "+this.object.name,this.x+10,this.y+2+16);
			can.fillText(this.object.civ.name+ " Lanch Date: " +this.object.launchDate,this.x+10,this.y+2+32);
			can.fillText("HP: "+this.object.hp+"/"+this.object.maxHp,this.x+10,this.y+2+48);
			can.fillText("Shields: "+this.object.shields+"/"+this.object.maxShields,this.x+10,this.y+2+64);
			
			can.fillText("Phasers:"+this.object.phaserBanks.length+" Torpedos: "+this.object.numTorpedos+" Mines: "+this.object.numMines,this.x+10,this.y+2+80);
			if(this.object.torpedoTarget)
			{
				can.fillText("Targeting: "+this.object.torpedoTarget.name,this.x+10,this.y+2+96);
			}else
			{
				can.fillText("No Weapons Lock",this.x+10,this.y+2+96);
			}
			can.fillText("Crew: ",this.x+10,this.y+2+112);
			for(var i=0;i<this.object.crew.length;i++)
			{
				can.fillText(this.object.crew[i].title+" "+this.object.crew[i].name+"Lvl: "+this.object.crew[i].level,this.x+10,this.y+2+128+i*16);
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
	if(iv.race==raceIDs.Human)
		{
			var james=new starShip();
			james.homeworld=Earth;
			var bah=Math.floor(Math.random()*7);
			james.x=startworld.x
			james.y=startworld.y;
			james.orbit(startworld);
			james.prefix="U.S.S.";
			james.christen();
			//console.log(james.prefix+" "+james.name+" is now orbiting " +stars[0].planets[bah].name);
			james.class="Galaxy Class";
			james.race=0;
			james.civ=iv;
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
		}else if(iv.race==raceIDs.Vulcan)
		{
			var james=new starShip();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.prefix="Vulcan";
			james.class="Capitol Ship";
			james.race=1;
			james.christen();
			james.sprite=Sprite("ship5");
			james.maxSpeed=7;
			james.speed=3;
			james.desiredSpeed=4;
			james.civ=iv;
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.race==raceIDs.Klingon)
		{
			var james=new starShip();
				james.x=startworld.x
				james.y=startworld.y;
				james.homeworld=iv.homeworld;
				james.orbit(startworld);
				james.class="Bird of Prey";
				james.prefix="I.K.S";
				james.sprite=Sprite("ship4");
				james.civ=iv;
				james.race=5;
				james.christen();
				james.maxSpeed=7;
				james.addPhaser();
				//james.homing=false;
				james.speed=6;
				james.desiredSpeed=6;
				james.crewVessel(capt);
				james.alive=true;
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				return james;
		}else if(iv.race==raceIDs.Dominion)
		{
			var james=new starShip();
				james.x=startworld.x
				james.y=startworld.y;
				james.homeworld=iv.homeworld;
				james.orbit(startworld);
				james.class="Dominion Battle Cruiser";
				james.prefix="Dominion";
				james.sprite=Sprite("ship9");
				james.civ=iv;
				james.race=raceIDs.Dominion;
				james.christen();
				james.maxSpeed=7;
				james.addPhaser();
				//james.homing=false;
				james.speed=6;
				james.desiredSpeed=6;
				james.crewVessel(capt);
				james.alive=true;
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				return james;
		}else if(iv.race==raceIDs.Cardassian)
		{
			var james=new starShip();
			
			james.x=startworld.x
			james.y=startworld.y;
			james.homeworld=iv.homeworld;
			james.orbit(startworld);
			james.class="Galor-Class";
			james.prefix="C.U.";
			james.sprite=Sprite("ship8");
			james.civ=iv;
			james.race=raceIDs.Cardassian;
			james.christen();
			james.maxSpeed=7;
			james.addPhaser();
			//james.homing=false;
			james.speed=6;
			james.desiredSpeed=6;
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
			
		}else if(iv.race==raceIDs.Romulan)
		{
			var james=new starShip();
			james.x=startworld.x
			james.y=startworld.y;
			james.homeworld=iv.homeworld;
			james.prefix="IRW";
			james.class="Warbird";
			james.race=4;
			james.christen();
			james.sprite=Sprite("ship6");
			james.maxSpeed=7;
			james.speed=3;
			james.desiredSpeed=5;
			james.civ=iv;
			
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.race==raceIDs.Hirogen)
		{
			var james=new starShip();
			james.x=startworld.x
			james.y=startworld.y;
			james.homeworld=iv.homeworld;
			james.prefix="Hunter";
			james.class="Hunter";
			james.race=raceIDs.Hirogen;
			james.christen();
			james.sprite=Sprite("ship10");
			james.maxSpeed=7;
			james.speed=3;
			james.desiredSpeed=5;
			james.civ=iv;
			
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.race==raceIDs.Andorian)
		{
			var james=new starShip();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			
			james.prefix="I.G.";
			james.class="Andorian";
			james.race=raceIDs.Andorian;
			james.christen();
			james.sprite=Sprite("ship15");
			james.maxSpeed=7;
			james.speed=3;
			james.desiredSpeed=5;
			james.civ=civs[raceIDs.Andorian];
			
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.race==raceIDs.Tellarite)
		{
			var james=new starShip();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			
			james.prefix="";
			james.class="Tellarite";
			james.race=raceIDs.Tellarite;
			james.christen();
			james.sprite=Sprite("ship16");
			james.maxSpeed=7;
			james.speed=3;
			james.desiredSpeed=5;
			james.civ=civs[raceIDs.Tellarite];
			
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.race==raceIDs.Breen)
		{
			var james=new starShip();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			
			james.prefix="B.C.W";
			james.class="Breen Warship";
			james.race=raceIDs.Breen;
			james.christen();
			james.sprite=Sprite("ship14");
			james.maxSpeed=7;
			james.speed=3;
			james.desiredSpeed=5;
			james.civ=civs[raceIDs.Breen];
			
			james.crewVessel(capt);
			james.civ=iv;
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.race==raceIDs.Telaxian)
		{
			var james=new starShip();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			
			james.prefix="Telaxian";
			james.class="Telaxian";
			james.race=raceIDs.Telaxian;
			james.christen();
			james.sprite=Sprite("ship12");
			james.maxSpeed=7;
			james.speed=3;
			james.desiredSpeed=5;
			james.civ=iv;
			
			james.crewVessel(capt);
			james.civ=iv
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.race==raceIDs.Vidiian)
		{
			var james=new starShip();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			
			james.prefix="Vidiian";
			james.class="Vidiian Cruiser";
			james.race=raceIDs.Vidiian;
			james.christen();
			james.sprite=Sprite("ship13");
			james.maxSpeed=7;
			james.speed=3;
			james.desiredSpeed=5;
			james.civ=civs[raceIDs.Vidiian];
			
			james.crewVessel(capt);
			james.civ=iv;
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.race==raceIDs.Pakled)
		{
			var james=new starShip();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			
			james.prefix="";
			james.class="Pakled Cruiser";
			james.race=raceIDs.Pakled;
			james.christen();
			james.sprite=Sprite("ship17");
			james.maxSpeed=7;
			james.speed=3;
			james.desiredSpeed=5;
			james.civ=iv;
			james.crewVessel(capt);
			
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.race==raceIDs.Bajoran)
		{
			var james=new starShip();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			james.prefix="";
			james.class="Bajoran Cruiser";
			james.race=raceIDs.Bajoran;
			james.christen();
			james.sprite=Sprite("ship11");
			james.maxSpeed=7;
			james.speed=3;
			james.desiredSpeed=5;
			james.civ=civs[raceIDs.Bajoran];
			
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.race==raceIDs.Ferengi)
		{
			var james=new starShip();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			james.prefix="FAS";
			james.class="Merchant";
			james.race=raceIDs.Ferengi;
			james.christen();
			james.sprite=Sprite("ship7");
			james.maxSpeed=7;
			james.speed=3;
			james.desiredSpeed=5;
			james.civ=civs[raceIDs.Ferengi];
						
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.race==raceIDs.Orion)
		{
			var james=new starShip();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.desiredHeading=Math.floor(Math.random()*359);
			james.prefix="Pirate";
			james.class="Cruiser";
			james.race=raceIDs.Orion;
			james.christen();
			james.sprite=Sprite("ship18");
			james.maxSpeed=7;
			james.speed=3;
			james.desiredSpeed=5;
			james.civ=civs[raceIDs.Orion];
						
			james.crewVessel(capt);
			james.alive=true;
			james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
			return james;
		}else if(iv.race==raceIDs.Borg)
		{
			var james=new starShip();
			james.homeworld=iv.homeworld;
			james.x=startworld.x
			james.y=startworld.y;
			james.prefix="Cube";
			james.race=9;
			james.civ=iv;
			james.christen();
			james.hp=1500;
			james.maxHp=1500;
			james.shields=100;
			
			james.oxygen=10000;
			james.class="Cube";
			james.sprite=Sprite("ship3");
			james.maxSpeed=10;
			james.desiredSpeed=5;
			//james.adjustHeading(270);
			james.speed=5;
			james.autoFireRate=20;
			james.addPhaser();
			
			james.planetTarget=Earth;
			james.orderOrbit(james.planetTarget);
			james.crewVessel(capt);
			james.civ=iv;
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

var starNames=new Array(90);
starNames= ["Eridani","Cygnus","Ceti-Alpha","Omicron Ceti","Monac","Bringold","Alnitak", "Deneb", "Acamar","Rigel","Polaris","Praxillus","Proxima Centauri", "Omicron Persei","Canopus", "Romii", "Sirius","Tahal", "Mintaka", "Vega", "Wolf", "Tau-Ceti","Eminiar","Canaris","Hydra", "Questar", "Arneb", "Amargosa", "Altiar","Draconis","Theloni","Gezid","Indi","Canaris","Sigma", "Cassius","Melona","Minara","Cat's Anus","Detroit","Chicago","Miami","Albany","Providence","Augusta","Washington","Lexington","Moscow","Yemen","Tokyo","St. Petersburg","Berlin","New York","Patterson","Springfield","Great Neck","Manhaset","Port Washington","Honalulu","Vermont","New Hampshire","Kentucky","North Carolina","South Carolina","Florida","Texas","Huston","Oregon","Idaho","Kansas","Georgia","Arkansas","Louisiana","Ukraine","England","France","Goat land","Canada","Perth","India","Indiana","Oklahoma","Arizona","Nevada","Californa"];
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
	sun.planets[2].evented=true;
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
		//monsta.startTextured(1000000,stars[i].x-48,stars[i].y-48,0,0,0,false,false,"sun"+stars[i].type);
	}
	for(var i=0;i<civs.length;i++)
	{
		if(i>0)
		{
			civs[i].star=Math.floor(Math.random()*(numSystems-1))+1;
	
			if(i==raceIDs.Vulcan) 
			{
				stars[civs[i].star].x=56000;
				stars[civs[i].star].y=65000;
			}
			if(i==raceIDs.Klingon) 
			{
				stars[civs[i].star].x=283900;
				stars[civs[i].star].y=41900;
			}
			if(i==raceIDs.Romulan) 
			{
				stars[civs[i].star].x=356300;
				stars[civs[i].star].y=137400;
			}
			if(i==raceIDs.Ferengi) 
			{
				stars[civs[i].star].x=246000;
				stars[civs[i].star].y=157200;
			}
			if(i==raceIDs.Cardassian) 
			{
				stars[civs[i].star].x=230400;
				stars[civs[i].star].y=169500;
			}
			if(i==raceIDs.Bajoran) 
			{
				stars[civs[i].star].x=240400;
				stars[civs[i].star].y=159500;
			}
			if(i==raceIDs.Borg) 
			{
				stars[civs[i].star].x=83100;
				stars[civs[i].star].y=576900;
			}if(i==raceIDs.Breen) 
			{
				stars[civs[i].star].x=515200;
				stars[civs[i].star].y=137400;
			}if(i==raceIDs.Dominion) 
			{
				stars[civs[i].star].x=468300;
				stars[civs[i].star].y=530800;
			}
			if(i==raceIDs.Hirogen) 
			{
				stars[civs[i].star].x=52600;
				stars[civs[i].star].y=544000;
			}if(i==raceIDs.Andorian) 
			{
				stars[civs[i].star].x=39500;
				stars[civs[i].star].y=120900;
			}if(i==raceIDs.Tellarite) 
			{
				stars[civs[i].star].x=51800;
				stars[civs[i].star].y=30400;
			}if(i==raceIDs.Telaxian) 
			{
				stars[civs[i].star].x=190900;
				stars[civs[i].star].y=508600;
			}
			if(i==raceIDs.Vidiian) 
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
	var jilly=new starShip();
	jilly.homeworld=iv.homeworld;
	jilly.x=jilly.homeworld.x;
	jilly.y=jilly.homeworld.y;
	jilly.orbit(wrld);
	jilly.numTorpedos=200;
	jilly.platform=true;
	jilly.ship=false;
	jilly.addPhaser();
	jilly.addPhaser();
	jilly.race=iv.race;
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
			stars[blah].planets[gah].race=i;
			stars[blah].planets[gah].civ=civs[i];
			stars[blah].planets[gah].colonized=true;
			civs[i].worlds.push(stars[blah].planets[gah]);
			stars[blah].planets[gah].colonized=true;
			
			if(i==raceIDs.Vulcan) 
			{
				stars[blah].planets[gah].name="Vulcan"; 
				stars[blah].planets[gah].civ=civs[raceIDs.Vulcan];
				stars[blah].x=56000;
				stars[blah].y=65000;
			}
			if(i==raceIDs.Klingon) 
			{
				stars[blah].planets[gah].name="Qo'nos"; 
				stars[blah].planets[gah].civ=civs[raceIDs.Klingon];
				stars[blah].x=283900;
				stars[blah].y=41900;
			}
			if(i==raceIDs.Romulan) 
			{
				stars[blah].planets[gah].name="Romulus"; 
				stars[blah].planets[gah].civ=civs[raceIDs.Romulan];
				stars[blah].x=356300;
				stars[blah].y=137400;
			}
			if(i==raceIDs.Ferengi) 
			{
				stars[blah].planets[gah].name="Ferenginar"; 
				stars[blah].planets[gah].civ=civs[raceIDs.Ferengi];
				stars[blah].x=246000;
				stars[blah].y=157200;
			}
			if(i==raceIDs.Cardassian) 
			{
				stars[blah].planets[gah].name="Cardassia"; 
				stars[blah].planets[gah].civ=civs[raceIDs.Cardassian];
				stars[blah].x=230400;
				stars[blah].y=169500;
			}
			if(i==raceIDs.Bajoran) 
			{
				stars[blah].planets[gah].name="Bajor"; 
				stars[blah].planets[gah].civ=civs[raceIDs.Bajoran];
				stars[blah].x=240400;
				stars[blah].y=159500;
			}
			if(i==raceIDs.Borg) 
			{
				stars[blah].planets[gah].name="Borg Homeworld"; 
				stars[blah].planets[gah].civ=civs[raceIDs.Borg];
				stars[blah].x=83100;
				stars[blah].y=576900;
			}if(i==raceIDs.Breen) 
			{
				stars[blah].planets[gah].name="Breen"; 
				stars[blah].planets[gah].civ=civs[raceIDs.Breen];
				stars[blah].x=515200;
				stars[blah].y=137400;
			}if(i==raceIDs.Dominion) 
			{
				stars[blah].planets[gah].name="Founder Planet"; 
				stars[blah].planets[gah].civ=civs[raceIDs.Dominion];
				stars[blah].x=468300;
				stars[blah].y=530800;
			}
			if(i==raceIDs.Hirogen) 
			{
				stars[blah].planets[gah].name="Hiros"; 
				stars[blah].planets[gah].civ=civs[raceIDs.Hirogen];
				stars[blah].x=52600;
				stars[blah].y=544000;
			}if(i==raceIDs.Andorian) 
			{
				stars[blah].planets[gah].name="Andor"; 
				stars[blah].planets[gah].civ=civs[raceIDs.Andorian];
				stars[blah].x=39500;
				stars[blah].y=120900;
			}if(i==raceIDs.Tellarite) 
			{
				stars[blah].planets[gah].name="Tellar"; 
				stars[blah].planets[gah].civ=civs[raceIDs.Tellarite];
				stars[blah].x=51800;
				stars[blah].y=30400;
			}if(i==raceIDs.Telaxian) 
			{
				stars[blah].planets[gah].name="Tellax"; 
				stars[blah].planets[gah].civ=civs[raceIDs.Telaxian];
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
			if(i==raceIDs.Human)
			{
				var james=new starShip();
				james.homeworld=Earth;
				var bah=Math.floor(Math.random()*7);
				james.orbit(stars[0].planets[bah]);
				james.prefix="U.S.S.";
				james.christen();
				console.log(james.prefix+" "+james.name+" is now orbiting " +stars[0].planets[bah].name);
				james.class="Galaxy Class";
				james.race=0;
				james.civ=civs[0];
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
				james.crewVessel();
				james.civ=civs[i];
				civs[i].ships.push(james);
			}else if(i==raceIDs.Vulcan)
			{
				var james=new starShip();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.sun.x;
				james.y=james.homeworld.sun.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				james.prefix="Vulcan";
				james.class="Capitol Ship";
				james.race=1;
				james.christen();
				james.sprite=Sprite("ship5");
				james.maxSpeed=7;
				james.speed=3;
				james.desiredSpeed=4;
				james.civ=civs[raceIDs.Vulcan];
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				civs[i].ships.push(james);
			}else if(i==raceIDs.Klingon)
			{
				var james=new starShip();
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
					james.race=5;
					james.civ=civs[raceIDs.Klingon];
					james.homeworld=civs[i].homeworld;
					james.class="Bird of Prey";
					james.prefix="I.K.S";
					james.christen();
					//james.homeworld=civs[i].homeworld;
					//console.log(james.prefix+ " "+james.name+" is now orbiting " +stars[blah].planets[gah].name);
					james.sprite=Sprite("ship4");
					james.addPhaser();
					//james.homing=false;
					james.maxSpeed=7;
					james.desiredSpeed=6;
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
				
					james.class="Bird of Prey";
					james.prefix="I.K.S";
					james.sprite=Sprite("ship4");
					james.civ=civs[raceIDs.Klingon];
					james.race=5;
					james.christen();
					james.maxSpeed=7;
					james.addPhaser();
					//james.homing=false;
					james.speed=6;
					james.desiredSpeed=6;
					james.crewVessel();
					james.alive=true;
					james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
					civs[i].ships.push(james);
				}
			}else if(i==raceIDs.Dominion)
			{
				var james=new starShip();
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
					james.race=raceIDs.Dominion;
					james.civ=civs[raceIDs.Dominion];
				
					james.class="Dominion Battle Cruiser";
					james.prefix="Dominion";
					james.christen();
					//james.homeworld=civs[i].homeworld;
					//console.log(james.prefix+ " "+james.name+" is now orbiting " +stars[blah].planets[gah].name);
					james.sprite=Sprite("ship9");
					james.addPhaser();
					//james.homing=false;
					james.maxSpeed=7;
					james.desiredSpeed=6;
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
					
					james.class="Dominion Battle Cruiser";
					james.prefix="Dominion";
					james.sprite=Sprite("ship9");
					james.civ=civs[raceIDs.Dominion];
					james.race=raceIDs.Dominion;
					james.christen();
					james.maxSpeed=7;
					james.addPhaser();
					//james.homing=false;
					james.speed=6;
					james.desiredSpeed=6;
					james.crewVessel();
					james.alive=true;
					james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
					civs[i].ships.push(james);
				}
			}else if(i==raceIDs.Cardassian)
			{
				var james=new starShip();
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
					james.race=raceIDs.Cardassian;
					james.civ=civs[i];
					james.class="Galor-Class";
					james.prefix="C.U.";
					james.christen();
					//james.homeworld=iv.homeworld;
					//console.log(james.prefix+ " "+james.name+" is now orbiting " +stars[blah].planets[gah].name);
					james.sprite=Sprite("ship8");
					james.addPhaser();
					//james.homing=false;
					james.maxSpeed=7;
					james.desiredSpeed=6;
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
				
					james.class="Galor-Class";
					james.prefix="C.U.";
					james.sprite=Sprite("ship8");
					james.civ=civs[i];
					james.race=raceIDs.Cardassian;
					james.christen();
					james.maxSpeed=7;
					james.addPhaser();
					//james.homing=false;
					james.speed=6;
					james.desiredSpeed=6;
					james.crewVessel();
					james.alive=true;
					james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
					civs[i].ships.push(james);
				}
		}else if(i==raceIDs.Romulan)
			{
				var james=new starShip();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="IRW";
				james.class="Warbird";
				james.race=4;
				james.christen();
				james.sprite=Sprite("ship6");
				james.maxSpeed=7;
				james.speed=3;
				james.desiredSpeed=5;
				james.civ=civs[raceIDs.Romulan];
				
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				civs[i].ships.push(james);
			}else if(i==raceIDs.Andorian)
			{
				var james=new starShip();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="I.G.";
				james.class="Andorian";
				james.race=raceIDs.Andorian;
				james.christen();
				james.sprite=Sprite("ship15");
				james.maxSpeed=7;
				james.speed=3;
				james.desiredSpeed=5;
				james.civ=civs[raceIDs.Andorian];
				
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				civs[i].ships.push(james);
			}else if(i==raceIDs.Tellarite)
			{
				var james=new starShip();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="Tellarite";
				james.class="Tellarite";
				james.race=raceIDs.Tellarite;
				james.christen();
				james.sprite=Sprite("ship16");
				james.maxSpeed=7;
				james.speed=3;
				james.desiredSpeed=5;
				james.civ=civs[raceIDs.Tellarite];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==raceIDs.Breen)
			{
				var james=new starShip();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="B.C.W";
				james.class="Breen Warship";
				james.race=raceIDs.Breen;
				james.christen();
				james.sprite=Sprite("ship14");
				james.maxSpeed=7;
				james.speed=3;
				james.desiredSpeed=5;
				james.civ=civs[raceIDs.Breen];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==raceIDs.Telaxian)
			{
				var james=new starShip();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="Telaxian";
				james.class="Telaxian";
				james.race=raceIDs.Telaxian;
				james.christen();
				james.sprite=Sprite("ship12");
				james.maxSpeed=7;
				james.speed=3;
				james.desiredSpeed=5;
				james.civ=civs[raceIDs.Telaxian];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==raceIDs.Vidiian)
			{
				var james=new starShip();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="Vidiian";
				james.class="Vidiian Cruiser";
				james.race=raceIDs.Vidiian;
				james.christen();
				james.sprite=Sprite("ship13");
				james.maxSpeed=7;
				james.speed=3;
				james.desiredSpeed=5;
				james.civ=civs[raceIDs.Vidiian];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==raceIDs.Pakled)
			{
				var james=new starShip();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				
				james.prefix="Pakled";
				james.class="Pakled Cruiser";
				james.race=raceIDs.Pakled;
				james.christen();
				james.sprite=Sprite("ship17");
				james.maxSpeed=7;
				james.speed=3;
				james.desiredSpeed=5;
				james.civ=civs[raceIDs.Pakled];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.civ=civs[i];
				james.crewVessel();
				
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==raceIDs.Hirogen)
			{
				var james=new starShip();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				james.prefix="Hunter";
				james.class="Hunter";
				james.race=raceIDs.Hirogen;
				james.christen();
				james.sprite=Sprite("ship10");
				james.maxSpeed=7;
				james.speed=3;
				james.desiredSpeed=5;
				james.civ=civs[raceIDs.Hirogen];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==raceIDs.Bajoran)
			{
				var james=new starShip();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				james.prefix="Bajoran";
				james.class="Bajoran Cruiser";
				james.race=raceIDs.Bajoran;
				james.christen();
				james.sprite=Sprite("ship11");
				james.maxSpeed=7;
				james.speed=3;
				james.desiredSpeed=5;
				james.civ=civs[raceIDs.Bajoran];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==raceIDs.Ferengi)
			{
				var james=new starShip();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				james.prefix="FAS";
				james.class="Merchant";
				james.race=raceIDs.Ferengi;
				james.christen();
				james.sprite=Sprite("ship7");
				james.maxSpeed=7;
				james.speed=3;
				james.desiredSpeed=5;
				james.civ=civs[raceIDs.Ferengi];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==raceIDs.Orion)
			{
				var james=new starShip();
				james.homeworld=civs[i].homeworld;
				james.x=james.homeworld.x;
				james.y=james.homeworld.y;
				james.desiredHeading=Math.floor(Math.random()*359);
				james.prefix="Pirate";
				james.class="Cruiser";
				james.race=raceIDs.Orion;
				james.christen();
				james.sprite=Sprite("ship18");
				james.maxSpeed=7;
				james.speed=3;
				james.desiredSpeed=5;
				james.civ=civs[raceIDs.Orion];
				james.launchDate=Math.floor(theTime.years)+"."+Math.floor(theTime.days);
				james.crewVessel();
				james.civ=civs[i];
				james.alive=true;
				civs[i].ships.push(james);
			}else if(i==raceIDs.Borg)
			{
				var james=new starShip();
				james.homeworld=civs[i].homeworld;
				james.x=Math.random()*universeWidth;
				james.y=universeHeight;//todo
				james.desiredHeading=Math.floor(Math.random()*359);
				james.prefix="Borg ";
				james.race=9;
				james.civ=civs[raceIDs.Borg];
				james.christen();
				james.hp=1500;
				james.maxHp=1500;
				james.shields=100;
				
				james.oxygen=10000;
				james.class="Cube";
				james.sprite=Sprite("ship3");
				james.maxSpeed=10;
				james.desiredSpeed=5;
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