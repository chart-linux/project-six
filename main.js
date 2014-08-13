($(function(){
    var radius = 400.0;
    var r = 75;
    var list = [];
    var show_list;
    var hide_list;

    for(var i=1; i <= 20; i++){
        list.push("#" + ("00" + String(i)).slice(-3));
    }
    
    ////// Six //////
    show_list = list.slice(0,18)
    hide_list = list.slice(18);
    setSix(show_list, radius);
    hidePict(hide_list);
    
    //// Event Handlers /////
    show_list.forEach(function(slctr, index, list){
        var _top = $(slctr).attr("top");
        var _left = $(slctr).attr("left");
        
        //// MouseOver and MouseOut //////
        $(slctr).mouseover(function(){
            $(slctr).stop().animate(
                {"opacity": "1.0"},
                {"duration": "fast", "easing": "linear", "queue": false}
            );
        });
        $(slctr).mouseout(function(){
            $(slctr).stop().animate(
                {"opacity": "0.7"},
                {"duration": "fast", "easing": "linear", "queue": false}
            );
        });

        //// Touchstart and Touchend /////
        $(slctr).touchstart(function(){
            $(slctr).stop().animate(
                {"opacity": "1.0"},
                {"duration": "fast", "easing": "linear", "queue": false}
            );
        });
    });

    ///// Definitioin of Functions //////////
    function hidePict(hide_list){
        hide_list.forEach(function(slctr){
            $(slctr).css("display","none")
        })
    }

    function setSix(selector_list, R){
        var large_circle = selector_list.slice(0,11);
        var small_circle = selector_list.slice(11)
        
        selector_list.forEach(function(slctr){
            $(slctr).css("display", "block");
        });

        for(var n=0; n <= 10; n++){
            setCircle(large_circle[n], R*(1.0 - Math.sin(Math.PI/10.0*parseFloat(n) - Math.PI/10.0)), R*(1 - Math.cos(Math.PI/10.0*parseFloat(n) - Math.PI/10.0)));
        }

        for(var n=0; n <= 6; n++){
            setCircle(small_circle[n], R + R/2.0*Math.sin(Math.PI*parseFloat(n)/5.0), 3.0/2.0*R + R/2.0*Math.cos(Math.PI/5.0*parseFloat(n)));
        }
    }

    function setCircle(selector,x,y){
        $(selector).css("left",x).css("top",y);
    }
}))
