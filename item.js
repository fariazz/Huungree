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
            numHits: this.numHits          
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
 * @param huungry.Unit attackedUnit
 */
huungry.Item.prototype.protectUnit = function(attackedUnit) {
    attackedUnit.defenseSpell(this.numHits);
    this.gameObj.fightEngine.hideItemTargets();
    this.gameObj.player.items.splice(HuungryUI.selectedItem,1);
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
        numHits: this.numHits
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