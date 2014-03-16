var zooms=[.2,.4,.6,.8,1,1.2,1.4,1.6,1.8,2]
var zoomMoves=[8,6,4,2,1,.8,.6,.4,.2,.1]
var zoomFactor=4;
var camera = {  //represents the camera, aka what part of the map is on screen
    x: 0,
    y: 0,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    zoom: 1,
	panning: false,
	panX: 0,
	panY: 0,
	panSpeed: 3,
	zoomFactor: 4,
	zoomMove: 1,
	following:null,
	
	center: function(targ) {
        //if(this.zoom>1) {tx=0;ty=0;x=0;y=0;return;}
		//mapDirty=true;
		if(this.zoomFactor==4)
		{
			var tax=0-Math.floor(targ.x-CANVAS_WIDTH/2);
			var tay=0-Math.floor(targ.y-CANVAS_HEIGHT/2);
		}else if(this.zoomFactor==0)
		{
			var tax=-147835;
			var tay=-148405;
		}else if(this.zoomFactor==1)
		{
			var tax=-148850;
			var tay=-149215;
		}else if(this.zoomFactor==2)
		{
			var tax=-149255;
			var tay=-149490;
		}else if(this.zoomFactor==3)
		{
			var tax=-149425;
			var tay=-149600;
		}else if(this.zoomFactor==5)
		{
			var tax=-149640;
			var tay=-149750;
		}else if(this.zoomFactor==6)
		{	
			var tax=-149690;
			var tay=-149790;
		}else if(this.zoomFactor==7)
		{	
			var tax=-149730;
			var tay=-149810;
		}else if(this.zoomFactor==8)
		{	
			var tax=-149750;
			var tay=-149830;
		}else if(this.zoomFactor==9)
		{
			var tax=-149780;
			var tay=-149850;
		}
		

        /*if (tax<0) {tax=0;}
        if (tay<0) {tay=0;}
        if (tax>universeWidth-this.width) {tax=universeWidth-this.width;}
        if (tay>universeHeight-this.height) {tay=universeHeight-this.height;}*/
		

        this.x=tax;
        this.y=tay;
    },
	follow: function(targ){
		this.following=targ;
	},
	unFollow: function(){
		this.following=null;
	},
	update: function(){
		if (this.following!=null)
		{
			camera.center(this.following);
		}
	}
};
