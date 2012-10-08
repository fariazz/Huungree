goog.provide('huungry.Unit');

/*
 * Unit in battle scenes
 */
huungry.Unit = function() {
    goog.base(this);

    this.setAnchorPoint(0, 0);
    this.setSize(40,40);
    this.path = [];
    this.setAnchorPoint(0, 0);
}

goog.inherits(huungry.Unit,huungry.Character);

/**
 * Set unit data
 * 
 * @param json unitData
 */
huungry.Unit.prototype.setUnitData = function(unitData) {
    this.setFill('assets/'+unitData.image);
    
    this.attack = unitData.attack;
    this.defense = unitData.defense;
    this.life = unitData.life;
    this.name = unitData.name;
    this.canShoot = unitData.canShoot;
    
    return this;
}

/**
 * by default hide gamepad
 */
huungry.Unit.prototype.updateGamepad = function() {
    this.toggleGamepad(false);
    this.fightEngine.playerMoves = false;
    this.fightEngine.playTurn();
}

/**
 * attack a unit
 * 
 * @param huungry.Unit attackedUnit
 */
huungry.Unit.prototype.attackUnit = function(attackedUnit) {
    attackedUnit.life -= Math.max(0, this.attack - attackedUnit.defense) + Math.random()*this.gameObj.maxRandPercentage*this.attack;
    attackedUnit.showBeingAttacked();
}

/**
 * show that it's being attacked
 */
huungry.Unit.prototype.showBeingAttacked = function() {
    var effect = new lime.animation.FadeTo(0.5).setDuration(this.gameObj.movementDuration);                    
    this.runAction(effect);     
    var unit = this;
    goog.events.listen(effect,lime.animation.Event.STOP,function(){
        var effect = new lime.animation.FadeTo(1).setDuration(unit.gameObj.movementDuration);                    
        unit.runAction(effect);   
    })
}