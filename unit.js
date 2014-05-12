goog.provide('huungry.Unit');

/*
 * Unit in battle scenes
 */
huungry.Unit = function() {
    goog.base(this);
}

goog.inherits(huungry.Unit,huungry.Character);

/**
 * Set unit data
 * 
 * @param json unitData
 */
huungry.Unit.prototype.setUnitData = function(unitData, isPlayer) {
    this.setFill('assets/images/units/'+unitData.image);
    
    _.extend(this, unitData);
    
    this.spellUseProbability = unitData.spellUseProbability ? unitData.spellUseProbability : 0;
    var color = isPlayer ? '#FFFFFF' : '#FF0000';
    
    this.lifeBar = new lime.Label().setPosition(this.gameObj.tileSize * 0.7,this.gameObj.tileSize * 0.6)
        .setText(Math.max(Math.ceil(this.life),0))
        .setFontSize(16)
        .setAnchorPoint(0,0)
        .setFontColor(color);
    this.appendChild(this.lifeBar);
    
    //init available spells for the unit for the battle
    this.currentBattleSpells = new Array();
    _.each(this.spells, function(value, index) {
        this.currentBattleSpells.push(_.clone(this.spells[index])); 
    }, this);


    return this;
}

/**
 * the player unit finished moving (hide gamepage, etc)
 */
huungry.Unit.prototype.playerMoved = function() {
    this.toggleGamepad(false);
    this.fightEngine.playTurn();
}

/**
 * attack a unit
 * 
 * @param huungry.Unit attackedUnit
 */
huungry.Unit.prototype.attackUnit = function(attackedUnit) {
    var damage = 0;
    if(!attackedUnit.numDefenseHits) {
        damage = this.attack*0.06 + Math.max(0, this.attack - attackedUnit.defense)*(this.gameObj.maxRandPercentage + Math.random()*0.1);
    }
    else {
        attackedUnit.numDefenseHits--;
        if(attackedUnit.numDefenseHits == 0) {
            attackedUnit.clearVisualEffects('defense spell is up!');            
        }
    }
    attackedUnit.life -= damage;
    //console.log(attackedUnit.name+' received a damage of '+damage);
    attackedUnit.showBeingAttacked(this);
    this.fightEngine.remainingMoves = 0;
}

/**
 * show that it's being attacked
 * 
 * @param {} attacker
 */
huungry.Unit.prototype.showBeingAttacked = function(attacker) {
    var effect = new lime.animation.FadeTo(0.2).setDuration(this.gameObj.movementDuration);                    
    this.runAction(effect);     
    var unit = this;
    //console.log(unit.name);
    goog.events.listen(effect,lime.animation.Event.STOP,function(){
        //console.log(unit.name+' was attacked');
        var effect2 = new lime.animation.FadeTo(1).setDuration(unit.gameObj.movementDuration);                    
        unit.runAction(effect2);   
        goog.events.listen(effect2,lime.animation.Event.STOP,function(){
            unit.refreshLifeBar(); 

            if(!attacker.isItem) {
                attacker.endMove();   
            }
            else {
                unit.fightEngine.hideTargets();
                unit.fightEngine.currentUnit.endMove();
            }                     
        });
    })
};

huungry.Unit.prototype.endMove = function(attacker) {
    if(this.fightEngine.playerMoves) {
        if(!this.isItem) {
            this.fightEngine.remainingMoves = 0;
            this.playerMoved(); 
        }
        else {
            this.fightEngine.hideItemTargets();
        }
    }    
    else {
        this.fightEngine.remainingMoves = 0;
        this.fightEngine.playTurn();
    }            
};

/**
 * udpate life bar
 */
huungry.Unit.prototype.refreshLifeBar = function() {
    this.lifeBar.setText(Math.max(Math.ceil(this.life),0));
}

/**
get unit power
*/
huungry.Unit.prototype.getPower = function() {
    var alfa_shoot = this.canShoot ? 1.4 : 1;
    var alfa_mov = 1 + (this.movements-1) * 0.5;
    return this.life * this.attack * alfa_shoot * alfa_mov;
}

/**
* set defense spell
* @param int numDefenseHits
*/
huungry.Unit.prototype.defenseSpell = function(numDefenseHits) {
    this.numDefenseHits = this.numDefenseHits + numDefenseHits || numDefenseHits;
    this.effectSprite = new lime.Sprite().setAnchorPoint(0,0)
        .setPosition(0,0).setSize(this.gameObj.tileSize, this.gameObj.tileSize)
        .setFill('#11E38C').setOpacity(0.3);
    this.appendChild(this.effectSprite);
    this.fightEngine.showBrief('protected!', this.getCenter());
}

/**
* set paralyze spell
* @param int numTurns
*/
huungry.Unit.prototype.paralyzeSpell = function(numTurns) {
    this.numTurnsParalyzed = this.numTurnsParalyzed + numTurns || numTurns;
    if(this.effectSprite) {
        this.removeChild(this.effectSprite);
    }
    this.effectSprite = new lime.Sprite().setAnchorPoint(0,0)
        .setPosition(0,0).setSize(this.gameObj.tileSize, this.gameObj.tileSize)
        .setFill('#5A5953').setOpacity(0.7);
    this.appendChild(this.effectSprite);
    this.fightEngine.showBrief('paralized!', this.getCenter());
}

/**
* set possessed spell
* @param int numTurns
*/
huungry.Unit.prototype.possessionSpell = function(numTurns, isPlayer) {
    this.numTurnsPossessed = this.numTurnsPossessed + numTurns || numTurns;
    if(this.effectSprite) {
        this.removeChild(this.effectSprite);
    }
    //rgb(102, 15, 161);
    this.effectSprite = new lime.Sprite().setAnchorPoint(0,0)
        .setPosition(0,0).setSize(this.gameObj.tileSize, this.gameObj.tileSize)
        .setFill('#ac193d').setOpacity(0.5);
    this.appendChild(this.effectSprite);
    this.fightEngine.showBrief('possessed!', this.getCenter());
}

/**
* end of possession spell
*/
huungry.Unit.prototype.revertPossession = function() {
    console.log('reverting possession');
    this.clearVisualEffects('possession is over!');
}


/**
* clear visual effectSprite
* @param string brief optional text to show
*/
huungry.Unit.prototype.clearVisualEffects = function(brief) {
    brief = brief || '';
    if(this.effectSprite) {
        this.removeChild(this.effectSprite);
    }
    this.fightEngine.showBrief(brief, this.getCenter());
}

/**
* get the number of spells left in the current battle
*/
huungry.Unit.prototype.getNumSpellsLeft = function() {
    if(!this.spells) {
        return 0;
    }
    else {
        var spellsLeft = 0;
        _.each(this.spells, function(value, key){
            spellsLeft += this.currentBattleSpells[key].numPerBattle;
        }, this);
        return spellsLeft;
    }
}

/**
* unit die
*/
huungry.Unit.prototype.die = function() {
    this.setHidden(true);
    var currPos = this.getPosition();
    var inanimated = new huungry.Inanimated()
        .setGameObj(this.gameObj)
        .setSize(this.gameObj.tileSize, this.gameObj.tileSize)
        .setPosition(currPos.x, currPos.y);

    inanimated.init({type: this.skelleton ? this.gameObj.HUMAN_SKELLETON : this.gameObj.NONHUMAN_SKELLETON });

    if(this.map) {
        this.map.removeElement(this);
    }
}