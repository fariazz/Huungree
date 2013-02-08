goog.provide('huungry.FightEngine');

goog.require('lime.Circle');

/*
 * Takes care of the fighting
 */
huungry.FightEngine = function() {
    this.floorColor = 'rgb(0,125,0)';
    this.playerUnits = new Array();
    this.enemyUnits = new Array();
    this.rangeTargets = new Array();
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
    this.fightScene = new lime.Scene().setRenderer(lime.Renderer.DOM);    
    this.fightLayer = new lime.Layer().setPosition(0,0).setAnchorPoint(0,0);    
    this.fightUILayer = new lime.Layer().setPosition(0,0).setAnchorPoint(0,0);    
        
    this.fightScene.appendChild(this.fightLayer);
    this.fightScene.appendChild(this.fightUILayer);
    this.gameObj.director.replaceScene(this.fightScene);
    
    this.map = new huungry.Map().setGameObj(this.gameObj)
        .setSize({width: this.gameObj.screenWidth, height: this.gameObj.screenHeight})
        .setBackground(this.floorColor);
    
    this.fightLayer.appendChild(this.map.backgroundSprite);
        
    currentObj = this;
    goog.events.listen(this.map.backgroundSprite, ['mousedown', 'touchstart'], function(e){
        var target = currentObj.map.getColRowFromXY(e.position.x, e.position.y);
        //console.log(currentObj.map.getTargetType(target.col, target.row));
    });
    
        
    var runButton = new lime.GlossyButton().setSize(this.gameObj.tileSize*2,this.gameObj.tileSize)
        .setPosition(this.gameObj.tileSize*1,this.gameObj.tileSize*7.5)
        .setAnchorPoint(0,0)
        .setText('Run').setColor('#00CD00'); 
    this.fightUILayer.appendChild(runButton);
    //run away
    var currentObj = this;
    goog.events.listen(runButton, ['mousedown','touchstart'], function(e) {
        currentObj.exitFight();
    });
    
    var passButton = new lime.GlossyButton().setSize(this.gameObj.tileSize*2,this.gameObj.tileSize)
        .setPosition(this.gameObj.tileSize*3.5,this.gameObj.tileSize*7.5)
        .setAnchorPoint(0,0)
        .setText('Pass').setColor('#00CD00'); 
    this.fightUILayer.appendChild(passButton);
    
    //pass
    goog.events.listen(passButton, ['mousedown','touchstart'], function(e) {
        currentObj.clearRangeTargets();
        currentObj.pass();
    });
    
    var killButton = new lime.GlossyButton().setSize(this.gameObj.tileSize*2.5,this.gameObj.tileSize)
        .setPosition(this.gameObj.tileSize*6.0,this.gameObj.tileSize*7.5)
        .setAnchorPoint(0,0)
        .setText('Kill all').setColor('#00CD00'); 
    this.fightUILayer.appendChild(killButton);
    
    //pass
    goog.events.listen(killButton, ['mousedown','touchstart'], function(e) {        
        for(var j=0; j<currentObj.enemyUnits.length; j++) {
            currentObj.enemyUnits[j].life = -1;           
        }
        
        currentObj.pass();
    });
    
    this.gameObj.player.inFightScene = true;    
    this.initArmies();
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
    this.gameObj.player.inFightScene = false;
    this.gameObj.controlsLayer.refreshInfo();
    this.gameObj.player.playerMoved();
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
            unit.customLayer = this.fightUILayer;
            unit.initGamepad();
            unit.fightEngine = this;
            unit.readiness = Math.random();
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
            unit.readiness = Math.random();
            this.enemyUnits.push(unit);
            this.fightLayer.appendChild(unit);
            i++;
        }            
    }
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

    if(this.playerMoves) {
        //show gamepad for current unit
        this.showCurrentGamepad();        
    }
    else {
        //enemy moves
        var enemy = this.enemyUnits[this.currentEnemyIndex]
        var unitPos = enemy.getPosition();
        
        //attach adjacent enemy if any
        var adjacentEnemy = this.map.getAdjacentElement(enemy, this.gameObj.PLAYER_UNIT);        
        if(adjacentEnemy) {
            enemy.attackUnit(adjacentEnemy);
        }
        
        else {
            //if range decide between shooting and moving
            var willShoot = Math.random();
            
            if(enemy.canShoot && willShoot <= this.gameObj.shootProbability) {
                //define target
                var targetUnitIndex = goog.math.randomInt(this.playerUnits.length-1);
                var targetUnitPos = this.playerUnits[targetUnitIndex].getPosition();
                
                //create bullet
                var bullet = new lime.Circle().setPosition(unitPos.x+this.gameObj.tileSize/2, unitPos.y+this.gameObj.tileSize/2)
                    .setSize(this.gameObj.tileSize/5,this.gameObj.tileSize/5).setFill('#B0171F');
                this.fightLayer.appendChild(bullet);
                
                var movement = new lime.animation
                    .MoveTo(targetUnitPos.x+this.gameObj.tileSize/2,targetUnitPos.y+this.gameObj.tileSize/2)
                    .setDuration(this.gameObj.movementDuration);                    
                bullet.runAction(movement); 
                
                var layer = this.fightLayer;
                var currentObj = this;
                goog.events.listen(movement,lime.animation.Event.STOP,function(){
                    layer.removeChild(bullet);
                    enemy.attackUnit(currentObj.playerUnits[targetUnitIndex]);
                })
            }
            
            else {
                //define target player unit
                var targetUnitIndex = goog.math.randomInt(this.playerUnits.length-1);                
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
}


/**
 * show gamepad for current unit
 */
huungry.FightEngine.prototype.showCurrentGamepad = function() {
    
    var unit = this.playerUnits[this.currentPlayerIndex];
    var pos = unit.getPosition();        
    var tileSize = this.gameObj.tileSize;
    var currentObj = this;
    
    //remove previous target
    unit.currentTarget = [];

    for(var i=0; i<unit.movementTargets.length; i++) {
        var posX=pos.x+tileSize*unit.movementTargets[i].dx,
            posY=pos.y+tileSize*unit.movementTargets[i].dy;
        
        var posXM=pos.x+tileSize*unit.movementTargets[i].dx+(unit.movementTargets[i].dx < 0 ? tileSize/2 : unit.movementTargets[i].dx == 0 ? tileSize/4 : 0),
            posYM=pos.y+tileSize/2*unit.movementTargets[i].dy+(unit.movementTargets[i].dy > 0 ? tileSize/2 : unit.movementTargets[i].dy == 0 ? tileSize/4 : 0);
        var posCell = this.map.getColRowFromXY(posX, posY);
        var targetType = this.map.getTargetType(posCell.col, posCell.row);

        if(targetType == this.gameObj.FREE_TARGET) {
            unit.movementTargets[i].sprite.setHidden(false);
            unit.movementTargets[i].sprite.setPosition(posXM,posYM);            
        }
        else if(targetType == this.gameObj.ENEMY_UNIT) {
            //show attack option            
            unit.attackTargets[i].sprite.setHidden(false);
            unit.attackTargets[i].sprite.setPosition(posX,posY);
            unit.currentTarget[i] = this.getUnitFromXY(posX, posY);
        }
    }

    //show range attack targets if allowed
    if(unit.canShoot) {
        
        this.rangeTargets = new Array();
        var enemyPos;
        var emnemyunitPos;
        console.log('can shoot');
        for(var i = 0, arrayLen = this.enemyUnits.length; i< arrayLen; i++) {
            enemyPos = this.enemyUnits[i].getPosition();
            this.rangeTargets.push(new lime.Sprite().setAnchorPoint(0,0).setFill('assets/rangeattack-icon.png')
                .setSize(tileSize,tileSize)
                .setPosition(enemyPos.x, enemyPos.y));
            
            (function(i, currentObj) {
                goog.events.listen(currentObj.rangeTargets[i], ['mousedown', 'touchstart'], function(e) {
                    e.preventDefault();
                    unit.toggleGamepad(false);
                    emnemyunitPos = currentObj.enemyUnits[i].getPosition();
                    
                    //create bullet
                    var bullet = new lime.Circle().setPosition(pos.x+currentObj.gameObj.tileSize/2, pos.y+currentObj.gameObj.tileSize/2)
                        .setSize(currentObj.gameObj.tileSize/5,currentObj.gameObj.tileSize/5).setFill('#B0171F');
                    currentObj.fightLayer.appendChild(bullet);

                    var movement = new lime.animation
                        .MoveTo(emnemyunitPos.x+currentObj.gameObj.tileSize/2,emnemyunitPos.y+currentObj.gameObj.tileSize/2)
                        .setDuration(currentObj.gameObj.movementDuration);                    
                    bullet.runAction(movement); 

                    goog.events.listen(movement,lime.animation.Event.STOP,function(){
                        currentObj.fightLayer.removeChild(bullet);                        
                        unit.attackUnit(currentObj.enemyUnits[i]);  
                        
                    })
                });
            })(i, currentObj);
                
            this.fightLayer.appendChild(this.rangeTargets[i]);
        }
    }
}

/**
 * remove range targets from layer
 */
 huungry.FightEngine.prototype.clearRangeTargets = function() {
     if(this.rangeTargets.length) {
        for(var i=0, arrayLen = this.enemyUnits.length; i < arrayLen; i++) {    
            this.rangeTargets[i].setHidden(true);
            this.fightLayer.removeChild(this.rangeTargets[i]);
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
    for(j=0; j<this.enemyUnits.length; j++) {
        unitPos = this.enemyUnits[j].getPosition();
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
    for(i=num_enemies-1; i>= 0; i--) {
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
        this.gameObj.dialog = new huungry.DialogScene().setGameObj(this.gameObj)
            .setTitleText("You've won!")
            .setMainText("You've found "+this.enemyArmy.gold+" pieces of\ngold in their corpses.")
            .setCallback(function(fightScene) {
                fightScene.gameObj.player.gold += fightScene.enemyArmy.gold;
                fightScene.enemyArmy.die();
                fightScene.exitFight();
            }, this).init();            
    }
}

/**
 * define which units are staged to move on the next move
 */
huungry.FightEngine.prototype.updateNextMovingUnits = function() {
    
    //reset previous unit if any
    if(this.playerMoves === true) {
        this.playerUnits[this.currentPlayerIndex].readiness = 0;
    }
    else if(this.playerMoves === false) {
        this.enemyUnits[this.currentEnemyIndex].readiness = 0;
    }
    
    //get the unit with the highest "readiness"    
    var maxReady = -99;
    for(var i=0, arrayLen = this.playerUnits.length; i< arrayLen; i++) {
        this.playerUnits[i].readiness+= Math.random();
        if(this.playerUnits[i].readiness > maxReady) {
            this.currentPlayerIndex = i;
            maxReady = this.playerUnits[i].readiness;
            this.playerMoves = true;
        }        
    }
    
    for(i=0, arrayLen = this.enemyUnits.length; i< arrayLen; i++) {
        this.enemyUnits[i].readiness+= Math.random();
        if(this.enemyUnits[i].readiness > maxReady) {
            this.currentEnemyIndex = i;            
            maxReady = this.enemyUnits[i].readiness;
            this.playerMoves = false;
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