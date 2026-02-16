GF.component("Zoli","Item,Outside,IncScr",{
	create:function(){
		this.sprite="zoli";
		this.hp=4;
	},
	
	step:function(){
		this.sprite=this.hspeed<0?"zoli":"zoli2";
	},
	
	draw:function(){
		if(this.hp>2){
			GF.draw.sprite(this.x,this.y-15,"gloria");
		}
	},
	
	outside:function(dir){
		if(dir=="bottom"){
			this.destroy();
		}else if(dir!="top"){
			this.hspeed*=-1;
		}
	}
});