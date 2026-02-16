GF.component("Zsoka","DynamicVisual,Alarm",{
	create:function(){
		this.phase=1;
		this.hp=100;
		this.hpshow=100;
		this.speed=1;
		this.score=0;
		this.sprite="zsoka";
		this.setAlarm("luca",10);
		this.setAlarm("zoli",160);
		this.setAlarm("fecus",850);
	},
	
	step:function(){
		if(this.hpshow<this.hp){
			this.hpshow+=2;
		}else if(this.hpshow>this.hp){
			this.hpshow-=2;
		}
		
		if(this.phase==1.6){
			this.y++;
		}else if(this.phase==2.1){
			this.y--;
		}
		
		this.score++;
		if(GF.mouse.x>320)
			this.sprite="zsoka2";
		else
			this.sprite="zsoka";
			
		if(this.hp<=0){
			GF.message('Megöltek a Lucák! Pontszámod: '+GF.selectOne("Zsoka").score);
			GF.restartGame();
		}
	},
	
	draw:function(){
		GF.draw.z=10;
		GF.draw.color="black";
		GF.draw.text(1,1,"Pontszámod: "+this.score);
		GF.draw.color="white";
		GF.draw.text(0,0,"Pontszámod: "+this.score);
		GF.draw.color="black";
		
		GF.draw.rectangle(528,8,104,24,true);
		GF.draw.color="#0c0";
		GF.draw.rectangle(530,10,this.hpshow,20,false);
		
		
		GF.draw.color="black";
		GF.draw.z=0;
	},
	
	alarm:{
		luca:function(){
			this.speed+=0.05;
			GF.createInstance(100+Math.random()*400,-60,"Luca");
			this.setAlarm("luca",(10+Math.random()*30)/this.speed);
		},
		
		zoli:function(){
			GF.createInstance(100+Math.random()*400,-60,"Zoli");
			this.setAlarm("zoli",Math.random()*300);
		},
		
		fecus:function(){
			this.speed=1;
			this.phase=1.3;
			var fecus=GF.createInstance(200,-300,"Fecus");
			this.setAlarm("fecus2",70);
		},
		
		fecus2:function(){
			this.phase=1.6;
			this.setAlarm("fecus3",80);
		},
		
		fecus3:function(){
			this.phase=2;
		},
		
		fecus4:function(){
			this.speed=2;
			this.phase=3;
		}
	},
	
	keyPress:{
		mouseLeft:function(){
			var f=this.sprite=="zsoka"?0:38;
			var b=GF.createInstance(this.x+70+f,this.y+44,"Bullet");
			var b2=GF.createInstance(this.x+90+f,this.y+44,"Bullet");
			b.moveTo(GF.mouse.x,GF.mouse.y,20);
			b2.moveTo(GF.mouse.x,GF.mouse.y,20);
		},
		
		space:function(){
		if(GF.isKeyDown('lshift'))
			for(var i=0;i<640;i+=32){
				var b=GF.createInstance(i,480,"Bullet");
				b.vspeed=-20;
			}
		}
	}
});