goog.provide('huungry.FightEngine');

/*
 * Takes care of the fighting
 */
huungry.FightEngine = function() {
    this.floorColor = 'rgb(0,125,0)';
    this.playerUnits = [];
    this.enemyUnits = [];
    this.FREE_TARGET = 1;
    this.ENEMY_TARGET = 2;
    this.UNIT_TARGET = 3;
    this.BLOCKED_TARGET = 4;
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
        
        this.playerMoves = false;
        this.updateNextMovingUnits();
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
        var targetType = this.getTargetType(targetX, targetY);
        if(targetType == this.ENEMY_TARGET || targetType == this.BLOCKED_TARGET ) {
            var targetX = unitPos.x,
            targetY = unitPos.y + this.gameObj.tileSize*dY;
            var targetType = this.getTargetType(targetX, targetY);
            
            if(targetType == this.ENEMY_TARGET || targetType == this.BLOCKED_TARGET ) {
                var targetX = unitPos.x + this.gameObj.tileSize*dX,
                targetY = unitPos.y;
                var targetType = this.getTargetType(targetX, targetY);
                
                if(targetType == this.ENEMY_TARGET || targetType == this.BLOCKED_TARGET ) {
                    var targetX = unitPos.x,
                    targetY = unitPos.y;
                } 
                else if(targetType == this.PLAYER_TARGET) {
                    var attackedUnit = this.getUnitFromXY(targetX, targetY);
                    enemy.attackUnit(attackedUnit);
                    var targetX = unitPos.x,
                        targetY = unitPos.y;
                }
            }
            else if(targetType == this.PLAYER_TARGET) {
                var attackedUnit = this.getUnitFromXY(targetX, targetY);
                enemy.attackUnit(attackedUnit);
                var targetX = unitPos.x,
                    targetY = unitPos.y;
            }
        }
        else if(targetType == this.PLAYER_TARGET) {
            var attackedUnit = this.getUnitFromXY(targetX, targetY);
            enemy.attackUnit(attackedUnit);
            var targetX = unitPos.x,
                targetY = unitPos.y;
        }
        
        if(this.gameObj.animationOn) {
            var movement = new lime.animation.MoveTo(targetX,targetY).setDuration(this.gameObj.movementDuration);                    
            enemy.runAction(movement);     
            
            var engine = this;
            goog.events.listen(movement,lime.animation.Event.STOP,function(){
                
                engine.playerMoves = true;
                engine.updateDead();
                engine.updateNextMovingUnits();
                engine.playTurn();
            })
        }
        else {
            enemy.setPosition(targetX, targetY);
            
            this.playerMoves = true;
            this.updateDead();
            this.updateNextMovingUnit();
            this.playTurn();
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
    
    //remove previous target
    unit.currentTarget = [];

for(var i=0; i<unit.movementTargets.length; i++) {
            var posX=pos.x+tileSize*unit.movementTargets[i].dx,
                posY=pos.y+tileSize*unit.movementTargets[i].dy;
            
            var targetType = this.getTargetType(posX, posY);
            
            if(targetType == this.FREE_TARGET) {
                unit.movementTargets[i].sprite.setHidden(false);
                unit.movementTargets[i].sprite.setPosition(posX,posY);            
            }
            else if(targetType == this.ENEMY_TARGET) {
                //show attack option
                unit.attackTargets[i].sprite.setHidden(false);
                unit.attackTargets[i].sprite.setPosition(posX,posY);
                unit.currentTarget[i] = this.getUnitFromXY(posX, posY);
            }
    }    
}

/**
 * get the target cell type
 * 
 * @param x in pixels
 * @param y in pixels
 */
huungry.FightEngine.prototype.getTargetType = function(x,y) {
    var type = this.FREE_TARGET;
    for(var j=0; j<this.playerUnits.length; j++) {
        var unitPos = this.playerUnits[j].getPosition();
        if(x == unitPos.x && y == unitPos.y) {
            type = this.PLAYER_TARGET;
        }
    }
    for(var j=0; j<this.enemyUnits.length; j++) {
        var unitPos = this.enemyUnits[j].getPosition();
        if(x == unitPos.x && y == unitPos.y) {
            type = this.ENEMY_TARGET
        }
    }
    return type;
}

/**
 * get a unit from x y coordinates
 * 
 * @param x in pixels
 * @param y in pixels
 */
huungry.FightEngine.prototype.getUnitFromXY = function(x, y) {
    for(var j=0; j<this.playerUnits.length; j++) {
        var unitPos = this.playerUnits[j].getPosition();
        if(x == unitPos.x && y == unitPos.y) {
            return this.playerUnits[j];
        }
    }
    for(var j=0; j<this.enemyUnits.length; j++) {
        var unitPos = this.enemyUnits[j].getPosition();
        if(x == unitPos.x && y == unitPos.y) {
            return this.enemyUnits[j];
        }
    }
}

/**
 * remove dead units
 */
huungry.FightEngine.prototype.updateDead = function() {
    //remove dead units
    var toRemovePlayer = [];
    for(var j=0; j<this.playerUnits.length; j++) {
        if(this.playerUnits[j].life <= 0) {
            toRemovePlayer.push(j);
        }
    }
    for(var i=0; i<toRemovePlayer.length; i++) {
        this.playerUnits[i].setHidden(true);
        this.playerUnits.splice(i,1);
    }
    
    
    var toRemoveEnemy = [];
    for(var j=0; j<this.enemyUnits.length; j++) {
        if(this.enemyUnits[j].life <= 0) {
            toRemoveEnemy.push(j);
        }
    }
    
    for(var i=0; i<toRemoveEnemy.length; i++) {
        this.enemyUnits[i].setHidden(true);
        this.enemyUnits.splice(i,1);
    }
    
    //check army defeated
    if(this.playerUnits.length == 0) {
        console.log('game over');
    }
    
    if(this.enemyUnits.length == 0) {
        console.log('enemy defeated');
        this.gameObj.director.replaceScene(this.gameObj.gameScene);
    }
}

/**
 * define which units are staged to move on the next move
 */
huungry.FightEngine.prototype.updateNextMovingUnits = function() {
    if(this.playerMoves) {
        this.currentPlayerIndex++;
        if(this.currentPlayerIndex >= this.playerUnits.length) {
            this.currentPlayerIndex = 0;
        }
    }
    else {
        this.currentEnemyIndex++;        
        if(this.currentEnemyIndex >= this.enemyUnits.length) {
            this.currentEnemyIndex = 0;
        }
    }
}