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
    this.playerUnitPositions = [];

    while(this.playerUnitPositions.length < this.gameObj.player.units.length) {
        var position = {
            col: this.gameObj.fightScenePlayerStartX + goog.math.randomInt(this.gameObj.fightScenePlayerEndX-this.gameObj.fightScenePlayerStartX),
            row: this.gameObj.fightScenePlayerStartY + goog.math.randomInt(this.gameObj.fightScenePlayerEndY-this.gameObj.fightScenePlayerStartY)
        };

        var repeated = false;

        for(j=0; j < this.playerUnitPositions.length; j++) {
            if(this.playerUnitPositions[j].row == position.row && this.playerUnitPositions[j].col == position.col) {
                repeated = true;
                break;
            }
        }

        if(!repeated) {
            this.playerUnitPositions.push(position);
        }            
    }

    for(i=0;i<this.gameObj.player.units.length;i++) {
        var pos = this.gameObj.map.getXYFromColRow(this.playerUnitPositions[i].col,this.playerUnitPositions[i].row);
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
    this.enemyUnitPositions = [];

    while(this.enemyUnitPositions.length < this.enemyArmy.units.length) {
        var position = {
            col: this.gameObj.fightSceneEnemyStartX + goog.math.randomInt(this.gameObj.fightSceneEnemyEndX-this.gameObj.fightSceneEnemyStartX),
            row: this.gameObj.fightSceneEnemyStartY + goog.math.randomInt(this.gameObj.fightSceneEnemyEndY-this.gameObj.fightSceneEnemyStartY)
        };

        var repeated = false;

        for(j=0; j < this.enemyUnitPositions.length; j++) {
            if(this.enemyUnitPositions[j].row == position.row && this.enemyUnitPositions[j].col == position.col) {
                repeated = true;
                break;
            }
        }

        if(!repeated) {
            this.enemyUnitPositions.push(position);
        }            
    }

    for(i=0;i<this.enemyArmy.units.length;i++) {
        var pos = this.gameObj.map.getXYFromColRow(this.enemyUnitPositions[i].col, this.enemyUnitPositions[i].row);
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
    else {
        //define target player unit
        var targetUnitIndex = goog.math.randomInt(this.playerUnits.length-1);
        
        //get location difference
        var enemy = this.enemyUnits[this.currentEnemyIndex]
        var unitPos = enemy.getPosition();
        var targetUnitPos = this.playerUnits[targetUnitIndex].getPosition();
        var diffX = targetUnitPos.x - unitPos.x,
            diffY = targetUnitPos.y - unitPos.y;
        
        var dX = diffX == 0 ? 0 : (diffX > 0 ? 1 : -1), 
            dY = diffY == 0 ? 0 : (diffY > 0 ? 1 : -1); 
        
        var targetX = unitPos.x + this.gameObj.tileSize*dX,
            targetY = unitPos.y + this.gameObj.tileSize*dY;
        
        //check blocked
        if(this.isCellBlocked(targetX, targetY)) {
            var targetX = unitPos.x,
            targetY = unitPos.y + this.gameObj.tileSize*dY;
            
            if(this.isCellBlocked(targetX, targetY)) {
                var targetX = unitPos.x + this.gameObj.tileSize*dX,
                targetY = unitPos.y;
                
                if(this.isCellBlocked(targetX, targetY)) {
                    var targetX = unitPos.x,
                    targetY = unitPos.y;
                }                
            }
        }
        
        if(this.gameObj.animationOn) {
            var movement = new lime.animation.MoveTo(targetX,targetY).setDuration(this.gameObj.movementDuration);                    
            enemy.runAction(movement);     
            
            var engine = this;
            goog.events.listen(movement,lime.animation.Event.STOP,function(){
                
                engine.currentEnemyIndex++;        
                if(engine.currentEnemyIndex == engine.enemyUnits.length) {
                    engine.currentEnemyIndex = 0;
                }
                
                engine.playerMoves = true;
                engine.playTurn();
            })
        }
        else {
            enemy.setPosition(targetX, targetY);
            this.currentEnemyIndex++;        
            if(this.currentEnemyIndex == this.enemyUnits.length) {
                this.currentEnemyIndex = 0;
            }
            this.playerMoves = true;
            this.playTurn;
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
            var posX=pos.x+tileSize*unit.movementTargets[i].dx,
                posY=pos.y+tileSize*unit.movementTargets[i].dy;
            
            if(!this.isCellBlocked(posX, posY)) {
                unit.movementTargets[i].sprite.setHidden(false);
                unit.movementTargets[i].sprite.setPosition(posX,posY);            
            }
    }    
}

/**
 * check if a target destination is blocked
 * 
 * @param x in pixels
 * @param y in pixels
 */
huungry.FightEngine.prototype.isCellBlocked = function(x,y) {
    var isBlocked = false;
    for(var j=0; j<this.playerUnits.length; j++) {
        var unitPos = this.playerUnits[j].getPosition();
        if(x == unitPos.x && y == unitPos.y) {
            isBlocked = true;
        }
    }
    for(var j=0; j<this.enemyUnits.length; j++) {
        var unitPos = this.enemyUnits[j].getPosition();
        if(x == unitPos.x && y == unitPos.y) {
            isBlocked = true;
        }
    }
    return isBlocked;
}