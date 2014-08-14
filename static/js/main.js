($(function(){
    var json = '{"ids":[{"id":"001","num":4},{"id":"002","num":19},{"id":"003","num":1},{"id":"004","num":206},{"id":"005","num":436},{"id":"006","num":671},{"id":"007","num":147},{"id":"008","num":17},{"id":"009","num":6},{"id":"010","num":6},{"id":"011","num":2},{"id":"012","num":12},{"id":"013","num":7},{"id":"014","num":9},{"id":"015","num":50},{"id":"016","num":90},{"id":"017","num":14},{"id":"018","num":87},{"id":"019","num":400},{"id":"020","num":39}]}';
    var radius = 300.0;
    var list = [];
    var show_list;
    var hide_list;
    var counter=0;
    var phi = Math.PI/12.0;
    var T=[];
    var _L=[];
    var dict = [];
    var thete = []; 
    var _thete = []; 
    var __thete = [];
    var L = [];
    var omega = Math.PI/6.0;
    var sum = 0;
    var _sum = 0;
    var Pos = [];
    
    //// animation /////
    for(var i=1; i <= 20; i++){
        list.push("#_" + ("00" + String(i)).slice(-3));
    }
    list.forEach(function(slctr){
        $(slctr).mouseover(function(){
            $(this).stop().animate(
                {"opacity": 1.0},
                {"duration":"fast"," easing": "easeInCirc","queue": false}
            );
        });
        $(slctr).mouseout(function(){
            $(this).stop().animate(
                {"opacity": 0.6},
                {"duration":"fast"," easing": "easeInCirc","queue": false}
            );
        });
    });
    
    //// calculate theta [{id,num}] -> [[x,y]] ////
    
    ///// gen T /////
    var temp = $.parseJSON(json)["ids"].map(function(elem){return parseFloat(elem["num"])});
    var max = temp.reduce(function(prev,curr,index,array){
        if(prev > curr){
            return prev;
        }else{
            return curr;
        }
    });
    temp.forEach(function(elem, index){
        T.push(parseFloat(elem)/parseFloat(max))
    });
    
    //// Tominaga Writes ////
    
    ////length////
    for(var i=0; i<T.length; i++){
        L.push(150.0*T[i]+75.0);
    }   
    
    ///sum///
    for(var i=0;i<L.length;i++){
        sum = sum+L[i];
    }   

    ///thete///
    for(var i=0; i<L.length;i++){
        _sum = _sum+L[i];
        thete.push(3.0/2.0*(Math.PI+omega)*_sum/sum);
    }   

    ///_thete///
    _thete = [thete[0]/2];
    for(var i=1; i<thete.length; i++){
        _thete.push(thete[i-1]+1.0/2.0*(thete[i]-thete[i-1]));
    }   

    ///Pos///
    for(var i=0; i<_thete.length; i++){
        if(_thete[i] < Math.PI+omega){
            Pos.push([
            radius - radius*Math.sin(_thete[i]-omega) ,
            radius - radius*Math.cos(_thete[i]-omega) ,
            L[i]*1.1]);
        }else{
            __thete=2.0*(_thete[i]-(Math.PI+omega));
            Pos.push([ radius + 1.0/2.0*radius*Math.sin(__thete), radius*3.0/2.0 + 1/2.0*radius*Math.cos(__thete) , L[i]*1.2]);
        }
    }
    
    //// Tominaga Wrote /////
    for(var i = 0; i < Pos.length; i++){
        dict = dict.concat([["#_" + ("00"+String(i + 1)).slice(-3)].concat(Pos[i])]);
    }
    
    dict.reverse().forEach(function(elem,index){
        setPict(elem[0],elem[1],elem[2],elem[3],index);
    });
    
    ///// Definitioin of Functions //////////
    function setPict(selector,x,y,r,layer){
        $(selector).css("left",x-r/2.0).css("top",y-r/2.0).css("width",r).css("height",r).css("border-radius",r/2.0).css("z-index",layer);
    }
}))
