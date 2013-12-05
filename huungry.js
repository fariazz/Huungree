//set main namespace
goog.provide('huungry');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Label');
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
        }
        
    ];
    
    var gameObj = new huungry.GameObj(document);
    gameObj.developmentMode = false;
    HuungryUI.prepareDialog(gameObj); 
    gameObj.setUnitTypes(UnitTypes);       
    
    //player    
    gameObj.player = new huungry.Player().setFill('assets/images/units/knight.png')
        .setGameObj(gameObj);
        
    gameObj.player.maxNumUnits = 10;   
    gameObj.player.gold = 60;   
    gameObj.player.units = [
        //gameObj.cloneUnit(gameObj.unitTypes['archer'], 10),
        //gameObj.cloneUnit(gameObj.unitTypes['archer'], 12),
        gameObj.cloneUnit(gameObj.unitTypes['archer'], 2),
        gameObj.cloneUnit(gameObj.unitTypes['archer'], 3),
        gameObj.cloneUnit(gameObj.unitTypes['axeman'], 12),
        gameObj.cloneUnit(gameObj.unitTypes['axeman'], 12),
        gameObj.cloneUnit(gameObj.unitTypes['peasant'], 15),
        gameObj.cloneUnit(gameObj.unitTypes['wolf'], 6),
        //gameObj.cloneUnit(gameObj.unitTypes['archer'], 1),
        //gameObj.cloneUnit(gameObj.unitTypes['archer'],1)
    ];
    
    //start screen
    gameObj.showSplashScreen();       
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('huungry.start', huungry.start);
