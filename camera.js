var camera = {  //represents the camera, aka what part of the map is on screen
    x: 0,
    y: 0,
    width: 60,
    height: 40,
    zoom: 1,
	panning: false,
	panX: 0,
	panY: 0,
	zoom: 0,
	panSpeed: 3,
	pan: function(x,y) {
		this.panning=true;
		        if(this.zoom==1)
		{
			this.panX=x-26;
			this.panY=y-20;
		}
		else if(this.zoom==2){
			this.panX=x-46;
			this.panY=y-40;
		}else if(this.zoom==3){
			this.panX=x-78;
			this.panY=y-60;
		}
		
	},
	centerX: function() {
        if(this.zoom==1)
		{
			return this.x+26;// * Math.pow(2, curMap.zoom-1);
		}
		else if(this.zoom==2){
			return this.x+46;// * Math.pow(2, curMap.zoom-1);
		}else if(this.zoom==3){
			 return this.x+78;// * Math.pow(2, curMap.zoom-1);
		}

    },
	centerY: function() {
        if(this.zoom==1)
		{
			return this.y+20;// * Math.pow(2, curMap.zoom-1);
		}
		else if(this.zoom==2){
			return this.y+40;
		}else if(this.zoom==3){
			return this.y+60;
		}

    },
    center: function(targ) {
        //if(this.zoom>1) {tx=0;ty=0;x=0;y=0;return;}
		//mapDirty=true;
		var tax=targ.x;
		var tay=targ.y;
        if(this.zoom==1)
		{
			tax=targ.x-26;// * Math.pow(2, curMap.zoom-1);
			tay=targ.y-20;// * Math.pow(2, curMap.zoom-1);
		}
		else if(this.zoom==2){
			 tax=targ.x-46;// * Math.pow(2, curMap.zoom-1);
			tay=targ.y-40;
		}else if(this.zoom==3){
			 tax=targ.x-78;// * Math.pow(2, curMap.zoom-1);
			tay=targ.y-60;
		}
        if (tax<0) {tax=0;}
        if (tay<0) {tay=0;}
        if (tax>MAP_WIDTH-this.width) {tax=MAP_WIDTH-this.width;}
        if (tay>MAP_HEIGHT-this.height) {tay=MAP_HEIGHT-this.height;}

        this.x=tax;
        this.y=tay;
    },
	update: function() {

		if(this.panning){
			mapDirty=true;
			if((this.x<this.panX)  && (this.x<MAP_WIDTH-(this.width* this.zoom)))
			{
				this.x+=this.panSpeed;
				if(this.x>this.panX)
				{
					this.x=this.panX;
				}
			}else if((this.x>this.panX)  && (this.x>1))
			{

				this.x-=this.panSpeed;
				if(this.x<this.panX)
				{
					this.x=this.panX;
				}
			}
			if((this.y<this.panY) && (this.y<MAP_HEIGHT-(this.height* this.zoom))) //todo
			{
				
				this.y+=this.panSpeed;
				if(this.y>this.panY)
				{
					this.y=this.panY;
				}
			}else if((this.y>this.panY) && (this.y>1))
			{
				this.y-=this.panSpeed;
				if(this.y<this.panY)
				{
					this.y=this.panY;
				}
			}
			if((this.x==this.panX) && (this.y==this.panY))
			{
				this.panning=false;
			}
			if((this.x>MAP_WIDTH-((this.width+this.zoom)* this.zoom)) && (this.y>MAP_HEIGHT-((this.height+this.zoom)* this.zoom)))
			{
				this.panning=false;
			}
			if((this.x<2) && (this.y<2))
			{
				this.panning=false;
			}
		}
		this.check();
	},
    check: function() {
		if(this.zoom==1){
			this.x.clamp(0, MAP_WIDTH-60);
			this.y.clamp(0, MAP_HEIGHT-40);
		}else if(this.zoom==2){
		     this.x.clamp(0, MAP_WIDTH-60);
			 this.y.clamp(0, MAP_HEIGHT-40);
		}else if(this.zoom==3){
			this.x.clamp(0, MAP_WIDTH-60);
			this.y.clamp(0, MAP_HEIGHT-40);//todo
		}
        //if(this.zoom>1) {tx=0;ty=0;x=0;y=0;return;}
    },
    rX: function(fx) {
        return fx-this.x;
    },
    rY: function(fy) {
        return fy-this.y;
    }
};
