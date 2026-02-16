GF.component("Fecus","DynamicVisual,Phisical,Alarm,Collidable,IncScr",{
	create:function(){
		this.sound=GF.playSound("imperial");
		this.h=0;
		this.xstart=this.x;
		this.sprite="fecus";
		this.vspeed=2;
		this.hp=220;
		this.setAlarm("phase1",150);
	},
	
	step:function(){
		if(Math.random()>0.95){
			GF.playSound("burp");
		}
	
		this.x=this.xstart+Math.sin(this.h++/60)*160;
		
		if(this.hp<=0){
			GF.createInstance(this.x,this.y,"FecusHalott");
			this.increaseScore(1000);
			this.sound.pause();
			this.destroy();
		}
	},
	
	'alarm.phase1':function(){
		this.vspeed=0;
	},
	
	draw:function(){
		GF.draw.color="black";
		GF.draw.rectangle(this.x,this.y+20,224,16,true); //keret
		GF.draw.color="#0c0";
		GF.draw.rectangle(this.x+2,this.y+22,this.hp,12,false);
		GF.draw.color="black";
	}
});

GF.component("FecusHalott","DynamicVisual,Phisical,Outside",{
	create:function(){
		this.sprite="fecus";
		this.vgravity=0.5;
		this.hspeed=2;
	},
	
	step:function(){
		for(var i=0;i<2;++i){
			GF.createInstance(this.x+Math.random()*190,this.y+Math.random()*270,"Explosion2");
			var b=GF.createInstance(this.x+Math.random()*190,this.y+Math.random()*270,"Bullet");
			b.setSpeed(20);
			b.setDirection(Math.random()*360);
		}
		if(Math.random()>0.7){
			GF.playSound("explosion",{volume:0.2+Math.random()/2});
		}
		if(Math.random()>0.85){
			GF.playSound("ahh");
		}
	},
	
	outside:function(){
		this.destroy();
		var zs=GF.selectOne("Zsoka");
		zs.phase=2.1;
		zs.setAlarm("fecus4",80);
	}
});