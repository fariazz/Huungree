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
goog.require('huungry.City');
goog.require('huungry.DialogScene');
goog.require('lime.GlossyButton');

WIDTH = 176;
HEIGHT = 128;

// entrypoint
huungry.start = function(){
    
    //main game object
    var gameObj = {};
    
    gameObj.director = new lime.Director(document.body,WIDTH, HEIGHT);
    gameObj.director.makeMobileWebAppCapable();
    //director.setDisplayFPS(false);
    
    lime.scheduleManager.setDisplayRate(1000/30);
    
    //game scene
    gameObj.gameScene = new lime.Scene;
    gameObj.gameLayer = new lime.Layer().setRenderer(lime.Renderer.DOM).setAnchorPoint(0, 0);
    gameObj.gameScene.appendChild(gameObj.gameLayer);
    
    //dialog scene
    gameObj.dialogScene = new huungry.DialogScene().setGameObj(gameObj);
    gameObj.dialogScene.init();
    
    //game map
    gameObj.map = new huungry.Map().setLayer(gameObj.gameLayer).setTMXFile('assets/lesson11_map.tmx');
    gameObj.map.init();
        
    //player
    player_pos = gameObj.map.getXYFromColRow(2,2);
    gameObj.player = new huungry.Player().setPosition(player_pos.x,player_pos.y).setFill('assets/player1.png');
    gameObj.player.setMap(gameObj.map);
    gameObj.player.setDefaultSpeed(50);
        
    gameObj.map.player = gameObj.player;
    
    //cities
    city_pos = gameObj.map.getXYFromColRow(1,5);
    console.log(city_pos);
    var city = new huungry.City().setPosition(city_pos.x, city_pos.y).setFill('assets/city.png').setGameObj(gameObj);
    city.init();
    gameObj.gameLayer.appendChild(city);
    
    gameObj.gameLayer.appendChild(gameObj.player);
    
    
    
    goog.events.listen(gameObj.gameLayer,['mousedown', 'touchstart'], function(e) {
        e.event.stopPropagation();
        
        bounds = new goog.math.Box(-(gameObj.map.height-HEIGHT), 0, 0, -(gameObj.map.width-WIDTH));
        var drag = e.startDrag(false,bounds);
                
        e.swallow(['mouseup','touchend','touchcancel'],function(e){            
            gameObj.map.pixelOffsetX = -gameObj.map.layer.getPosition().x;
            gameObj.map.pixelOffsetY = -gameObj.map.layer.getPosition().y;
        
        });
        
        //move player if selected
        if(gameObj.player.isSelected) {
            console.log(gameObj.map.player);
            var target_pos = gameObj.map.getColRowFromXY(e.position.x, e.position.y);
            gameObj.player.isSelected = false;
            gameObj.player.setPathTo(target_pos.col, target_pos.row);

            gameObj.map.highlightPath(gameObj.player.path, gameObj.player.getPosition());
        }        
    });
    
    
    goog.events.listen(gameObj.player,['mousedown', 'touchstart'], function(e) {
        e.event.stopPropagation();
        gameObj.player.isSelected = gameObj.player.isSelected ? false : true;
    });
    
    // set current scene active
    gameObj.director.replaceScene(gameObj.gameScene);
    gameObj.director.pushScene(gameObj.dialogScene);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('huungry.start', huungry.start);
