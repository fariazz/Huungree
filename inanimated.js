goog.provide('huungry.Inanimated');

/*
 * Inanimated element in battle scenes
 */
huungry.Inanimated = function() {
    goog.base(this);
};

goog.inherits(huungry.Inanimated,huungry.Character);

/**
 * Set data
 * 
 * @param Object
 */
huungry.Inanimated.prototype.init = function(data) {
	if(!data.image) {
		switch(data.type) {
			case this.gameObj.HUMAN_SKELLETON:
				data.image = 'bones-human.png';
			break;
			case this.gameObj.NONHUMAN_SKELLETON:
				data.image = 'bones-non-human.png';
			break;
		}		
	}
	_.extend(this, data);

	this.setFill('assets/images/inanimated/'+data.image);
	this.gameObj.fightEngine.fightLayer.appendChild(this);    
	this.gameObj.fightEngine.fightLayer.setChildIndex(this, 1);   

	this.gameObj.fightEngine.skelletons.push(this); 
};

/**
* Turn inanimated object into a unit
*
* @param Object item 
*/
huungry.Inanimated.prototype.turnIntoUnit = function(item) {
	var unitType;
	switch(this.type) {
		case this.gameObj.HUMAN_SKELLETON:
			unitType = 'skelletonunarmed';
		break;
		case this.gameObj.NONHUMAN_SKELLETON:
			unitType = 'skelletonunarmed';
		break;
	}
	//@TODO add num hits in text areas
	var unitData = {life: item.numHits, removeAfterBattle: true};

	this.gameObj.fightEngine.addBattleUnit(_.extend(unitData, this.gameObj.unitTypes[unitType]), 
		true, this.getPosition(), this.gameObj.fightEngine.playerUnits, this.gameObj.PLAYER_UNIT);

	this.die();		
};