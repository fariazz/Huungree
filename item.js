goog.provide('huungry.Item');
goog.require('lime.Sprite');
goog.require('huungry.Character');

/*
 * Item
 */
huungry.Item = function() {
    goog.base(this);
    this.isItem = true;
    
}

goog.inherits(huungry.Item,huungry.Character);


huungry.Item.prototype.init = function() {
    this.elementType = this.gameObj.ITEM_TARGET;

    if(this.type == 'ITEM.GOLD') {
        this.gold = parseInt(this.gold * (1 + 0.2*(Math.random() - Math.random())));
    }
    else if(this.type == 'ITEM.ATTACK-SPELL') {
        this.attack = parseInt(this.attack * (1 + 0.4*(Math.random() - Math.random())));
    }
    else if(this.type == 'ITEM.DEFENSE-SPELL') {
        this.numHits = Math.max(1, parseInt(this.numHits * (1 + 0.5*(Math.random() - Math.random()))));
    }
    else if(this.type == 'ITEM.PARALIZE-SPELL') {
        this.numHits = Math.max(1, parseInt(this.numHits * (1 + 0.5*(Math.random() - Math.random()))));
    }

    this.showGoalIcon();  
    
    return this;
}

/**
 * pass data
 * @param {} data
 */
huungry.Item.prototype.setData = function(data) {
    this.setFill('assets/images/items/'+data.image);
    this.image = data.image;
    this.name = data.name;
    this.type = data.type;        
    this.gold = data.gold;
    this.attack = data.attack;
    this.numHits = data.numHits;
    this.isQuestGoal = data.isQuestGoal;
    this.text = data.text;
    this.attribute = data.attribute;

    return this;
}

/**
 * create a deep copy of a item
 */
huungry.Item.prototype.clone = function() {
    var cloned = new huungry.Item();
    var props= {
            name: this.name,
            image: this.image,
            type: this.type,            
            gold: this.gold,            
            attack: this.attack,
            numHits: this.numHits,    
            isQuestGoal: this.isQuestGoal,
            text: this.text,
            attribute: this.attribute   
    };
    return cloned.setData(props).setGameObj(this.gameObj);
};

/**
 * use an item to attack a unit
 * 
 * @param huungry.Unit attackedUnit
 */
huungry.Item.prototype.attackUnit = function(attackedUnit) {
    var damage = this.attack*0.05 + Math.max(0, this.attack - attackedUnit.defense)*(this.gameObj.maxRandPercentage + Math.random()*0.1);
    attackedUnit.life -= damage;
    //console.log(attackedUnit.name+' received a damage of '+damage);
    attackedUnit.showBeingAttacked(this);
    this.gameObj.player.items.splice(HuungryUI.selectedItem,1);
    //console.log(this.gameObj.player.items);
};

/**
* use an item to protect a unit
*
 * @param huungry.Unit spellTargetUnit
 */
huungry.Item.prototype.protectUnit = function(spellTargetUnit) {
    spellTargetUnit.defenseSpell(this.numHits);    
    this.gameObj.player.items.splice(HuungryUI.selectedItem,1);
    this.gameObj.fightEngine.hideItemTargets();
};

/**
* paralize unit
*
 * @param huungry.Unit spellTargetUnit
 */
huungry.Item.prototype.paralyzeUnit = function(spellTargetUnit) {
    spellTargetUnit.paralyzeSpell(this.numHits);    
    this.gameObj.player.items.splice(HuungryUI.selectedItem,1);
    this.gameObj.fightEngine.hideItemTargets();
};


/**
 * get data
 */
huungry.Item.prototype.getData = function() {
    return {
        image: this.image,
        name: this.name,
        type: this.type,
        gold: this.gold,
        attack: this.attack,
        x: this.getPosition().x,
        y: this.getPosition().y,
        numHits: this.numHits,
        isQuestGoal: this.isQuestGoal,
        text: this.text,
        attribute: this.attribute
    };
};

/**
* remove element
*/
huungry.Item.prototype.die = function() {
    goog.base(this, 'die');
    var index;
    _.each(this.gameObj.mapItems, function(value, key) {
        if(value.id == this.id) {
            index = key;
        }
    }, this);
    if(index !== undefined) {
        this.gameObj.mapItems.splice(index, 1);
    }
};

/**
* possess unit
*
 * @param huungry.Unit spellTargetUnit
 */
huungry.Item.prototype.possessUnit = function(spellTargetUnit) {
    spellTargetUnit.possessionSpell(this.numHits);
    this.gameObj.player.items.splice(HuungryUI.selectedItem,1);
    this.gameObj.fightEngine.hideItemTargets();
};

/**
* animate inanimated
*
 * @param huungry.Inanimated 
 */
huungry.Item.prototype.animateInanimated = function(inanimated) {
    inanimated.turnIntoUnit(this);    
    this.gameObj.player.items.splice(HuungryUI.selectedItem,1);
    this.gameObj.fightEngine.hideItemTargets();
};