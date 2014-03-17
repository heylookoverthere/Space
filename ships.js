/*var oshipNames=new Array(40);
oshipNames= ["Enterprise","Hood","Voyager","Defiant","Intrepid","Akira","Excalibur","Lexington","Ohio","Rhode Island","Raven","Gandhi","Exter","Horatio","Yamaguchi","Valdemar","Summit","Dakota","Devore","Drake","Hermes","Agamemnon","Apollo","Ajax","Prokofiev","Constellation","Gettysburg","Magellen","Hathaway", "Stargazer", "Constitution", "Yorktown","Potemkin","Pegasus","Farragut","Valiant","Kelvin","Bozeman"];*/

var shipNames=new Array(40);
for (var q=0;q<10;q++)
{
	shipNames[q]=["one","two","three","four","five","six","seven","eight","nine","ten","Testicles"];
}
shipNames[0]=["Enterprise","Hood","Voyager","Defiant","Intrepid","Akira","Excalibur","Lexington","Ohio","Rhode Island","Raven","Gandhi","Exter","Horatio","Yamaguchi","Summit","Dakota"];
shipNames[1]=["D'Kyr","D'Vahl","Tal'Kir","Ti'Mur","T'Pau","T'Vran","Ni'Var","Nyran","Seleya","Sh'Raan","Vaankara","Vahklas","Yarahla"];
shipNames[4]=["Belak","D'Ridthau","Decius","Devoras","Dividices","Genorex","Haakona","Khazara","Makar"];
shipNames[5]=["Amar","B'Moth","Bortas","Ch'Tang","Fek'lhr","Gr'oth","Hegh'ta","Hor'Cha","Rotarran","Par'tok","Ya'Vang",];

var escapes=new Array();
var mines=new Array();
var torpedos=new Array();
var crewPool=new Array();

updateEscapes=function()
{
	for(var i=0;i<escapes.length;i++)
	{
		if(!escapes[i].active)
		{
			escapes.splice(i,1);
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
var fContacted=new Array();
var numRaces=18;
var shipNamesUsed=new Array();

for(var ipk=0;ipk<numRaces;ipk++){
	fContacted[ipk]=false;
	shipNamesUsed[ipk]=new Array();
}
fContacted[0]=true;

function dude() {
	this.gender=0;
	this.name=names[this.gender][Math.floor(Math.random()*40)];
	this.hp=100;
	this.maxHp=100;
	this.alive=true;
	this.level=1;
	this.moveSpeed=1;
	this.xp=0;
	this.ID=0;
	this.race="human";
	this.rank=0;
	this.title="Crewman";
	this.AIDS=false;
	this.kill=function(cause){
		console.log(this.title+" "+this.name+ " has died"+cause);
	};
};

function crew() {

};

function energyWeapon(hip)
{
	this.x=hip.width/2;
	this.y=hip.height/2;
	this.target=null;
	this.strength=5;
	this.pierce=0;
	this.charge=1;
	this.type=0;
	this.update=function(){
	
	};
	
	this.fire=function(){
	
	};
	
	this.draw=function(can,cam){
	//stroke?!
	};
}

function torpedo(){
	this.x=0;
	this.y=0;
	this.xv=0;
	this.yv=0;
	this.range=40;
	this.delayTick=5;
	this.yield=15;
	this.width=8;
	this.speed=15;
	this.age=0;
	this.height=8;
	this.active=false;
	this.sprite=Sprite("torpedo");
	this.armedsprite=Sprite("torpedoarmed");
	this.homing=false;//todo!
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
	
	this.inSensorRange=function(thangs){
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
					if((fContacted[thangs[i].race]==false) && (this.race==0)){
						fContacted[thangs[i].race]=true;
						console.log("The "+this.name+ " made first contact with the "+races[thangs[i].race]+"s.");
						this.generateFContactEvent(thangs[i].race);
					}
				}
			}
		}
		return thongs;
	};
	
	this.update=function(thangs){
	//also move the thing.
	//homing?
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
				if((this.x>thangs[i].x) && (this.x<thangs[i].x+thangs[i].width/2) && (this.y>thangs[i].y) &&(this.y<thangs[i].y+thangs[i].height/2))
				{
					this.detonate();
					thangs[i].getDamaged(this.yield);
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
	
	this.inSensorRange=function(thangs){
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
					if((fContacted[thangs[i].race]==false) && (this.race==0)){
						fContacted[thangs[i].race]=true;
						console.log("The "+this.name+ " made first contact with the "+races[thangs[i].race]+"s.");
						this.generateFContactEvent(thangs[i].race);
					}
				}
			}
		}
		return thongs;
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
				if((this.x>thangs[i].x) && (this.x<thangs[i].x+thangs[i].width/2) && (this.y>thangs[i].y) &&(this.y<thangs[i].y+thangs[i].height/2))
				{
					this.detonate();
					thangs[i].getDamaged(this.yield);
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
	this.maxSpeed=2;
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
	this.armor=0;
	this.shields=0;
	this.turning=false;
	this.launch=function(source,dest){
		this.x=source.x+16;
		this.y=source.y+16;
		this.xv=source.xv;
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
	
		this.accelerate=function()
	{
		this.acceltick++;
		if(this.acceltick<this.accelrate)
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
		if(this.acceltick<this.accelrate)
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
			console.log(this.passenger.title+" "+this.passenger.name+"'s escape pod arrived at earth!");
			crewPool.push(this.passenger);
			this.active=false;
		}
		
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
		this.xv=Math.cos((Math.PI / 180)*Math.floor(this.heading));
		this.yv=Math.sin((Math.PI / 180)*Math.floor(this.heading));
		this.x+=this.xv*gameSpeed*this.speed;
		this.y+=this.yv*gameSpeed*this.speed;
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

function starShip(){
	this.race=0;
	this.x=0;
	this.y=0;
	this.xv=0;
	this.yv=0;
	this.transportRange=200;
	this.maxMines=100;
	this.maxTorpedos=100;
	this.numTorpedos=100;
	this.numMines=this.maxMines;
	this.maxHp=100;
	this.breaches=0;
	this.oxygen=1000;
	this.selfDestructActive=false;
	this.selfDestructTick=100;
	this.evacRate=10;
	this.evacTick=0;
	this.evacTrack=0;
	this.evacDone=false;
	this.NCC=0;//initial random+counter?
	this.warpSignature=0;
	this.commandCode=1234;
	this.prefixCode=Math.floor(Math.random()*9999); //that bullshit from WoKhan
	this.escapePods=new Array();
	this.acceltick=0;
	this.accelrate=50;
	this.weaponsHot=0;
	this.phaserBanks=new Array();
	this.numPhasers=1;
	this.torpedoBays=new Array();
	this.numTorpedoBays=0;
	this.phaserBanks[0]=new energyWeapon(this);
	this.shields=0;
	this.maxShields=100;
	this.shieldSprite=Sprite("shields1");
	this.discovered=true;
	this.sensorRange=500;
	this.morale=70;
	this.cloaked=false;
	this.turnSpeed=1;
	this.acceleration=.5;
	this.hp=100;
	this.prefix="U.S.S.";
	this.class="Type-2 Shuttle";
	this.heading=Math.floor(Math.random()*359);
	this.desiredHeading=this.heading;
	this.speed=1;
	this.desiredSpeed=1;
	this.maxSpeed=5
	this.status="idle";
	this.type=0;
	this.width=32;
	this.height=32;
	this.alive=true;
	this.name="Tim.";
	var nami=Math.floor(Math.random()*shipNames[this.race].length);
	while(true) {
        if(shipNamesUsed[this.race][nami]) 
        {
            nami=Math.floor(Math.random()*shipNames[this.race].length);
        }else {break;}
    }
	this.name=shipNames[this.race][nami];
	shipNamesUsed[this.race][nami]=true;
	this.crewCapacity=5;
	this.crewMax=0;
	this.crew=new Array();
	this.orbiting=false;
	this.orbitDiameter=30;
	this.orbitTarg=null;
	this.desiredOrbitTarg=null;
	this.gotoDest=false;
	this.dest=null;
	this.homeworld=null;
	this.destx=0;
	this.desty=0;
	this.orby=0;
	this.orbx=0;
	this.orbitTrack=Math.floor(Math.random()*359);;
	this.orbitDecay=0;
	this.orbitSpeed=2;
	this.turning=false;
	this.sensors=0;
	this.energyWeapons=new Array();
	this.phaserBanks=2;
	this.torpedoTubes=2;
	this.sprite=Sprite("ship1");
	this.artilery=new Array();
	this.energyWeapons[0]=0;
	this.energyWeapons[1]=0;
	this.artilery[0]=0;
	this.artilery[1]=0;
	this.impulseEngine=0;
	this.tillEvent=Math.random()*8000;
	this.armor=0;
	this.sheilds=0;
	this.numEscapePods=10;
	for(var i=0;i<this.numEscapePods;i++)
	{
		this.escapePods[i]=new escapePod();
	}
	this.transporter=0;
	this.crewQuarters=0;
	this.tractor=0;
	this.warpCore=0;
	this.warpEngine=0;
	this.homeWorld="Earph.";
	this.stores=0;
	this.cafe=0;
	this.nearbySystems=new Array();
	this.nearbyVessels=new Array();
	
	this.lightyearsTraveled=0;
	this.crewLost=0;
	
	this.layMine=function(){
		if(this.numMines<1) {return;}
		this.numMines--;
		var minny=new mine();
		minny.x=this.x+this.width/2;
		minny.y=this.y+this.height/2;
		minny.active=true;
		minny.range=10;
		mines.push(minny);
	};
	
	this.christen=function(){
		var nami=Math.floor(Math.random()*shipNames[this.race].length);
		while(true) {
			if(shipNamesUsed[this.race][nami]) 
			{
				nami=Math.floor(Math.random()*shipNames[this.race].length);
			}else {break;}
		}
		this.name=shipNames[this.race][nami];
		shipNamesUsed[this.race][nami]=true;
	};

	this.fireTorpedo=function(targ){
		if(this.numTorpedos<1) {return;}
		this.numTorpedos--;
		var beta=Math.atan2(targ.y-this.y,targ.x-this.x)* (180 / Math.PI);
	
		if (beta < 0.0)
			beta += 360.0;
		else if (beta > 360.0)
			beta -= 360;
		var torpy=new torpedo();
		torpy.heading=beta;
		torpy.x=this.x;
		torpy.y=this.y;
		torpy.active=true;
		torpedos.push(torpy);
	};
	
	this.getDamaged=function(amt){
		this.shields-=amt;
		
		if(this.shields<0){this.hp+=this.shields; this.shields=0;}
		if(this.hp<1)
		{
			killShip(this);
		}
		//todo randomly damage systems, kill crew.
		if(this.shields<1)
		{
			var pete=Math.floor(Math.random()*100);
			if(pete<50)
			{
				this.breaches++;
				console.log("The " +this.name+"'s hull was breached!");
			}
		}
	};
	
	this.crewVessel=function(){
		this.crewMax=Math.floor(Math.random()*4)+4;
		for(var i=0;i<this.crewMax;i++){
			this.crew[i]=new dude();
			if((Math.random()*100)<20)
			{
				this.crew[i].race="vulcan";
			}
		}
		this.crew[0].title="Captain";
		this.crew[1].title="Lt. Commander";
	};
	
	this.checkCrew=function(){
		
		if(this.crew.length<1)
		{
			//console.log("The crew of the "+this.name+" have been killed.  Vessel adrift.");
			return false; 
		}
		return true;
	};
	
	this.killRandomCrew=function(cause){
		if(cause==null) {cause=".";}
		if(this.checkCrew()){
			var vict=Math.floor(Math.random()*this.crew.length);
			this.crew[vict].kill(cause);
			this.crewLost++;
			this.crew.splice(vict,1);
			//this.crewNum--;
			if(this.crew.length<1)
			{
				console.log("The crew of the "+this.name+" have been killed.  Vessel adrift.");
				this.adrift=true;
			}
		}
	};
	
	this.prepEvac=function(level){ //TODO: gets non essentail (judged by level var) personalle to escape pods.
		this.prevacuated=level*10;
	};
	
	this.Evac=function(targ){//TODO: shoots out pods over time, can get headstart by preping evac.
		this.evacuating=true;
	};
	
	this.orderOrbit=function(targ){
		this.desiredOrbitTarg=targ;
		this.orderLeaveOrbit();
	};	
	
	this.orbit=function(targ){
		this.orbiting=true;
		this.orbitTarg=targ;
		this.leavingProgress=null;
	};
	
	this.leaveOrbit=function(){
		this.leavingProgress=null;
		this.orbiting=false;
		this.orbitTarg=null;
		this.heading=this.orbitTrack;
		this.desiredHeading=this.heading;
		this.speed=1;
	};
	
	this.orderLeaveOrbit=function(){
		this.leavingProgress=0;
		this.status="Breaking Orbit";
	};
	
	this.adjustHeading=function(targ){
		if (targ < 0.0)
			targ += 360.0;
		else if (targ > 360.0)
			targ -= 360;
		this.desiredHeading=Math.floor(targ);
	};
	
	this.generateFContactEvent=function(who){
		var j=Math.floor(Math.random()*2);
			if(who==1) 
			{
				console.log("Just like the movie! Together you draft the First Khitomer Accord, outlawing sodomy in space.");
			}else if(who==4) 
			{	
				console.log("Motherfuckers will only communicate with audio.");
			}else if(who==5) 
			{
				console.log("The introductions did not go well.  Ship lost with all hands.");
			}else if(who==9) 
			{
				console.log("They seems pretty friendly, and offer to come show you their nanoprobes. Hilarity ensues.");
				this.kill();
			} else
			{
				console.log("Unsuprisingly they appear to be huminoids with bumps on their heads.");
			}
		};
	
	this.generateEvent=function(){
		var j=Math.floor(Math.random()*9);
		var aRace=races[Math.floor(Math.random()*numRaces)];
		if(j==0){
			if((aRace=="Vulcan") && (fContacted[1]))
			{
				console.log("You can tell the enemy crew is sodomizing you with their eyes, but in the end they abide by the treaty.");
			}else
			{
				console.log("The crew of the "+this.name+" has been sodomized by "+ aRace+"s.  Morale is low.");
				this.morale-=20;
			}
			if((Math.floor(Math.random()*8)==1))
			{
				this.killRandomCrew(" resisting sodomy.");
			}
		}else if (j==1){
			console.log("A fire broke out aboard the "+this.name+".");
			if((Math.floor(Math.random()*6)==1))
			{
				this.killRandomCrew(" of severe burns.");
			}
		}else if (j==2){
			console.log("The crew of the "+this.name+" traveled back in time and met Mark Twain.  It was neat.");
			if((Math.floor(Math.random()*80)==1))
			{
				this.killRandomCrew(" resisting sodomy.");
			}
		}else if (j==3){
			console.log("The "+this.name+" was involved in a skirmish with a "+aRace+" battlecruiser.");
			this.hp-=20;
			if((Math.floor(Math.random()*4)==1))
			{
				this.killRandomCrew(" in the battle.");
			}
		}else if (j==4){
			console.log("The "+this.name+" has found the ruins of a long dead civilization.");
			if((Math.floor(Math.random()*20)==1))
			{
				this.killRandomCrew(" in a trap.");
			}
		}else if (j==5){
			console.log("The crew of the "+this.name+" encounters David Bowie floating in space.");
			if((Math.floor(Math.random()*8)>3))
			{
				console.log("They turn off the lights and pretend not to be home.");
			}else
			{
				console.log("He sings a groovy space tune.");
				this.moral+=10;
			}
		}else if (j==6){
			console.log("The "+this.name+"'s Holodeck became alive.  This happens more often than you might think.");
			if((Math.floor(Math.random()*10)==1))
			{
				this.killRandomCrew(" at the hands of a hologram.");
			}
		}else if (j==7){
			console.log("The "+this.name+" encountered some evil goo.");
			if((Math.floor(Math.random()*20)==1))
			{
				this.killRandomCrew(" in a random display of the creaters power.");
			}
		}else if (j==8){
			console.log("The "+this.name+" encounteres the remains of a Borg cube.");
			if((Math.floor(Math.random()*2)==1))
			{
				console.log("They salvage a transwarp coil to increase their maximum speed.");
				this.maxSpeed++;
			}else
			{
				console.log("the ship barely escapes as two more cubes are detected on long range sensors.");
			}
		}
	};
	
	this.manualHelm=function()
	{
		ships[curShip].desiredOrbitTarg=null;
	};
	
	this.orderSpeed=function(spd){
		this.desiredSpeed=spd;
	};
	
	this.accelerate=function()
	{
		this.acceltick++;
		if(this.acceltick<this.accelrate)
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
		if(this.acceltick<this.accelrate)
		{
			return;
		}
		this.acceltick=0;
		if (this.speed>0)
		{
			this.speed-=this.acceleration;
		}
	};
	
	this.inSensorRange=function(thangs){
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
					if((fContacted[thangs[i].race]==false) && (this.race==0)){
						fContacted[thangs[i].race]=true;
						console.log("The "+this.name+ " made first contact with the "+races[thangs[i].race]+"s.");
						this.generateFContactEvent(thangs[i].race);
					}
				}
			}
		}
		return thongs;
	};
	
	this.update=function(){
		if(this.selfDestructActive)
		{
			this.selfDestructTick-=1*gameSpeed;
			if(this.selfDestructTick <0)
			{
				killShip(this);
				//explosion!
			}
		}	
		if(this.orbiting)
		{
			
			this.orbx=this.orbitTarg.x;
			this.orby=this.orbitTarg.y;
				
			this.orbitTrack+=this.orbitSpeed*gameSpeed;
			this.orbitDiameter-=this.orbitDecay*this.orbitSpeed*gameSpeed;
			if(this.orbitDiameter<1) 
			{
				this.alive=false;
				console.log("You flew into the sun moron.");
			}
			//if((this.shrinking) && (this.orbitDiameter>1)) {this.orbitDiameter--;}
			if(this.leavingProgress!=null) 
			{
				this.leavingProgress+=1*gameSpeed;
				this.status="Breaking Orbit";
				if(this.leavingProgress>90)
				{
					this.leaveOrbit();
					this.leavingProgress=0;
				}
				
			}else
			{
				this.status="Orbiting";
			}
			if (this.orbitTrack>360){ this.orbitTrack=0;}
			this.x=this.orbx+Math.cos(this.orbitTrack* (Math.PI / 180))*this.orbitDiameter;
			this.y=this.orby+Math.sin(this.orbitTrack*(Math.PI / 180))*this.orbitDiameter;
			this.y+=this.yv;
			
		}else if(this.desiredOrbitTarg)//TODO
		{
				this.status="Enroute to "+this.desiredOrbitTarg.name;
				//console.log("yaaaar");
				var beta=Math.atan2(this.desiredOrbitTarg.y-this.y,this.desiredOrbitTarg.x-this.x)* (180 / Math.PI);
				
				if (beta < 0.0)
					beta += 360.0;
				else if (beta > 360.0)
					beta -= 360;
				this.desiredHeading=beta;
				if(this.speed<1)
				{
					this.speed=this.maxSpeed;
				}
				if((Math.abs(this.x-this.desiredOrbitTarg.x)<50) && (Math.abs(this.y-this.desiredOrbitTarg.y)<50)) 
				{
					console.log("arrived!");
					this.orbit(this.desiredOrbitTarg);
					this.desiredOrbitTarg=null;
				}
		}//else
		
		if(!this.orbiting)
		{
			//accel or decel to desired speed
			if(this.speed<Math.floor(this.desiredSpeed))
			{
				this.accelerate();
			}else if(this.speed>Math.floor(this.desiredSpeed))
			{
				this.decelerate();
			}
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
			this.xv=Math.cos((Math.PI / 180)*Math.floor(this.heading));
			this.yv=Math.sin((Math.PI / 180)*Math.floor(this.heading));
			this.x+=this.xv*gameSpeed*this.speed;
			this.y+=this.yv*gameSpeed*this.speed;
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
		}
		this.tillEvent-=1*gameSpeed;
		if((this.tillEvent<1) && (this.race==0)) //todo race vs civ
		{
			this.generateEvent();
			this.tillEvent=Math.random()*8000;
		}

		/*this.heading++;
		if (this.heading>359) { this.heading=0;}*/
		if((this.evacuating) && (!this.evacDone))
		{
			this.evacTick+=this.evacRate*gameSpeed;
			if(this.evacTick>100)
			{
				this.evacTick=0;
				this.escapePods[this.evacTrack].passenger=this.crew.pop();
				//this.crewNum--;
				this.escapePods[this.evacTrack].launch(this,this.homeworld);
				escapes.push(this.escapePods[this.evacTrack]);
				this.evacTrack++;
				if((this.evacTrack>this.numEscapePods-1) || (this.crew.length<1))
				{
					this.evacDone=true;
					//todo ship adrift
					this.adrift=true;
					console.log("The "+this.name+" has been evacuated");
				}
			}
		}
		if(this.oxygen>0)
		{
			this.oxygen-=Math.floor(this.breaches*2*gameSpeed);
		}else
		{
			this.killRandomCrew(" of suffocation.");
		}
		
	};
	
	this.draw=function(can,cam){
		if(this.alive)
		{
			can.save();
			can.translate((this.x+cam.x)*cam.zoom,(this.y+cam.y)*cam.zoom);
			if(this.orbiting)
			{
				can.rotate((this.orbitTrack-this.leavingProgress)* (Math.PI / 180));
			}else
			{
				can.rotate((this.heading-90)* (Math.PI / 180));//todo negatives.
			}
			if(this.cloaked)
			{
				canvas.globalAlpha=0.30;
			}
			can.scale(cam.zoom,cam.zoom);
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