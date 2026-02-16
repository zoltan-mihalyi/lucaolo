GF.component("Item","DynamicVisual,Phisical,Collidable",{
	create:function(){
		this.vspeed=3;
		this.hspeed=(Math.random()<0.5)?2:-2;
	},
	
	step:function(){
		this.hspeed+=Math.random()-0.5;
	}
});

GF.component("IncScr",{},{
	increaseScore:function(score){
		GF.selectOne("Zsoka").score+=score;
		GF.createInstance(this.x+10,this.y,"Score").score=score;
	}
});

GF.component("Score","Phisical",{
	create:function(){
		this.vspeed=-1;
		this.xstart=this.x;
		this.ell=0;
		this.color=["red","orange","yellow","green","blue","purple"][Math.random()*6>>0];
	},
	
	step:function(){
		if(this.ell++>50){
			this.destroy();
		}
		this.x=this.xstart+Math.sin(this.ell/15)*30;
	},
	
	draw:function(){
		GF.draw.alpha=(50-this.ell)/50;
		GF.draw.color="black";
		GF.draw.text(this.x+1,this.y+1,this.score);
		GF.draw.color=this.color;
		GF.draw.text(this.x,this.y,this.score);
		GF.draw.color="black";
	}
});

GF.component("Bullet","DynamicVisual,Phisical,Collidable,Outside",{
	create:function(){
		this.sprite="bullet";
	},
	
	collision:{
		Luca:function(other){
			other.increaseScore(10);
			GF.createInstance(other.x,other.y,"Explosion");
			other.destroy();
			this.destroy();
		},
		
		Zoli:function(other){
			other.hp--;
			if(other.hp<=0){
				other.increaseScore(20);
				other.destroy();
				GF.playSound("hallelujah",{volume:0.3});
				var zs=GF.selectOne("Zsoka");
				for(var i=0;i<360;i+=18){
					var b=GF.createInstance(zs.x+100,zs.y+40,"Bullet");
					b.setSpeed(20);
					b.setDirection(i);
				}
			}
			this.destroy();
		},
		
		Fecus:function(other){
			GF.createInstance(this.x-14,this.y-64,"Explosion");
			other.hp-=2;
			this.destroy();
		}
	},
	
	outside:function(){
		this.destroy();
	}
});

GF.component("Explosion","DynamicVisual,Animated",{
	create:function(){
		this.sprite="exp"+Math.floor(1+Math.random()*8);
		GF.playSound("explosion",{volume:0.5});
	},
	
	animationEnd:function(){
		this.destroy();
	}
});

GF.component("Explosion2","DynamicVisual,Animated",{
	create:function(){
		this.sprite="exp"+Math.floor(1+Math.random()*8);
	},
	
	animationEnd:function(){
		this.destroy();
	}
});

GF.component("MenuController",{
	draw:function(){
		GF.draw.text(10,100,"Üdvözöllek a LUCAÖLŐ nevű játékban!");
		GF.draw.text(10,120,"Próbáld elkerülni, hogy a Lucák elérjék a földet!");
		GF.draw.text(10,140,"Irányítás: kattintással lősz.");
		GF.draw.text(10,180,"Kattints az indításhoz!");
	},
	
	'keyPress.mouseLeft':function(){
		GF.loadScene("palya");
	}
});