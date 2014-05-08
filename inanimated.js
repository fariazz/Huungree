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

	this.gameObj.fightEngine.skeletons.push(this); 
};

/**
* Turn inanimated object into a unit
*
* @param integer life of the skeleton army
* @param Array collection where to add the new unit
* @param int owner type of unit (player or enemy)
*/
huungry.Inanimated.prototype.turnIntoUnit = function(life, collection, owner) {
	var unitType;
	switch(this.type) {
		case this.gameObj.HUMAN_SKELLETON:
			unitType = 'skeletonunarmed';
		break;
		case this.gameObj.NONHUMAN_SKELLETON:
			unitType = 'skeletonunarmed';
		break;
	}
	var unitData = {life: life, removeAfterBattle: true};

	this.gameObj.fightEngine.addBattleUnit(_.extend(unitData, this.gameObj.unitTypes[unitType]), 
		owner == this.gameObj.PLAYER_UNIT, this.getPosition(), collection, owner);

	this.gameObj.fightEngine.skeletons = _.reject(this.gameObj.fightEngine.skeletons, 
		function(element){
			return element.id == this.id
		}, this);

	this.die();		
};