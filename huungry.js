//set main namespace
goog.provide('huungry');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.fill.Frame');
goog.require('lime.animation.MoveTo');
goog.require('goog.math');
goog.require('huungry.Map');
goog.require('huungry.Character');
goog.require('huungry.Player');
goog.require('huungry.City');
goog.require('huungry.Enemy');
goog.require('huungry.DialogScene');
goog.require('lime.GlossyButton');

WIDTH = 176*2;
HEIGHT = 128*2;

// entrypoint
huungry.start = function(){
    
    //main game object
    var gameObj = {};
    
    gameObj.director = new lime.Director(document.body,WIDTH, HEIGHT);
    gameObj.director.makeMobileWebAppCapable();
    //director.setDisplayFPS(false);
    
    //lime.scheduleManager.setDisplayRate(1000/30);
    
    //game scene
    gameObj.gameScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    gameObj.gameLayer = new lime.Layer().setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0, 0);
    gameObj.gameScene.appendChild(gameObj.gameLayer);
    
    //game map
    gameObj.map = new huungry.Map().setGameObj(gameObj)
        .setJsonMap(BlockedCells.mainMap, 'blocked')
        .setBackground('assets/biggermap.png');
    
    gameObj.map.init();
    
    // set current scene active
    gameObj.director.replaceScene(gameObj.gameScene);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('huungry.start', huungry.start);
