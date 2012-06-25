//set main namespace
goog.provide('huungry');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.animation.MoveTo');
goog.require('goog.math');
goog.require('huungry.Map');

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
    var player = new lime.Sprite().setPosition(100,100).setFill('assets/player1.png');
    layer.appendChild(player);
    
    goog.events.listen(layer,['mousedown', 'touchstart'], function(e) {
        e.event.stopPropagation();
        
        var initialX = e.position.x;
        var initialY = e.position.y;
        
        //console.log(JSON.stringify(map.getColRowFromXY(e.position.x,e.position.y)));
        //console.log('initialx:'+initialX  );
        //console.log(initialY);
        
        bounds = new goog.math.Box(-(map.height-HEIGHT), 0, 0, -(map.width-WIDTH));
        //console.log(bounds);
        var drag = e.startDrag(false,bounds);
        
        
        e.swallow(['mouseup','touchend','touchcancel'],function(e){
            
            //console.log(layer.getPosition().x);
            map.pixelOffsetX = -map.layer.getPosition().x;
            map.pixelOffsetY = -map.layer.getPosition().y;
            //console.log()
            //console.log('offsetx: '+map.pixelOffsetX);
            //console.log('offsety: '+map.pixelOffsetY);
        });
        
        //move player if selected
        if(player.isSelected) {
            console.log('move player');
            player_xy = player.getPosition();
            player_pos = map.getColRowFromXY(player_xy.x, player_xy.y);
            var start = map.blockedMap.nodes[player_pos.row][player_pos.col];
            //var start = [[player_pos.row],[player_pos.col]];
            
            target_pos = map.getColRowFromXY(e.position.x, e.position.y);
            var end = map.blockedMap.nodes[target_pos.row][target_pos.col];
            //var end = [[target_pos.row],[target_pos.col]];
            
            var result = astar.search(map.blockedMap.nodes, start, end, true);            
        }
        
    });
    
    
    goog.events.listen(player,['mousedown', 'touchstart'], function(e) {
        e.event.stopPropagation();
        player.isSelected = player.isSelected ? false : true;
        console.log(player.isSelected);
    });
    
    // set current scene active
    director.replaceScene(gameScene);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('huungry.start', huungry.start);
