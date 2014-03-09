
var gameSpeed=1;

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

	


distance=function(one,two){
	return(Math.pow(one.x-two.x,2)+Math.pow(one.y-two.y,2));
};

function time(){
    this.hours=0; 
    this.minutes=0;
    this.seconds=0;
    this.days=0;
}
time.prototype.update=function(){
    this.seconds++;
    if(this.seconds>60){
        this.seconds=0;
        this.minutes++;
        if (this.minutes>60){
            this.hours++;
            if(this.hours>24) {
				this.hours=0; 
				this.days++;
			} 
            this.minutes=0;
            this.seconds=0;
        }
    }
};

var theTime=new time();

var ksavekey=new akey("o"); //define the different keys
var loadkey=new akey("l");

var randomwalk=false;
var gamestart=false;
var radar=true;

var pausekey=new akey("space");
var debugkey=new akey("l");
var escapekey=new akey("esc");
var pageupkey=new akey("o");
var pagedownkey=new akey("l");
var homekey=new akey("home");
var radarkey=new akey("y");
var escapekey=new akey("q");
var serversavekey=new akey("i");
var serverloadkey=new akey("k");
var upkey=new akey("up");
var rightkey=new akey("right");
var downkey=new akey("down");
var leftkey=new akey("left");
var tabkey=new akey("capslock");
var camspeedkey=new akey("shift");
var zoomkey=new akey("z");
var helpkey=new akey("h");
var speedkey=new akey("x");
var statuskey=new akey("s");
var rowkey=new akey("r");
var enterkey=new akey("space");
var startkey=new akey("return");
var menukey=new akey("esc");
var fleekey=new akey("f");
var aikey=new akey("a");
var addkey=aikey;
var plkey=new akey("p");
var dkey=new akey("d");

var unitinfokey=new akey("u");
var cardkey=new akey("c");
var cardcyclekey=new akey("v");
var deploykey=new akey("d");
var removekey=new akey("r");
var newkey=new akey("n");
var createkey=new akey("j");
var optkey=new akey("o");
var tamekey=new akey("t");





function merp() {
requestAnimationFrame(merp,canvas);
	if(mode==0){
		mainMenuUpdate();
		mainMenuDraw();
	}else if(mode==1){
		worldMapUpdate();
		worldMapDraw();
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

function mainMenuDraw(){
    drawStarfield(canvas,camera);
	//canvas.fillStyle = "black";
	//canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	//titlesprite.draw(canvas,0,0);
	//canvas.fillStyle = "white";
	//canvas.font = "16pt Calibri";
	//canvas.fillText("Press Enter",200,500);
	//canvas.fillText("  New Game",175,450);
	//canvas.fillStyle = "grey";
	//canvas.fillText("  Load Game",175,475);
    canvas.fillText("Gamespeed: "+gameSpeed,815,25);
	canvas.fillText("Particles: "+ monsta.particles.length,815,40);
	canvas.fillText("System: "+sun.name,25,55);
	canvas.fillText("Planets: "+ sun.numPlanets,25,70);
	canvas.fillText("Astroids: "+ sun.numAstroids,25,85);
	canvas.fillText("Coords: "+sun.x+","+sun.y,25,100);
	if(sun.numPlanets>0){
		var typestr="Class M!";
		if (sun.planets[sun.selected].type==0) {typestr="Earthy!"}
		if (sun.planets[sun.selected].type==1) {typestr="Rocky";}
		if (sun.planets[sun.selected].type==2) {typestr="Hot";}
		if (sun.planets[sun.selected].type==3) {typestr="Icey";}
		if (sun.planets[sun.selected].type==4) {typestr="Gas Giant";}
		if (sun.planets[sun.selected].type==5) {typestr="Small Meteor";}
		if (sun.planets[sun.selected].type==6) {typestr="Average Meteor";}
	
		canvas.fillText("Planet Name: "+ sun.planets[sun.selected].name,25,115);
		canvas.fillText("Planet Type: "+ typestr,25,130);
		if(sun.planets[sun.selected].orbitDecay>0)
		{
			canvas.fillStyle = "red";
			canvas.fillText("WARNING: ORBIT DECAYING",25,145);
			canvas.fillStyle = "white";
		
		}
	}
	
	/*if(mmcur){
		canvas.fillText("-",160,450);
	}else	{
		canvas.fillText("-",160,475);

	}*/
	monsta.draw(canvas,camera);
	//selected.draw(canvas,camera);
	if(sun.planets[sun.selected].type==4)
	{
		selectedSpriteBig.draw(canvas, sun.planets[sun.selected].x+camera.x,sun.planets[sun.selected].y+camera.y);
	}else
	{
		selectedSprite.draw(canvas, sun.planets[sun.selected].x+camera.x,sun.planets[sun.selected].y+camera.y);
	}
	//canvas.fillText("Particles: "+ monsta.particles.length,460,550);
};

function mainMenuUpdate(){
	var tick=0;
	lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	monsta.update();
	 if(debugkey.check()) {
		MUSIC_ON=!MUSIC_ON;
		document.getElementById("titleAudio").pause();
		//monsta.startOrbit(40000,Math.floor(Math.random()*CANVAS_WIDTH),Math.floor(Math.random()*CANVAS_HEIGHT),60);
	 }
	if(startkey.check()){
		mode=1;
	}
	/*if(downkey.check()){
		mmcur=!mmcur;
	}
	if(upkey.check()){
		mmcur=!mmcur;
	}*/
	
	if(dkey.check())
	{
		sun.planets[sun.selected].orbitDecay=1;
	}
	
	if(plkey.check())
	{
		sun.cyclePlanets();
		console.log("yard");
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
		camera.x+=cmoverate;
	}
	if(keydown.right)
	{
		camera.x-=cmoverate;
	}
	if(keydown.up)
	{
		camera.y+=cmoverate;
	}
	if(keydown.down)
	{
		camera.y-=cmoverate;
	}

	if(homekey.check())
	{
		camera.x=0;
		camera.y=0;
	}
	if(pausekey.check())
	{
		spinArt=!spinArt;
	}
	
};



function worldMapDraw(){
worldmapsprite.draw(canvas,0,0);
	if(starting) {
		canvas.font = "16pt Calibri";
		canvas.fillStyle = "white";
		canvas.fillText("LOADING....", 740, 627);
	}
	var prevPoint=maps[0];
	canvas.beginPath();
	canvas.lineWidth = 7;
	canvas.moveTo(maps[0].x+14,maps[0].y+17);
	for(var i=0;i<numMapPoints;i++)
	{
		if((i==0) || (reqsMet(i)))
		{
			canvas.lineTo(maps[i].x+14,maps[i].y+17);
			prevPoint=maps[i];
		}
	}
	
	canvas.stroke();
	canvas.closePath();//todo multiple lines?
	for(var i=0;i<numMapPoints;i++)
	{

		
		if(maps[i].team==0)
		{
			bluelocationsprite.draw(canvas,maps[i].x,maps[i].y);
			
		}else
		{
			if((i==0) || (reqsMet(i)))
				{

					//canvas.moveTo(prevPoint.x+14,prevPoint.y+17);

					redlocationsprite.draw(canvas,maps[i].x,maps[i].y);

				}
				

		}

		
	}

	
	canvas.font = "19pt Algerian";
	canvas.textAlign = "center";
	canvas.textBaseline = "middle";
	canvas.fillStyle = "black";
	canvas.fillText(maps[mapSelected].name,600,100);
	canvas.font = "16pt Calibri";
	
	if(((reqsMet(mapSelected)))&&(startkey.check())){
		canvas.font = "16pt Calibri";
		canvas.fillStyle = "white";
		canvas.fillText("LOADING....", 740, 627);
		starting=true;
		return;
	}
};




function worldMapUpdate(){
	var tick=0;
	lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	
	//check for clicks on maps, move there or close as possible.
	//check for key for menu
	if(debugkey.check()){
		for(var i=0;i<numMapPoints;i++)
		{
			maps[i].team=0;
		}
	}
	if(tabkey.check()){
		//if(maps(mapSelected+1).team==0){ todo
		if((true/*mapSelected<1*/) && (reqsMet(mapSelected+1)))
		{
			mapSelected++;
		}	
		if(mapSelected>numMapPoints-1){mapSelected=0;}
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
