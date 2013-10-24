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
            codeName: 'level1',
            displayName: 'Level 1',
            image: 'assets/images/items/scroll-fire.png',
            introText: 'This is an introduction to level 1',
            introImg: 'scroll-fire.png',
            questText: 'Your goal in this level is to blablabablab'
        },
        {
            codeName: 'level2',
            displayName: 'Level 2',
            image: 'assets/images/items/scroll-fire.png',
            introText: 'This is an introduction to level 2',
            introImg: 'scroll-fire.png',
            questText: 'Your goal in this level is to blablabablab'
        },
        
    ];
    
    var gameObj = new huungry.GameObj(document);
    gameObj.setUnitTypes(UnitTypes);       
    
    //player    
    gameObj.player = new huungry.Player().setFill('assets/images/units/knight.png')
        .setGameObj(gameObj);
        
    gameObj.player.maxNumUnits = 10;   
    gameObj.player.units = [
        gameObj.cloneUnit(gameObj.unitTypes['axeman'], 10),
        gameObj.cloneUnit(gameObj.unitTypes['axeman'], 12),
        gameObj.cloneUnit(gameObj.unitTypes['peasant'], 15),
        gameObj.cloneUnit(gameObj.unitTypes['wolf'], 6),
        gameObj.cloneUnit(gameObj.unitTypes['archer'], 8)
    ];
    
    //start screen
    gameObj.splashScreen = new Object();
    gameObj.splashScreen.scene = new lime.Scene().setRenderer(lime.Renderer.DOM);
    gameObj.splashScreen.background = new lime.Sprite().setAnchorPoint(0,0).
        setFill('assets/splashscreen.png').setSize(gameObj.screenWidth, gameObj.screenHeight);
    gameObj.splashScreen.startBtn = new lime.GlossyButton().setColor('#133242').setText('Start')
        .setPosition(gameObj.tileSize*3, gameObj.tileSize*7)
        .setSize(gameObj.tileSize*2, gameObj.tileSize);
    gameObj.splashScreen.aboutBtn = new lime.GlossyButton().setColor('#133242').setText('About')
        .setPosition(gameObj.tileSize*7, gameObj.tileSize*7)
        .setSize(gameObj.tileSize*3, gameObj.tileSize);
    
    gameObj.splashScreen.scene.appendChild(gameObj.splashScreen.background);
    gameObj.splashScreen.scene.appendChild(gameObj.splashScreen.startBtn);
    gameObj.splashScreen.scene.appendChild(gameObj.splashScreen.aboutBtn);
    
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
        //HuungryUI.showLevelselDialog(currentObj.levels, gameObj);
				gameObj.runLevel('level1');
    });
    goog.events.listen(gameObj.splashScreen.aboutBtn,['mousedown', 'touchstart'], function(e) {        
        HuungryUI.showEndofGameDialog(this.gameObj);
    });
    
    gameObj.director.replaceScene(gameObj.splashScreen.scene);
    
    
    
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('huungry.start', huungry.start);
