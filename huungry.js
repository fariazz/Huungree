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
goog.require('huungry.Item');
goog.require('huungry.Shop');
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
        ITEM_TARGET: 7,
        SHOP_TARGET: 8,
        CITY_TARGET: 9,
        QUEST_TARGET: 10
    };    
    gameObj.screenNumTilesX = gameObj.screenWidth/gameObj.tileSize;
    gameObj.screenNumTilesY = gameObj.screenHeight/gameObj.tileSize;
    
    //area in fight scene where units appear
    gameObj.fightScenePlayerStartX = 5;
    gameObj.fightScenePlayerEndX = 6;
    gameObj.fightScenePlayerStartY = 0;
    gameObj.fightScenePlayerEndY = gameObj.screenNumTilesY-1;
    
    gameObj.fightSceneEnemyStartX = gameObj.screenNumTilesX-4;
    gameObj.fightSceneEnemyEndX = gameObj.screenNumTilesX-2;
    gameObj.fightSceneEnemyStartY = 0;
    gameObj.fightSceneEnemyEndY = gameObj.screenNumTilesY-1;
    
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

    //items
    var pos = gameObj.map.getXYFromColRow(3,2);
    var item = new huungry.Item()
        .setGameObj(gameObj)
        .setPosition(pos.x, pos.y)
        .setMap(gameObj.map)
        .refreshMapPos()
        .setData({
            name: 'Gold',
            gold: 100,
            image: 'gold.png'
        })
        .init();  
    gameObj.gameLayer.appendChild(item);
    var pos = gameObj.map.getXYFromColRow(3,4);
    var item = new huungry.Item()
        .setGameObj(gameObj)
        .setPosition(pos.x, pos.y)
        .setMap(gameObj.map)
        .refreshMapPos()
        .setData({
            name: 'Gold',
            gold: 140,
            image: 'gold.png'
        })
        .init();  
    gameObj.gameLayer.appendChild(item);
    var pos = gameObj.map.getXYFromColRow(6,6);
    var item = new huungry.Item()
        .setGameObj(gameObj)
        .setPosition(pos.x, pos.y)
        .setMap(gameObj.map)
        .refreshMapPos()
        .setData({
            name: 'Gold',
            gold: 100,
            image: 'gold.png'
        })
        .init();  
    gameObj.gameLayer.appendChild(item);
    
    //shops
    var pos = gameObj.map.getXYFromColRow(1,4);
    var shop = new huungry.Shop()
        .setGameObj(gameObj)
        .setPosition(pos.x, pos.y)
        .setMap(gameObj.map)
        .refreshMapPos()
        .setData(
            {
                name: 'le grand shop',
                image: 'city.png',
                units: [
                    {                    
                        qty: 10,
                        price: 25,
                        unitData: {                    
                            name: 'super soldier',
                            image: 'player2.png',
                            attack: 15,
                            defense: 4,
                            canShoot: false                    
                        }
                    },
                    {                    
                        qty: 3,
                        price: 45,
                        unitData: {                    
                            name: 'x-soldier',
                            image: 'player3.png',
                            attack: 25,
                            defense: 4,
                            canShoot: false                    
                        }
                    }
                ]                
            }
        )
        .init();  
    gameObj.gameLayer.appendChild(shop);

    //player
    var pos = gameObj.map.getXYFromColRow(0,2);
    gameObj.player = new huungry.Player().setFill('assets/player.png').setPosition(pos.x, pos.y)
        .setGameObj(gameObj)
        .setMap(gameObj.map)
        .refreshMapPos();
    
    gameObj.player.init();
    gameObj.player.maxNumUnits = 14;   
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
            name: 'tough soldier',
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
    gameObj.enemyArmies[0].gold = 124;
    
    gameObj.enemyArmies[0].units = [
        {
            name: 'monster',
            image: 'enemy.png',
            attack: 12,
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
        }
    ];
    
    
    gameObj.gameLayer.appendChild(gameObj.enemyArmies[0]);
    
    var pos = gameObj.map.getXYFromColRow(3,8);
    gameObj.enemyArmies[1] = new huungry.EnemyArmy().setFill('assets/enemy.png').setPosition(pos.x, pos.y)
        .setGameObj(gameObj)
        .setMap(gameObj.map)
        .refreshMapPos();        
        
    gameObj.enemyArmies[1].init();
    gameObj.enemyArmies[1].gold = 100;
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
    gameObj.enemyArmies[2].gold = 140;
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
    
    gameObj.controlsLayer.refreshInfo();

    
    //fight scene
    gameObj.fight = function(enemy) {        
        var FightEngine = new huungry.FightEngine().setGameObj(gameObj).setEnemyArmy(enemy);
        FightEngine.init();
    }
    
    //player details screen
    gameObj.playerInfoScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);    
    
    var winBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0)
            .setSize(gameObj.width, gameObj.height-500).setFill('#0D0D0D');
    
    //close button
    var closeButton = new lime.GlossyButton().setColor('#133242').setText('Back')
        .setPosition(400, 280)
        .setSize(80, 40);
    gameObj.playerInfoScene.appendChild(winBackground);
    gameObj.playerInfoScene.appendChild(closeButton);
    gameObj.playerInfoLayer = new lime.Layer().setAnchorPoint(0, 0);            
    gameObj.playerInfoScene.appendChild(gameObj.playerInfoLayer);
    
    //close event
    goog.events.listen(closeButton,['mousedown', 'touchstart'], function(e) {
        gameObj.director.replaceScene(gameObj.gameScene);
    });

    //launch event
    goog.events.listen(gameObj.player,['mousedown', 'touchstart'], function(e) {
        console.log(gameObj.playerInfoScene);
        gameObj.playerInfoLayer.removeAllChildren();
        
        //player units
        for(var i=0; i<gameObj.player.units.length; i++) {          
            var label = new lime.Label().setText(gameObj.player.units[i].name+' - '+Math.ceil(gameObj.player.units[i].life)).setFontColor('#E8FC08')
            .setPosition(10, 50+30*i).setAnchorPoint(0,0);
            gameObj.playerInfoLayer.appendChild(label);
        }
        gameObj.director.replaceScene(gameObj.playerInfoScene);
    });
    
    //open when clicking on the player
    //goog.events.listen()
    //
    //
    //
    // set current scene active
    gameObj.director.replaceScene(gameObj.gameScene);
    
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('huungry.start', huungry.start);
