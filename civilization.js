var techNames=["Aeroponics","Emergency Rations","Waffle Fries","Microbrewed Beer","Printers That Dont Need Paper With Those Holes On Each Side","Sneakers With Lights On Them","Captioning Pictures Of Cats","Inertial Dampners","Warp Drive","TransWarp","Slipstream","Shitty Sensors","Sensors","Long Range Sensors","Astrometrics","DetectTacheons","DetectCloakythings","DetectWormholethings","ShittyCloak","Cloak","BestCloak","Lasers","Phasers","Disruptors","BestEnergyWeapon","Torpedos","PhotonTorpedos","QuantumTorpedos","TransPhasicTorpedos","PowerCells","Grapple","TractorBeam","StructualIntegrityBeam","Transporter","TransportEnhancer","EmergencyTransporter","AdvTransporter","thatbullshitfromthenewmovie","Energy Shields","AdvEnergyShields","MetaPhasicShields","Armor","AblatativeArmor","MicroCircutry","BioNeuralCircutry","Nanobots","Assimilation","AlienMedican","AlienSurgery","Cloning","GeneticResequencing","Synthahol","AdvEnviromentalControls","ContainmentField","SubspaceTheory","ImpulseProbe","WarpProbe","Statis","WarpEscapePods","AdvEscapePods","AI","Robotics","Androids","Cybernetics","PowerManagment","Replicators","PowerManagment","Capacitors","Holodecks","EMH","MobileEmiter","AdvMetallurgy","DeuteriumCollector","Deflector"];
var Techs = {};
Techs.Aeroponics=1;
Techs.MERations=2; //start with.
Techs.WaffleFries=3;  //increases morale
Techs.Microbrew=4;
Techs.PrintersThatDontNeedPaperWithThoseHolesOnEachSide=5;
Techs.SneakersWithLightsOnThem=6;
Techs.CaptioningPicturesOfCats=7; // demolishes a civilzation's productivity
Techs.InertialDampners=8; //you can skip this, but if you do you crew will take huge damage accelerating or decerlarting too quicky.
Techs.Warp=9;
Techs.TransWarp=11;
Techs.Slipstream=12;
Techs.ShittySensors=13;
Techs.Sensors=14;
Techs.LongRangeSensors=15;
Techs.Astrometrics=16;
Techs.DetectTacheons=17;
Techs.DetectCloakythings=18;//todo.
Techs.DetectWormholethings=19;

Techs.ShittyCloak=20;
Techs.Cloak=21;
Techs.BestCloak=22;

Techs.Lasers=23;
Techs.Phasers=24;
Techs.Disruptors=25;
Techs.BestEnergyWeapon=26; //todo

Techs.Torpedos=27;
Techs.PhotonTorpedos=28;
Techs.QuantumTorpedos=29;
Techs.TransPhasicTorpedos=30;

Techs.PowerCells=31;

Techs.Grapple=32;
Techs.TractorBeam=33;
Techs.StructualIntegrityBeam=34;

Techs.Transporter=35;
Techs.TransportEnhancer=36;
Techs.EmergencyTransporter=37; //from nemesis

Techs.AdvTransporter=38; //penatrate some shields
Techs.thatbullshitfromthenewmovie=39;// why bother with starships?


Techs.EnergyShields=40;
Techs.AdvEnergyShields=41;
Techs.MetaPhasicShields=42;

Techs.Armor=43;
Techs.AblatativeArmor=44;

Techs.MicroCircutry=45;
Techs.BioNeuralCircutry=46;
Techs.Nanobots=47;
Techs.Assimilation=48;

Techs.AlienMedican=49;
Techs.AlienSurgery=50;
Techs.Cloning=51;
Techs.GeneticResequencing=52;//edit crew in some way, change race?
Techs.Synthahol=53; //removes drunken events, morale down.

Techs.AdvEnviromentalControls=54;
Techs.ContainmentField=55;

Techs.SubspaceTheory=56;
Techs.ImpulseProbe=57;
Techs.WarpProbe=58;

Techs.Statis=59;
Techs.WarpEscapePods=60;
Techs.AdvEscapePods=61; //statis, cloak. 

Techs.AI=62;
Techs.Robotics=63;
Techs.Androids=64;
Techs.Cybernetics=65;

Techs.PowerManagment=66;
Techs.Replicators=67;
Techs.PowerManagment=68;
Techs.Capacitors=69;
Techs.Holodecks=70;
Techs.EMH=71;
Techs.MobileEmiter=72;
Techs.AdvMetallurgy=73;
Techs.DeuteriumCollector=74;
Techs.Deflector=75;

function culture()
{
	this.militarism=5;
	this.religon=5;
	this.cuntiness=5;
	this.diplomacy=5;
	this.education=5;
	this.medicine=5;
	this.immunity=5;//whoa awesome what are you thinking here?!
	this.beurocracy=5; //which is better +/-?! //rename organization?
	this.boneisity=5; //the rate at which the reporduce
	this.art=5;
	this.optimism=5;
	this.xenophobia=5;
	this.constitution=5;//how well they hold up before resorting to things.
	this.slavery=false;
	
	/*this.taboo?
	    canibilism
		slavery
		incest? //increases fertility and retardation?
	*/
	this.personality=Math.floor(Math.random()*5);
	
	
};

function civilization()
{
	this.race=0;
	this.name="Humanity";
	this.content=100;  //clf: they are happy.  They do not have 100 contents.
	this.techs=new Array();
	this.homeStar=0;
	this.homePlanet=2;
	this.researchRate=1;
	this.researchProgress=0;
	this.researchTick=0;
	this.nextResearch=100;
	this.updateRate=100;
	this.greeting="Greetings.";
	this.threat="Jockamo fee nané";
	this.ships=new Array();
	this.worlds=new Array();
	this.fleets=new Array();
	this.fContacted=new Array();
	this.autoHostile=new Array();
	for(var ipk=0;ipk<numRaces;ipk++){
		this.fContacted[ipk]=false;
	}
	this.techs=new Array();
	for(var i=0;i<100;i++)
	{
		this.techs.push(false);
	}
	this.techs[Techs.Sensors]=true;
	this.techs[Techs.Phasers]=true;
	this.update=function()
	{
		this.updateTick+=1*gameSpeed;
		if(this.updateTick>this.updateRate)
		{
			this.updateTick=0;
			this.researchTick+=this.researchRate*gameSpeed;
			if(this.researchTick>this.nextResearch)
			{
				//finished researching somthing!
				this.techs[this.researchProgress]=true;
				console.log(this.name+ " discovered "+techNames[this.researchProgress]);
				this.researchProgress++;
				
			}
		}
	};
};