var starting=false;
var bColors = ["#008000","#006400", "#FF4500", "#000080", "#696969", "#800080", "#808000", "#A52A2A", "#8B4513", "#FFDEAD", "#FFFF40","#000080" , "#FFFF80"]; //list of colors for radar/a few 
var yellowColors=["#F3F781","#F2F5A9","#FFFF00","#D7DF01","#AEB404"];
var holdInput=false;

Flag={};
Flag.MetTelaxianBountyHunters=0;
Flag.LeftNeelix=1;

var flashGUITick=0;
var flashGUITrack=0;

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
function textbox() 
 {  //draws a text box
	this.exists=false;
	this.x=140;
	this.y=370;
	this.scroll=0;
	this.width=600;
	this.label=false;
	this.height=55;
	this.options=2;
	this.object=null;
	this.civil=null;
	this.choicesStart=3;
	this.optionTrack=0;//draw the liitle -
	this.colors=new Array();
	this.msg=new Array();
	this.optionOne=function(civil1,civil2)
	{
		holdInput=false;
	};
	this.optionTwo=function(civil1,civil2)
	{
		holdInput=false;
	};
	this.optionThree=function(civil1,civil2)
	{
		holdInput=false;
	};
	this.optionTwo=null;
	this.optionThree=null;
	this.response=function()
	{
		console.log("CONSEQUENCES HAVE HAPPENED");
	};
	this.addText=function(text)
	{
		this.msg.push(text);
		this.colors.push("white");
	};
	
	this.setup=function(firsttext,x,y)
	{
		this.msg.push(firsttext);
		this.exists=true;
		holdInput=true;
		this.colors.push("white");
		this.x=x;
		this.y=y;
	};
	this.update=function()
	{
		if(upkey.check())
		{
			if(this.optionTrack>this.choicesStart)
			{
				this.optionTrack--;
			}
		}else if(downkey.check())
		{
			if(this.optionTrack<this.msg.length-1)
			{
				this.optionTrack++;
			}
		}else if(startkey.check())
		{
			//this.response();
			if(this.optionTrack-this.choicesStart==0)
			{
				this.optionOne(this.civil,civs[0]);
			}else if(this.optionTrack-this.choicesStart==1)
			{
				this.optionTwo(this.civil,civs[0]);
			}else if(this.optionTrack-this.choicesStart==2)
			{
				this.optionThree(this.civil,civs[0]);
			}else{
				holdInput=false;
			}
			this.exists=false;
			
		}
	};
	this.draw=function(can)
	{
		can.save();
		can.globalAlpha=0.80;
		can.fillStyle = "#DCDCDC";
		var hight=this.msg.length*16;
		can.fillRect(this.x-10,this.y-10,this.width+10,this.height+10+hight);
		
		can.fillStyle = "#483D8B ";
		can.fillRect(this.x,this.y,this.width-10,this.height-10+hight);
		
		can.font = "16pt Calibri";
		can.textAlign = "left";
		can.textBaseline = "middle";
		can.fillStyle = "white";
	/*(	if(this.lines==1){
			can.fillStyle=this.colors[i];
			can.fillText(this.msg[0], this.x+10,this.y+8+(14));
			if((this.options>0) && (this.optionTrack==1))
			{
				can.fillText("-",this.x+5,this.y+8);
			}
		}else*/
		//todo if text is too long put it on next line
		if(this.label)
		{
			can.fillText(this.label,this.x+4,this.y+9);
		}
		for(var i=0;i<this.msg.length;i++)
		{
			//if (i>bConsoleStr.length) {break;}
			can.fillStyle=this.colors[i];
			can.fillText(this.msg[i], this.x+16,this.y+12+(18*(i+1)));
			if((this.options>0) && (this.optionTrack==i))
			{
				can.fillText("-", this.x+17,this.y+12+(18*(i+1)));
			}
		}	
		
		can.restore();
	};
};

function sellScreen(customer) 
 {  //draws a text box
	this.exists=false;
	this.x=140;
	this.y=170;
	this.scroll=0;
	this.width=600;
	this.customer=customer.
	this.label=false;
	this.height=350;
	this.options=4;
	this.object=null;
	this.civil=null;
	this.choicesStart=3;
	this.optionTrack=0;//draw the liitle -
	this.colors=new Array();
	this.msg=new Array();
	this.itemList=new Array();
	this.cart=new Array();

	this.clearCart=function()
	{
		this.cart=new Array();
	}
	
	this.checkout=function()
	{
		var total=0;
		for(var i=0;i<this.cart.length;i++)+
		{
			total+=this.cart[i].cost;
		}
		if(total>this.cusomer.money)
		{
			console.log("Not enough money");
		}
	};
	this.addtoCart=function(){
		this.cart.push(this.itemList[this.optionTrack])
	};

	this.addItem=function(it)
	{
		
	};
	
	this.setup=function(firsttext,x,y)
	{
		this.exists=true;
		holdInput=true;
		this.colors.push("white");
		this.x=x;
		this.y=y;
		//todo!
	};
	this.update=function()
	{
		if(upkey.check())
		{
			if(this.optionTrack>this.choicesStart)
			{
				this.optionTrack--;
			}
		}else if(downkey.check())
		{
			if(this.optionTrack<this.msg.length-1)
			{
				this.optionTrack++;
			}
		}else if(startkey.check())
		{
			//this.response();
			
		}
	};
	this.draw=function(can)
	{
		can.save();
		can.globalAlpha=0.80;
		can.fillStyle = "#DCDCDC";
		var hight=this.msg.length*16;
		can.fillRect(this.x-10,this.y-10,this.width+10,this.height+10+hight);
		
		can.fillStyle = "#483D8B ";
		can.fillRect(this.x,this.y,this.width-10,this.height-10+hight);
		
		can.font = "16pt Calibri";
		can.textAlign = "left";
		can.textBaseline = "middle";
		can.fillStyle = "white";
	/*(	if(this.lines==1){
			can.fillStyle=this.colors[i];
			can.fillText(this.msg[0], this.x+10,this.y+8+(14));
			if((this.options>0) && (this.optionTrack==1))
			{
				can.fillText("-",this.x+5,this.y+8);
			}
		}else*/
		//todo if text is too long put it on next line
		if(this.label)
		{
			can.fillText(this.label,this.x+4,this.y+9);
		}
		for(var i=0;i<this.msg.length;i++)
		{
			//if (i>bConsoleStr.length) {break;}
			can.fillStyle=this.colors[i];
			can.fillText(this.msg[i], this.x+16,this.y+12+(18*(i+1)));
			if((this.options>0) && (this.optionTrack==i))
			{
				can.fillText("-", this.x+17,this.y+12+(18*(i+1)));
			}
		}	
		
		can.restore();
	};
};

function timesaver()
{

	civs[1].generateMessage(civs[0]);
};

var monsta= new particleSystem();

var TileType={};
TileType.Grass=0;
TileType.Plains=1;
TileType.Swamp=2;
TileType.Hills=7;
TileType.Snow=5;
//TileType.DeepSnow=6;
TileType.Mountains=4;
TileType.Water=20;
TileType.Ocean=24;
TileType.Lava=28;
TileType.Forest=3;
TileType.Road=8;
TileType.Sand=9;

var lastEventX=0;
var lastEventY=0;

var selBox=[];
selBox.point1=[];
selBox.point2=[];
selBox.tX=0;
selBox.tY=0;
selBox.exists=false;
selBox.p1=false;
selBox.p2=false;
selBox.width=0;
selBox.height=0;

function drawSelBox(can){
	if(!selBox.exists) {return;}
	if(selBox.p1) {flagsprite.draw(can,selBox.point1.x,selBox.point1.y);}
	var w =selBox.point1.x-selBox.point2.x;
	var h =selBox.point1.y-selBox.point2.y;
	can.strokeStyle="#FFFF00";
	can.lineWidth=1;
	can.beginPath();
	if(!selBox.p2)
	{

		can.moveTo(selBox.point1.x,selBox.point1.y);
		console.log(mX,mY);
		can.lineTo(mX,selBox.point1.y);
		can.lineTo(mX,mY);
		can.lineTo(selBox.point1.x,mY);
		can.lineTo(selBox.point1.x,selBox.point1.y);
	}else
	{
		can.moveTo(selBox.point1.x,selBox.point1.y);
		can.lineTo(selBox.point2.x,selBox.point1.y);
		can.lineTo(selBox.point2.x,selBox.point2.y);
		can.lineTo(selBox.point1.x,selBox.point2.y);
		can.lineTo(selBox.point1.x,selBox.point1.y);
	}
    can.stroke();
	can.closePath();
};
function rectOverlap(r1,r2){
	
	if(r1.x> r2.x+2) {return false;}
	if(r1.x+r1.width< r2.x) {return false;}
	if(r1.y> r2.y+2) {return false;}
	if(r1.y+r1.height< r2.y) {return false;}

	return true;
};

var numMapPoints=6;
var mmcur=false;
var bConsoleStr=new Array();
var bConsoleClr=new Array();
var bConsoleBox;
var bMenuBox;
var lastExplosion=0;
var EXPLOSION_RATE=500;
bConsoleStr.push("");
bConsoleStr.push("");
bConsoleStr.push("");
bConsoleStr.push("Game Start!");
bConsoleClr.push("white");
bConsoleClr.push("white");
bConsoleClr.push("white");
bConsoleClr.push("white");
var radarBitmap=[];
var mapBitmap=[];
var CANVAS_WIDTH = 900;
var CANVAS_HEIGHT = 640;
var MUSIC_ON=true;
var MUSIC_VOL=0.1;
var wind=Math.floor(Math.random()*2)+1;
var MAP_WIDTH = 999;
var MAP_HEIGHT = 999;
var CRIT_CHANCE=100;
var FPS = 30;
var LAVA_RATE=2000;
var WATER_RATE=2000;
var BURN_RATE=100;
var CHARANI_RATE= 200;
var SPAWN_X=22;
var SPAWN_Y=19;
var GRAVITY_RATE=5;
var TEAM_SIZE = 12;
var SELECTED=0;
var MSELECTED=0;
var MUSELECTED=0;
var BSELECTED=0;
var NUM_STATUS=5;
var NUM_CLASSES=19;
var ENCOUNTER_RATE=25000;
var TAME_CHANCE=40;
var preBattle=0;
var preBattleLength=100;
var MAPNAME ="map3";
var pageCount=0;
var cardUsed=false;
var gamespeed=0;//2;
var isBattle=false;
var isMenu=0;
var battlelength=15;
var combatants=new Array(2);
var battledelay=10;
var battletick=0;
var battleenddelay=10;
var battleendtick=0;
var numMaps=5;
var mapSelected=0;
var winmode=0;
var mode=0;
var looseX=0;
var looseY=0;
var mapDirty=true;
var mmcur=true;
var victoryCount=0;
var victoryLap=200;
var victoryReport=200;
var victoryReporting=false;
var victory=false;
var projectionCount=0;
var projectionLength=200;
//var keychart = ["w","a","d","s","up","right","down","left","m","n","shift"];
var names= new Array (2);
names[0]=new Array(120);
names[1]=new Array(120);
var mX=120;
var mY=320;
var townnames=new Array(40);
townnames= ["Qarth","Meereen","Myr","Pentos","Ashford","Ashemark","Gulltown","Pyke","Lordsport","Lannisport","Lys","Tyrosh","Iben","New Ghis","Astapor","Yunkai","Qohor","Lorath","Volantis","Braavos","Vaes Dothrak","White Harbor","Maidenpool","Oldstones","Harrenhal","Riverrun","Seaguard","Winterfell","Saltpans","Castamere","Oxcross","Crakehall","The Crag","Duskendale","Dragonstone","Rosby","Highgarden","Oldtown","Grimston","Hardhome"];
tname=new Array(5);

tname[0]=["Last Hearth","Deepwood Motte","Karhold","Tohhren's Square","Barrowton","Hornwood","White Harbor","Castle Black"];
tname[1]=["Flint's Finger","Moat Cailin","Seaguard","Oldstones"];
tname[2]=["Fairmarket","Stoney Sept","High Heart","Acorn hall","Pinkmaiden"];
tname[3]=["Maidenpool","Duskendale","Brindlewood", "Crackclaw Point"];
tname[4]=["Blackmont","Kingsgrave","Wyl","Yornwood","Godsgrace","Saltshore","Lemonwood"];
names[0]= ["Eddard", "Theon","Bealor", "Aerys", "Aemon", "Aemond", "Fletcher Dick", "Beardless Dick", "Valarr", "Hot Pie", "Lommy", "Jon", "Matarys", "Dunk", "Egg", "Aerion","Bran","Bronn","Robb","Tyrion","Jamie","Tywin","Jeor","Jorah","Mero","Stannis","Gendrey","Yoren","Rickard","Drogo","Brandon","Gregor","Sandor","Polliver","Allister","Barristan","Jeoffery","Robert","Symon","Dolorous Edd","Podrick","Renly","Illyn","Aurane","Regular Ed","Merret","Walder","HODOR","Luwin","Cressen","Janos","Tytos","Garion","Willas","Garlan","Viserys","Loras","Willem","Martyn","Illyrio","Xaro Xhoan Ducksauce","Cleon","Aegon","Emmon","Skahaz","Cleos","Tygett","Vargo","Pono","Nimble Dick","Iron Emmett","Mance","Tormund","Varamyr","Orell","Jaquen","Wease","The Tickler","Dareon","Morroqo","Marwyn","Pate","Davos","Axel","Wyman","Pyter","Varys","Arnolf","Sigorn","Hoster","Tion","Helman","Torrhen","Yohn","Lyn","Nestor","Doran","Oberyn","Qyburn","Howland","Daario","Xhondo","Yellow Dick","Zachery","Zekko","Zollo","Will","Willbert","Wendel","Wendamyr","The Weeper","Wat","Walton","Vardis","Urrigon","Ulmer","Tobho","Timett","Syrio","Styr"];
names[1]= ["Alysane", "Lyra", "Naerys", "Pia", "Lynesse", "Maege", "Rhaenyra", "Kyra", "Rhae", "Tanselle", "Daena", "Elaena", "Myriah", "Aelinor","Arya","Sansa","Shae","Meera","Mina","Gilly","Ygritte","Ami","Cersei","Tanda","Lollys","Mya","Alayne","Myrcella","Lyanna","Lemore","Jayne","Talisa","Ros","Margery", "Catlyen", "Brienne", "Olenna", "Roslin", "Lysa", "Taena","Senelle","Falyse","Barra","Bella","Joanna","Joy","Janei","Dorna","Ashara","Allyria","Asha","Osha","Rhonda","Rhea","Alerie","Alysanne","Malora","Daenerys","Irri","Rhaella","Ellia","Illyrio","Quaithe", "Missandei", "Shireen","Mezzara","Kezmya","Qezza","Jhezene","Miklaz","Arianne","Shella","Mellario","Obara","Nymeria","Tyene","Obella","Dorea","Loreza","Myranda","Thistle","Alannys","Alla ","Alia","Alyce","Minisa","Meris","Wenda","Anya","Doreah","Horma","Weasel","Tysha","Sarella","Maggi","Jenny","Barbrey","Bethany","Wylla","Leona","Alys","Amarei","Old Nan","Yna","Ysilla","Victaria","Visenya","Val","The Waif","Tya","Tysane","Tansey","Talla","Taela","Squirrel","Shiera","Sharna","Scolera","Sarra","Sallei","S'vrone","Rhea","Rhialta"];
var namesused=new Array(2);
namesused[0]=new Array(120);
namesused[1]=new Array(120);
for( var i=0; i<120; i++ ){ namesused[0][i]=false;namesused[1][i]=false; }

var titlesprite = Sprite("title");

var RGB_THRESHOLD=15;

var explosionsprite=new Array(4);
explosionsprite[0] =Sprite("explosion0");
explosionsprite[1] =Sprite("explosion1");
explosionsprite[2] =Sprite("explosion2");
explosionsprite[3] =Sprite("explosion3");

var numClouds=44;


var tileani=0;
  
 


var anicount=0;
var anirate=4000;
var lastani=0;
var gotall=false;
var BATTLE_REPORT_LENGTH=400;
var numsounds=0;
var soundsplaying ="";
var timestamp = new Date(); 
var milliseconds = timestamp.getTime();
var lasttime=0;
var enemyDeployCount=1;
var deployRate=200;
var battlespeed=100;
var battleRate=2;
var paused=false;
var mappause=false;
var battleReport=false;
var battlePause=false;
var unitinfo=false;
var lastClick=0;
var dblClickRate=350;
var healcount=0;
var healrate=140;
//var numTowns=6;
var CSELECTED=0;
var maps=new Array(6);
var mapIconWidth=32;
var mapIconHeight=45;

