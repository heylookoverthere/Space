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

function starShip(){
	this.race=0;
	this.x=0;
	this.y=0;
	this.xv=0;
	this.yv=0;
	
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
	this.sensorRange=5000;
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
	this.crewNum=0;
	this.crew=new Array();
	this.orbiting=false;
	this.orbitDiameter=30;
	this.orbitTarg=null;
	this.desiredOrbitTarg=null;
	this.gotoDest=false;
	this.dest=null;
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
	this.escapePods=0;
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
	
	this.crewVessel=function(){
		this.crewNum=Math.floor(Math.random()*4)+2;
		for(var i=0;i<this.crewNum;i++){
			this.crew[i]=new dude();
			if((Math.random()*100)<20)
			{
				this.crew[i].race="vulcan";
			}
		}
		this.crew[0].title="Captain";
	};
	
	this.checkCrew=function(){
		
		if(this.crewNum<1)
		{
			//console.log("The crew of the "+this.name+" have been killed.  Vessel adrift.");
			return false; 
		}
		return true;
	};
	
	this.killRandomCrew=function(cause){
		if(cause==null) {cause=".";}
		if(this.checkCrew()){
			var vict=Math.floor(Math.random()*this.crewNum);
			this.crew[vict].kill(cause);
			this.crewLost++;
			this.crew.splice(vict,1);
			this.crewNum--;
			if(this.crewNum<1)
			{
				console.log("The crew of the "+this.name+" have been killed.  Vessel adrift.");
			}
		}
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
		
		//{
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
		//}
		this.tillEvent-=1*gameSpeed;
		if((this.tillEvent<1) && (this.race==0)) //todo race vs civ
		{
			this.generateEvent();
			this.tillEvent=Math.random()*8000;
		}
		/*this.heading++;
		if (this.heading>359) { this.heading=0;}*/
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