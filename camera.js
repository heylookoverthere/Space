
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
	following:null,
	
	center: function(targ) {
        //if(this.zoom>1) {tx=0;ty=0;x=0;y=0;return;}
		//mapDirty=true;
		var tax=0-Math.floor(targ.x-CANVAS_WIDTH/2);
		var tay=0-Math.floor(targ.y-CANVAS_HEIGHT/2);

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
