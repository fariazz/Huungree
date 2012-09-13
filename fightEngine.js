goog.provide('huungry.FightEngine');

/*
 * Takes care of the fighting
 */
huungry.FightEngine = function() {
    this.floorColor = 'rgb(0,125,0)';
    this.playerUnits = [];
    this.enemyUnits = [];
}

huungry.FightEngine.prototype.setGameObj = function(gameObj) {
    this.gameObj = gameObj;
    return this;
}

huungry.FightEngine.prototype.setEnemyArmy = function(enemyArmy) {
    this.enemyArmy = enemyArmy;
    return this;
}

/**
 * initiate fighting
 */
huungry.FightEngine.prototype.init = function() {
    this.fightScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);    
    this.fightLayer = new lime.Layer().setPosition(0,0).setAnchorPoint(0,0);    
    this.floor = new lime.Sprite().setSize(WIDTH,HEIGHT).setPosition(0,0).setAnchorPoint(0,0).setFill(this.floorColor);
    
    this.fightLayer.appendChild(this.floor);
    this.fightScene.appendChild(this.fightLayer);

    this.gameObj.player.inFightScene = true;
    
    this.initArmies();
    
    this.gameObj.director.replaceScene(this.fightScene);
    
    var runButton = new lime.GlossyButton().setSize(70,40).setPosition(120,300)
        .setText('Run').setColor('#00CD00'); 

    this.fightLayer.appendChild(runButton);

    //run away
    currentObj = this;
    goog.events.listen(runButton, ['mousedown','touchstart'], function(e) {
        //go back to the map
        currentObj.gameObj.director.replaceScene(currentObj.gameObj.gameScene);
        currentObj.gameObj.gameLayer.setDirty(255);
        currentObj.gameObj.controlsLayer.setDirty(255);
        currentObj.gameObj.gameScene.setDirty(255);

        //move player to previous position
        previousPos = currentObj.gameObj.player.previousPosition;
        currentObj.gameObj.player.setPosition(previousPos.x, previousPos.y);
        currentObj.gameObj.player.toggleGamepad(true);
        currentObj. gameObj.player.inFightScene = false;
    });
    
    this.playerMoves = true;
    
    this.prepareOrder();
    
    this.playTurn();
}

/**
 * initiate armies
 */
huungry.FightEngine.prototype.initArmies = function() {
    //init player army
    var playerUnitPositions = [];

    while(playerUnitPositions.length < this.gameObj.player.units.length) {
        var position = {
            col: this.gameObj.fightScenePlayerStartX + goog.math.randomInt(this.gameObj.fightScenePlayerEndX-this.gameObj.fightScenePlayerStartX),
            row: this.gameObj.fightScenePlayerStartY + goog.math.randomInt(this.gameObj.fightScenePlayerEndY-this.gameObj.fightScenePlayerStartY)
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

    for(i=0;i<this.gameObj.player.units.length;i++) {
        var pos = this.gameObj.map.getXYFromColRow(playerUnitPositions[i].col,playerUnitPositions[i].row);
        var unit = new huungry.Unit()
            .setUnitData(this.gameObj.player.units[i])
            .setPosition(pos.x, pos.y)
            .setGameObj(this.gameObj);
        
        unit.customLayer = this.fightLayer;
        unit.initGamepad();
        unit.fightEngine = this;
        
        this.playerUnits.push(unit);
        this.fightLayer.appendChild(unit);
    }

    //init enemy army
    var enemyUnitPositions = [];

    while(enemyUnitPositions.length < this.enemyArmy.units.length) {
        var position = {
            col: this.gameObj.fightSceneEnemyStartX + goog.math.randomInt(this.gameObj.fightSceneEnemyEndX-this.gameObj.fightSceneEnemyStartX),
            row: this.gameObj.fightSceneEnemyStartY + goog.math.randomInt(this.gameObj.fightSceneEnemyEndY-this.gameObj.fightSceneEnemyStartY)
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

    for(i=0;i<this.enemyArmy.units.length;i++) {
        var pos = this.gameObj.map.getXYFromColRow(enemyUnitPositions[i].col,enemyUnitPositions[i].row);
        var unit = new huungry.Unit()
            .setUnitData(this.enemyArmy.units[i])
            .setPosition(pos.x, pos.y)
            .setGameObj(this.gameObj);
        
        this.enemyUnits.push(unit);
        this.fightLayer.appendChild(unit);
    }
}

/**
 * prepare the order in which the units will play
 */
huungry.FightEngine.prototype.prepareOrder = function() {
    
    //@TODO define who starts
    this.playerMoves = true;
    
    //@TODO rearrange units by some criteria
    this.playerUnitsOrder = [];
    
    for(i=0; i<this.playerUnits.length; i++) {
        this.playerUnitsOrder.push(i);
    }
    
    this.currentPlayerIndex = 0;
    
    //@TODO rearrange units by some criteria
    this.enemyUnitsOrder = [];
    
    for(i=0; i<this.enemyUnits.length; i++) {
        this.enemyUnitsOrder.push(i);
    }    
    
    this.currentEnemyIndex = 0;    
}

/**
 * play a turn
 */
huungry.FightEngine.prototype.playTurn = function() {
    
    if(this.playerMoves) {
        //show gamepad for current unit
        this.showCurrentGamepad();
        
        this.currentPlayerIndex++;
        
        if(this.currentPlayerIndex == this.playerUnits.length) {
            this.currentPlayerIndex = 0;
        }
    }
}


/**
 * show gamepad for current unit
 */
huungry.FightEngine.prototype.showCurrentGamepad = function() {
    
    var unit = this.playerUnits[this.currentPlayerIndex];
    var pos = unit.getPosition();
        
    var tileSize = this.gameObj.tileSize;

    for(var i=0; i<unit.movementTargets.length; i++) {
       
            unit.movementTargets[i].sprite.setHidden(false);
            unit.movementTargets[i].sprite.setPosition(pos.x+tileSize*unit.movementTargets[i].dx,pos.y+tileSize*unit.movementTargets[i].dy);            
    }    
}