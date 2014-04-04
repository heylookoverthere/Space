/*var oshipNames=new Array(40);
oshipNames= ["Enterprise","Hood","Voyager","Defiant","Intrepid","Akira","Excalibur","Lexington","Ohio","Rhode Island","Raven","Gandhi","Exter","Horatio","Yamaguchi","Valdemar","Summit","Dakota","Devore","Drake","Hermes","Agamemnon","Apollo","Ajax","Prokofiev","Constellation","Gettysburg","Magellen","Hathaway", "Stargazer", "Constitution", "Yorktown","Potemkin","Pegasus","Farragut","Valiant","Kelvin","Bozeman"];*/

var shipNames=new Array(40);
var shipNamesTrack=new Array(40);
for (var q=0;q<18;q++)
{
	shipNames[q]=["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","Testicles","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89"];
	shipNamesTrack[q]=0;
}
shipNames[0]=["Enterprise","Hood","Voyager","Defiant","Intrepid","Akira","Excalibur","Lexington","Ohio","Rhode Island","Raven","Gandhi","Exter","Horatio","Yamaguchi","Summit","Dakota","Snook","Jucovy","Balls","Potemkin","Goatfucker","Obama","Bastile"];
shipNames[1]=["D'Kyr","D'Vahl","Tal'Kir","Ti'Mur","T'Pau","T'Vran","Ni'Var","Nyran","Seleya","Sh'Raan","Vaankara","Vahklas","Yarahla"];
shipNames[4]=["Belak","D'Ridthau","Decius","Devoras","Dividices","Genorex","Haakona","Khazara","Makar"];
shipNames[5]=["Amar","B'Moth","Bortas","Ch'Tang","Fek'lhr","Gr'oth","Hegh'ta","Hor'Cha","Rotarran","Par'tok","Ya'Vang",];
shipNames[8]=["Aldara","Barkano","Bok'Nor","Groumall","Koranak","Kornaire","Kraxon","Prakesh","Rabol","Ravinok","Reklar","Trager","Vetar"];

var escapes=new Array();
var mines=new Array();
var torpedos=new Array();
var looseCrew=new Array(); //crew stranded on a planet or in the mirror universe

var targetSprite=Sprite("shiptargetedbig");

var tractorTargetSprite=Sprite("tractortargetedbig");

var beamTargetSprite=Sprite("beamtargetedbig");

function shipWindow()
{
	this.alive=true;
	this.x=0;
	this.y=0;
	this.blinkRate=10;
	this.blinkTrack=0;
	this.colorTrack=0;
	this.alpha=1;
	this.colors=yellowColors;
	this.blinkRate=Math.random()*100;
	this.colorTrack=Math.floor(Math.random()*this.colors.length);
	this.size=1
	this.update=function()
	{
		this.blinkTrack+=1*gameSpeed;
		if(this.blinkTrack>this.blinkRate)
		{
			this.blinkTrack=0;
			this.colorTrack++;
			if(this.colorTrack>this.colors.length)
			{
				this.colorTrack=0;
			}
		}
	};
	this.draw=function(can,cam)
	{
		can.save();
		can.fillStyle=this.colors[this.colorTrack];
		can.fillRect(this.x, this.y, this.size, this.size);
		can.restore();
	};
	/*
		this.draw=function(can,cam)
	{
		can.save();
		can.globalAlpha=this.alpha;
		can.fillStyle=this.colors[this.colorTrack];
		can.fillRect((this.x+cam.x)*camera.zoom, (this.y+cam.y)*camera.zoom, this.x+this.size, this.y+this.size);
		can.restore();
	};*/
};

updateEscapes=function()
{
	for(var i=0;i<escapes.length;i++)
	{
		if(!escapes[i].active)
		{
			escapes.splice(i,1);
			i--;
		}else
		{
			escapes[i].update();
		}
	}
};

updateMines=function(thangs){
	for(var i=0;i<mines.length;i++)
	{
		if(!mines[i].active)
		{
			mines.splice(i,1);
			//i--;
		}else
		{
			mines[i].update(thangs);
		}
	}
};

updateTorpedos=function(thangs){
	for(var i=0;i<torpedos.length;i++)
	{
		if(!torpedos[i].active)
		{
			torpedos.splice(i,1);
			i--;
		}else
		{
			torpedos[i].update(thangs);
		}
	}
};

for (var ci=0;ci<20;ci++)
{
	shipNames[9][ci]="Cube #"+Math.floor(Math.random()*9999);
}

var numShipNames=38;
var races=new Array(40);
races= ["Human","Vulcan","Andorian","Tellerite","Romulan","Klingon","Betazed","Vidiian","Cardassian","Borg","Orion","Telaxian","Ferengi","Pakled","Bajoran","Breen","Hirogen","Dominion"];
var raceIDs={};
raceIDs.Human=0;
raceIDs.Vulcan=1;
raceIDs.Andorian=2;
raceIDs.Tellarite=3;
raceIDs.Romulan=4;
raceIDs.Klingon=5;
raceIDs.Betazoid=6;
raceIDs.Vidiian=7;
raceIDs.Cardassian=8;
raceIDs.Borg=9;
raceIDs.Orion=10;
raceIDs.Telaxian=11;
raceIDs.Ferengi=12;
raceIDs.Pakled=13;
raceIDs.Bajoran=14;
raceIDs.Breen=15;
raceIDs.Hirogen=16
raceIDs.Dominion=17;
var numRaces=18;
var shipNamesUsed=new Array();

for(var ipk=0;ipk<numRaces;ipk++){
	shipNamesUsed[ipk]=new Array();
}
var totalItems=9;
Item={};
Item.RedShirt=1;
Item.HandPhaser=0;
Item.PhaserRifle=2;
Item.Tricorder=3;
Item.MedKit=4;
Item.EmergencyTransport=5;
Item.Bomb=6;
Item.PersonalCloak=7; //jem'hdar
Item.PersonalShield=8; //borg

function dude() 
{
	this.gender=0;
	this.name=names[this.gender][Math.floor(Math.random()*40)];
	this.hp=100;
	this.maxHp=100;
	this.alive=true;
	this.level=1;
	this.moveSpeed=1;
	this.hasItem=new Array();
	for(var i=0;i<totalItems;i++)
	{
		this.hasItem.push(false);
	}
	this.hasItem[0]=true;//everyone gets a phaser!
	this.civ=civs[0];
	this.xp=0;
	this.nextLevel=100;
	this.ID=0;
	this.race="human";
	this.rank=0;
	this.title="Crewman";
	this.AIDS=false;
	this.hurt=function(amt,because)
	{
		if(!this.alive){return;}
		this.hp-=amt;
		if(this.hp<1)
		{
			this.kill(because);
			return this;
		}
		return false;
	};
	this.kill=function(cause)
	{
		if(!cause)
		{
			cause=" of unkown causes";
		}
		console.log(this.title+" "+this.name+ " has died"+cause);
		this.alive=false;
	};
	
	this.setTitle=function()
	{
		if (this.rank==0)
		{
			this.title="Crewman";
		}else if (this.rank==1)
		{
			this.title="Ensign";
		}else if (this.rank==2)
		{
			this.title="Lieutenant";
		}else if (this.rank==3)
		{
			this.title="Lt. Commander";
		}else if (this.rank==4)
		{
			this.title="Commander";
		}else if (this.rank==5)
		{
			this.title="Captain";
		}
		
	};
	
	this.grantXp=function(amt)
	{
		this.xp+=amt;
		if(this.xp>this.nextLevel)
		{
			this.xp=0;
			this.level++;
			if(this.civ)
			{
				if(this.civ.name=="Human")
				{
					console.log(this.name+" has gained a level!");
					this.maxHp++;
				}
			}else
			{
				console.log(this,"Doesn't have a civ?");
			}
			if((this.level%5==0) && (this.rank<4))
			{
				this.rank++;
				this.setTitle();
				console.log(this.name+" was promoted to "+this. title);
				if(this.rank==4)
				{
					this.civ.captainQueue.push(this);
				}
			}
		}
	
	};
};

function energyWeapon(hip)
{
	this.x=hip.x;
	this.y=hip.y;
	this.xoff=0;
	this.target=null;
	this.strength=1;
	this.target=null;
	this.pierce=0;
	this.damageRate=1;
	this.ship=hip;
	this.range=hip.phaserRange;
	this.charge=1;
	this.firing=false;
	this.type=0;
	this.colorTrack=0;
	this.damageTrack=0;

	this.update=function(hip){
		this.x=hip.x+this.xoff;
		this.y=hip.y;
		if(hip.torpedoTarget)
		{
			this.target=hip.torpedoTarget;
		}
		if((!this.target) || (!this.target.alive)||(this.target.surrendered)||(this.surrendered))
		{
			this.firing=false;
			return;
		}
		if((Math.abs(this.x-this.target.x)>this.range) || (Math.abs(this.y-this.target.y)>this.range))//todo dist formula
		{
			this.firing=false;
			return;
		}
		this.colorTrack+=1*gameSpeed*2;
		if(this.colorTrack>10)
		{
			this.colorTrack=0;
		}
		
		this.damageTrack+=this.damageRate*gameSpeed;
		if(this.damageTrack>10)
		{
			this.damageTrack=0;
			this.target.getDamaged(this.strength,true,this.ship);
		}
		
		//console.log(this.firing);
	};
	
	this.fire=function(hip){
		this.target=hip.torpedoTarget;
		if(!this.target) 
		{
			return;
		}
		this.firing=true;
		
	};
	
	this.draw=function(can,cam){
		if(!this.firing){
			return;
		}
		//todo, hit things
		can.save();
		for(var i=0;i<12;i++) //todo draw better.
		{
		
			can.strokeStyle = bColors[Math.floor(this.colorTrack)];
			can.beginPath();
			can.lineWidth = 4*cam.zoom;
			can.globalAlpha=.40;
			can.moveTo((this.x+cam.x)*cam.zoom,(this.y+cam.y)*cam.zoom);
			can.lineTo((this.target.x+cam.x)*cam.zoom,(this.target.y+cam.y)*cam.zoom)
		
		}
		can.closePath();
		can.stroke();
		can.restore();
	};
};

function torpedo(){
	this.x=0;
	this.y=0;
	this.xv=0;
	this.yv=0;
	this.range=40;
	this.delayTick=5;
	this.yield=15;
	this.width=8;
	this.speed=25;
	this.targ=null;
	this.homing=true;
	this.ship=null;
	this.age=0;
	this.height=8;
	this.active=false;
	this.sprite=Sprite("torpedo");
	this.armedsprite=Sprite("torpedoarmed");
	//this.homing=false;//todo!
	this.draw=function(can,cam){
		if(this.active)
		{
			can.save();
			can.translate((this.x+cam.x)*cam.zoom,(this.y+cam.y)*cam.zoom);
			can.rotate((this.heading-90)* (Math.PI / 180));//todo negatives.
			if(this.cloaked)
			{
				canvas.globalAlpha=0.30;
			}
			can.scale(cam.zoom,cam.zoom);
			if(this.delayTick<1)
			{
				this.armedsprite.draw(can, -this.width/2,-this.height/2);
			}else
			{
				this.sprite.draw(can, -this.width/2,-this.height/2);
			}
			can.restore();
		}
	};
	
	this.update=function(thangs){
		if((this.homing) && (this.targ))
		{
			var beta=Math.atan2(this.targ.y-this.y,this.targ.x-this.x)* (180 / Math.PI);
		
			if (beta < 0.0)
				beta += 360.0;
			else if (beta > 360.0)
				beta -= 360;
			this.heading=beta;
			if(!this.targ.alive)
			{
				this.targ=null;
			}
		}
		this.xv=Math.cos((Math.PI / 180)*Math.floor(this.heading));
		this.yv=Math.sin((Math.PI / 180)*Math.floor(this.heading));
		this.x+=this.xv*gameSpeed*this.speed;
		this.y+=this.yv*gameSpeed*this.speed;
		this.age++;
		if(this.age>2000)
		{
			this.active=false;
		}
		if(this.delayTick>0)
		{
			this.delayTick-=1*gameSpeed;
		}else
		{
			var thongs=new Array();
			for(var i=0;i<thangs.length;i++){
				//if ((Math.abs(thangs[i].x-this.x)<this.range) && (Math.abs(thangs[i].y-this.y)<this.range))
				var centerx=thangs[i].x-thangs[i].width/2;
				var centery=thangs[i].y-thangs[i].height/2;
				
				if((this.x>centerx) && (this.x<centerx+thangs[i].width) && (this.y>centery) &&(this.y<centery+thangs[i].height))
				{
					this.detonate();
					thangs[i].getDamaged(this.yield,false,this.ship);
				}
			}
		}
	};
	this.detonate=function(){
		//do damage on ships in range
		monsta.explosionTextured(100,this.x,this.y,2,"explosionsmall");
		this.active=false;
	};
};

function mine(){
	this.x=0;
	this.y=0;
	this.range=40;
	this.delayTick=50;
	this.yield=15;
	this.width=8;
	this.ship=null;
	this.height=8;
	this.active=false;
	this.sprite=Sprite("mine");
	this.armedsprite=Sprite("minearmed");
	this.magnetic=false//todo!
	this.draw=function(can,cam){
		if(this.active)
		{
			can.save();
			can.translate((this.x+cam.x)*cam.zoom,(this.y+cam.y)*cam.zoom);
			//can.rotate((this.heading-90)* (Math.PI / 180));//todo negatives.
			if(this.cloaked)
			{
				canvas.globalAlpha=0.30;
			}
			can.scale(cam.zoom,cam.zoom);
			if(this.delayTick<1)
			{
				this.armedsprite.draw(can, -this.width/2,-this.height/2);
			}else
			{
				this.sprite.draw(can, -this.width/2,-this.height/2);
			}
			can.restore();
		}
	};
	
	this.getDamaged=function()
	{
		this.detonate();
	};

	
	this.update=function(thangs){
		if(this.delayTick>0)
		{
			this.delayTick-=1*gameSpeed;
		}else
		{
			var thongs=new Array();
			for(var i=0;i<thangs.length;i++){
				//if ((Math.abs(thangs[i].x-this.x)<this.range) && (Math.abs(thangs[i].y-this.y)<this.range))
				var centerx=thangs[i].x-thangs[i].width/2;
				var centery=thangs[i].y-thangs[i].height/2;
				var ourx=this.x;//+this.width/2;
				var oury=this.y;//+this.height/2;
				if((ourx>centerx) && (ourx<centerx+thangs[i].width) && (oury>centery) &&(oury<centery+thangs[i].height))
				{
					this.detonate();
					thangs[i].getDamaged(this.yield,false,this.ship);
				}
			}
		}
	};
	this.detonate=function(){
		//do damage on ships in range
		monsta.explosionTextured(100,this.x,this.y,2,"explosionsmall");
		console.log("boom");
		this.active=false;
	};
};

function escapePod(){
	this.x=0;
	this.y=0;
	this.alive=true;
	this.hp=10;
	this.active=false;
	this.capacity=1;
	this.statis=false;
	this.surrendered=false;
	this.warpSpeed=false;
	this.width=8;
	this.height=8;
	this.maxSpeed=3;
	this.civ=null;
	this.tractorHost=null;
	this.armor=0;
	this.desiredSpeed=0;
	this.speed=0;
	this.sprite=Sprite("pod");
	this.destination=null;
	this.heading=0;
	this.desiredHeading=0;
	this.passenger=null;
	this.crewCapacity=1;
	this.seatsFull=0;
	this.seats=new Array();
	this.acceltick=0;
	this.acceleration=.5;
	this.cloak=false;
	this.shields=0;
	this.turning=false;
	this.launch=function(source,dest){
		this.x=source.x+16;
		this.y=source.y+16;
		this.xv=source.xv;
		this.civ=source.civ;
		this.yv=source.yv;
		this.destination=dest;
		var beta=Math.atan2(this.destination.y-this.y,this.destination.x-this.x)* (180 / Math.PI);
		
		if (beta < 0.0)
			beta += 360.0;
		else if (beta > 360.0)
			beta -= 360;
		this.desiredHeading=beta;
		this.active=true;
		this.speed=0;
		this.active=true;
		this.desiredSpeed=this.maxSpeed;
	};
	
	this.getDamaged=function()
	{
		if(this.passenger)
		{
			this.passenger.kill(" when their escape pod was destroyed");
		}
		this.active=false;
		this.alive=false;
		//todo small explosion
	};
	
		this.accelerate=function()
	{
		this.acceltick++;
		if(this.acceltick<this.accelrate*gameSpeed)
		{
			return;
		}
		this.acceltick=0;
		if (this.speed<this.maxSpeed)
		{
			this.speed+=this.acceleration;
		}
	};
	
	this.decelerate=function()
	{
		this.acceltick++;
		if(this.acceltick<this.accelrate*gameSpeed)
		{
			return;
		}
		this.acceltick=0;
		if (this.speed>0)
		{
			this.speed-=this.acceleration;
		}
	};
	
	this.update=function(){
		//accel or decel to desired speed
		if((!this.active) || (!this.alive)) {
			return;
		}
		
		if((Math.abs(this.x-this.destination.x)<20) && (Math.abs(this.y-this.destination.y)<20)) 
		{
			if(this.passenger)
			{
				if(this.passenger.civ.name=="Human")
				{
					console.log(this.passenger.title+" "+this.passenger.name+"'s escape pod arrived at "+this.destination.name);
				}
				this.civ.crewPool.push(this.passenger);	
			}else
			{
			console.log("An empty escape pod arrived at "+this.destination.name);
			}
			this.active=false;
			this.alive=false;
		}
		if(this.tractorHost)
		{
			this.heading=this.tractorHost.heading;
			this.speed=this.tractorHost.speed
			//this.yv=this.tractorHost.yv;
		}else
		{
			if(this.speed<Math.floor(this.desiredSpeed))
			{
				this.accelerate();
			}else if(this.speed>Math.floor(this.desiredSpeed))
			{
				this.decelerate();
			}
			
			//update desired heading
			var beta=Math.atan2(this.destination.y-this.y,this.destination.x-this.x)* (180 / Math.PI);
		
			if (beta < 0.0)
				beta += 360.0;
			else if (beta > 360.0)
				beta -= 360;
			this.heading=beta;
			this.desiredHeading=beta;
			//turn to desired heading
			if(Math.floor(this.heading)<Math.floor(this.desiredHeading))
			{
				this.heading+=this.turnSpeed*gameSpeed;
				this.turning=true;
				if (this.heading < 0.0)
					this.heading += 360.0;
				else if (this.heading > 360.0)
					this.heading -= 360;
			}else if(Math.floor(this.heading)>Math.floor(this.desiredHeading))
			{
				this.heading-=this.turnSpeed*gameSpeed;
				this.turning=true;
				if (this.heading < 0.0)
					this.heading += 360.0;
				else if (this.heading > 360.0)
					this.heading -= 360;
			}else
			{
				this.turning=false;
			}
		}
		
		if(this.tractorHost)
		{
			if((Math.abs(this.x-this.tractorHost.x)<20) && (Math.abs(this.y-this.tractorHost.y)<20)) 
			{
				if(this.passenger)
				{
					if(this.tractorHost.civ==this.passenger.civ){
						console.log(this.tractorHost.name+" recovered "+this.passenger.title+" "+this.passenger.name+"'s escape pod.");
						this.tractorHost.crew.push(this.passenger);	
					}else
					{
						if(this.tractorHost.civ.autoHostile.indexOf(this.passenger.civ)>-1)
						{
							console.log(this.tractorHost.name+" captured a "+this.passenger.civ.name+" officer");
							this.tractorHost.civ.prisoners.push(this.passenger);
						}else
						{
							console.log(this.tractorHost.name+" saved a "+this.passenger.civ.name+" officer");
							this.tractorHost.passengers.push(this.passenger);
						}
					}
				}else
				{
					console.log(this.tractorHost.name+" pulled in an empty escape pod.");
				}
			this.active=false;
			this.alive=false;
			}else
			{
				var peta=Math.atan2(this.tractorHost.y-this.y,this.tractorHost.x-this.x)* (180 / Math.PI);
				this.xv=Math.cos((Math.PI / 180)*Math.floor(peta));
				this.yv=Math.sin((Math.PI / 180)*Math.floor(peta));
				this.x+=this.xv*gameSpeed*(this.speed+1);
				this.y+=this.yv*gameSpeed*(this.speed+1);
			}
		}else
		{
			this.xv=Math.cos((Math.PI / 180)*Math.floor(this.heading));
			this.yv=Math.sin((Math.PI / 180)*Math.floor(this.heading));
			this.x+=this.xv*gameSpeed*this.speed;
			this.y+=this.yv*gameSpeed*this.speed;
			
		}

		if(this.x<0)
		{
			this.x=0;
		}
		if(this.y<0)
		{
			this.y=0;
		}
		if(this.x>universeWidth)
		{
			this.x=universeWidth;
		}
		if(this.y>universeHeight)
		{
			this.y=universeHeight;
		}
	};
	this.draw=function(can,cam){
		if((this.alive) && (this.active))
		{
			can.save();
			can.translate((this.x+cam.x)*cam.zoom,(this.y+cam.y)*cam.zoom);
			can.rotate((this.heading-90)* (Math.PI / 180));//todo negatives.
			if(this.cloaked)
			{
				canvas.globalAlpha=0.30;
			}
			can.scale(cam.zoom,cam.zoom);
			this.sprite.draw(can, -this.width/2,-this.height/2);
			if((this.shields>0) && (this.activeShields))
			{
				canvas.globalAlpha=this.shields/100;
				this.shieldSprite.draw(can, -this.width,-this.height);
			}
			can.restore();
			
			//this.sprite.draw(can, this.x-cam.x-this.width/2,this.y-cam.y-this.height/2);
		}
	};
};