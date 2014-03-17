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
goog.require('huungry.FightEngine');
goog.require('huungry.Unit');
goog.require('lime.GlossyButton');

// entrypoint
huungry.start = function(isFullVersion){
    var gameObj = new huungry.GameObj(document);
    gameObj.isFullVersion = isFullVersion;

    //intro music
    gameObj.playSound('barde-intro.mp3');
    
    HuungryUI.prepareDialog(gameObj); 
    gameObj.setUnitTypes(UnitTypes);       
    
    //player    
    gameObj.player = new huungry.Player().setFill('assets/images/units/knight.png')
        .setGameObj(gameObj);
        
    gameObj.player.maxNumUnits = 8;   
    gameObj.player.gold = 100;   
    gameObj.player.units = [
        //gameObj.cloneUnit(gameObj.unitTypes['archer'], 10),
        //gameObj.cloneUnit(gameObj.unitTypes['archer'], 12),
        gameObj.cloneUnit(gameObj.unitTypes['archer'], 60),
        gameObj.cloneUnit(gameObj.unitTypes['archer'], 60),
        //gameObj.cloneUnit(gameObj.unitTypes['halfling'], 15)
        gameObj.cloneUnit(gameObj.unitTypes['axeman'], 120),
        gameObj.cloneUnit(gameObj.unitTypes['axeman'], 150),
        gameObj.cloneUnit(gameObj.unitTypes['halfling'], 120)
        //gameObj.cloneUnit(gameObj.unitTypes['archer'], 1)
        //gameObj.cloneUnit(gameObj.unitTypes['archer'],1)
    ];
    
    //start screen
    gameObj.showSplashScreen();       
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('huungry.start', huungry.start);
