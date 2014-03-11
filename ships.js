var shipNames=new Array(40);
shipNames= ["Enterprise","Hood","Voyager","Defiant","Intrepid","Akira","Excalibur","Lexington","Ohio","Rhode Island","Raven","Gandhi","Exter","Horatio","Yamaguchi","Valdemar","Summit","Dakota","Devore","Drake","Hermes","Agamemnon","Apollo","Ajax","Prokofiev","Constellation","Gettysburg","Magellen","Hathaway", "Stargazer", "Constitution", "Yorktown","Potemkin","Pegasus","Farragut","Valiant","Kelvin"];

var races=new Array(40);
races= ["Human","Vulan","Andorian","Tellerite","Romulan","Klingon","Betazoid","Trill","Cardassian","Borg","Vidian","Telaxian"];



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
	this.prefix="U.S.S.";
	this.class="Type-2 Shuttle";
	this.heading=Math.floor(Math.random()*359);
	this.speed=1;
	this.maxSpeed=5
	this.type=0;
	this.width=16;
	this.height=16;
	this.alive=true;
	this.name="Tim.";
	this.name=shipNames[Math.floor(Math.random()*20)];//error
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
	this.orbitTrack=0;
	this.orbitDecay=0;
	this.orbitSpeed=2;
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
	};
	
	this.generateEvent=function(){
		var aRace=races[Math.floor(Math.random()*8)];
		console.log("The crew of the "+this.name+" has been sodomized by "+ aRace+"s.  Morale is low.");
		if((Math.floor(Math.random()*8)==1))
		{
			this.killRandomCrew(" resisting sodomy.");
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
			this.x+=this.xv;
			this.y+=this.yv;
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
				can.rotate(this.orbitTrack* (Math.PI / 180));
			}else
			{
				can.rotate(this.heading* (Math.PI / 180));
			}
			this.sprite.draw(can, -8,-8);
			can.restore();
			
			//this.sprite.draw(can, this.x+cam.x-this.width/2,this.y+cam.y-this.height/2);
		}
	};
};