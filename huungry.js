//set main namespace
goog.provide('huungry');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.fill.Frame');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.FadeTo');
goog.require('goog.math');
goog.require('huungry.Map');
goog.require('huungry.Character');
goog.require('huungry.Player');
goog.require('huungry.City');
goog.require('huungry.EnemyArmy');
goog.require('huungry.ControlsLayer');
goog.require('huungry.DialogScene');
goog.require('huungry.FightEngine');
goog.require('huungry.Unit');
goog.require('lime.GlossyButton');

WIDTH = 480;
HEIGHT = 320;
TILESIZE = 40;

// entrypoint
huungry.start = function(){

    //main game object
    var gameObj = {
        screenWidth: 480,
        screenHeight: 320,
        tileSize: 40,
        width: 2000,
        height: 2000,
        FREE_TARGET: 1,
        PLAYER_ARMY: 2,
        ENEMY_ARMY: 3,
        PLAYER_UNIT: 4,
        ENEMY_UNIT: 5,
        BLOCKED_TARGET: 6,
    };    
    gameObj.screenNumTilesX = gameObj.screenWidth/gameObj.tileSize;
    gameObj.screenNumTilesY = gameObj.screenHeight/gameObj.tileSize;
    
    //area in fight scene where units appear
    gameObj.fightScenePlayerStartX = 6;
    gameObj.fightScenePlayerEndX = 6;
    gameObj.fightScenePlayerStartY = 0;
    gameObj.fightScenePlayerEndY = gameObj.screenNumTilesY - 1;
    
    gameObj.fightSceneEnemyStartX = gameObj.screenNumTilesX-4;
    gameObj.fightSceneEnemyEndX = gameObj.screenNumTilesX-2;
    gameObj.fightSceneEnemyStartY = 0;
    gameObj.fightSceneEnemyEndY = gameObj.screenNumTilesY - 1;
    
    gameObj.maxRandPercentage = 0.2;
    
    //animation
    gameObj.animationOn = true;
    gameObj.movementDuration = 0.2;
    

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
    var pos = gameObj.map.getXYFromColRow(0,2);
    gameObj.player = new huungry.Player().setFill('assets/player.png').setPosition(pos.x, pos.y)
        .setGameObj(gameObj)
        .setMap(gameObj.map)
        .refreshMapPos();
    
    gameObj.player.init();
       
    gameObj.player.units = [
        {
            name: 'soldier',
            image: 'player.png',
            attack: 5,
            defense: 4,
            canShoot: false,
            life: 10
        },
        {
            name: 'soldier',
            image: 'player.png',
            attack: 5,
            defense: 4,
            canShoot: false,
            life: 10
        },
        {
            name: 'soldier',
            image: 'player.png',
            attack: 5,
            defense: 4,
            canShoot: false,
            life: 10
        },
        {
            name: 'soldier',
            image: 'soldier.png',
            attack: 5,
            defense: 4,
            canShoot: false,
            life: 10
        }
    ];
    
    
    gameObj.gameLayer.appendChild(gameObj.player);

    gameObj.player.toggleGamepad(true);
    
    //enemyArmies
    gameObj.enemyArmies = [];
    
    var pos = gameObj.map.getXYFromColRow(1,1);
    gameObj.enemyArmies[0] = new huungry.EnemyArmy().setFill('assets/enemy.png').setPosition(pos.x, pos.y)
        .setGameObj(gameObj)
        .setMap(gameObj.map)
        .refreshMapPos();        
        
    gameObj.enemyArmies[0].init();
    
    gameObj.enemyArmies[0].units = [
        {
            name: 'monster',
            image: 'enemy.png',
            attack: 8885,
            defense: 4,
            canShoot: false,
            life: 1
        },
        {
            name: 'monster',
            image: 'enemy.png',
            attack: 1,
            defense: 4,
            canShoot: false,
            life: 1
        },
        {
            name: 'monster',
            image: 'enemy2.png',
            attack: 1,
            defense: 4,
            canShoot: false,
            life: 1
        },
    ];
    
    
    gameObj.gameLayer.appendChild(gameObj.enemyArmies[0]);
    
    var pos = gameObj.map.getXYFromColRow(3,8);
    gameObj.enemyArmies[1] = new huungry.EnemyArmy().setFill('assets/enemy.png').setPosition(pos.x, pos.y)
        .setGameObj(gameObj)
        .setMap(gameObj.map)
        .refreshMapPos();        
        
    gameObj.enemyArmies[1].init();
    gameObj.enemyArmies[1].units = [
        {
            name: 'monster',
            image: 'enemy.png',
            attack: 5,
            defense: 4,
            canShoot: false,
            life: 10
        },
        {
            name: 'monster',
            image: 'enemy.png',
            attack: 5,
            defense: 4,
            canShoot: false,
            life: 10
        },
        {
            name: 'monster',
            image: 'enemy2.png',
            attack: 5,
            defense: 4,
            canShoot: false,
            life: 10
        },
        {
            name: 'monster',
            image: 'enemy2.png',
            attack: 5,
            defense: 4,
            canShoot: false,
            life: 10
        },
        {
            name: 'monster',
            image: 'enemy2.png',
            attack: 5,
            defense: 4,
            canShoot: false,
            life: 10
        },
        {
            name: 'monster',
            image: 'enemy2.png',
            attack: 5,
            defense: 4,
            canShoot: false,
            life: 10
        }
    ];
    gameObj.gameLayer.appendChild(gameObj.enemyArmies[1]);
    
    var pos = gameObj.map.getXYFromColRow(6,2);
    gameObj.enemyArmies[2] = new huungry.EnemyArmy().setFill('assets/enemy.png').setPosition(pos.x, pos.y)
        .setGameObj(gameObj)
        .setMap(gameObj.map)
        .refreshMapPos();        
        
    gameObj.enemyArmies[2].init();
    gameObj.enemyArmies[2].units = [
        {
            name: 'monster',
            image: 'enemy.png',
            attack: 5,
            defense: 4,
            canShoot: false,
            life: 10
        },
        {
            name: 'monster',
            image: 'enemy.png',
            attack: 5,
            defense: 4,
            canShoot: false,
            life: 10
        },
        {
            name: 'monster',
            image: 'enemy2.png',
            attack: 5,
            defense: 4,
            canShoot: false,
            life: 10
        }
        
    ];
    gameObj.gameLayer.appendChild(gameObj.enemyArmies[2]);
    
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
