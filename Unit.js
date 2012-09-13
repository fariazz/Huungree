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
huungry.Character.prototype.updateGamepad = function() {
    this.toggleGamepad(false);
    this.fightEngine.playTurn();
}