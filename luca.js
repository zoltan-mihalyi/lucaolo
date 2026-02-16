GF.component("Luca","Outside,Item,IncScr",{
	create:function(){
		this.sprite="luca";
	},
	
	step:function(){
		this.sprite=this.hspeed<0?"luca2":"luca";
	},
	
	outside:function(dir){
		switch(dir){
			case 'bottom':
				GF.selectOne("Zsoka").hp-=20;
				GF.playSound("laugh1");
				this.destroy();
				break;
			case 'left':
			case 'right':
				this.teleport(dir);
				break;
		}
	}
});
	