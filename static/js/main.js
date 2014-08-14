($(function(){
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
    var Tmax;

    $.ajaxSetup({async: false});
    
    $.getJSON("/static/js/data.js", function(temp_json){
        var json = temp_json.reverse();
        Tmax = json.map(function(data){ return data.num; }).reduce(function(prev,curr){
            if(prev > curr){
                return prev;
            } else { 
                return curr;
            }
        });

        json.forEach(function(data,index,arr){
        $("div#menu").append("<img src=\"" + data["file_name"] + "\" id=\"" + data["id"] + "\" />");
        $("#" + data.id).css("z-index", arr.length - 1 - index);
        $("#" + data["id"]).mouseover(function(){
            $(this).stop().animate(
                {"opacity": 1.0},
                {"duration":"fast"," easing": "easeInCirc","queue": false}
            );
        });
        $("#" + data.id).mouseout(function(){
            $(this).stop().animate(
                {"opacity": 0.6},
                {"duration":"fast"," easing": "easeInCirc","queue": false}
            );
        });
        T.push(parseFloat(data.num)/parseFloat(Tmax));
        });
    });
    
    //// calculate position ////
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
            L[i]*0.9]);
        }else{
            __thete=2.0*(_thete[i]-(Math.PI+omega));
            Pos.push([ radius + 1.0/2.0*radius*Math.sin(__thete), radius*3.0/2.0 + 1/2.0*radius*Math.cos(__thete) , L[i]*0.9]);
        }
    }
    
    //// Tominaga Wrote /////
    for(var i = 0; i < Pos.length; i++){
        dict = dict.concat([["#_" + ("00"+String(Pos.length -1 - i)).slice(-3)].concat(Pos[i])]);
    }
    
    dict.forEach(function(elem){
        setPict(elem[0],elem[1],elem[2],elem[3]);
    });
    
    ///// Definitioin of Functions //////////
    function setPict(selector,x,y,r){
        $(selector).css("left",x-r/2.0).css("top",y-r/2.0).css("width",r).css("height",r).css("border-radius",r/2.0);
    }
}))
