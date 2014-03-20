var Techs = {};
Techs.Aeroponics=1;
Techs.MERations=1; //start with.
Techs.WaffleFries=1;  //increases morale
Techs.Microbrew=1;

Techs.PrintersThatDontNeedPaperWithThoseHolesOnEachSide=1;
Techs.SneakersWithLightsOnThem=1;
Techs.CaptioningPicturesOfCats=1; // demolishes a civilzation's productivity

Techs.InertialDampners=1; //you can skip this, but if you do you crew will take huge damage accelerating or decerlarting too quicky.
Techs.Warp=1;
Techs.TransWarp=1;
Techs.Slipstream=1;

Techs.ShittySensors=0;
Techs.Sensors=1;
Techs.LongRangeSensors=1;
Techs.Astrometrics=1;
Techs.DetectTacheons=1;
Techs.DetectCloakythings=1;//todo.
Techs.DetectWormholethings=1;

Techs.ShittyCloak=1;
Techs.Cloak=1;
Techs.BestCloak=1;

Techs.Lasers=1;
Techs.Phasers=1;
Techs.Disruptors=1;
Techs.BestEnergyWeapon=1; //todo

Techs.Torpedos=1;
Techs.PhotonTorpedos=1;
Techs.QuantumTorpedos=1;
Techs.TransPhasicTorpedos=1;

Techs.PowerCells=1;

Techs.Grapple=1;
Techs.TractorBeam=1;
Techs.StructualIntegrityBeam=1;

Techs.Transporter=1;
Techs.TransportEnhancer=1;
Techs.EmergencyTransporter=1; //from nemesis

Techs.AdvTransporter=1; //penatrate some shields
Techs.thatbullshitfromthenewmovie=1;// why bother with starships?


Techs.EnergyShields=1;
Techs.AdvEnergyShields=1;
Techs.MetaPhasicShields=1;

Techs.Armor=1;
Techs.AblatativeArmor=1;

Techs.MicroCircutry=1;
Techs.BioNeuralCircutry=1;
Techs.Nanobots=1;
Techs.Assimilation=1;

Techs.AlienMedican=1;
Techs.AlienSurgery=1;
Techs.Cloning=1;
Techs.GeneticResequencing=1;//edit crew in some way, change race?
Techs.Synthahol=1; //removes drunken events, morale down.

Techs.AdvEnviromentalControls=1;
Techs.ContainmentField=1;

Techs.SubspaceTheory=1;
Techs.ImpulseProbe=1;
Techs.WarpProbe=1;

Techs.Statis=1;
Techs.WarpEscapePods=1;
Techs.AdvEscapePods=1; //statis, cloak. 

Techs.AI=1;
Techs.Robotics=1;
Techs.Androids=1;
Techs.Cybernetics=1;

Techs.PowerManagment=1;
Techs.Replicators=1;
Techs.PowerManagment=1;
Techs.Capacitors=1;
Techs.Holodecks=1;
Techs.EMH=1;
Techs.MobileEmiter=1;
Techs.AdvMetallurgy=1;
Techs.DeuteriumCollector=1;
Techs.Deflector=1;

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
};