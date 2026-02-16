window.onload=function(){
	GF.scene("menu",{
		background:"hatter",
		width:640,
		height:480,
		instances:[{
			x:0,
			y:0,
			type:"MenuController"
		}]
	
	});
	
	GF.scene("palya",{
		background:"hatter",
		width:640,
		height:480,
		instances:[{
				x:220,
				y:220,
				type:"Zsoka"
			}
		]
	});
	
	GF.start("game","menu");
};