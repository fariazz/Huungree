goog.provide('huungry.FightEngine');

goog.require('lime.Circle');

/*
 * Takes care of the fighting
 */
huungry.FightEngine = function() {
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
    this.gameObj.fightEngine = this;

    this.fightScene = new lime.Scene().setRenderer(lime.Renderer.DOM);    
    this.fightLayer = new lime.Layer().setPosition(0,0).setAnchorPoint(0,0);    
    this.fightUILayer = new lime.Layer().setPosition(0,0).setAnchorPoint(0,0);    
        
    this.fightScene.appendChild(this.fightLayer);
    this.fightScene.appendChild(this.fightUILayer);
    this.gameObj.director.replaceScene(this.fightScene);
    
    this.map = new huungry.Map().setGameObj(this.gameObj)
        .setSize({width: this.gameObj.screenWidth, height: this.gameObj.screenHeight-this.gameObj.tileSize})
        .setBackground('assets/images/backgrounds/'+this.enemyArmy.background);
    
    this.fightLayer.appendChild(this.map.backgroundSprite);
    
    //bottom bar
    var bottomBar = new lime.Sprite().setAnchorPoint(0,0)
        .setSize(this.gameObj.screenWidth, this.gameObj.tileSize)
        .setFill('assets/images/backgrounds/battleBottomBar.png')
        .setPosition(0, this.gameObj.screenHeight - this.gameObj.tileSize);

    this.fightLayer.appendChild(bottomBar);

    currentObj = this;
    goog.events.listen(this.map.backgroundSprite, ['mousedown', 'touchstart'], function(e){
        var target = currentObj.map.getColRowFromXY(e.position.x, e.position.y);
        //console.log(currentObj.map.getTargetType(target.col, target.row));
    });
    
    
    this.DEFAULT_MSG_POS = {x: this.gameObj.tileSize*8.5, y: this.gameObj.screenHeight - this.gameObj.tileSize/2};
    this.infoText = new lime.Label().setText('').setPosition(this.gameObj.tileSize*8.5, this.gameObj.screenHeight - this.gameObj.tileSize/2)
        .setFontColor('#E9DDB9').setFontSize(16).setFontFamily('Courier').setFontWeight('bold');
    this.fightUILayer.appendChild(this.infoText);
    
    var passButton = new lime.Sprite().setSize(this.gameObj.tileSize*3*3/4, this.gameObj.tileSize*3/4)
        .setPosition(1.5*this.gameObj.tileSize, this.gameObj.screenHeight - this.gameObj.tileSize/2)
        .setFill('assets/images/backgrounds/button.png');
    var passButtonText = new lime.Label().setText('PASS').setPosition(0,0)
        .setFontColor('#000000').setFontSize(16).setFontFamily('Courier').setFontWeight('bold');
    passButton.appendChild(passButtonText);

    this.fightUILayer.appendChild(passButton);
    
    //pass
    goog.events.listen(passButton, ['mousedown','touchstart'], function(e) {    
        if(currentObj.playerMoves) {    
            currentObj.pass();
        }
    });
        
    
    
    if(this.gameObj.developmentMode) {
        //kill all
        var killButton = new lime.Sprite().setSize(this.gameObj.tileSize*3, this.gameObj.tileSize)
        .setPosition(this.gameObj.tileSize*9, this.gameObj.screenHeight - this.gameObj.tileSize/2)
        .setFill('assets/images/backgrounds/button.png');
    var killButtonText = new lime.Label().setText('KILL').setPosition(0,0)
        .setFontColor('#000000').setFontSize(16);
    killButton.appendChild(killButtonText);

    this.fightUILayer.appendChild(killButton);
        
        goog.events.listen(killButton, ['mousedown','touchstart'], function(e) {
            if(currentObj.playerMoves) {           
                for(var j=0; j<currentObj.enemyUnits.length; j++) {
                    currentObj.enemyUnits[j].life = -1;           
                }

                currentObj.pass();
            }
        });

        //run away    
        var runButton = new lime.GlossyButton().setSize(this.gameObj.tileSize*2,this.gameObj.tileSize*0.8)
            .setPosition(this.gameObj.tileSize*1,this.gameObj.tileSize*7.7)
            .setAnchorPoint(0,0)
            .setText('Run').setColor('#00CD00'); 
        this.fightUILayer.appendChild(runButton);

        var currentObj = this;
        goog.events.listen(runButton, ['mousedown','touchstart'], function(e) {
            if(currentObj.playerMoves) {   
                currentObj.exitFight();
            }
        });
    }
    
    var itemsButton = new lime.Sprite().setSize(this.gameObj.tileSize*3*3/4, this.gameObj.tileSize*3/4)
        .setPosition(this.gameObj.tileSize*4.2, this.gameObj.screenHeight - this.gameObj.tileSize/2)
        .setFill('assets/images/backgrounds/button.png');
    this.itemsButtonText = new lime.Label().setText('ITEMS').setPosition(0,0)
        .setFontColor('#000000').setFontSize(16).setFontFamily('Courier').setFontWeight('bold');
    itemsButton.appendChild(this.itemsButtonText);

    this.fightUILayer.appendChild(itemsButton);


    var currObj = this;
    goog.events.listen(itemsButton, ['mousedown','touchstart'], function(e) {        
        //can only use items when player is moving
        if(currObj.playerMoves) {
            
            if(HuungryUI.selectedItem === undefined) {
                //show player items
                HuungryUI.showBattleItemsWindow();  
            }
            else {
                currObj.hideItemTargets();
            }
        }
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
            id: this.playerUnits[i].typeid,
            name: this.playerUnits[i].name,
            image: this.playerUnits[i].image,
            attack: this.playerUnits[i].attack,
            defense: this.playerUnits[i].defense,
            canShoot: this.playerUnits[i].canShoot,
            life: this.playerUnits[i].life,
            movements: this.playerUnits[i].movements
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

    this.armyStats = {
        ps: 0,
        es: 0
    };

    //init player army
    this.playerUnitPositions = new Array();
    
    var i = 0, pos, unit;
    var takenCells = new Array();    
    var position, cellIndex;
    var len = this.gameObj.player.units.length;
    while(i < len) {
        position = {
            col: this.gameObj.fightScenePlayerStartX + goog.math.randomInt(this.gameObj.fightScenePlayerEndX-this.gameObj.fightScenePlayerStartX+1),
            row: this.gameObj.fightScenePlayerStartY + goog.math.randomInt(this.gameObj.fightScenePlayerEndY-this.gameObj.fightScenePlayerStartY+1)
        };
        cellIndex = position.col + position.row*1000;
        
        if(takenCells.indexOf(cellIndex) == -1) {
            takenCells.push(cellIndex);
            this.playerUnitPositions.push(position);
            pos = this.gameObj.map.getXYFromColRow(position.col,position.row);
            unit = new huungry.Unit()
                .setGameObj(this.gameObj)
                .setUnitData(this.gameObj.player.units[i],true)
                .setPosition(pos.x, pos.y)                
                .setElementType(this.gameObj.PLAYER_UNIT)
                .setMap(this.map)
                .refreshMapPos();     
            unit.customLayer = this.fightUILayer;
            unit.initGamepad();
            unit.fightEngine = this;
            unit.readiness = Math.random();
            this.playerUnits.push(unit);
            this.fightLayer.appendChild(unit);
            this.armyStats.ps += unit.getPower();
            i++;
        }
    }
    this.armyStats.ps *= 1 + this.gameObj.powerNumFactor*(len-1);

    //init enemy army
    this.enemyUnitPositions = new Array();    
    
    i=0;
    takenCells = new Array();    
    len = this.enemyArmy.units.length;
    while(i < len) {
        position = {
            col: this.gameObj.fightSceneEnemyStartX + goog.math.randomInt(this.gameObj.fightSceneEnemyEndX-this.gameObj.fightSceneEnemyStartX+0.99),
            row: this.gameObj.fightSceneEnemyStartY + goog.math.randomInt(this.gameObj.fightSceneEnemyEndY-this.gameObj.fightSceneEnemyStartY+0.99)
        };

        cellIndex = position.col + position.row*1000;
        
        if(takenCells.indexOf(cellIndex) == -1) {
            takenCells.push(cellIndex);
            this.enemyUnitPositions.push(position);
            pos = this.gameObj.map.getXYFromColRow(position.col, position.row);
            unit = new huungry.Unit()
                .setGameObj(this.gameObj)
                .setUnitData(this.enemyArmy.units[i], false)
                .setPosition(pos.x, pos.y)                
                .setElementType(this.gameObj.ENEMY_UNIT)
                .setMap(this.map)
                .refreshMapPos();   
            unit.fightEngine = this;
            unit.readiness = Math.random();
            this.enemyUnits.push(unit);
            this.fightLayer.appendChild(unit);
            this.armyStats.es += unit.getPower();
            i++;
        }            
    }
    this.armyStats.es *= 1 + this.gameObj.powerNumFactor*(len-1);

     console.log(this.armyStats);
}

/**
 * play a turn
 */
huungry.FightEngine.prototype.playTurn = function() {
    
    this.updateDead();
    
    if(!this.gameObj.player.inFightScene) {
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
                    if(Math.random() < currentObj.gameObj.accuracyProbability) {
                        enemy.attackUnit(currentObj.playerUnits[targetUnitIndex]);
                    }
                    else {
                        enemy.endMove();   
                        currentObj.showBrief('missed!', enemy.getCenter());
                    }
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
                            engine.remainingMoves--;
                            engine.playTurn();
                        })
                    }
                }
                //otherwise pass
                else {
                    this.remainingMoves = 0;
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

    unit.currentHighlight.setPosition(pos.x, pos.y);
    unit.currentHighlight.setHidden(false);

    for(var i=0, arrLen = unit.movementTargets.length; i<arrLen; i++) {
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

    //show range attack targets if allowed
    if(unit.canShoot) {
        
        this.rangeTargets = new Array();
        var enemyPos;
        var enemyUnitPos;
        for(var i = 0, arrayLen = this.enemyUnits.length; i< arrayLen; i++) {
            enemyPos = this.enemyUnits[i].getPosition();
            
            this.rangeTargets.push(new lime.Sprite().setAnchorPoint(0,0).setFill('#E3422C')
                .setSize(tileSize,tileSize).setOpacity(0.5)
                .setPosition(enemyPos.x, enemyPos.y));
            
            (function(i, currentObj) {
                goog.events.listen(currentObj.rangeTargets[i], ['mousedown', 'touchstart'], function(e) {
                    e.preventDefault();
                    unit.toggleGamepad(false);                    
                    enemyUnitPos = currentObj.enemyUnits[i].getPosition();
                    
                    //create bullet
                    var bullet = new lime.Circle().setPosition(pos.x+currentObj.gameObj.tileSize/2, pos.y+currentObj.gameObj.tileSize/2)
                        .setSize(currentObj.gameObj.tileSize/5,currentObj.gameObj.tileSize/5).setFill('#B0171F');
                    currentObj.fightLayer.appendChild(bullet);

                    var movement = new lime.animation
                        .MoveTo(enemyUnitPos.x+currentObj.gameObj.tileSize/2,enemyUnitPos.y+currentObj.gameObj.tileSize/2)
                        .setDuration(currentObj.gameObj.movementDuration);                    
                    bullet.runAction(movement); 

                    goog.events.listen(movement,lime.animation.Event.STOP,function(){
                        currentObj.fightLayer.removeChild(bullet);  
                        if(Math.random() < currentObj.gameObj.accuracyProbability) {
                            unit.attackUnit(currentObj.enemyUnits[i]);  
                        }  
                        else {
                            unit.endMove();
                            currentObj.showBrief('missed!', unit.getCenter());
                        }               
                        
                        this.remainingMoves = 0;
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
    var len = this.rangeTargets.length, i;
    for(i=0, arrayLen = len; i < arrayLen; i++) {    
        this.rangeTargets[i].setHidden(true);
        this.fightLayer.removeChild(this.rangeTargets[i]);
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
    
    this.armyStats.pe = 0;
    this.armyStats.ee = 0;

    var num_players = this.playerUnits.length;
    for(var i=num_players-1; i>= 0; i--) {
        if(this.playerUnits[i].life <= 0) {
            this.playerUnits[i].die();
            this.playerUnits.splice(i,1);
        }
        else {
            this.armyStats.pe += this.playerUnits[i].getPower();
        }
    }
    this.armyStats.pe *= 1 + this.gameObj.powerNumFactor*(num_players-1);
    
    var num_enemies = this.enemyUnits.length;
    for(i=num_enemies-1; i>= 0; i--) {
        if(this.enemyUnits[i].life <= 0) {
            this.enemyUnits[i].die();
            this.enemyUnits.splice(i,1);
        }
        else {
            this.armyStats.ee += this.enemyUnits[i].getPower();
        }
    }
    this.armyStats.ee *= 1 + this.gameObj.powerNumFactor*(num_enemies-1);
    
    //check army defeated
    if(this.playerUnits.length == 0) {
        var fightScene = this;
        fightScene.sendStats();
        fightScene.exitFight();
        HuungryUI.showDialog('GAME OVER', 
        'Your troops have been defeated, your treasures plundered by your enemies, and your name forgotten forever in History.',
        [{text: 'TRY AGAIN', btnClass: 'button-home', callback: function() {
            HuungryUI.hideDialog();    
            fightScene.exitFight();            
            window.location = '';
        }}]
        );      
    }
    
    if(this.enemyUnits.length == 0) {
        var fightScene = this;
        fightScene.sendStats();
        var delta = fightScene.armyStats.pe-fightScene.armyStats.ps;
        var ratio = delta / fightScene.armyStats.es;
        console.log('delta power:'+delta);
        console.log('ratio:'+ratio);       

        var message = '<div class="centered">You\'ve found '+this.enemyArmy.gold+' pieces of gold in the corpses of your enemies.</div>';
        HuungryUI.showDialog('YOU HAVE WON!',message
                    ,[{text: 'OK', btnClass: 'button-home', callback: function() {
                        HuungryUI.hideDialog();
                        fightScene.gameObj.player.gold += fightScene.enemyArmy.gold;
                        fightScene.enemyArmy.die();
                        fightScene.exitFight();    
                        fightScene.gameObj.checkQuestCompletion();        

                    }
                    }]);     
    }
}

/**
 * define which units are staged to move on the next move
 */
huungry.FightEngine.prototype.updateNextMovingUnits = function() {
    
    //reset previous unit if any, in case the movements run out
    if(this.playerMoves === true && this.remainingMoves == 0) {
        this.playerUnits[this.currentPlayerIndex].readiness = 0;
    }
    else if(this.playerMoves === false && this.remainingMoves == 0) {
        this.enemyUnits[this.currentEnemyIndex].readiness = 0;
    }
    
    if(!this.remainingMoves) {
        //get the unit with the highest "readiness"    
        var maxReady = -99;
        for(var i=0, arrayLen = this.playerUnits.length; i< arrayLen; i++) {
            this.playerUnits[i].readiness+= Math.random();
            if(this.playerUnits[i].readiness > maxReady) {
                this.currentPlayerIndex = i;
                maxReady = this.playerUnits[i].readiness;
                this.playerMoves = true;
                this.remainingMoves = this.playerUnits[i].movements;
            }        
        }
        
        for(i=0, arrayLen = this.enemyUnits.length; i< arrayLen; i++) {
            this.enemyUnits[i].readiness+= Math.random();
            if(this.enemyUnits[i].readiness > maxReady) {
                this.currentEnemyIndex = i;            
                maxReady = this.enemyUnits[i].readiness;
                this.playerMoves = false;
                this.remainingMoves = this.enemyUnits[i].movements;
            }        
        }  
    }    
}

/**
 * pass a turn
 */
huungry.FightEngine.prototype.pass = function() {
    this.hideTargets();
    this.remainingMoves = 0;
    this.playTurn();
}

/**
 * hide unit targets
 */
huungry.FightEngine.prototype.hideTargets = function() {
    this.playerUnits[this.currentPlayerIndex].toggleGamepad(false);
    this.clearRangeTargets();
}

/**
 * init items window
 */
huungry.FightEngine.prototype.initItemsWindow = function() {

    
    //close event
    var currObj = this;
    goog.events.listen(closeButton,['mousedown', 'touchstart'], function(e) {
        currObj.gameObj.director.popScene();
    });
    
    goog.events.listen(this.useButton,['mousedown', 'touchstart'], function(e) {
        currObj.showItemTargets();
        currObj.gameObj.director.popScene();
    });
    
    var gridX = 5, gridY= 40;
    this.playerItemsLayer = new lime.Layer().setAnchorPoint(0,0).setPosition(gridX, gridY);
    this.itemsScene.appendChild(this.playerItemsLayer);     
};


/**
 * show item targets
 */
huungry.FightEngine.prototype.showItemTargets = function() {
    this.itemsButtonText.setText('CANCEL');
    //this.useButton.setHidden(true);
    this.hideTargets();
        
    var unit = this.playerUnits[this.currentPlayerIndex];
    var pos = unit.getPosition();        
    var tileSize = this.gameObj.tileSize;
    var currentObj = this;
    
    var item = this.gameObj.player.items[HuungryUI.selectedItem];

    //show range attack targets if attack spell
    if(item.type == 'ITEM.ATTACK-SPELL') {
       
        this.rangeTargets = new Array();
        var enemyPos;
        for(var i = 0, arrayLen = this.enemyUnits.length; i< arrayLen; i++) {
            enemyPos = this.enemyUnits[i].getPosition();
            this.rangeTargets.push(new lime.Sprite().setAnchorPoint(0,0).setFill('assets/images/items/'+item.image)
                .setOpacity(0.5)
                .setSize(tileSize,tileSize)
                .setPosition(enemyPos.x, enemyPos.y));
            
            (function(i, currentObj) {
                goog.events.listen(currentObj.rangeTargets[i], ['mousedown', 'touchstart'], function(e) {
                    e.preventDefault();                         
                    item.attackUnit(currentObj.enemyUnits[i]);  
                });
            })(i, currentObj);
                
            this.fightLayer.appendChild(this.rangeTargets[i]);
        }
        this.showBrief('pick an enemy', this.DEFAULT_MSG_POS);
    }
    else if(item.type == 'ITEM.DEFENSE-SPELL') {
        this.rangeTargets = new Array();
        var unitPos;
        for(var i = 0, arrayLen = this.playerUnits.length; i< arrayLen; i++) {
            unitPos = this.playerUnits[i].getPosition();
            this.rangeTargets.push(new lime.Sprite().setAnchorPoint(0,0).setFill('assets/images/items/'+item.image)
                .setOpacity(0.5)
                .setSize(tileSize,tileSize)
                .setPosition(unitPos.x, unitPos.y));
            
            (function(i, currentObj) {
                goog.events.listen(currentObj.rangeTargets[i], ['mousedown', 'touchstart'], function(e) {
                    e.preventDefault();                         
                    item.protectUnit(currentObj.playerUnits[i]);  
                    currentObj.showBrief('unit protected!', currentObj.DEFAULT_MSG_POS);
                });
            })(i, currentObj);
                
            this.fightLayer.appendChild(this.rangeTargets[i]);
        }
        this.showBrief('pick a unit', this.DEFAULT_MSG_POS);
    }
};

/**
 * hide item target
 */
huungry.FightEngine.prototype.hideItemTargets = function() {
    HuungryUI.selectedItem = undefined;
    this.itemsButtonText.setText('ITEMS');
    this.clearRangeTargets();
    this.updateDead();
    this.showCurrentGamepad();
    
};

/**
* show something briefly in the info area
*/
huungry.FightEngine.prototype.showBrief = function(text, position) {
    this.infoText.setText(text);
    this.infoText.setPosition(position);
    var that = this;
    setTimeout(function() {
        that.infoText.setText('');
    }, 1000);
}

/**
* send stats to server
*/
huungry.FightEngine.prototype.sendStats = function() {
    var that = this;
    var platform = 'desktop', 
    platform_version='', 
    device_id='';

    if(window.device) {
        platform = window.device.platform;
        platform_version = window.device.version;
        device_id = window.device.uuid;
    }

    $.ajax(this.gameObj.API_BATTLE_URL, {
        data: _.extend(that.armyStats, {
            game_version: that.gameObj.GAME_VERSION,
            platform: platform,
            platform_version: platform_version,
            device_id: device_id,
            level: that.gameObj.currentLevel,
            gold: that.gameObj.player.gold,
            currTimestamp: (new Date).getTime()
        })
    });
}
