goog.provide('huungry.FightEngine');

goog.require('lime.Circle');

/*
 * Takes care of the fighting
 */
huungry.FightEngine = function() {
    this.playerUnits = [];
    this.enemyUnits = [];
    this.rangeTargets = [];
    this.skeletons = [];
};

huungry.FightEngine.prototype.setGameObj = function(gameObj) {
    this.gameObj = gameObj;
    return this;
};

huungry.FightEngine.prototype.setEnemyArmy = function(enemyArmy) {
    this.enemyArmy = enemyArmy;
    return this;
};

/**
 * initiate fighting
 */
huungry.FightEngine.prototype.init = function() {
    this.gameObj.fightEngine = this;

    this.fightScene = new lime.Scene().setRenderer(this.gameObj.renderer);
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

    this.infoText2 = new lime.Label().setText('').setPosition(this.gameObj.tileSize*8.5, this.gameObj.screenHeight - this.gameObj.tileSize/2)
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
        if(currentObj.playerMoves || (currentObj.currentUnit && currentObj.currentUnit.numTurnsPossessed)) {
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

    goog.events.listen(itemsButton, ['mousedown','touchstart'], function(e) {
        //can only use items when player is moving
        if(currentObj.playerMoves || (currentObj.currentUnit && currentObj.currentUnit.numTurnsPossessed)) {

            if(HuungryUI.selectedItem === undefined) {
                //show player items
                HuungryUI.showBattleItemsWindow();
            }
            else {
                currentObj.hideItemTargets();
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
            typeid: this.playerUnits[i].typeid,
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
    //var previousPos = this.gameObj.player.previousPosition;
    //this.gameObj.player.setPosition(previousPos.x, previousPos.y);
    this.gameObj.player.inFightScene = false;
    this.gameObj.controlsLayer.refreshInfo();
    //this.gameObj.player.playerMoved();

    //show interstitial ads on lite version
    if(!this.gameObj.isFullVersion) {
        var showInter = Math.random() < 0.5;

        if(this.gameObj.adsInitiated && showInter) {
            AdMob.showInterstitial();
        }

        else {
            HuungryUI.showPremiumAdDialog();
        }
    }
};

/**
 * initiate armies
 */
huungry.FightEngine.prototype.initArmies = function() {

    //init player army
    this.playerUnitPositions = [];

    var i = 0, pos, unit;
    var takenCells = [];
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
            unit = this.addBattleUnit(this.gameObj.player.units[i], true, pos, this.playerUnits, this.gameObj.PLAYER_UNIT);
            i++;
        }
    }

    //init enemy army
    this.enemyUnitPositions = [];

    i=0;
    takenCells = [];
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
            unit = this.addBattleUnit(this.enemyArmy.units[i], false, pos, this.enemyUnits, this.gameObj.ENEMY_UNIT);
            i++;
        }
    }

    this.initPowerStats();
};

/**
* add a unit to the battle
* @param Object unitData
* @param Object isPlayer
* @param Object pos
* @param Array collection
* @param int type
* @return huungry.Unit
*/
huungry.FightEngine.prototype.addBattleUnit = function (unitData, isPlayer, pos, collection, type) {
    var unit = new huungry.Unit()
        .setGameObj(this.gameObj)
        .setUnitData(unitData, isPlayer)
        .setPosition(pos.x, pos.y)
        .setElementType(type)
        .setMap(this.map)
        .refreshMapPos();
    unit.customLayer = this.fightUILayer;
    unit.initGamepad();
    unit.fightEngine = this;
    unit.readiness = Math.random();
    collection.push(unit);
    this.fightLayer.appendChild(unit);
    return unit;
};

/**
* init power stats
*/
huungry.FightEngine.prototype.initPowerStats = function() {
    this.armyStats = {
        ps: 0,
        es: 0
    };

    _.each(this.playerUnits, function(value, key){
        this.armyStats.ps += value.getPower();
    }, this);
    this.armyStats.ps *= 1 + this.gameObj.powerNumFactor*(this.playerUnits.length-1);

    _.each(this.enemyUnits, function(value, key){
        this.armyStats.es += value.getPower();
    }, this);
    this.armyStats.es *= 1 + this.gameObj.powerNumFactor*(this.enemyUnits.length-1);
}

/**
 * play a turn
 */
huungry.FightEngine.prototype.playTurn = function() {

    this.updateDead();

    if(!this.gameObj.player.inFightScene) {
        return;
    }

    if(this.currentUnit && this.currentUnit.numTurnsPossessed > 0) {
        this.currentUnit.numTurnsPossessed--;

        if(this.currentUnit.numTurnsPossessed == 0) {
            this.currentUnit.revertPossession();
        }
    }

    this.updateNextMovingUnits();

    if(this.checkParalyzedUnit()) {
        this.remainingMoves = 0;
        this.playTurn();
        return;
    }

    if(this.playerMoves) {
        //show gamepad for current unit
        this.playerPlayTurn();
    }
    else {
        this.enemyPlayTurn();
    }
};

/**
* check whether the current unit is paralyzed. If so skip turn
*/
huungry.FightEngine.prototype.checkParalyzedUnit = function() {

    var unit;
    if(this.playerMoves) {
        unit = this.playerUnits[this.currentPlayerIndex]
    }
    else {
        unit = this.enemyUnits[this.currentEnemyIndex]
    }

    //check for paralyzed
    if(unit.numTurnsParalyzed) {
        this.showBrief('can\'t move!', unit.getCenter());
        unit.numTurnsParalyzed--;

        if(unit.numTurnsParalyzed == 0) {
            unit.clearVisualEffects('paralyze effect is up!');
        }
        unit.readiness = 0;
        return true;
    }
    return false;
};

/**
* enemy play turn
*/
huungry.FightEngine.prototype.enemyPlayTurn = function() {

    this.currentUnit = this.enemyUnits[this.currentEnemyIndex]
    var unitPos = this.currentUnit.getPosition();

    //if possessed the enemy moves the unit
    if(this.currentUnit.numTurnsPossessed) {
        if(!this.currentUnit.movementTargets) {
            this.currentUnit.initGamepad();
        }
        this.showCurrentGamepad(this.currentUnit, unitPos);
        return;
    }

    //decide whether attacking or casting spell
    if(Math.random() > this.currentUnit.spellUseProbability || this.currentUnit.getNumSpellsLeft() == 0){
        this.enemyAttack(this.currentUnit, unitPos);
    }
    else {
        this.enemyCastSpell(this.currentUnit, unitPos);
    }
};

/**
* enemy cast spell
*/
huungry.FightEngine.prototype.enemyCastSpell = function(enemy, unitPos) {

    //get spells that have
    var availableSpells = _.filter(enemy.currentBattleSpells, function(element) {return element.numPerBattle > 0;})

    var chosenSpell = availableSpells[_.random(0, availableSpells.length-1)];
    chosenSpell.numPerBattle--;

    var brief = 'casting a spell';
    switch(chosenSpell.name) {
        case 'paralyze':
            var nonAffectedUnits = _.filter(this.playerUnits, function(element){ return !element.numTurnsParalyzed}, this);

            var targetUnit;
            if(nonAffectedUnits.length) {
                targetUnit = nonAffectedUnits[_.random(0,nonAffectedUnits.length-1)];
            }
            else {
                //can call twice on the same unit, turns will add up
                targetUnit = this.playerUnits[_.random(0,this.playerUnits.length-1)];
            }

            this.showBrief('casting paralize spell', enemy.getCenter());

            setTimeout(function() {
                targetUnit.paralyzeSpell(chosenSpell.value);
                setTimeout(function() {enemy.endMove()}, 1000);
            }, 800);

        break;
        case 'possession':
            var nonAffectedUnits = _.filter(this.playerUnits, function(element){ return !element.numTurnsPossessed}, this);

            var targetUnit;
            if(nonAffectedUnits.length) {
                targetUnit = nonAffectedUnits[_.random(0,nonAffectedUnits.length-1)];
            }
            else {
                //can call twice on the same unit, turns will add up
                targetUnit = this.playerUnits[_.random(0,this.playerUnits.length-1)];
            }

            this.showBrief('casting possession spell', enemy.getCenter());

            setTimeout(function() {
                targetUnit.possessionSpell(chosenSpell.value);
                setTimeout(function() {enemy.endMove()}, 1000);
            }, 800);

        break;
        case 'resurrection':
            //can only cast if there are skeletons
            if(this.skeletons.length) {
                var inanimatedTarget = _.sample(this.skeletons);
                this.showBrief('casting resurrection spell', inanimatedTarget.getCenter());
                console.log(inanimatedTarget);
                var that = this;
                setTimeout(function() {
                    inanimatedTarget.turnIntoUnit(chosenSpell.value, that.gameObj.fightEngine.enemyUnits, that.gameObj.ENEMY_UNIT);
                    setTimeout(function() {enemy.endMove()}, 1000);
                }, 800);
            }
            else {
                //else just attack
                this.enemyAttack(enemy, unitPos);
            }
        break;
        case 'summon':
        break;
        case 'golem':
        break;
        case 'replicate':
        break;
        case 'speed':
        break;
        case 'weaken':
        break;
        case 'strength':
        break;
        case 'lightening':
        break;
    }
};

/**
* enemy attack the player
*/
huungry.FightEngine.prototype.enemyAttack = function(enemy, unitPos) {

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
};


/**
* player turn to fight
*/
huungry.FightEngine.prototype.playerPlayTurn = function() {

    this.itemsButtonText.setText('ITEMS');

    this.currentUnit = this.playerUnits[this.currentPlayerIndex];
    var pos = this.currentUnit.getPosition();

    //if possessed the enemy moves the unit
    if(this.currentUnit.numTurnsPossessed) {
        this.enemyAttack(this.currentUnit, pos);
        return;
    }

    this.showCurrentGamepad(this.currentUnit, pos);
};

/**
 * show gamepad for current unit
 */
huungry.FightEngine.prototype.showCurrentGamepad = function(unit, pos) {

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

        this.rangeTargets = [];
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
};

/**
 * remove range targets from layer
 */
 huungry.FightEngine.prototype.clearRangeTargets = function() {
    var len = this.rangeTargets.length, i;
    for(i=0, arrayLen = len; i < arrayLen; i++) {
        this.rangeTargets[i].setHidden(true);
        this.fightLayer.removeChild(this.rangeTargets[i]);
    }

 };


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
};

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
    if(this.playerUnits.length === 0) {
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
    };

    if(this.enemyUnits.length == 0) {
        var fightScene = this;
        fightScene.sendStats();
        var delta = fightScene.armyStats.pe-fightScene.armyStats.ps;
        var ratio = delta / fightScene.armyStats.es;
        console.log('delta power:'+delta);
        console.log('ratio:'+ratio);

        if(this.playerUnits.length > this.gameObj.player.maxNumUnits ) {
            var counter = this.playerUnits.length - this.gameObj.player.maxNumUnits + 1;
            this.playerUnits = _.reject(this.playerUnits, function(element){
                if(element.removeAfterBattle) {
                    counter--;
                }
                return element.removeAfterBattle && counter > 0;
            });
        }
        else {
            _.each(this.playerUnits, function(value, key){
                value.removeAfterBattle = false;
            });
        }

        var message = '<div class="centered">You\'ve found '+this.enemyArmy.gold+' pieces of gold in the corpses of your enemies.</div>';
        HuungryUI.showDialog('YOU HAVE WON!',message
            ,[{text: 'OK', btnClass: 'button-home', callback: function() {

                fightScene.gameObj.playSound('royal-jester', {unique: true, loop: true});

                HuungryUI.hideDialog();
                fightScene.gameObj.player.gold += fightScene.enemyArmy.gold;
                fightScene.enemyArmy.die();
                fightScene.exitFight();
                fightScene.gameObj.checkQuestCompletion();
                fightScene.gameObj.controlsLayer.refreshInfo();
            }
            }]);
    }
};

/**
 * define which units are staged to move on the next move
 */
huungry.FightEngine.prototype.updateNextMovingUnits = function() {

    //reset previous unit if any, in case the movements run out
    if(this.playerMoves === true && this.remainingMoves == 0 && this.currentUnit) {
        this.currentUnit.readiness = 0;
    }
    else if(this.playerMoves === false && this.remainingMoves == 0 && this.currentUnit) {
        this.currentUnit.readiness = 0;
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
};

/**
 * pass a turn
 */
huungry.FightEngine.prototype.pass = function() {
    this.itemsButtonText.setText('ITEMS');
    this.hideTargets();
    this.remainingMoves = 0;
    this.playTurn();
};

/**
 * hide unit targets
 */
huungry.FightEngine.prototype.hideTargets = function() {
    this.currentUnit.toggleGamepad(false);
    //this.playerUnits[this.currentPlayerIndex].toggleGamepad(false);
    this.clearRangeTargets();
};

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
    if(_.contains(['ITEM.ATTACK-SPELL', 'ITEM.PARALYZE-SPELL', 'ITEM.POSSESSION-SPELL'], item.type)) {

        this.rangeTargets = [];
        var enemyPos, target;
        for(var i = 0, arrayLen = this.enemyUnits.length; i< arrayLen; i++) {

            enemyPos = this.enemyUnits[i].getPosition();
            target = new lime.Sprite().setAnchorPoint(0,0).setFill('assets/images/items/'+item.image)
                .setOpacity(0.5)
                .setSize(tileSize,tileSize)
                .setPosition(enemyPos.x, enemyPos.y);

            this.rangeTargets.push(target);

            (function(i, currentObj) {
                goog.events.listen(currentObj.rangeTargets[i], ['mousedown', 'touchstart'], function(e) {
                    e.preventDefault();

                    if(item.type == 'ITEM.ATTACK-SPELL')  {
                        item.attackUnit(currentObj.enemyUnits[i]);
                        currentObj.showBrief('fire!', currentObj.enemyUnits[i].getCenter());
                        HuungryUI.selectedItem = undefined;
                        currentObj.hideTargets();
                    }
                    else if(item.type == 'ITEM.PARALYZE-SPELL') {
                        item.paralyzeUnit(currentObj.enemyUnits[i]);
                        HuungryUI.selectedItem = undefined;
                        currentObj.hideTargets();
                        currentObj.currentUnit.endMove();
                    }
                    else if(item.type == 'ITEM.POSSESSION-SPELL') {
                        item.possessUnit(currentObj.enemyUnits[i]);
                        HuungryUI.selectedItem = undefined;
                        currentObj.hideTargets();
                        currentObj.currentUnit.endMove();
                    }

                });
            })(i, currentObj);

            this.fightLayer.appendChild(this.rangeTargets[i]);
        }
        this.showBrief('pick an enemy', this.DEFAULT_MSG_POS);
    }
    else if(item.type == 'ITEM.DEFENSE-SPELL') {
        this.rangeTargets = [];
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
                    HuungryUI.selectedItem = undefined;
                    currentObj.hideTargets();
                    currentObj.currentUnit.endMove();
                });
            })(i, currentObj);

            this.fightLayer.appendChild(this.rangeTargets[i]);
        }
        this.showBrief('pick a unit', this.DEFAULT_MSG_POS);
    }
    else if(item.type == 'ITEM.RESURRECTION-SPELL') {
        this.rangeTargets = [];
        var targetPos;

        if(this.skeletons.length) {
            for(var i = 0, arrayLen = this.skeletons.length; i< arrayLen; i++) {
                targetPos = this.skeletons[i].getPosition();
                this.rangeTargets.push(new lime.Sprite().setAnchorPoint(0,0).setFill('assets/images/items/'+item.image)
                    .setOpacity(0.5)
                    .setSize(tileSize,tileSize)
                    .setPosition(targetPos.x, targetPos.y));

                (function(i, currentObj) {
                    goog.events.listen(currentObj.rangeTargets[i], ['mousedown', 'touchstart'], function(e) {
                        e.preventDefault();
                        item.turnIntoUnit(currentObj.skeletons[i], currentObj.gameObj.fightEngine.playerUnits, currentObj.gameObj.PLAYER_UNIT);
                        HuungryUI.selectedItem = undefined;
                        currentObj.hideTargets();
                        currentObj.currentUnit.endMove();
                    });
                })(i, currentObj);

                this.fightLayer.appendChild(this.rangeTargets[i]);
            }
            this.showBrief('pick a bone pile', this.DEFAULT_MSG_POS);
        }
        else {
            this.showBrief('there are no bone piles!', this.DEFAULT_MSG_POS);
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

    var pos = this.currentUnit.getPosition();
    this.showCurrentGamepad(this.currentUnit, pos);
};

/**
* show something briefly in the info area
*/
huungry.FightEngine.prototype.showBrief = function(text, position) {
    if(this.briefTimeout) {
        clearTimeout(this.briefTimeout);
    }
    console.log(text);
    this.infoText.setText(text);
    this.infoText.setPosition(position);
    var that = this;
    this.briefTimeout = setTimeout(function() {
        that.infoText.setText('');
    }, 1000);
};

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

        $.ajax(this.gameObj.API_BATTLE_URL, {
            data: _.extend(that.armyStats, {
                game_version: that.gameObj.GAME_VERSION,
                platform: platform,
                platform_version: platform_version,
                device_id: device_id,
                level: that.gameObj.currentLevel,
                gold: that.gameObj.player.gold,
                currTimestamp: (new Date).getTime(),
                isFullVersion: that.gameObj.isFullVersion ? 1 : 0
            })
        });
    }
};
