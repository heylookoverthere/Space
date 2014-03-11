var shipNames=new Array(40);
shipNames= ["Enterprise","Hood","Voyager","Defiant","Intrepid","Akira","Excalibur","Lexington","Ohio","Rhode Island","Raven","Gandhi","Exter","Horatio","Yamaguchi","Valdemar","Summit","Dakota","Devore","Drake","Hermes","Agamemnon","Apollo","Ajax","Prokofiev","Constellation","Gettysburg","Magellen","Hathaway", "Stargazer", "Constitution", "Yorktown","Potemkin","Pegasus","Farragut","Valiant","Kelvin","Bozeman"];
var numShipNames=38;
var races=new Array(40);
races= ["Human","Vulcan","Andorian","Tellerite","Romulan","Klingon","Betazoid","Trill","Cardassian","Borg","Vidian","Telaxian","Ferengi","Pakled","Bajoran","Binar","Hirogen","Gorn"];
var numRaces=18;


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

function starShip(){
	this.x=0;
	this.y=0;
	this.xv=0;
	this.yv=0;
	this.morale=70;
	this.turnSpeed=1;
	this.acceleration=.5;
	this.hp=100;
	this.prefix="U.S.S.";
	this.class="Type-2 Shuttle";
	this.heading=Math.floor(Math.random()*359);
	this.desiredHeading=this.heading;
	this.speed=1;
	this.maxSpeed=5
	this.status="idle";
	this.type=0;
	this.width=16;
	this.height=16;
	this.alive=true;
	this.name="Tim.";
	this.name=shipNames[Math.floor(Math.random()*numShipNames)];//error
	this.crewCapacity=5;
	this.crewNum=0;
	this.crew=new Array();
	this.orbiting=false;
	this.orbitDiameter=30;
	this.orbitTarg=null;
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
	
	this.lightyearsTraveled=0;
	this.crewLost=0;
	
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
		if(targ>360) {return;}
		if (targ==360) {targ=0;}
		this.desiredHeading=Math.floor(targ);
	};
	
	this.generateEvent=function(){
		var j=Math.floor(Math.random()*9);
		var aRace=races[Math.floor(Math.random()*numRaces)];
		if(j==0){
			console.log("The crew of the "+this.name+" has been sodomized by "+ aRace+"s.  Morale is low.");
			this.morale-=20;
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
	
	this.accelerate=function()
	{
		if (this.speed<this.maxSpeed)
		{
			this.speed+=this.acceleration;
		}
	};
	
	this.decelerate=function()
	{
		if (this.speed>0)
		{
			this.speed-=this.acceleration;
		}
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
				}
				
			}else
			{
				this.status="Orbiting";
			}
			if (this.orbitTrack>360){ this.orbitTrack=0;}
			this.x=this.orbx+Math.cos(this.orbitTrack* (Math.PI / 180))*this.orbitDiameter;
			this.y=this.orby+Math.sin(this.orbitTrack*(Math.PI / 180))*this.orbitDiameter;
			this.y+=this.yv;
			if(this.gotoDest)
			{
				if(this.orbx<this.destx) {this.orbx+=this.speed;}
				if(this.orbx>this.destx) {this.orbx-=this.speed;}
				if(this.orby<this.desty) {this.orby+=this.speed;}
				if(this.orby>this.desty) {this.orby-=this.speed;}
				if((Math.abs(this.orbx-this.destx)<5) && (Math.abs(this.orby-this.desty)<5)) {this.gotoDest=false;}
			}
		}else if(this.gotoDest)//TODO
		{
				console.log("yaaaar");
				if(this.x<this.destx) {this.x+=this.speed;}
				if(this.x>this.destx) {this.x-=this.speed;}
				if(this.y<this.desty) {this.y+=this.speed;}
				if(this.y>this.desty) {this.y-=this.speed;}
				if((Math.abs(this.x-this.destx)<5) && (Math.abs(this.by-this.desty)<5)) {this.gotoDest=false;}
		}else
		
		{
			this.leavingProgress=0;
			if(Math.floor(this.heading)<Math.floor(this.desiredHeading))
			{
				this.heading+=this.turnSpeed*gameSpeed;
				this.turning=true;
				if (this.heading>360) { this.heading=0;}
			}else if(Math.floor(this.heading)>Math.floor(this.desiredHeading))
			{
				this.heading-=this.turnSpeed*gameSpeed;
				this.turning=true;
				if (this.heading<0) { this.heading=359;}
			}else
			{
				this.turning=false;
			}
			this.xv=Math.cos((Math.PI / 180)*this.heading);
			this.yv=Math.sin((Math.PI / 180)*this.heading);
			this.x+=this.xv*gameSpeed*this.speed;
			this.y+=this.yv*gameSpeed*this.speed;
		}
		this.tillEvent-=1*gameSpeed;
		if(this.tillEvent<1)
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
			can.translate(this.x+cam.x,this.y+cam.y);
			if(this.orbiting)
			{
				can.rotate((this.orbitTrack-this.leavingProgress)* (Math.PI / 180));
			}else
			{
				can.rotate((this.heading-90)* (Math.PI / 180));//todo negatives.
			}
			this.sprite.draw(can, -this.width/2,-this.height/2);
			can.restore();
			
			//this.sprite.draw(can, this.x-cam.x-this.width/2,this.y-cam.y-this.height/2);
		}
	};
};