
var gameSpeed=.3;
var snoop=new Array();

document.body.addEventListener("click", mouseClick, false);
//document.body.addEventListener("dblclick", mouseDblClick, false);
document.body.addEventListener("mousewheel",mouseWheel,false);
document.body.addEventListener("DOMMouseScroll", mouseWheel, false);

//-----------------------------------------------


requestAnimationFrame = window.requestAnimationFrame || 
                        window.mozRequestAnimationFrame || 
                        window.webkitRequestAnimationFrame || 
                        window.msRequestAnimationFrame || 
                        setTimeout; 


var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
var canvas = canvasElement.get(0).getContext("2d");


canvasElement.css("position", "absolute").css("z-index", "1");
canvasElement.appendTo('body');
canvasElement.css("position", "absolute").css("z-index", "1").css("top", canvasElement.position().top).css("left", canvasElement.position().left);

canvasElement.get(0).addEventListener("mousemove", mouseXY, false);

function playSound(name){
    
    nerp=document.getElementById(name);
    if(nerp.ended === true || nerp.currentTime === 0){
        nerp.play();
        numsounds++;
    }
    
}
var productionBar=new progressBar();
var researchBar=new progressBar();

productionBar.x=30;
productionBar.label="Production:";
productionBar.y=550;
researchBar.x=30;
researchBar.label="Research:  ";
researchBar.y=580;
function akey(k) {  //represents a keyboard button
    k = k || "space";
    this.key =k;
    this.aflag=false;
    this.dflag=false;
    this.check= function(){
        if (keydown[this.key]) { 
            this.aflag=true;
            return false;
        }
        if((!keydown[this.key]) && (this.aflag===true)){
            this.aflag=false;
            return true;
        }
    };
    this.checkDown= function(){
        if ((keydown[this.key] )  && (!this.dflag)) { 
            this.dflag=true;
            return true;
        }
        if(!keydown[this.key]){
            this.dflag=false;
            return false;
        }
    };
    return this;
}


	//curMap = new Map();
//INITSDONKEY
initUniverse();
newInitShips();

	


distance=function(one,two){
	return(Math.pow(one.x-two.x,2)+Math.pow(one.y-two.y,2));
};

function time(){
    this.hours=0; 
    this.minutes=0;
    this.seconds=0;
    this.days=0;
	this.years=2000;
}
time.prototype.update=function(plan){
    this.days+=plan.orbitSpeed*gameSpeed;
    if(this.days>360){
        this.days-=360;
        this.years++;
    }
};

var theTime=new time();

var ksavekey=new akey("o"); //define the different keys
var loadkey=new akey("l");

var randomwalk=false;
var gamestart=false;
var radar=true;

var pausekey=new akey("space");
var debugkey=new akey("k");
var escapekey=new akey("esc");
var pageupkey=new akey("o");
var pagedownkey=new akey("l");
var homekey=new akey("home");

var upkey=new akey("up");
var rightkey=new akey("right");
var downkey=new akey("down");
var leftkey=new akey("left");
var tabkey=new akey("capslock");
var camspeedkey=new akey("shift");
var plkey=new akey("p");
var startkey=new akey("return");
var phaserkey=new akey("u");
var tractorkey=new akey("b");
var tractortargetkey=new akey("n");

var dkey=new akey("d");
var starkey=new akey("s");
var gokey=new akey("g");
var toggleshipkey=new akey("h");
var toggleallshipskey=new akey("v");
var shipleftkey=new akey("q");
var shiprightkey=new akey("w");
var shipgokey=new akey("e");
var shipslowkey=new akey("r");
var evackey=new akey("esc");
var minekey=new akey("m");
var crewscreenkey=new akey("c");
var targetkey=new akey("t");
var firekey=new akey("f");
var fleetattackkey=new akey("j");
var enterkey=startkey;
var colonizekey=new akey("z");





function merp() {
requestAnimationFrame(merp,canvas);
	if(mode==0){
		mainMenuUpdate();
		mainMenuDraw();
	}else if(mode==1){
		crewScreenUpdate();
		crewScreenDraw();
	}else if(mode==2){
		mainUpdate();
		mainDraw();
		
	}
	//canvas.beginPath();
	//osCanvas.drawImage(canvasElement,0,0);
}




/*document.getElementById("myAudio").addEventListener('ended', function() { //loops music
    this.currentTime = 0;
    this.play();
}, false);*/

function menuDraw()
{

    battletick++;
    //canvas.save();
    canvas.globalAlpha=0.80;
    canvas.fillStyle =  "#DCDCDC";
    canvas.fillRect(25,95,850,500);
    canvas.fillStyle =bColors[6];//Math.floor(Math.random()*5)];// "#483D8B ";
    canvas.fillRect(40,110,820,470);
    //canvas.restore();
	canvas.globalAlpha=1;
    canvas.font = "14pt Calibri";
    canvas.textAlign = "left";
    canvas.textBaseline = "middle";
    
}

	bConsoleBox=new textbox();
	bConsoleBox.width=460;
	bConsoleBox.height=90;
	
	bConsoleBox.msg[0]=bConsoleStr[0+bConsoleBox.scroll];//[bConsoleStr.length-4];
	bConsoleBox.msg[1]=bConsoleStr[1+bConsoleBox.scroll];//[bConsoleStr.length-3];
	bConsoleBox.msg[2]=bConsoleStr[2+bConsoleBox.scroll];//[bConsoleStr.length-2];
	bConsoleBox.msg[3]=bConsoleStr[3+bConsoleBox.scroll];//[bConsoleStr.length-1];
	bConsoleBox.y=15;
	bConsoleBox.x=30;
	bConsoleBox.lines=4;
	

if(MUSIC_ON){
	document.getElementById("titleAudio").volume=MUSIC_VOL;
	document.getElementById("titleAudio").play(); //starts music
}

function drawGUI()
{
canvas.font = "8pt Calibri";
	//canvas.fillText("Press Enter",200,500);
	//canvas.fillText("  New Game",175,450);
	//canvas.fillStyle = "grey";
	//canvas.fillText("  Load Game",175,475);
	canvas.fillText("Camera: "+camera.x+", "+camera.y,755,10);

    canvas.fillText("Gamespeed: "+gameSpeed,755,25);
	canvas.fillText("Particles: "+ monsta.particles.length,755,40);
	canvas.fillText("Stars drawn: "+ starsDrawn,755,55);
	canvas.fillText("Stardate: "+ Math.floor(theTime.years)+"."+Math.floor(theTime.days) ,755,70);
	canvas.fillText("Zoom: "+camera.zoom ,755,85);
	canvas.fillText("Your Ships: "+civs[0].ships.length ,755,100);
	canvas.fillText("Total Ships: "+ships.length ,755,115);
	
	canvas.fillText("System: "+stars[curSystem].name,25,55);
	canvas.fillText("Planets: "+ stars[curSystem].numPlanets,25,70);
	canvas.fillText("moons: "+ stars[curSystem].countMoons(),25,85);
	canvas.fillText("Astroids: "+ stars[curSystem].numAstroids,25,100);
	canvas.fillText("Coords: "+stars[curSystem].x+","+stars[curSystem].y,25,115);
	canvas.fillText(getQuadrant(stars[curSystem])+" Quadrant",25,130);
	if(stars[curSystem].numPlanets>0){
		var typestr="Class M!";
		if (stars[curSystem].planets[stars[curSystem].selected].type==0) {typestr="Earthy!"}
		if (stars[curSystem].planets[stars[curSystem].selected].type==1) {typestr="Rocky";}
		if (stars[curSystem].planets[stars[curSystem].selected].type==2) {typestr="Hot";}
		if (stars[curSystem].planets[stars[curSystem].selected].type==3) {typestr="Icey";}
		if (stars[curSystem].planets[stars[curSystem].selected].type==4) {typestr="Gas Giant";}
		if (stars[curSystem].planets[stars[curSystem].selected].type==5) {typestr="....Rings!";}
		if (stars[curSystem].planets[stars[curSystem].selected].type==6) {typestr="WTF have you found here.";}
	
		canvas.fillText("Planet Name: "+ stars[curSystem].planets[stars[curSystem].selected].name,25,145);
		canvas.fillText("Planet Type: "+ typestr,25,160);
		canvas.fillText("Planet HP: "+stars[curSystem].planets[stars[curSystem].selected].hp,25,175);
		if(Cube){
		canvas.fillText("Distance of Borg Cube: "+Math.floor(distance(Cube.planetTarget,Cube)),25,190);
		}
		if(stars[curSystem].planets[stars[curSystem].selected].orbitDecay>0)
		{
			canvas.fillStyle = "red";
			canvas.fillText("WARNING: ORBIT DECAYING",25,205);
			canvas.fillStyle = "white";
		
		}
	}
	//ship info
	if(!selectedShip) {return;}
	var actiontext="Full Stop";
	if(selectedShip.speed>0){
		if((selectedShip.desiredOrbitTarg) || (selectedShip.destination) || (selectedShip.escorting))
		{
			actiontext=selectedShip.status;
		}else
		{
			actiontext="Exploring the " +getQuadrant(selectedShip) + " Quadrant";
		}
	}
	if(selectedShip.nearbyPods.length>0)
	{
			canvas.fillStyle = "red";
			if(selectedShip.nearbyPods.length>1)
			{
				canvas.fillText(selectedShip.nearbyPods.length+ " escape pods detected nearby",755,315);
			}else
			{
				canvas.fillText(selectedShip.nearbyPods.length+ " escape pod detected nearby",755,315);
			}
			canvas.fillStyle = "white";
	}
	if(selectedShip.orbiting)
	{
		if(selectedShip.leavingProgress)
		{
			actiontext="Breaking Orbit";
		}else
		{
			actiontext="Orbiting "+selectedShip.orbitTarg.name;
		}
	}else if(selectedShip.turning)
	{
		actiontext="Adjusting Heading";
	}
	if(selectedShip.destination)
	{
		if(selectedShip.destination.planet)
		{
			actiontext="Enroute to "+selectedShip.destination.name;
		}else if(selectedShip.destination.ship)
		{
			if(selectedShip.orders=Orders.Attack)
			{
				actiontext="Enroute to attack "+selectedShip.destination.name;
			}else
			{
				actiontext="Enroute to "+selectedShip.destination.name;
			}
			
		}
	}
	canvas.fillText("Ship: "+selectedShip.prefix+" "+selectedShip.name,755,250);
	canvas.fillText("Class: "+ selectedShip.class,755,265);
	if(selectedShip.destination)
	{
		canvas.fillText("Following: "+selectedShip.destination.prefix+" "+selectedShip.destination.name,755,365);
	}
	if(selectedShip.torpedoTarget)
	{
		canvas.fillText("Targeting: "+selectedShip.torpedoTarget.prefix+" "+selectedShip.torpedoTarget.name,755,380);
	}//else if selectedShip.
	canvas.fillText("Hull Integrity: "+selectedShip.hp+"/"+selectedShip.maxHp,755,395);
	canvas.fillText("02: "+Math.floor(selectedShip.oxygen/10)+"%",755,410);
	if(selectedShip.breaches>0)
	{
		if(selectedShip.breaches<2)
		{
			canvas.fillStyle = "red";
			canvas.fillText("HULL BREACH",755,425);
			canvas.fillStyle = "white";
		}else
		{
			canvas.fillStyle = "red";
			canvas.fillText("MULTIPLE HULL BREACHES",755,425);
			canvas.fillStyle = "white";
		}
	}
	canvas.fillText("Torpedos: "+selectedShip.numTorpedos+" Mines: "+selectedShip.numMines,755,440);
	if(selectedShip.selfDestructActive)
	{
		canvas.fillStyle = "red";
		canvas.fillText("SELF DESTRUCT IN " +selectedShip.selfDestructTick,755,455);
		canvas.fillStyle = "white";
	}
	canvas.fillText("Crew Compliment: "+ selectedShip.crew.length+"/"+selectedShip.crewMax,755,470);
	if(selectedShip.awayTeamAt==null)
	{
		canvas.fillText("Away Team Ready: "+ selectedShip.awayTeam.length,755,485);	
	}else
	{
		canvas.fillText("Away Team on: "+ selectedShip.awayTeamAt.name,755,485);
	}
	
	canvas.fillText(actiontext,755,500);
	canvas.fillText("Coords: "+Math.floor(selectedShip.x)+","+Math.floor(selectedShip.y),755,515);
	canvas.fillText("Heading: "+ Math.floor(selectedShip.heading),755,530);
	canvas.fillText("Desired Heading: "+ selectedShip.desiredHeading,755,545);
	canvas.fillText("Speed: "+ selectedShip.speed+" / "+selectedShip.desiredSpeed+" / "+selectedShip.maxSpeed,755,560);
	var ghjk="";
	if(selectedShip.cloaked) {ghjk+="Cloaked ";}
	if(selectedShip.shields>0) {ghjk+="Shields: "+selectedShip.shields;}
	canvas.fillText(ghjk,755,575);
	//if(selectedShip.cloaked) {canvas.fillText("Cloaked",755,575);}

	canvas.fillText("Crew Lost: "+ selectedShip.crewLost,755,590);
	canvas.fillText("OrbitTrack: "+ selectedShip.orbitTrack,755,605);
	canvas.fillText("Ships Detected Nearby: "+ selectedShip.nearbyVessels.length,755,620)
	canvas.fillText("Systems Detected Nearby: "+ selectedShip.nearbySystems.length,755,635)
	
	
	//-===========/
	if((selectedShip.torpedoTarget) && (false))
	{
	var actiontext="Full Stop";
	if((Math.abs(selectedShip.torpedoTarget.x-selectedShip.x)<selectedShip.phaserRange) && (Math.abs(selectedShip.torpedoTarget.y-selectedShip.y)<selectedShip.phaserRange)) //todo distance!
	{
		canvas.fillStyle="red";
		canvas.fillText("IN PHASER RANGE!",55,330);
		canvas.fillStyle="white";
	}
	if((selectedShip.destination) && (selectedShip.orders==Orders.Attack))
	{
		if(selectedShip.torpedoTarget.speed>0){
			if(selectedShip.torpedoTarget.desiredOrbitTarg)
			{
				actiontext=selectedShip.torpedoTarget.status;
			}else
			{
				actiontext="Exploring the " +getQuadrant(selectedShip) + " Quadrant";
			}
		}
	}
	if(selectedShip.torpedoTarget.orbiting)
	{
		if(selectedShip.torpedoTarget.leavingProgress)
		{
			actiontext="Breaking Orbit";
		}else
		{
			actiontext="Orbiting "+selectedShip.torpedoTarget.orbitTarg.name;
		}
	}else if(selectedShip.torpedoTarget.turning)
	{
		actiontext="Adjusting Heading";
	}
	canvas.fillText("Ship: "+selectedShip.torpedoTarget.prefix+" "+selectedShip.torpedoTarget.name,55,350);
	if(selectedShip.torpedoTarget.destination)
	{
		canvas.fillText("Following: "+selectedShip.torpedoTarget.destination.prefix+" "+selectedShip.torpedoTarget.destination.name,55,365);
	}
	if(selectedShip.torpedoTarget.torpedoTarget)
	{
		canvas.fillText("Targeting: "+selectedShip.torpedoTarget.torpedoTarget.prefix+" "+selectedShip.torpedoTarget.torpedoTarget.name,55,380);
	}//else if selectedShip.torpedoTarget.
	canvas.fillText("Hull Integrity: "+selectedShip.torpedoTarget.hp+"/"+selectedShip.torpedoTarget.maxHp,55,395);
	canvas.fillText("02: "+Math.floor(selectedShip.torpedoTarget.oxygen/10)+"%",55,410);
	if(selectedShip.torpedoTarget.breaches>0)
	{
		if(selectedShip.torpedoTarget.breaches<2)
		{
			canvas.fillStyle = "red";
			canvas.fillText("HULL BREACH",55,425);
			canvas.fillStyle = "white";
		}else
		{
			canvas.fillStyle = "red";
			canvas.fillText("MULTIPLE HULL BREACHES",55,425);
			canvas.fillStyle = "white";
		}
	}
	canvas.fillText("Torpedos: "+selectedShip.torpedoTarget.numTorpedos+" Mines: "+selectedShip.torpedoTarget.numMines,55,440);
	if(selectedShip.torpedoTarget.selfDestructActive)
	{
		canvas.fillStyle = "red";
		canvas.fillText("SELF DESTRUCT IN " +selectedShip.torpedoTarget.selfDestructTick,55,455);
		canvas.fillStyle = "white";
	}
	canvas.fillText("Crew Compliment: "+ selectedShip.torpedoTarget.crew.length+"/"+selectedShip.torpedoTarget.crewMax,55,470);
	canvas.fillText("Class: "+ selectedShip.torpedoTarget.class,55,485);
	canvas.fillText(actiontext,55,500);
	canvas.fillText("Coords: "+Math.floor(selectedShip.torpedoTarget.x)+","+Math.floor(selectedShip.torpedoTarget.y),55,515);
	canvas.fillText("Heading: "+ Math.floor(selectedShip.torpedoTarget.heading),55,530);
	canvas.fillText("Desired Heading: "+ selectedShip.torpedoTarget.desiredHeading,55,545);
	canvas.fillText("Speed: "+ selectedShip.torpedoTarget.speed+" / "+selectedShip.torpedoTarget.desiredSpeed+" / "+selectedShip.torpedoTarget.maxSpeed,55,560);
	var ghjk="";
	if(selectedShip.torpedoTarget.cloaked) {ghjk+="Cloaked ";}
	if(selectedShip.torpedoTarget.shields>0) {ghjk+="Shields: "+selectedShip.torpedoTarget.shields;}
	canvas.fillText(ghjk,55,575);
	//if(selectedShip.torpedoTarget.cloaked) {canvas.fillText("Cloaked",55,575);}

	canvas.fillText("Crew Lost: "+ selectedShip.torpedoTarget.crewLost,55,590);
	canvas.fillText("OrbitTrack: "+ selectedShip.torpedoTarget.orbitTrack,55,605);
	canvas.fillText("Ships Detected Nearby: "+ selectedShip.torpedoTarget.nearbyVessels.length,55,620)
	canvas.fillText("Systems Detected Nearby: "+ selectedShip.torpedoTarget.nearbySystems.length,55,635)
	}
	productionBar.val=civs[0].productionTick;
	productionBar.maxVal=civs[0].nextProduction;
	productionBar.draw(canvas,camera);
	researchBar.val=civs[0].researchTick;
	researchBar.maxVal=civs[0].nextResearch;
	researchBar.draw(canvas,camera);
};

function mainMenuDraw(){
    drawStarfield(canvas,camera);
	monsta.draw(canvas,camera);
	//canvas.fillStyle = "black";
	//canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	//titlesprite.draw(canvas,0,0);
	//canvas.fillStyle = "white";
	
	/*if(mmcur){
		canvas.fillText("-",160,450);
	}else	{
		canvas.fillText("-",160,475);

	}*/
	
	for(var i=0;i<ships.length;i++)
	{
		ships[i].draw(canvas,camera);
		if(isOver(ships[i],camera))
		{
			drawmousetext(canvas,ships[i],camera);
		}
	}
	blamera={};
	blamera.x=-camera.x;
	blamera.y=-camera.y;
	blamera.zoom=camera.zoom;
	
	for(var i=0;i<numSystems;i++)
	{
		stars[i].draw(canvas,camera);
		if(isOver(stars[i],camera))
		{
			drawmousetext(canvas,stars[i],camera);
		}
		for(var j=0;j<stars[i].planets.length;j++)
		{
			if(isOver(stars[i].planets[j],camera))
			{
				drawmousetext(canvas,stars[i].planets[j],camera);
			}
		}
	}

	
	canvas.save();
	
	//selected.draw(canvas,camera);
	if((stars[curSystem].planets[stars[curSystem].selected].type==4) || (stars[curSystem].planets[stars[curSystem].selected].type==5))
	{
		canvas.translate((stars[curSystem].planets[stars[curSystem].selected].x+camera.x)*camera.zoom,(stars[curSystem].planets[stars[curSystem].selected].y+camera.y)*camera.zoom);
		canvas.scale(stars[curSystem].planets[stars[curSystem].selected].size*camera.zoom,stars[curSystem].planets[stars[curSystem].selected].size*camera.zoom);
		selectedSpriteBig.draw(canvas, -32,-32);
	}else
	{
		canvas.translate((stars[curSystem].planets[stars[curSystem].selected].x+camera.x)*camera.zoom,(stars[curSystem].planets[stars[curSystem].selected].y+camera.y)*camera.zoom);
		canvas.scale(stars[curSystem].planets[stars[curSystem].selected].size*camera.zoom,stars[curSystem].planets[stars[curSystem].selected].size*camera.zoom);
		selectedSprite.draw(canvas, -16,-16);
	}
	canvas.restore();
	
	canvas.save(); 
	if((selectedShip) && (selectedShip.class=="Type 2 Shuttle"))//.target?
	{
		canvas.translate((selectedShip.x+camera.x)*camera.zoom,(selectedShip.y+camera.y)*camera.zoom);
		canvas.scale(camera.zoom,camera.zoom);
		shipSelSprite.draw(canvas, -8,-8);
	}else if(selectedShip)
	{
		canvas.translate((selectedShip.x+camera.x)*camera.zoom,(selectedShip.y+camera.y)*camera.zoom);
		canvas.scale(camera.zoom,camera.zoom);
		shipSelSpriteB.draw(canvas, -16,-16);
	}
	canvas.restore();
	for(var i=0;i<escapes.length;i++)
	{
		escapes[i].draw(canvas,camera);
	}
	for(var i=0;i<mines.length;i++)
	{
		mines[i].draw(canvas,camera);
	}
	for(var i=0;i<torpedos.length;i++)
	{
		torpedos[i].draw(canvas,camera);
	}
	for(var i=0;i<numNebulas;i++)
	{
		nebulas[i].draw(canvas,camera);
	}
	drawGUI();
	//draw messages
	//for (var i=0;i<civs[0].messages.length;i++)
	
	if(civs[0].messages.length>0)
	{
		civs[0].messages[0].draw(canvas,camera);
	}
	
	
	
	/*canvas.save();
		canvas.strokeStyle = "red";
		canvas.beginPath();
		canvas.lineWidth = 8;

		canvas.moveTo((20),(20));
		canvas.lineTo((200),200);
		
		canvas.closePath();
		canvas.stroke();
		canvas.restore();*/
};

var neddard=false;

function mainMenuUpdate(){
	var tick=0;
	lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	for(var i=0;i<civs.length;i++)
	{
		civs[i].update();
	}
	if(this.holdInput) {return;}
	monsta.update();
	if(crewscreenkey.check())
	{
		mode=1;
	}
	 if(debugkey.check()) {
		/*MUSIC_ON=!MUSIC_ON;
		document.getElementById("titleAudio").pause();*/
		if(!neddard){
			neddard=true;
			civs[0].fleets.push(new fleet());
			for(var i=0;i<3;i++)
			{
				civs[0].fleets[0].addShip(ships[i]);
				if(ships[i].orbiting){
					//ships[i].orderLeaveOrbit();
				}
			}
			console.log("First Fleet established");
		}
	 }
	if(startkey.check()){
		//mode=1;
		for(var i=3;i<ships.length;i++)
		{
			if(ships[i].civ.allied)
			{
				ships[i].orderOrbit(stars[0].planets[Math.floor(Math.random()*stars[0].planets.length)]);
			}
			
		}
		console.log("All allied ships coming to help defend the Sol System.");
	}
	
	if(ships.length<1)
	{
		console.log("No more ships!!!");
		return;
	}
	
	if(fleetattackkey.check())
	{
		civs[0].fleets[0].attacking=!civs[0].fleets[0].attacking;
	}
	if(evackey.check())
		{
			if((selectedShip.evacuating) || (selectedShip.evacDone))
			{
				selectedShip.selfDestructActive=true;
			}else
			{
				selectedShip.Evac(selectedShip.civ.homeworld);
				if(selectedShip.crew.length>1)
				{
					console.log(selectedShip.name+ "'s crew is abandoning ship.");
				}else if(selectedShip.crew.length>0)
				{
					console.log(selectedShip.name+ "'s captain is abandoning ship.");
				}else if(selectedShip.crew.length<0)
				{
					console.log(selectedShip.name+ "Confirm self destruct?");
				}
				//selectedShip.captainFlees=true;
			}
		}
	if((selectedShip) &&(!selectedShip.adrift) && (selectedShip.crew.length>0))
	{
		
		
		if(tractorkey.check())
		{
			if(selectedShip.tractorClient)
			{
				selectedShip.unTractorSomething();
			}else if(selectedShip.tractorTarget)
			{
				selectedShip.tractorSomething(selectedShip.tractorTarget);
			}
		}
		
		if(shipleftkey.check())
		{
			selectedShip.adjustHeading(selectedShip.heading-20);
			selectedShip.manualHelm();
		}
		if(shiprightkey.check())
		{
			selectedShip.adjustHeading(selectedShip.heading+20);
			selectedShip.manualHelm();
		}
		if(shipgokey.check())
		{
			if(selectedShip.desiredSpeed<selectedShip.maxSpeed)
			{
				selectedShip.desiredSpeed++;
			}
		}
		if(minekey.check())
		{
			selectedShip.layMine();
		}
		if(firekey.check())
		{
			selectedShip.fireTorpedo();
		}
		if(phaserkey.check())
		{
			selectedShip.firePhasers();
		}
		if(shipslowkey.check())
		{
			if(selectedShip.desiredSpeed>0)
			{
				selectedShip.desiredSpeed--;
			}
		}
		if(gokey.check())
		{
			/*ships[0].gotoDest=true;
			ships[0].destx=420;
			ships[0].desty=300;*/
			if((selectedShip.orbiting) && (!this.leavingProgres))
			{
				selectedShip.orderLeaveOrbit();
			}else
			{
				selectedShip.orbit(stars[curSystem].planets[stars[curSystem].selected]);
				console.log("The U.S.S. "+selectedShip.name+" is now orbiting " +stars[curSystem].planets[stars[curSystem].selected].name);
			}
		}
	}else
	{
		if( (gokey.check()) || (shipslowkey.check()) || (shipgokey.check()) || (shiprightkey.check()) || (shipleftkey.check()))
		{
			console.log("No crew aboard "+selectedShip.name+ " to execute orders!");
		}
	}
	
	if(toggleshipkey.check()) //todo!
	{
		civs[0].cycleShips(camera);
	}
	
	if(toggleallshipskey.check()) //todo!
	{
		curShip++;
		if(curShip>ships.length-1) {
			curShip=0;
		}
		selectedShip=ships[curShip];
		camera.center(selectedShip);
		camera.follow(selectedShip);
		
	}
	
	if(starkey.check())
	{
		curSystem++;
		if (curSystem>numSystems-1) {curSystem=0;}
		camera.center(stars[curSystem]);
	}
	
	if(dkey.check())
	{
		stars[curSystem].planets[stars[curSystem].selected].orbitDecay=1;
	}
	
	if(plkey.check())
	{
		stars[curSystem].cyclePlanets();
	}
	if(colonizekey.check())
	{
		civs[0].orderColonize(stars[curSystem].planets[stars[curSystem].selected]);
	}
	
	if(pageupkey.checkDown())
	{
		gameSpeed+=.3;
		if (gameSpeed>10) {gameSpeed=10;}
	}
	if(pagedownkey.checkDown())
	{
		gameSpeed-=.3;
		if (gameSpeed<.3) {gameSpeed=0;}
	}

	if(keydown.shift)
	{
	  cmoverate=10;
	}else
	{
	  cmoverate=5;
	}
	if(keydown.left)
	{
		//if(camera.x<universeWidth-CANVAS_WIDTH)
		{
			camera.x+=cmoverate*camera.zoomMove;
		}
		camera.unFollow();
	}
	if(keydown.right)
	{
		//if(camera.x>0)
		{
			camera.x-=cmoverate*camera.zoomMove;
		}
		camera.unFollow();
	}
	if(keydown.up)
	{
		//if(camera.y<universeHeight-CANVAS_HEIGHT)
		{
			camera.y+=cmoverate*camera.zoomMove;
		}
		camera.unFollow();
	}
	if(keydown.down)
	{
		//if(camera.y>0)
		{
			camera.y-=cmoverate*camera.zoomMove;
		}
		camera.unFollow();
	}

	if(homekey.check())
	{
		camera.x=0-stars[0].x+CANVAS_WIDTH/2;
		camera.y=0-stars[0].y+CANVAS_HEIGHT/2;
		camera.center(stars[0]);
		curSystem=0;
		camera.unFollow();
		/*for(var i=0;i<ships.length;i++)
		{
			ships[i].Evac();
		}*/
	}
	if(pausekey.check())
	{
			//spinArt=!spinArt;
			gameSpeed=0;
	}
	for(var i=0;i<ships.length;i++)
	{
		if(ships[i].alive)
		{
			ships[i].nearbySystems=ships[i].inSensorRange(stars);	
			ships[i].nearbyVessels=ships[i].inSensorRange(ships);
			ships[i].nearbyPods=ships[i].inSensorRange(escapes);
			if(ships[i].nearbyVessels==null)
			{
				ships[i].torpedoTarget=null;
			}
			if(i!=curShip)
			{
				ships[i].drawTarget=false;
			}else
			{
				ships[i].drawTarget=true;
			}
			if(selectedShip)
			{
				selectedShip.drawTarget=true;
			}
			ships[i].update();

		}
	}
	
	if(targetkey.check())
	{
		selectedShip.cycleTarget();
	}
	if(tractortargetkey.check())
	{
		selectedShip.cycleTractorTarget();
	}
	/*for(var i=0;i<this.escapes.length;i++)
	{
		escapes[i].update();
	}
	for(var i=0;i<this.mines.length;i++)
	{
		mines[i].update(ships);
	}*/
	camera.update();
	updateEscapes();
	snoop=ships.concat(torpedos);
	snoop=snoop.concat(escapes);
	updateMines(snoop);
	snoop=ships.concat(mines);
	snoop=snoop.concat(escapes);
	updateTorpedos(snoop);
	theTime.update(Earth);
	for(var i=0;i<civs.length;i++)
	{
		civs[i].update();
		for(var j=0;j<civs[i].fleets.length;j++)
		{
			civs[i].fleets[j].orderShips();
		}
	}
	
};

ed=new textbox();

function crewScreenDraw(){
	ed.draw(canvas,camera);
	canvas.font = "16pt Calibri";
	canvas.textAlign = "center";
	canvas.textBaseline = "middle";
	canvas.fillStyle = "black";
	canvas.fillText("Crew Pool",80,20);
	
};




function crewScreenUpdate(){
	ed.x=20;
	ed.y=20;
	ed.width=700;
	ed.height=600;
	ed.msg[0]="Crew: "
	for(var i=0;i<crewPool.length;i++)
	{
		ed.msg[0]+=crewPool[i].title+" "+crewPool[i].name+" ";
	}

	if((escapekey.check()) || (crewscreenkey.check()))
	{
		mode=0;
	}
	if(starting)
	{
		
	}
};

//------------MAIN DRAW-----------------------------------------
function mainDraw() {
	
};
//------------MAIN LOOP-----------------------------------------
function mainUpdate()
{
	if(!gamestart) return;
	
	var tick=0;	
    lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	if ((milliseconds-lastani>WATER_RATE) &&(!isBattle))
	{
		tileani++;
		lastani=milliseconds;
		anicount=0;
		mapDirty=true;
    }
    if (tileani>3) {tileani=0} //tile animations
	};
merp();
