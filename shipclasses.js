function shipClass()
{
	this.ship=true;
	this.orders=0;
	this.civID=0;
	this.raceID=0;
	this.colony=false;
	this.canHasShields=true;
	this.hasShields=false;
	this.frieghter=false;
	this.phaserRange=500;
	this.destination=null;
	this.transportRange=200;
	this.lifeSupport=true;
	this.lifeSupportRate=.25;
	this.maxMines=100;
	this.maxTorpedos=100;
	this.numTorpedos=100;
	this.numMines=this.maxMines;
	this.shieldChargeRate=1;
	this.autoEvac=true;
	this.maxHp=100;
	this.oxygen=1000;
	this.homing=true;//todo
	this.healTick=0;
	this.evacRate=10;
	this.NCC=0;//initial random+counter?
	this.warpSignature=0;
	this.commandCode=1234;
	this.prefixCode=Math.floor(Math.random()*9999); //that bullshit from WoKhan
	this.escapePods=new Array();
	this.acceltick=0;
	this.accelrate=10;
	this.weaponsHot=0;
	this.phaserBanks=new Array();
	this.numPhasers=1;
	this.torpedoBays=new Array();
	this.numTorpedoBays=0;
	this.phaserBanks.push(new energyWeapon(this));
	this.shields=0;
	this.tractorDist=80;
	this.maxShields=0;
	this.hasShields=false;
	this.shieldSprite=Sprite("shields1");
	this.sensorRange=500;
	this.tractorRange=200;
	this.morale=70;
	this.turnSpeed=2;
	this.acceleration=.5;
	this.hp=100;
	this.prefix="U.S.S.";
	this.name="Type-2 Shuttle";
	this.heading=Math.floor(Math.random()*359);
	this.desiredHeading=this.heading;
	this.speed=1;
	this.desiredSpeed=1;
	this.maxSpeed=5;
	this.cruisingSpeed=5;
	this.status="idle";
	this.type=0;
	this.width=32;
	this.height=32;
	this.alive=false;
	this.crewCapacity=5;
	this.crewMax=0;
	this.orbitDiameter=50;
	this.captainFlees=false;
	this.baseRepair=.25;
	this.autoFireRate=40;
	
	
	this.sensors=0;
	this.torpedoTubes=2;
	this.sprite=Sprite("ship1");
	
	this.impulseEngine=0;
	this.armor=0;
	this.shields=0;
	this.numEscapePods=10;
	this.transporter=0;
	this.crewQuarters=0;
	this.tractor=0;
	this.warpCore=0;
	this.warpEngine=0;
	this.stores=0;

	this.maxTeamSize=4;
	//windows
}

baseClass=new shipClass();

colonlyShipClass=new shipClass();
frieghterClass=new shipClass();
shuttlecraft=new shipClass();
shuttlecraft.prefix="U.S.S.";
shuttlecraft.name="Type-2 Shuttle";
shuttlecraft.numTorpedos=0;
shuttlecraft.numMines=0;
shuttlecraft.hasShields=false;
shuttlecraft.crewMax=5;
shuttlecraft.turnSpeed=3;

galaxyClass=new shipClass();
cubeClass=new shipClass()
dominionWarship=new shipClass();
birdOfPrey=new shipClass();
warbird=new shipClass();


shipClasses=new Array();
for(var i=0;i<18;i++)
{
	shipClasses[i]=new Array();
	shipClasses[i].push(baseClass);
}

//shipClasses[raceIDs.Human].push(galaxyClass);
