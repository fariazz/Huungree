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
    gameObj.gameScene = new lime.Scene();
    gameObj.gameLayer = new lime.Layer().setAnchorPoint(0, 0).setRenderer(lime.Renderer.CANVAS);
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

    gameObj.player.setCanMove(true);
    
    //enemies
    gameObj.enemies = [];
    
    var pos = gameObj.map.getXYFromColRow(7,7);
    gameObj.enemies[0] = new huungry.Enemy().setFill('assets/enemy.png').setPosition(pos.x, pos.y)
        .setGameObj(gameObj)
        .setAttributes({
            life: 12
        });        
        
    gameObj.enemies[0].init();
    gameObj.enemies[0].army = 3
    gameObj.gameLayer.appendChild(gameObj.enemies[0]);
    
    var pos = gameObj.map.getXYFromColRow(3,8);
    gameObj.enemies[1] = new huungry.Enemy().setFill('assets/enemy.png').setPosition(pos.x, pos.y)
        .setGameObj(gameObj)
        .setAttributes({
            life: 8
        });        
        
    gameObj.enemies[1].init();
    gameObj.enemies[1].army = 5;
    gameObj.gameLayer.appendChild(gameObj.enemies[1]);
    
    var pos = gameObj.map.getXYFromColRow(6,2);
    gameObj.enemies[2] = new huungry.Enemy().setFill('assets/enemy.png').setPosition(pos.x, pos.y)
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
        var fightScene = new lime.Scene().setRenderer();    
        var fightLayer = new lime.Layer().setPosition(0,0).setRenderer(lime.Renderer.CANVAS).setAnchorPoint(0,0);
        var grass = new lime.Sprite().setSize(WIDTH,HEIGHT).setPosition(0,0).setAnchorPoint(0,0).setFill('rgb(0,125,0)');
        fightLayer.appendChild(grass);
        fightScene.appendChild(fightLayer);
        
        gameObj.player.inFightScene = true;
        
        gameObj.director.replaceScene(fightScene);
        
        //init player army
        var playerUnitPositions = [];
        
        while(playerUnitPositions.length < gameObj.player.army) {
            var position = {
                col: gameObj.fightScenePlayerStartX + goog.math.randomInt(gameObj.fightScenePlayerEndX-gameObj.fightScenePlayerStartX),
                row: gameObj.fightScenePlayerStartY + goog.math.randomInt(gameObj.fightScenePlayerEndY-gameObj.fightScenePlayerStartY)
            };
            
            var repeated = false;
            
            for(j=0; j < playerUnitPositions.length; j++) {
                if(playerUnitPositions[j].row == position.row && playerUnitPositions[j].col == position.col) {
                    repeated = true;
                    break;
                }
            }
            
            if(!repeated) {
                playerUnitPositions.push(position);
            }            
        }
        
        for(i=0;i<gameObj.player.army;i++) {
            var pos = gameObj.map.getXYFromColRow(playerUnitPositions[i].col,playerUnitPositions[i].row);
            var unit = new huungry.Character().setFill('assets/player.png').setPosition(pos.x, pos.y)
                .setGameObj(gameObj);
                
            fightLayer.appendChild(unit);
        }
        
        //init enemy army
        var enemyUnitPositions = [];
        
        while(enemyUnitPositions.length < enemy.army) {
            var position = {
                col: gameObj.fightSceneEnemyStartX + goog.math.randomInt(gameObj.fightSceneEnemyEndX-gameObj.fightSceneEnemyStartX),
                row: gameObj.fightSceneEnemyStartY + goog.math.randomInt(gameObj.fightSceneEnemyEndY-gameObj.fightSceneEnemyStartY)
            };
            
            var repeated = false;
            
            for(j=0; j < enemyUnitPositions.length; j++) {
                if(enemyUnitPositions[j].row == position.row && enemyUnitPositions[j].col == position.col) {
                    repeated = true;
                    break;
                }
            }
            
            if(!repeated) {
                enemyUnitPositions.push(position);
            }            
        }
        
        for(i=0;i<enemy.army;i++) {
            var pos = gameObj.map.getXYFromColRow(enemyUnitPositions[i].col,enemyUnitPositions[i].row);
            var unit = new huungry.Character().setFill('assets/enemy.png').setPosition(pos.x, pos.y)
                .setGameObj(gameObj);
                
            fightLayer.appendChild(unit);
        }
        
        var runButton = new lime.GlossyButton().setSize(70,20).setPosition(120,300)
            .setText('Run').setColor('#00CD00'); 
            
        fightLayer.appendChild(runButton);
        
        //run away, coward
        goog.events.listen(runButton, ['mousedown','touchstart'], function(e) {
            //go back to the map
            gameObj.director.replaceScene(gameObj.gameScene);
            gameObj.gameLayer.setDirty(255);
            gameObj.controlsLayer.setDirty(255);
            
            //move the hero away from the monster, or the fight scene will be triggered again!
            //this is just a quick, non-elegant way of doing this
            currentPos = gameObj.player.getPosition();
            gameObj.player.setPosition(currentPos.x-gameObj.tileSize, currentPos.y-gameObj.tileSize);

            gameObj.player.inFightScene = false;
            

        });
    }

}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('huungry.start', huungry.start);
