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
    
    this.levels = [
        {
            codeName: 'level1_new',
            displayName: 'Level 1',
            image: 'scroll-fire.png',
            introText: 'This is an introduction to level 1',
            introImg: 'scroll-fire.png',
            questText: 'Your goal in this level is to blablabablab'
        },
        {
            codeName: 'level2',
            displayName: 'Level 2',
            image: 'scroll-fire.png',
            introText: 'This is an introduction to level 2',
            introImg: 'scroll-fire.png',
            questText: 'Your goal in this level is to blablabablab'
        },
        {
            codeName: 'level3',
            displayName: 'Level 3',
            image: 'scroll-fire.png',
            introText: 'This is an introduction to level 3',
            introImg: 'scroll-fire.png',
            questText: 'Your goal in this level is to blablabablab'
        },
        {
            codeName: 'level4',
            displayName: 'Level 4',
            image: 'scroll-fire.png',
            introText: 'This is an introduction to level 4',
            introImg: 'scroll-fire.png',
            questText: 'Your goal in this level is to blablabablab'
        },
        {
            codeName: 'level5',
            displayName: 'Level 5',
            image: 'scroll-fire.png',
            introText: 'This is an introduction to level 5',
            introImg: 'scroll-fire.png',
            questText: 'Your goal in this level is to blablabablab'
        },
        {
            codeName: 'level6',
            displayName: 'Level 6',
            image: 'scroll-fire.png',
            introText: 'This is an introduction to level 6',
            introImg: 'scroll-fire.png',
            questText: 'Your goal in this level is to blablabablab'
        },
    ];
    
    var UnitTypes = [
        {
            id: 'bluemonster',
            name: 'blue monster',
            image: 'bluemonster.png',
            attack: 10,
            defense: 8,
            canShoot: true,
            gold: 10
        },
        {
            id: 'pinkmonster',
            name: 'pink monster',
            image: 'pinkmonster.png',
            attack: 13,
            defense: 10,
            canShoot: false,
            gold: 15
        },
        {
            id: 'lion',
            name: 'lion',
            image: 'lion.png',
            attack: 8,
            defense: 6,
            canShoot: false,
            gold: 5
        },
        {
            id: 'zombie',
            name: 'zombie',
            image: 'zombie.png',
            attack: 16,
            defense: 5,
            canShoot: false,
            gold: 13
        },
        {
            id: 'peasant',
            name: 'peasant',
            image: 'peasant.png',
            attack: 10,
            defense: 7,
            canShoot: false,
            gold: 17
        },
        {
            id: 'dwarf',
            name: 'dwarf',
            image: 'dwarf.png',
            attack: 20,
            defense: 13,
            canShoot: false,
            gold: 40
        },
        {
            id: 'priest',
            name: 'priest',
            image: 'priest.png',
            attack: 26,
            defense: 13,
            canShoot: false,
            gold: 32
        },
        {
            id: 'soldier',
            name: 'soldier',
            image: 'solder1.png',
            attack: 18,
            defense: 10,
            canShoot: false,
            gold: 24
        },
        {
            id: 'archer',
            name: 'archer',
            image: 'archer.png',
            attack: 15,
            defense: 3,
            canShoot: true,
            gold: 23
        },
        {
            id: 'knight',
            name: 'knight of the order',
            image: 'knight2.png',
            attack: 18,
            defense: 7,
            canShoot: false,
            gold: 40
        },
        {
            id: 'ninja',
            name: 'ninja',
            image: 'ninja.png',
            attack: 10,
            defense: 3,
            canShoot: true,
            gold: 40
        },
        {
            id: 'cross_soldier',
            name: 'cross soldier',
            image: 'solder1.png',
            attack: 10,
            defense: 3,
            canShoot: true,
            gold: 40
        }
    ];
    
    var gameObj = new huungry.GameObj(document);
    gameObj.setUnitTypes(UnitTypes);       
    
    //player    
    gameObj.player = new huungry.Player().setFill('assets/knight1.png')
        .setGameObj(gameObj);
        
    gameObj.player.maxNumUnits = 10;   
    gameObj.player.units = [
        gameObj.cloneUnit(gameObj.unitTypes['priest'], 5),
        gameObj.cloneUnit(gameObj.unitTypes['knight'], 5),
        gameObj.cloneUnit(gameObj.unitTypes['soldier'], 6),
        gameObj.cloneUnit(gameObj.unitTypes['soldier'], 7),
        gameObj.cloneUnit(gameObj.unitTypes['archer'], 8)
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
    
    //level selection screen
    gameObj.levelSelectionScreen = new Object();
    gameObj.levelSelectionScreen.scene = new lime.Scene().setRenderer(lime.Renderer.DOM);
    gameObj.levelSelectionScreen.background = new lime.Sprite().setAnchorPoint(0,0).
        setFill('assets/splashscreen.png').setSize(gameObj.screenWidth, gameObj.screenHeight);
    
//    var i; var levelBtn;
//    for(i in this.levels) {
//        levelBtn = new lime.Sprite().setAnchorPoint
//    }
//    
    var currentObj = this;
    goog.events.listen(gameObj.splashScreen.startBtn,['mousedown', 'touchstart'], function(e) {        
        HuungryUI.showLevelselDialog(currentObj.levels, gameObj);
    });
    
    gameObj.director.replaceScene(gameObj.splashScreen.scene);
    
    
    
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('huungry.start', huungry.start);
