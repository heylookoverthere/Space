/*var oshipNames=new Array(40);
oshipNames= ["Enterprise","Hood","Voyager","Defiant","Intrepid","Akira","Excalibur","Lexington","Ohio","Rhode Island","Raven","Gandhi","Exter","Horatio","Yamaguchi","Valdemar","Summit","Dakota","Devore","Drake","Hermes","Agamemnon","Apollo","Ajax","Prokofiev","Constellation","Gettysburg","Magellen","Hathaway", "Stargazer", "Constitution", "Yorktown","Potemkin","Pegasus","Farragut","Valiant","Kelvin","Bozeman"];*/

var shipNames=new Array(40);
var shipNamesTrack=new Array(40);
for (var q=0;q<18;q++)
{
	shipNames[q]=["one","two","three","four","five","six","seven","eight","nine","ten","Testicles"];
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
var crewPool=new Array();
var looseCrew=new Array(); //crew stranded on a planet or in the mirror universe

var targetSprite=Sprite("shiptargetedbig");

var tractorTargetSprite=Sprite("tractortargetedbig");

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
			//i--;
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
			//i--;
		}else
		{
			torpedos[i].update(thangs);
		}
	}
};

for (var ci=0;ci<20;ci++)
{
	shipNames[9][ci]=Math.floor(Math.random()*9999);
}

var numShipNames=38;
var races=new Array(40);
races= ["Human","Vulcan","Andorian","Tellerite","Romulan","Klingon","Betazoid","Trill","Cardassian","Borg","Vidian","Telaxian","Ferengi","Pakled","Bajoran","Binar","Hirogen","Gorn"];
var raceIDs={};
raceIDs.Human=0;
raceIDs.Vulcan=1;
raceIDs.Andorian=2;
raceIDs.Tellerite=3;
raceIDs.Romulan=4;
raceIDs.Klingon=5;
raceIDs.Betazoid=6;
raceIDs.Trill=7;
raceIDs.Cardassian=8;
raceIDs.Borg=9;
raceIDs.Vidian=10;
raceIDs.Telaxian=11;
raceIDs.Ferengi=12;
raceIDs.Pakled=13;
raceIDs.Bajoran=14;
raceIDs.Binar=15;
raceIDs.Hirogen=16
raceIDs.Gorn=17;
var numRaces=18;
var shipNamesUsed=new Array();

for(var ipk=0;ipk<numRaces;ipk++){
	shipNamesUsed[ipk]=new Array();
}

function dude() {
	this.gender=0;
	this.name=names[this.gender][Math.floor(Math.random()*40)];
	this.hp=100;
	this.maxHp=100;
	this.alive=true;
	this.level=1;
	this.moveSpeed=1;
	this.civ=null;
	this.xp=0;
	this.ID=0;
	this.race="human";
	this.rank=0;
	this.title="Crewman";
	this.AIDS=false;
	this.kill=function(cause){
		console.log(this.title+" "+this.name+ " has died"+cause);
		this.alive=false;
	};
	this.grantXP=function()
	{
	
	};
};

function crew() {

};

function energyWeapon(hip)
{
	this.x=hip.x;
	this.y=hip.y;
	this.xoff=0;
	this.target=null;
	this.strength=1;
	this.pierce=0;
	this.damageRate=1;
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
			target=hip.torpedoTarget;
		}
		if((!this.target) || (!this.target.alive))
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
			this.target.getDamaged(this.strength,true);
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
	
	/*this.inSensorRange=function(thangs){  //torpedos should not be discovering planets and making first contact with species.
		var thongs=new Array();
		for(var i=0;i<thangs.length;i++){
			if ((Math.abs(thangs[i].x-this.x)<this.sensorRange) && (Math.abs(thangs[i].y-this.y)<this.sensorRange))
			{
				if((thangs[i]!=this) && (!thangs[i].cloaked)){  //todo, sensors that can detect cloaked ships.
					thongs.push(thangs[i]);	
					if((thangs[i].discovered==false)  && (this.race==0)){
						thangs[i].discovered=true;
						console.log("The "+this.name+ " discoverd the "+thangs[i].name+" System");
						
					}
					if((this.civ.fContacted[thangs[i].race]==false) && (this.race==0)){
						this.civ.fContacted[thangs[i].race]=true;
						console.log("The "+this.name+ " made first contact with the "+races[thangs[i].race]+"s.");
						this.generateFContactEvent(thangs[i].race);
					}
				}
			}
		}
		return thongs;
	};*/
	
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
					thangs[i].getDamaged(this.yield,false);
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
	
	/*this.inSensorRange=function(thangs){
		var thongs=new Array();
		for(var i=0;i<thangs.length;i++){
			if ((Math.abs(thangs[i].x-this.x)<this.sensorRange) && (Math.abs(thangs[i].y-this.y)<this.sensorRange))
			{
				if((thangs[i]!=this) && (!thangs[i].cloaked)){  //todo, sensors that can detect cloaked ships.
					thongs.push(thangs[i]);	
					if((thangs[i].discovered==false)  && (this.race==0)){
						thangs[i].discovered=true;
						console.log("The "+this.name+ " discoverd the "+thangs[i].name+" System");
						
					}
					if((this.civ.fContacted[thangs[i].race]==false) && (this.race==0)){
						this.civ.fContacted[thangs[i].race]=true;
						console.log("The "+this.name+ " made first contact with the "+races[thangs[i].race]+"s.");
						this.generateFContactEvent(thangs[i].race);
					}
				}
			}
		}
		return thongs;
	};*/
	
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
					thangs[i].getDamaged(this.yield,false);
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
				console.log(this.passenger.title+" "+this.passenger.name+"'s escape pod arrived at "+this.destination.name);
				crewPool.push(this.passenger);	
			}else
			{
			console.log("An empty escape pod arrived at "+this.destination.name);
			}
			this.active=false;
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
			if(this.shields>0)
			{
				canvas.globalAlpha=this.shields/100;
				this.shieldSprite.draw(can, -this.width,-this.height);
			}
			can.restore();
			
			//this.sprite.draw(can, this.x-cam.x-this.width/2,this.y-cam.y-this.height/2);
		}
	};
};