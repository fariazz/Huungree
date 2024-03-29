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
goog.require('huungry.Inanimated');
goog.require('lime.GlossyButton');

// entrypoint
huungry.start = function(params){

    var gameObj = new huungry.GameObj(document, params);


    //intro music
    gameObj.playSound('royal-jester', {unique: true, loop: true});

    HuungryUI.prepareDialog(gameObj);
    gameObj.setUnitTypes(UnitTypes);

    //player
    gameObj.player = new huungry.Player().setFill('assets/images/units/knight.png')
        .setGameObj(gameObj);

    gameObj.player.maxNumUnits = 8;
    gameObj.player.gold = 120;
    gameObj.player.units = [
    gameObj.cloneUnit(gameObj.unitTypes['archer'], 15),
    gameObj.cloneUnit(gameObj.unitTypes['archer'], 20),
    gameObj.cloneUnit(gameObj.unitTypes['halfling'], 15),
    gameObj.cloneUnit(gameObj.unitTypes['axeman'], 28),
    gameObj.cloneUnit(gameObj.unitTypes['axeman'], 28),
    gameObj.cloneUnit(gameObj.unitTypes['halfling'], 35) ];
/*    gameObj.cloneUnit(gameObj.unitTypes['insectman'], 21),
    gameObj.cloneUnit(gameObj.unitTypes['centaur'], 30),
    gameObj.cloneUnit(gameObj.unitTypes['elitearcher'], 21),
    gameObj.cloneUnit(gameObj.unitTypes['elfarcher'], 27),
    gameObj.cloneUnit(gameObj.unitTypes['elfarcher'], 25),
    gameObj.cloneUnit(gameObj.unitTypes['elfarcher'], 25)    ];*/

    //init ads if not full version
    if(!gameObj.isFullVersion) {
        gameObj.initAds();
    }


    //start screen
    gameObj.showSplashScreen();
};


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('huungry.start', huungry.start);
