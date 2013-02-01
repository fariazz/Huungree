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
goog.require('huungry.GameObj');
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

// entrypoint
huungry.start = function(){
    
    var UnitTypes = [
        {
            id: 'bluemonster',
            name: 'blue monster',
            image: 'bluemonster.png',
            attack: 10,
            defense: 8,
            canShoot: true,
            life: 10,
            gold: 10
        },
        {
            id: 'pinkmonster',
            name: 'pink monster',
            image: 'pinkmonster.png',
            attack: 13,
            defense: 10,
            canShoot: false,
            life: 14,
            gold: 15
        },
        {
            id: 'lion',
            name: 'lion',
            image: 'lion.png',
            attack: 8,
            defense: 6,
            canShoot: false,
            life: 6,
            gold: 5
        },
        {
            id: 'zombie',
            name: 'zombie',
            image: 'zombie.png',
            attack: 16,
            defense: 5,
            canShoot: false,
            life: 12,
            gold: 13
        },
        {
            id: 'peasant',
            name: 'peasant',
            image: 'peasant.png',
            attack: 10,
            defense: 7,
            canShoot: false,
            life: 20,
            gold: 17
        },
        {
            id: 'dwarf',
            name: 'dwarf',
            image: 'dwarf.png',
            attack: 20,
            defense: 13,
            canShoot: false,
            life: 25,
            gold: 40
        },
        {
            id: 'priest',
            name: 'priest',
            image: 'priest.png',
            attack: 26,
            defense: 13,
            canShoot: false,
            life: 22,
            gold: 32
        },
        {
            id: 'soldier',
            name: 'soldier',
            image: 'solder1.png',
            attack: 18,
            defense: 10,
            canShoot: false,
            life: 18,
            gold: 24
        },
        {
            id: 'archer',
            name: 'archer',
            image: 'archer.png',
            attack: 15,
            defense: 3,
            canShoot: true,
            life: 13,
            gold: 23
        },
        {
            id: 'knight',
            name: 'knight',
            image: 'knight2.png',
            attack: 18,
            defense: 7,
            canShoot: false,
            life: 18,
            gold: 40
        },
        {
            id: 'ninja',
            name: 'ninja',
            image: 'ninja.png',
            attack: 10,
            defense: 3,
            canShoot: true,
            life: 19,
            gold: 40
        },
        {
            id: 'cross_soldier',
            name: 'cross soldier',
            image: 'solder1.png',
            attack: 10,
            defense: 3,
            canShoot: true,
            life: 19,
            gold: 40
        }
    ];
    
    var gameObj = new huungry.GameObj(document);
    gameObj.setUnitTypes(UnitTypes);       
    
    //player    
    gameObj.player = new huungry.Player().setFill('assets/knight1.png')
        .setGameObj(gameObj);
        
    gameObj.player.maxNumUnits = 14;   
    gameObj.player.units = [
        gameObj.cloneUnit(gameObj.unitTypes['priest']),
        gameObj.cloneUnit(gameObj.unitTypes['knight']),
        gameObj.cloneUnit(gameObj.unitTypes['soldier']),
        gameObj.cloneUnit(gameObj.unitTypes['soldier']),
        gameObj.cloneUnit(gameObj.unitTypes['archer'])
    ];
    
    //splash screen
    gameObj.splashScreen = new Object();
    gameObj.splashScreen.scene = new lime.Scene().setRenderer(lime.Renderer.DOM);
    gameObj.splashScreen.background = new lime.Sprite().setAnchorPoint(0,0).
        setFill('assets/splashscreen.png').setSize(gameObj.screenWidth, gameObj.screenHeight);
    gameObj.splashScreen.startBtn = new lime.GlossyButton().setColor('#133242').setText('Start')
        .setPosition(gameObj.tileSize*3, gameObj.tileSize*7)
        .setSize(gameObj.tileSize*2, gameObj.tileSize);
    
    gameObj.splashScreen.scene.appendChild(gameObj.splashScreen.background);
    gameObj.splashScreen.scene.appendChild(gameObj.splashScreen.startBtn);
    
    goog.events.listen(gameObj.splashScreen.startBtn,['mousedown', 'touchstart'], function(e) {
        gameObj.runLevel('level1');
    });
    
    gameObj.director.replaceScene(gameObj.splashScreen.scene);
    
    //player details screen
    gameObj.playerInfoScene = new lime.Scene().setRenderer(lime.Renderer.DOM);    
    
    var winBackground = new lime.Sprite().setAnchorPoint(0,0).setPosition(0,0)
            .setSize(gameObj.width, gameObj.height-500).setFill('#0D0D0D');
    
    //close button
    var closeButton = new lime.GlossyButton().setColor('#133242').setText('Back')
        .setPosition(gameObj.tileSize*10, gameObj.tileSize*7)
        .setSize(gameObj.tileSize*2, gameObj.tileSize);
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
            .setPosition(gameObj.tileSize/4, gameObj.tileSize+gameObj.tileSize*2/3*i).setAnchorPoint(0,0);
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
    
    
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('huungry.start', huungry.start);
