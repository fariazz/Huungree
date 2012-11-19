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
    
    this.map = new huungry.Map().setGameObj(this.gameObj)
        .setSize({width: this.gameObj.screenWidth, height: this.gameObj.screenHeight})
        .setBackground(this.floorColor);
    
    this.fightLayer.appendChild(this.map.backgroundSprite);
    
    currentObj = this;
    goog.events.listen(this.map.backgroundSprite, ['mousedown', 'touchstart'], function(e){
        var target = currentObj.map.getColRowFromXY(e.position.x, e.position.y);
        //console.log(currentObj.map.getTargetType(target.col, target.row));
    });
    
    this.fightScene.appendChild(this.fightLayer);
    
    var runButton = new lime.GlossyButton().setSize(70,40).setPosition(120,300)
        .setAnchorPoint(0,0)
        .setText('Run').setColor('#00CD00'); 
    this.fightLayer.appendChild(runButton);
    //run away
    var currentObj = this;
    goog.events.listen(runButton, ['mousedown','touchstart'], function(e) {
        currentObj.exitFight();
    });
    
    var passButton = new lime.GlossyButton().setSize(70,40).setPosition(200,300)
        .setAnchorPoint(0,0)
        .setText('Pass').setColor('#00CD00'); 
    this.fightLayer.appendChild(passButton);
    
    //pass
    goog.events.listen(passButton, ['mousedown','touchstart'], function(e) {
        currentObj.pass();
    });
    
    
    
    this.gameObj.director.replaceScene(this.fightScene);
        

    
    this.gameObj.player.inFightScene = true;    
    this.initArmies();
    this.prepareOrder();    
    this.playTurn();
}

/**
 * exit fight scene
 */
huungry.FightEngine.prototype.exitFight = function() {
    
    //update player army
    this.gameObj.player.units = [];
    
    for(var i=0; i< this.playerUnits.length; i++) {
        this.gameObj.player.units.push({
            name: this.playerUnits[i].name,
            image: this.playerUnits[i].image,
            attack: this.playerUnits[i].attack,
            defense: this.playerUnits[i].defense,
            canShoot: this.playerUnits[i].canShoot,
            life: this.playerUnits[i].life
        });
    }
    
    //go back to the map
    this.gameObj.director.replaceScene(this.gameObj.gameScene);
    this.gameObj.gameLayer.setDirty(255);
    this.gameObj.controlsLayer.setDirty(255);
    this.gameObj.gameScene.setDirty(255);

    //move player to previous position
    var previousPos = this.gameObj.player.previousPosition;
    this.gameObj.player.setPosition(previousPos.x, previousPos.y);
    this.gameObj.player.toggleGamepad(true);
    this.gameObj.player.inFightScene = false;
    this.gameObj.controlsLayer.refreshInfo();
}

/**
 * initiate armies
 */
huungry.FightEngine.prototype.initArmies = function() {
    //init player army
    this.playerUnitPositions = [];
    
    var i = 0;
    var takenCells = {};    
    while(this.playerUnitPositions.length < this.gameObj.player.units.length) {
        var position = {
            col: this.gameObj.fightScenePlayerStartX + goog.math.randomInt(this.gameObj.fightScenePlayerEndX-this.gameObj.fightScenePlayerStartX+1),
            row: this.gameObj.fightScenePlayerStartY + goog.math.randomInt(this.gameObj.fightScenePlayerEndY-this.gameObj.fightScenePlayerStartY+1)
        };

        if(!takenCells[position.col+','+position.row]) {
            takenCells[position.col+','+position.row] = true;
            this.playerUnitPositions.push(position);
            var pos = this.gameObj.map.getXYFromColRow(position.col,position.row);
            var unit = new huungry.Unit()
                .setUnitData(this.gameObj.player.units[i])
                .setPosition(pos.x, pos.y)
                .setGameObj(this.gameObj)
                .setElementType(this.gameObj.PLAYER_UNIT)
                .setMap(this.map)
                .refreshMapPos();     
            unit.customLayer = this.fightLayer;
            unit.initGamepad();
            unit.fightEngine = this;
            this.playerUnits.push(unit);
            this.fightLayer.appendChild(unit);
            i++;
        }
    }

    //init enemy army
    this.enemyUnitPositions = [];
    
    var i=0;
    var takenCells = {};
    while(this.enemyUnitPositions.length < this.enemyArmy.units.length) {
        var position = {
            col: this.gameObj.fightSceneEnemyStartX + goog.math.randomInt(this.gameObj.fightSceneEnemyEndX-this.gameObj.fightSceneEnemyStartX+0.99),
            row: this.gameObj.fightSceneEnemyStartY + goog.math.randomInt(this.gameObj.fightSceneEnemyEndY-this.gameObj.fightSceneEnemyStartY+0.99)
        };

        if(!takenCells[position.col+','+position.row]) {
            takenCells[position.col+','+position.row] = true;
            this.enemyUnitPositions.push(position);
            var pos = this.gameObj.map.getXYFromColRow(position.col, position.row);
            var unit = new huungry.Unit()
                .setUnitData(this.enemyArmy.units[i])
                .setPosition(pos.x, pos.y)
                .setGameObj(this.gameObj)
                .setElementType(this.gameObj.ENEMY_UNIT)
                .setMap(this.map)
                .refreshMapPos();   
            unit.fightEngine = this;
            this.enemyUnits.push(unit);
            this.fightLayer.appendChild(unit);
            i++;
        }            
    }
}

/**
 * prepare the order in which the units will play
 */
huungry.FightEngine.prototype.prepareOrder = function() {
    
    //@TODO define who starts
    //@TODO sort units by some criteria like agility, or randomly
    //this.playerMoves = Math.random() > 0.5;
    this.playerMoves = false;
    this.currentPlayerIndex = 0;
    this.currentEnemyIndex = 0;    
}

/**
 * play a turn
 */
huungry.FightEngine.prototype.playTurn = function() {
    
    this.updateDead();
    
    if(!this. gameObj.player.inFightScene) {
        return false;
    }
    
    this.updateNextMovingUnits();
    
    this.playerMoves = !this.playerMoves;
    
    if(this.playerMoves) {
        //show gamepad for current unit
        this.showCurrentGamepad();        
    }
    else {
        //enemy moves
        var enemy = this.enemyUnits[this.currentEnemyIndex]
        
        //attach adjacent enemy if any
        var adjacentEnemy = this.map.getAdjacentElement(enemy, this.gameObj.PLAYER_UNIT);        
        if(adjacentEnemy) {
            console.log('attack player:'+adjacentEnemy.name);
            enemy.attackUnit(adjacentEnemy);
        }
        
        else {
            //define target player unit
            var targetUnitIndex = goog.math.randomInt(this.playerUnits.length-1);
            var unitPos = enemy.getPosition();
            var targetUnitPos = this.playerUnits[targetUnitIndex].getPosition();
            var diffX = targetUnitPos.x - unitPos.x,
                diffY = targetUnitPos.y - unitPos.y;

            var dX = diffX == 0 ? 0 : (diffX > 0 ? 1 : -1), 
                dY = diffY == 0 ? 0 : (diffY > 0 ? 1 : -1); 

            var targetX = unitPos.x + this.gameObj.tileSize*dX,
                targetY = unitPos.y + this.gameObj.tileSize*dY;
            
            //check blocked
            var targetCell = this.map.getColRowFromXY(targetX,targetY);
            var targetType = this.map.getTargetType(targetCell.col, targetCell.row);
            
            //if not blocked move
            if(targetType == this.gameObj.FREE_TARGET) {
                if(this.gameObj.animationOn) {
                    var movement = new lime.animation.MoveTo(targetX,targetY).setDuration(this.gameObj.movementDuration);                    
                    enemy.runAction(movement);     

                    var engine = this;
                    goog.events.listen(movement,lime.animation.Event.STOP,function(){
                        engine.playTurn();
                    })
                }
            }
            //otherwise pass
            else {
                this.playTurn();
            }
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
        var posCell = this.map.getColRowFromXY(posX, posY);
        var targetType = this.map.getTargetType(posCell.col, posCell.row);

        if(targetType == this.gameObj.FREE_TARGET) {
            unit.movementTargets[i].sprite.setHidden(false);
            unit.movementTargets[i].sprite.setPosition(posX,posY);            
        }
        else if(targetType == this.gameObj.ENEMY_UNIT) {
            //show attack option
            unit.attackTargets[i].sprite.setHidden(false);
            unit.attackTargets[i].sprite.setPosition(posX,posY);
            unit.currentTarget[i] = this.getUnitFromXY(posX, posY);
        }
    }    
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
    
    var num_players = this.playerUnits.length;
    for(var i=num_players-1; i>= 0; i--) {
        if(this.playerUnits[i].life <= 0) {
            this.playerUnits[i].die();
            this.playerUnits.splice(i,1);
        }
    }
    
    var num_enemies = this.enemyUnits.length;
    for(var i=num_enemies-1; i>= 0; i--) {
        if(this.enemyUnits[i].life <= 0) {
            this.enemyUnits[i].die();
            this.enemyUnits.splice(i,1);
        }
    }
    
    //check army defeated
    if(this.playerUnits.length == 0) {
        console.log('game over');
        this.exitFight();  
    }
    
    if(this.enemyUnits.length == 0) {
        console.log('enemy defeated');
        this.gameObj.player.gold += this.enemyArmy.gold;
        this.enemyArmy.die();
        this.exitFight();        
    }
}

/**
 * define which units are staged to move on the next move
 */
huungry.FightEngine.prototype.updateNextMovingUnits = function() {
    if(!this.playerMoves) {
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

/**
 * pass a turn
 */
huungry.FightEngine.prototype.pass = function() {
    this.playerUnits[this.currentPlayerIndex].toggleGamepad(false);
    this.playTurn();
}