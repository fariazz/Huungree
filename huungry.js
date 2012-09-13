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
goog.require('huungry.EnemyArmy');
goog.require('huungry.ControlsLayer');
goog.require('huungry.DialogScene');
goog.require('huungry.FightEngine');
goog.require('lime.GlossyButton');

WIDTH = 480;
HEIGHT = 320;
TILESIZE = 40;

// entrypoint
huungry.start = function(){

    //main game object
    var gameObj = {};
    gameObj.screenWidth = WIDTH;
    gameObj.screenHeight = HEIGHT;
    gameObj.tileSize = TILESIZE;
    gameObj.screenNumTilesX = gameObj.screenWidth/gameObj.tileSize;
    gameObj.screenNumTilesY = gameObj.screenHeight/gameObj.tileSize;
    
    //area in fight scene where units appear
    gameObj.fightScenePlayerStartX = 0;
    gameObj.fightScenePlayerEndX = 3;
    gameObj.fightScenePlayerStartY = 0;
    gameObj.fightScenePlayerEndY = gameObj.screenNumTilesY - 1;
    
    gameObj.fightSceneEnemyStartX = gameObj.screenNumTilesX-3;
    gameObj.fightSceneEnemyEndX = gameObj.screenNumTilesX;
    gameObj.fightSceneEnemyStartY = 0;
    gameObj.fightSceneEnemyEndY = gameObj.screenNumTilesY - 1;
    

    

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
    
    gameObj.player.setAttributes({
        life: 10
    });
    
    gameObj.player.init();
    
    gameObj.player.army = 8;
    
    
    gameObj.gameLayer.appendChild(gameObj.player);

    gameObj.player.showGamepad(true);
    
    //enemies
    gameObj.enemies = [];
    
    var pos = gameObj.map.getXYFromColRow(7,7);
    gameObj.enemies[0] = new huungry.EnemyArmy().setFill('assets/enemy.png').setPosition(pos.x, pos.y)
        .setGameObj(gameObj)
        .setAttributes({
            life: 12
        });        
        
    gameObj.enemies[0].init();
    gameObj.enemies[0].army = 3
    gameObj.gameLayer.appendChild(gameObj.enemies[0]);
    
    var pos = gameObj.map.getXYFromColRow(3,8);
    gameObj.enemies[1] = new huungry.EnemyArmy().setFill('assets/enemy.png').setPosition(pos.x, pos.y)
        .setGameObj(gameObj)
        .setAttributes({
            life: 8
        });        
        
    gameObj.enemies[1].init();
    gameObj.enemies[1].army = 5;
    gameObj.gameLayer.appendChild(gameObj.enemies[1]);
    
    var pos = gameObj.map.getXYFromColRow(6,2);
    gameObj.enemies[2] = new huungry.EnemyArmy().setFill('assets/enemy.png').setPosition(pos.x, pos.y)
        .setGameObj(gameObj)
        .setAttributes({
            life: 10
        });        
        
    gameObj.enemies[2].init();
    gameObj.enemies[2].army = 4;
    gameObj.gameLayer.appendChild(gameObj.enemies[2]);
    
    //controls layer
    gameObj.controlsLayer = new huungry.ControlsLayer().setGameObj(gameObj);
    gameObj.controlsLayer.init();
    gameObj.gameScene.appendChild(gameObj.controlsLayer);


    // set current scene active
    gameObj.director.replaceScene(gameObj.gameScene);
    
    //fight scene
    gameObj.fight = function(enemy) {
        
        var FightEngine = new huungry.FightEngine().setGameObj(gameObj).setEnemyArmy(enemy);
        FightEngine.init();
        
        
    }

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('huungry.start', huungry.start);
