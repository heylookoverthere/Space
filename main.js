
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
var zoomkey=new akey("z");
var plkey=new akey("p");
var startkey=new akey("return");
var phaserkey=new akey("u");
var tractorkey=new akey("b");
var tractortargetkey=new akey("n");

var dkey=new akey("d");
var starkey=new akey("s");
var gokey=new akey("g");
var toggleshipkey=new akey("h");
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
		if(stars[curSystem].planets[stars[curSystem].selected].orbitDecay>0)
		{
			canvas.fillStyle = "red";
			canvas.fillText("WARNING: ORBIT DECAYING",25,185);
			canvas.fillStyle = "white";
		
		}
	}
	//ship info
	var actiontext="Full Stop";
	if(ships[curShip].speed>0){
		if(ships[curShip].desiredOrbitTarg)
		{
			actiontext=ships[curShip].status;
		}else
		{
			actiontext="Exploring the " +getQuadrant(ships[curShip]) + " Quadrant";
		}
	}
	if(ships[curShip].nearbyPods.length>0)
	{
			canvas.fillStyle = "red";
			if(ships[curShip].nearbyPods.length>1)
			{
				canvas.fillText(ships[curShip].nearbyPods.length+ " escape pods detected nearby",755,315);
			}else
			{
				canvas.fillText(ships[curShip].nearbyPods.length+ " escape pod detected nearby",755,315);
			}
			canvas.fillStyle = "white";
	}
	if(ships[curShip].orbiting)
	{
		if(ships[curShip].leavingProgress)
		{
			actiontext="Breaking Orbit";
		}else
		{
			actiontext="Orbiting "+ships[curShip].orbitTarg.name;
		}
	}else if(ships[curShip].turning)
	{
		actiontext="Adjusting Heading";
	}
	canvas.fillText("Ship: "+ships[curShip].prefix+" "+ships[curShip].name,755,250);
	canvas.fillText("Class: "+ ships[curShip].class,755,265);
	if(ships[curShip].destination)
	{
		canvas.fillText("Following: "+ships[curShip].destination.prefix+" "+ships[curShip].destination.name,755,365);
	}
	if(ships[curShip].torpedoTarget)
	{
		canvas.fillText("Targeting: "+ships[curShip].torpedoTarget.prefix+" "+ships[curShip].torpedoTarget.name,755,380);
	}//else if ships[curShip].
	canvas.fillText("Hull Integrity: "+ships[curShip].hp+"/"+ships[curShip].maxHp,755,395);
	canvas.fillText("02: "+Math.floor(ships[curShip].oxygen/10)+"%",755,410);
	if(ships[curShip].breaches>0)
	{
		if(ships[curShip].breaches<2)
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
	canvas.fillText("Torpedos: "+ships[curShip].numTorpedos+" Mines: "+ships[curShip].numMines,755,440);
	if(ships[curShip].selfDestructActive)
	{
		canvas.fillStyle = "red";
		canvas.fillText("SELF DESTRUCT IN " +ships[curShip].selfDestructTick,755,455);
		canvas.fillStyle = "white";
	}
	canvas.fillText("Crew Compliment: "+ ships[curShip].crew.length+"/"+ships[curShip].crewMax,755,470);
	if(ships[curShip].awayTeamAt==null)
	{
		canvas.fillText("Away Team Ready: "+ ships[curShip].awayTeam.length,755,485);	
	}else
	{
		canvas.fillText("Away Team on: "+ ships[curShip].awayTeamAt.name,755,485);
	}
	
	canvas.fillText(actiontext,755,500);
	canvas.fillText("Coords: "+Math.floor(ships[curShip].x)+","+Math.floor(ships[curShip].y),755,515);
	canvas.fillText("Heading: "+ Math.floor(ships[curShip].heading),755,530);
	canvas.fillText("Desired Heading: "+ ships[curShip].desiredHeading,755,545);
	canvas.fillText("Speed: "+ ships[curShip].speed+" / "+ships[curShip].desiredSpeed+" / "+ships[curShip].maxSpeed,755,560);
	var ghjk="";
	if(ships[curShip].cloaked) {ghjk+="Cloaked ";}
	if(ships[curShip].shields>0) {ghjk+="Shields: "+ships[curShip].shields;}
	canvas.fillText(ghjk,755,575);
	//if(ships[curShip].cloaked) {canvas.fillText("Cloaked",755,575);}

	canvas.fillText("Crew Lost: "+ ships[curShip].crewLost,755,590);
	canvas.fillText("OrbitTrack: "+ ships[curShip].orbitTrack,755,605);
	canvas.fillText("Ships Detected Nearby: "+ ships[curShip].nearbyVessels.length,755,620)
	canvas.fillText("Systems Detected Nearby: "+ ships[curShip].nearbySystems.length,755,635)
	
	
	//-===========/
	if(ships[curShip].torpedoTarget)
	{
	var actiontext="Full Stop";
	if((Math.abs(ships[curShip].torpedoTarget.x-ships[curShip].x)<ships[curShip].phaserRange) && (Math.abs(ships[curShip].torpedoTarget.y-ships[curShip].y)<ships[curShip].phaserRange)) //todo distance!
	{
		canvas.fillStyle="red";
		canvas.fillText("IN PHASER RANGE!",55,330);
		canvas.fillStyle="white";
	}
	if(ships[curShip].torpedoTarget.speed>0){
		if(ships[curShip].torpedoTarget.desiredOrbitTarg)
		{
			actiontext=ships[curShip].torpedoTarget.status;
		}else
		{
			actiontext="Exploring the " +getQuadrant(ships[curShip]) + " Quadrant";
		}
	}
	if(ships[curShip].torpedoTarget.orbiting)
	{
		if(ships[curShip].torpedoTarget.leavingProgress)
		{
			actiontext="Breaking Orbit";
		}else
		{
			actiontext="Orbiting "+ships[curShip].torpedoTarget.orbitTarg.name;
		}
	}else if(ships[curShip].torpedoTarget.turning)
	{
		actiontext="Adjusting Heading";
	}
	canvas.fillText("Ship: "+ships[curShip].torpedoTarget.prefix+" "+ships[curShip].torpedoTarget.name,55,350);
	if(ships[curShip].torpedoTarget.destination)
	{
		canvas.fillText("Following: "+ships[curShip].torpedoTarget.destination.prefix+" "+ships[curShip].torpedoTarget.destination.name,55,365);
	}
	if(ships[curShip].torpedoTarget.torpedoTarget)
	{
		canvas.fillText("Targeting: "+ships[curShip].torpedoTarget.torpedoTarget.prefix+" "+ships[curShip].torpedoTarget.torpedoTarget.name,55,380);
	}//else if ships[curShip].torpedoTarget.
	canvas.fillText("Hull Integrity: "+ships[curShip].torpedoTarget.hp+"/"+ships[curShip].torpedoTarget.maxHp,55,395);
	canvas.fillText("02: "+Math.floor(ships[curShip].torpedoTarget.oxygen/10)+"%",55,410);
	if(ships[curShip].torpedoTarget.breaches>0)
	{
		if(ships[curShip].torpedoTarget.breaches<2)
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
	canvas.fillText("Torpedos: "+ships[curShip].torpedoTarget.numTorpedos+" Mines: "+ships[curShip].torpedoTarget.numMines,55,440);
	if(ships[curShip].torpedoTarget.selfDestructActive)
	{
		canvas.fillStyle = "red";
		canvas.fillText("SELF DESTRUCT IN " +ships[curShip].torpedoTarget.selfDestructTick,55,455);
		canvas.fillStyle = "white";
	}
	canvas.fillText("Crew Compliment: "+ ships[curShip].torpedoTarget.crew.length+"/"+ships[curShip].torpedoTarget.crewMax,55,470);
	canvas.fillText("Class: "+ ships[curShip].torpedoTarget.class,55,485);
	canvas.fillText(actiontext,55,500);
	canvas.fillText("Coords: "+Math.floor(ships[curShip].torpedoTarget.x)+","+Math.floor(ships[curShip].torpedoTarget.y),55,515);
	canvas.fillText("Heading: "+ Math.floor(ships[curShip].torpedoTarget.heading),55,530);
	canvas.fillText("Desired Heading: "+ ships[curShip].torpedoTarget.desiredHeading,55,545);
	canvas.fillText("Speed: "+ ships[curShip].torpedoTarget.speed+" / "+ships[curShip].torpedoTarget.desiredSpeed+" / "+ships[curShip].torpedoTarget.maxSpeed,55,560);
	var ghjk="";
	if(ships[curShip].torpedoTarget.cloaked) {ghjk+="Cloaked ";}
	if(ships[curShip].torpedoTarget.shields>0) {ghjk+="Shields: "+ships[curShip].torpedoTarget.shields;}
	canvas.fillText(ghjk,55,575);
	//if(ships[curShip].torpedoTarget.cloaked) {canvas.fillText("Cloaked",55,575);}

	canvas.fillText("Crew Lost: "+ ships[curShip].torpedoTarget.crewLost,55,590);
	canvas.fillText("OrbitTrack: "+ ships[curShip].torpedoTarget.orbitTrack,55,605);
	canvas.fillText("Ships Detected Nearby: "+ ships[curShip].torpedoTarget.nearbyVessels.length,55,620)
	canvas.fillText("Systems Detected Nearby: "+ ships[curShip].torpedoTarget.nearbySystems.length,55,635)
	}
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
	}
	for(var i=0;i<numSystems;i++)
	{
		stars[i].draw(canvas,camera);
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
	if(ships[curShip].class=="Type 2 Shuttle")//.target?
	{
		canvas.translate((ships[curShip].x+camera.x)*camera.zoom,(ships[curShip].y+camera.y)*camera.zoom);
		canvas.scale(camera.zoom,camera.zoom);
		shipSelSprite.draw(canvas, -8,-8);
	}else
	{
		canvas.translate((ships[curShip].x+camera.x)*camera.zoom,(ships[curShip].y+camera.y)*camera.zoom);
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
			if((ships[curShip].evacuating) || (ships[curShip].evacDone))
			{
				ships[curShip].selfDestructActive=true;
			}else
			{
				ships[curShip].Evac(stars[0].planets[2]);
				if(ships[curShip].crew.length>1)
				{
					console.log(ships[curShip].name+ "'s crew is abandoning ship.");
				}else if(ships[curShip].crew.length>0)
				{
					console.log(ships[curShip].name+ "'s captain is abandoning ship.");
				}else if(ships[curShip].crew.length<0)
				{
					console.log(ships[curShip].name+ "Confirm self destruct?");
				}
				//ships[curShip].captainFlees=true;
			}
		}
	if((!ships[curShip].adrift) && (ships[curShip].crew.length>0))
	{
		
		
		if(tractorkey.check())
		{
			if(ships[curShip].tractorClient)
			{
				ships[curShip].unTractorSomething();
			}else if(ships[curShip].tractorTarget)
			{
				ships[curShip].tractorSomething(ships[curShip].tractorTarget);
			}
		}
		
		if(shipleftkey.check())
		{
			ships[curShip].adjustHeading(ships[curShip].heading-20);
			ships[curShip].manualHelm();
		}
		if(shiprightkey.check())
		{
			ships[curShip].adjustHeading(ships[curShip].heading+20);
			ships[curShip].manualHelm();
		}
		if(shipgokey.check())
		{
			if(ships[curShip].desiredSpeed<ships[curShip].maxSpeed)
			{
				ships[curShip].desiredSpeed++;
			}
		}
		if(minekey.check())
		{
			ships[curShip].layMine();
		}
		if(firekey.check())
		{
			ships[curShip].fireTorpedo();
		}
		if(phaserkey.check())
		{
			ships[curShip].firePhasers();
		}
		if(shipslowkey.check())
		{
			if(ships[curShip].desiredSpeed>0)
			{
				ships[curShip].desiredSpeed--;
			}
		}
		if(gokey.check())
		{
			/*ships[0].gotoDest=true;
			ships[0].destx=420;
			ships[0].desty=300;*/
			if((ships[curShip].orbiting) && (!this.leavingProgres))
			{
				ships[curShip].orderLeaveOrbit();
			}else
			{
				ships[curShip].orbit(stars[curSystem].planets[stars[curSystem].selected]);
				console.log("The U.S.S. "+ships[curShip].name+" is now orbiting " +stars[curSystem].planets[stars[curSystem].selected].name);
			}
		}
	}else
	{
		if( (gokey.check()) || (shipslowkey.check()) || (shipgokey.check()) || (shiprightkey.check()) || (shipleftkey.check()))
		{
			console.log("No crew aboard "+ships[curShip].name+ " to execute orders!");
		}
	}
	
	if(toggleshipkey.check()) //todo!
	{
		/*curShip++;
		if(curShip>ships.length-1) {
			curShip=0;
		}
		camera.center(ships[curShip]);
		camera.follow(ships[curShip]);*/
		
		civs[0].cycleShips(camera);
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
			ships[i].update();

		}
	}
	
	if(targetkey.check())
	{
		ships[curShip].cycleTarget();
	}
	if(tractortargetkey.check())
	{
		ships[curShip].cycleTractorTarget();
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
