//set main namespace
goog.provide('huungry');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.parser.TMX');
goog.require('lime.animation.MoveTo');
goog.require('goog.math');

// entrypoint
huungry.start = function(){

    var director = new lime.Director(document.body,176,128);
    director.makeMobileWebAppCapable();
    //director.setDisplayFPS(false);
    
    lime.scheduleManager.setDisplayRate(1000/30);
    
    var gameScene = new lime.Scene;
    layer = new lime.Layer().setRenderer(lime.Renderer.CANVAS);
    gameScene.appendChild(layer);
    
    var tmx = new lime.parser.TMX('assets/lesson11_map.tmx');

    j = 0;

	console.log(tmx);
    for(var i = 0; i < tmx.layers[j].tiles.length; i++)
    {
            tile = tmx.layers[j].tiles[i];
            sprite = new lime.Sprite().setPosition(tile.px,tile.py);
            sprite.setFill(tile.tile.frame);
            layer.appendChild(sprite);
    }
 
    //player
    var player = new lime.Sprite().setPosition(100,100).setFill('assets/player1.png');
    layer.appendChild(player);
    
    
    
    
    // set current scene active
    director.replaceScene(gameScene);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('huungry.start', huungry.start);
