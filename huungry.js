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
goog.require('huungry.ControlsLayer');
goog.require('huungry.DialogScene');
goog.require('lime.GlossyButton');

WIDTH = 480;
HEIGHT = 320;
TILESIZE = 32;

// entrypoint
huungry.start = function(){

    //main game object
    var gameObj = {};
    gameObj.screenWidth = WIDTH;
    gameObj.screenHeight = HEIGHT;
    gameObj.tileSize = TILESIZE;
    gameObj.screenNumTilesX = gameObj.screenWidth/gameObj.tileSize;
    gameObj.screenNumTilesY = gameObj.screenHeight/gameObj.tileSize;

    gameObj.director = new lime.Director(document.body, gameObj.screenWidth, gameObj.screenHeight);
    gameObj.director.makeMobileWebAppCapable();
    //director.setDisplayFPS(false);

    //game scene
    gameObj.gameScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    gameObj.gameLayer = new lime.Layer().setAnchorPoint(0, 0);
    gameObj.gameScene.appendChild(gameObj.gameLayer);

    //game map
    gameObj.map = new huungry.Map().setGameObj(gameObj)
        .setJsonMap(BlockedCells.mainMap, 'blocked')
        .setBackground('assets/medium_map.png');

    gameObj.map.init();

    //player
    var pos = gameObj.map.getXYFromColRow(4,4);
    gameObj.player = new huungry.Player().setFill('assets/player.png').setPosition(pos.x, pos.y)
        .setGameObj(gameObj);

    gameObj.player.init();
    gameObj.gameLayer.appendChild(gameObj.player);

    gameObj.player.setCanMove(true);

    //controls layer
    gameObj.controlsLayer = new huungry.ControlsLayer().setGameObj(gameObj);
    gameObj.controlsLayer.init();
    gameObj.gameScene.appendChild(gameObj.controlsLayer);


    // set current scene active
    gameObj.director.replaceScene(gameObj.gameScene);

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('huungry.start', huungry.start);
