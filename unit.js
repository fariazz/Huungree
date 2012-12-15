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
huungry.Unit.prototype.setUnitData = function(unitData) {
    this.setFill('assets/'+unitData.image);
    
    this.attack = unitData.attack;
    this.defense = unitData.defense;
    this.life = unitData.life;
    this.name = unitData.name;
    this.canShoot = unitData.canShoot;
    this.image = unitData.image;
    
    this.lifeBar = new lime.Label().setPosition(12,13).setText(Math.max(Math.ceil(this.life),0)).setFontSize(10)
        .setAnchorPoint(0,0).setFontColor('#FFFFFF');
    this.appendChild(this.lifeBar);
    
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
    var damage = Math.max(0, this.attack - attackedUnit.defense) + Math.random()*this.gameObj.maxRandPercentage*this.attack;
    attackedUnit.life -= damage;
    console.log(attackedUnit.name+' received a damage of '+damage);
    attackedUnit.showBeingAttacked(this);
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
    console.log(unit.name);
    goog.events.listen(effect,lime.animation.Event.STOP,function(){
        console.log(unit.name+' was attacked');
        var effect2 = new lime.animation.FadeTo(1).setDuration(unit.gameObj.movementDuration);                    
        unit.runAction(effect2);   
        goog.events.listen(effect2,lime.animation.Event.STOP,function(){
            console.log(unit);
            console.log(unit.fightEngine);
            if(unit.fightEngine.playerMoves) {
                unit.refreshLifeBar();    
                attacker.playerMoved();                            
            }    
            else {
                unit.refreshLifeBar();
                unit.fightEngine.playTurn();
            }            
        });
    })
}

/**
 * udpate life bar
 */
huungry.Unit.prototype.refreshLifeBar = function() {
    this.lifeBar.setText(Math.max(Math.ceil(this.life),0));
}