	var T = [];
	var L = [];
	var thete = [];
	var _thete = [];
	var __thete = [];
	var omega = Math.PI/6.0;
	var sum = 0;
	var _sum = 0;
	var Pos = [];


	////length////
	for(var i=0; i<T.length; i++){
	L.push(100.0*T[i]+50.0);
	}
	
	///sum///
	for(var i=0;i<L.length;i++){
	sum = sum+L[i];
	}

	///thete///
	for(var i=0; i=0; i<thete.length;i++){
	_sum = _sum+L[i];
	thete.push(3.0/2.0*(Math.PI+omega)*_sum/sum);
	}

	///_thete///
	_thete = [thete[0]/2]
	for(var i=1; i<L.length; i++){
	_thete.push(thete[i-1]+1.0/2.0(thete[i]-thete[i-1]));
	}

	///Pos///
	for(var i=0; i<_thete.length; i++);{
	if(thete[i]<Math.PI+omega){
	Pos.push( [radius - radius*sin(_thete[i]-omega) , (radius - radius*cis(_thete[i]-omega) , L[i]*1.1]);
	}else{
	__thete=2.0*(thete[i]-(Math.PI+omega))
	Pos.push([ radius + 1.0/2.0*radius*sin(__thete[i]), radius*2.0/3.0 + 1/2.0*radius*cos(__thete[i]) , L[i]*1.1]);
	}