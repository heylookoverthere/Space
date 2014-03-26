var techNames=["Aeroponics","Emergency Rations","Waffle Fries","Microbrewed Beer","Printers That Dont Need Paper With Those Holes On Each Side","Sneakers With Lights On Them","Captioning Pictures Of Cats","Inertial Dampners","Warp Drive","TransWarp","Slipstream","Shitty Sensors","Sensors","Long Range Sensors","Astrometrics","DetectTacheons","DetectCloakythings","DetectWormholethings","ShittyCloak","Cloak","BestCloak","Lasers","Phasers","Disruptors","BestEnergyWeapon","Torpedos","PhotonTorpedos","QuantumTorpedos","TransPhasicTorpedos","PowerCells","Grapple","TractorBeam","StructualIntegrityBeam","Transporter","TransportEnhancer","EmergencyTransporter","AdvTransporter","thatbullshitfromthenewmovie","Energy Shields","AdvEnergyShields","MetaPhasicShields","Armor","AblatativeArmor","MicroCircutry","BioNeuralCircutry","Nanobots","Assimilation","AlienMedican","AlienSurgery","Cloning","GeneticResequencing","Synthahol","AdvEnviromentalControls","ContainmentField","SubspaceTheory","ImpulseProbe","WarpProbe","Statis","WarpEscapePods","AdvEscapePods","AI","Robotics","Androids","Cybernetics","PowerManagment","Replicators","PowerManagment","Capacitors","Holodecks","EMH","MobileEmiter","AdvMetallurgy","DeuteriumCollector","Deflector"];
var hasItem=new Array();
var numItems=1;
var Items={};
Items.RomulanPrisoner=0;

for(var i=0;i<numItems;i++)
{
	hasItem.push(false);
}

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
	this.encounterTrack=0;
	this.money=1000;
	this.allied=false;
	this.numShipsStart=0;
	this.researchProgress=0;
	this.researchTick=0;
	this.nextResearch=100;
	this.updateRate=100;
	this.messages=new Array();
	this.greeting="Greetings.";
	this.curShip=0;
	
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
	this.cycleShips=function(cam)
	{
		this.curShip++;
		if(this.curShip>this.ships.length-1) {
			this.curShip=0;
		}
		selectedShip=this.ships[this.curShip];
		cam.center(this.ships[this.curShip]);
		cam.follow(this.ships[this.curShip]);
	};
	this.update=function()
	{
		if(this.messages[0])
		{
			this.messages[0].update();
			if(!this.messages[0].exists){
				this.messages.splice(0,1);
			}
		}
		
		for(var i=0;i<this.ships.length;i++)
		{
			if (!this.ships[i].alive)
			{
				this.ships.splice(i,1);
				i--;
			}
		}
		
		for(var i=0;i<this.worlds.length;i++)
		{
			if (!this.worlds[i].alive)
			{
				this.worlds.splice(i,1);
				i--;
			}
		}
		
		if(holdInput) {return;}
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
	this.generateMessage=function(other) //run on contact with other ships (with month or so break in between)
	{
		
		if(this.race==raceIDs.Vulcan)
		{
			var ned=new textbox();
			ned.setup("Greetings, we are the Vulcan Confederacy.  How May we help you?",150,370);
			ned.civil=this;
			ned.choicesStart=1;
			ned.addText("   Explain the Borg threat");
			ned.addText("   Demand their surrender");
			ned.optionOne=function(civil1,civil2)
			{
				console.log(civil2);
				var ped=new textbox();
				ped.setup("Hm.  It seems logical to offer you our aid, as they will" ,150,370);
				ped.civil=civil1;
				ped.addText("surely come for us once they are done with you.");
				ped.optionTrack=0;
				ped.options=0;
				console.log("The Vulcans have agreed to help!");
				console.log(ped);
				civil1.allied=true;
				civil2.messages.push(ped);
				holdInput=true;
			};
			ned.optionTwo=function(civil1,civil2)
			{
				var ped=new textbox();
				ped.setup("We will not surrender, we can defend ourselves!" ,150,370);
				ped.civil=civil1;
				ped.optionTrack=0;
				ped.options=0;
				civil1.autoHostile.push(civil2);
				console.log(civil2.name + " have pissed off " +civil1.name+ " by demanding their surrender!");
				civil2.messages.push(ped);
				holdInput=true;
			};
			ned.optionTrack=1;
			other.messages.push(ned);
		}else if(this.race==raceIDs.Ferengi)
		{
			var ned=new textbox();
			ned.setup("Hello, we are the Ferengi.  We have heard about your troubles.",150,370);
			ned.addText("We would be happy to help defend your planet.  For a modest");
			ned.addText ("fee of course.");
			ned.civil=this;
			ned.choicesStart=3;
			ned.addText("   Hire them for $100");
			ned.addText("   Tell them to fuck off.");
			ned.optionTrack=3;
			ned.optionOne=function(civil1,civil2)
			{
				var ped=new textbox();
				ped.setup("Pleasure doing buisness with you.  Call us when you need our help." ,150,370);
				ped.civil=civil1;
				ped.optionTrack=0;
				ped.options=0;
				civil2.money-=100;
				console.log("The Ferengi have agreed to help!");
				civil1.allied=true;
				civil2.messages.push(ped);
				holdInput=true;
			};
			ned.optionTwo=function(civil1,civil2)
			{
				var ped=new textbox();
				ped.setup("Very well, your loss.  Good luck with the Borg." ,150,370);
				ped.civil=civil1;
				ped.optionTrack=0;
				ped.options=0;
				civil2.messages.push(ped);
				holdInput=true;
			};
			other.messages.push(ned);
		}else if(this.race==raceIDs.Borg)
		{
			var ned=new textbox();
			ned.setup("We are Borg. You will be assimilated.  Resistance is futile.",150,370);
			ned.options=0;
			ned.civil=this;
			other.messages.push(ned);
		}else if(this.race==raceIDs.Klingon)
		{
			var ned=new textbox();
			ned.setup("Filthy humans, once we are done with the Romulans we may just",150,370);
			ned.addText(" come for you.");
			if(hasItem[Items.RomulanPrisoner])
			{
				ned.options=2;
				ned.addText("    Alright then.  Have a good day...");
				ned.addText("    Hey we have this Romulan dude in stasis, wanna probe him?");
				ned.optionTrack=2;
				ned.choicesStart=2;
				ned.optionOne=function(civil1,civil2)
				{

				};
				ned.optionTwo=function(civil1,civil2)
				{
					hasItem[Items.RomulanPrisoner]=false;
					var ped=new textbox();
					ped.setup("Hm.  Yes we could learn much from him.  We will help" ,150,370);
					ped.addText("You in glorious battle against the Borg in exchange for");
					ped.addText("the Romulan officer.");
					ped.civil=civil1;
					ped.optionTrack=0;
					civil2.allied=true;
					ped.options=0;
					civil2.messages.push(ped);
					holdInput=true;
				};
			}else
			{
				ned.options=1;
				ned.addText("    Alright then.  Have a good day...");
				ned.optionTrack=2;
				ned.choicesStart=2;
				ned.options=1;
				ned.optionOne=function(civil1,civil2)
				{

				};
			}
			ned.civil=this;
			other.messages.push(ned);
		}else if(this.race==raceIDs.Romulan)
		{
			var ned=new textbox();
			ned.setup("We are the Romulan Star Empire.  You will not violate our Space.",150,370);
			ned.options=0;
			if(hasItem[Items.RomulanPrisoner])
			{
				ned.options=2;
				ned.addText("    Alright then.");
				ned.addText("    We found one of your officers in an escape pod.");
				ned.optionTrack=1;
				ned.choicesStart=1;
				ned.optionOne=function(civil1,civil2)
				{

				};
				ned.optionTwo=function(civil1,civil2)
				{
					hasItem[Items.RomulanPrisoner]=false;
					var ped=new textbox();
					ped.setup("Thank you for returning our officer.  Prehaps this will be the" ,150,370);
					ped.addText("begging of improved relations between our people.");
					ped.civil=civil1;
					ped.optionTrack=0;
					civil2.allied=true;
					ped.options=0;
					civil2.messages.push(ped);
					holdInput=true;
				};
			}else
			{
				ned.options=1;
				ned.addText("    Alright then.");
				ned.optionTrack=1;
				ned.choicesStart=1;
				ned.options=1;
				ned.optionOne=function(civil1,civil2)
				{

				};
			}
			ned.civil=this;
			other.messages.push(ned);
		}else
		{
			var ned=new textbox();
			ned.setup("Generic message!",150,370);
			ned.options=0;
			ned.civil=this;
			other.messages.push(ned);
		}
	};
};