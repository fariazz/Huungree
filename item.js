goog.provide('huungry.Item');
goog.require('lime.Sprite');
goog.require('huungry.Character');

/*
 * Item
 */
huungry.Item = function() {
    goog.base(this);
    
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
    this.setFill('assets/'+data.image);
    this.name = data.name;
    this.gold = data.gold;
    
    return this;
}

/**
 * show details dialog
 */
huungry.Item.prototype.showDialog = function() {
    
}