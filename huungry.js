//set main namespace
goog.provide('huungry');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.animation.MoveTo');
goog.require('goog.math');
goog.require('huungry.Map');
goog.require('huungry.Character');
goog.require('huungry.Player');

WIDTH = 176;
HEIGHT = 128;

// entrypoint
huungry.start = function(){

    var director = new lime.Director(document.body,WIDTH, HEIGHT);
    director.makeMobileWebAppCapable();
    //director.setDisplayFPS(false);
    
    lime.scheduleManager.setDisplayRate(1000/30);
    
    var gameScene = new lime.Scene;
    layer = new lime.Layer().setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0, 0);
    gameScene.appendChild(layer);
    
    //game map
    var map = new huungry.Map().setLayer(layer).setTMXFile('assets/lesson11_map.tmx');
    map.init();
 
    //player
    var player = new huungry.Player().setPosition(100,100).setFill('assets/player1.png');
    player.setMap(map);
    player.setDefaultSpeed(50);
        
    layer.appendChild(player);
    
    goog.events.listen(layer,['mousedown', 'touchstart'], function(e) {
        e.event.stopPropagation();
        
        bounds = new goog.math.Box(-(map.height-HEIGHT), 0, 0, -(map.width-WIDTH));
        var drag = e.startDrag(false,bounds);
                
        e.swallow(['mouseup','touchend','touchcancel'],function(e){            
            map.pixelOffsetX = -map.layer.getPosition().x;
            map.pixelOffsetY = -map.layer.getPosition().y;
        
        });
        
        //move player if selected
        if(player.isSelected) {
            
            target_pos = map.getColRowFromXY(e.position.x, e.position.y);
            player.isSelected = false;
            player.walkTo(target_pos.col, target_pos.row);            
        }        
    });
    
    
    goog.events.listen(player,['mousedown', 'touchstart'], function(e) {
        e.event.stopPropagation();
        player.isSelected = player.isSelected ? false : true;
    });
    
    // set current scene active
    director.replaceScene(gameScene);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('huungry.start', huungry.start);
