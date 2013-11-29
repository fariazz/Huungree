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
    
    
    var passButton = new lime.Sprite().setSize(this.gameObj.tileSize*3, this.gameObj.tileSize)
        .setPosition(2*this.gameObj.tileSize, this.gameObj.screenHeight - this.gameObj.tileSize/2)
        .setFill('assets/images/backgrounds/button.png');
    var passButtonText = new lime.Label().setText('PASS').setPosition(0,0)
        .setFontColor('#000000').setFontSize(16);
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
            for(var j=0; j<currentObj.enemyUnits.length; j++) {
                currentObj.enemyUnits[j].life = -1;           
            }

            currentObj.pass();
        });

        //run away    
        var runButton = new lime.GlossyButton().setSize(this.gameObj.tileSize*2,this.gameObj.tileSize*0.8)
            .setPosition(this.gameObj.tileSize*1,this.gameObj.tileSize*7.7)
            .setAnchorPoint(0,0)
            .setText('Run').setColor('#00CD00'); 
        this.fightUILayer.appendChild(runButton);

        var currentObj = this;
        goog.events.listen(runButton, ['mousedown','touchstart'], function(e) {
            currentObj.exitFight();
        });
    }
    
    var itemsButton = new lime.Sprite().setSize(this.gameObj.tileSize*3, this.gameObj.tileSize)
        .setPosition(this.gameObj.tileSize*5.5, this.gameObj.screenHeight - this.gameObj.tileSize/2)
        .setFill('assets/images/backgrounds/button.png');
    this.itemsButtonText = new lime.Label().setText('ITEMS').setPosition(0,0)
        .setFontColor('#000000').setFontSize(16);
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
            i++;
        }
    }

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
            this.rangeTargets.push(new lime.Sprite().setAnchorPoint(0,0).setFill('assets/rangeattack-icon.png')
                .setSize(tileSize,tileSize)
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
        alert('Game Over!');
        location.reload();
//        /this.exitFight();  
    }
    
    if(this.enemyUnits.length == 0) {
        var fightScene = this;

        var message = '<div class="centered">You\'ve found '+this.enemyArmy.gold+' pieces of gold in the corpses of your enemies.</div>';
        HuungryUI.showDialog('YOU HAVE WON!',message
                    ,[{text: 'OK', class: 'button-home', callback: function() {
                        HuungryUI.hideDialog();
                        fightScene.gameObj.player.gold += fightScene.enemyArmy.gold;
                        fightScene.enemyArmy.die();
                        fightScene.exitFight();
                        
                    }
                    }]);     
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
    this.hideTargets();
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
 * refresh player's units
 */
huungry.FightEngine.prototype.refreshItems = function() {
    this.playerItemsLayer.removeAllChildren();
    var gridX = 0, gridY = 0;
    var playerItemsRect = new lime.Sprite().setAnchorPoint(0,0).setFill('assets/items_grid.png')
        .setPosition(gridX,gridY);
    this.playerItemsLayer.appendChild(playerItemsRect);    
    
    this.itemHelp = new lime.Label().setText('')
        .setPosition(gridX, gridY + 70).setFontColor('#E8FC08').setFontSize(8)
        .setAnchorPoint(0,0);
    this.playerItemsLayer.appendChild(this.itemHelp);
    
    var thumbnailLayers = new Array();
    var thumbnail, thumbX, thumbY = gridY+1, lifeBar;
    for(i=0; i < this.gameObj.player.items.length; i++) {  
        
        thumbX = gridX + 1 + i%5*(this.gameObj.tileSize+1);
        
        if(i == 5) {
            thumbY += this.gameObj.tileSize+1;
        }
        
        thumbnailLayers.push(
            new lime.Layer().setAnchorPoint(0,0).setPosition(thumbX, thumbY));
        
        thumbnail = new lime.Sprite().setAnchorPoint(0,0)
            .setSize(this.gameObj.tileSize,this.gameObj.tileSize)
            .setFill('assets/'+this.gameObj.player.items[i].image)
            .setPosition(0,0);        
        
        thumbnailLayers[i].item = this.gameObj.player.items[i];
        thumbnailLayers[i].index = i;
        thumbnailLayers[i].appendChild(thumbnail);       
        this.playerItemsLayer.appendChild(thumbnailLayers[i]);  
        
        (function(thumbnailLayers, i, gameObj, currentObj) {
            goog.events.listen(thumbnailLayers[i], ['mousedown', 'touchstart'], function(e) {
                e.stopPropagation();
                currentObj.selectedItem = i;     
                currentObj.itemHelp.setText(gameObj.player.items[i].name);
                currentObj.useButton.setHidden(false);
            });
        })(thumbnailLayers, i, this.gameObj, this);
        
    }
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
            this.rangeTargets.push(new lime.Sprite().setAnchorPoint(0,0).setFill('assets/'+item.image)
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
